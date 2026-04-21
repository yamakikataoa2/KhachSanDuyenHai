<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\HoaDon;
use App\Models\PhieuDatPhong;

class InvoiceController extends Controller
{
    /** GET /api/admin/invoices — Admin */
    public function index(Request $request)
    {
        $query = HoaDon::with(['phieuDatPhong.khachHang', 'nhanVien']);

        if ($request->has('TrangThaiThanhToan')) {
            $query->where('TrangThaiThanhToan', $request->TrangThaiThanhToan);
        }

        return response()->json($query->orderBy('MaHoaDon', 'desc')->get());
    }

    /** GET /api/admin/invoices/{id} — Admin */
    public function show($id)
    {
        $hoaDon = HoaDon::with([
            'phieuDatPhong.khachHang',
            'phieuDatPhong.chiTietDatPhongs.phong.loaiPhong',
            'phieuDatPhong.suDungDichVus.dichVu',
            'phieuDatPhong.goiCombo',
            'nhanVien',
        ])->findOrFail($id);

        return response()->json($hoaDon);
    }

    /** POST /api/admin/invoices — Admin: Tạo hóa đơn từ booking */
    public function store(Request $request)
    {
        $request->validate([
            'MaPhieuDat' => 'required|exists:phieudatphong,MaPhieuDat',
        ]);

        // Check đã có hóa đơn chưa
        $existing = HoaDon::where('MaPhieuDat', $request->MaPhieuDat)->first();
        if ($existing) {
            return response()->json(['message' => 'Booking này đã có hóa đơn', 'data' => $existing], 422);
        }

        $phieu = PhieuDatPhong::with(['chiTietDatPhongs', 'suDungDichVus.dichVu', 'goiCombo'])->findOrFail($request->MaPhieuDat);

        // Tính tiền
        $tongTienPhong = $phieu->chiTietDatPhongs->sum('GiaThueThucTe');
        $tongDichVuCombo = $phieu->suDungDichVus->where('ThuocGoiCombo', 1)->sum('ThanhTien');
        $tongDichVuLe = $phieu->suDungDichVus->where('ThuocGoiCombo', 0)->sum('ThanhTien');

        $tongTienGoiCombo = 0;
        $giamGia = 0;

        if ($phieu->goiCombo) {
            $tongTienGoiCombo = $phieu->goiCombo->GiaGoi;
            $giamGia = max(0, $tongDichVuCombo - $tongTienGoiCombo);
        }

        $phuThu = $request->PhuThu ?? 0;
        $giamGiaExtra = $request->GiamGia ?? 0;
        $tongThanhToan = $tongTienPhong + $tongDichVuCombo + $tongDichVuLe + $phuThu - $giamGia - $giamGiaExtra;

        $hoaDon = HoaDon::create([
            'MaPhieuDat'          => $request->MaPhieuDat,
            'MaNhanVien'          => $request->user()->MaNhanVien ?? null,
            'NgayLap'             => now(),
            'TongTienGoiCombo'    => $tongTienGoiCombo,
            'TongTienPhong'       => $tongTienPhong,
            'TongTienDichVu'      => $tongDichVuCombo + $tongDichVuLe,
            'PhuThu'              => $phuThu,
            'GiamGia'             => $giamGia + $giamGiaExtra,
            'TongThanhToan'       => max(0, $tongThanhToan),
            'TrangThaiThanhToan'  => $request->TrangThaiThanhToan ?? 'Chưa thanh toán',
            'PhuongThucThanhToan' => $request->PhuongThucThanhToan ?? null,
        ]);

        return response()->json([
            'message' => 'Tạo hóa đơn thành công!',
            'data'    => $hoaDon->load('phieuDatPhong.khachHang'),
        ], 201);
    }

    /** PUT /api/admin/invoices/{id} — Admin */
    public function update(Request $request, $id)
    {
        $hoaDon = HoaDon::findOrFail($id);
        $hoaDon->update($request->only([
            'TrangThaiThanhToan', 'PhuongThucThanhToan', 'PhuThu', 'GiamGia'
        ]));

        // Recalc nếu thay đổi phụ thu/giảm giá
        if ($request->has('PhuThu') || $request->has('GiamGia')) {
            $phieu = $hoaDon->phieuDatPhong()->with(['chiTietDatPhongs', 'suDungDichVus', 'goiCombo'])->first();
            $tongTienPhong = $phieu->chiTietDatPhongs->sum('GiaThueThucTe');
            $tongDV = $phieu->suDungDichVus->sum('ThanhTien');
            $tongThanhToan = $tongTienPhong + $tongDV + ($hoaDon->PhuThu ?? 0) - ($hoaDon->GiamGia ?? 0);
            $hoaDon->update(['TongThanhToan' => max(0, $tongThanhToan)]);
        }

        return response()->json([
            'message' => 'Cập nhật hóa đơn thành công!',
            'data'    => $hoaDon,
        ]);
    }

    /** DELETE /api/admin/invoices/{id} — Admin */
    public function destroy($id)
    {
        HoaDon::findOrFail($id)->delete();
        return response()->json(['message' => 'Xóa hóa đơn thành công!']);
    }

    // === USER INVOICES ===

    /** GET /api/user/invoices — D5 Fix: proper eager loading */
    public function myInvoices(Request $request)
    {
        $maKH = $request->user()->khachHang->MaKhachHang;

        $invoices = HoaDon::whereHas('phieuDatPhong', function ($q) use ($maKH) {
            $q->where('MaKhachHang', $maKH);
        })->with(['phieuDatPhong.khachHang'])->orderBy('NgayLap', 'desc')->get();

        return response()->json($invoices);
    }

    /** GET /api/user/invoices/{id} — D5 Fix: full nested eager load */
    public function myInvoiceDetail(Request $request, $id)
    {
        $maKH = $request->user()->khachHang->MaKhachHang;

        $hoaDon = HoaDon::with([
            'phieuDatPhong.khachHang',
            'phieuDatPhong.chiTietDatPhongs.phong.loaiPhong',
            'phieuDatPhong.suDungDichVus.dichVu',
            'phieuDatPhong.goiCombo',
        ])->whereHas('phieuDatPhong', function ($q) use ($maKH) {
            $q->where('MaKhachHang', $maKH);
        })->findOrFail($id);

        return response()->json($hoaDon);
    }
}
