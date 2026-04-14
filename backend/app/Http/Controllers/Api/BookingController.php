<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\PhieuDatPhong;
use App\Models\GoiCombo;
use App\Models\ChiTietGoiCombo;
use App\Models\ChiTietDatPhong;
use App\Models\SuDungDichVu;
use App\Models\Phong;

class BookingController extends Controller
{
    /** GET /api/admin/bookings — Admin: tất cả bookings */
    public function index(Request $request)
    {
        $query = PhieuDatPhong::with(['khachHang', 'nhanVien', 'goiCombo', 'chiTietDatPhongs.phong.loaiPhong']);

        if ($request->has('TrangThai')) {
            $query->where('TrangThai', $request->TrangThai);
        }

        return response()->json($query->orderBy('NgayDat', 'desc')->get());
    }

    /** GET /api/admin/bookings/{id} — Admin chi tiết */
    public function show($id)
    {
        $phieu = PhieuDatPhong::with([
            'khachHang',
            'nhanVien',
            'goiCombo.chiTiet.dichVu',
            'chiTietDatPhongs.phong.loaiPhong',
            'suDungDichVus.dichVu',
            'hoaDon',
        ])->findOrFail($id);

        return response()->json($phieu);
    }

    /** POST /api/user/bookings — Create booking (authenticated customer) */
    public function createBooking(Request $request)
    {
        $request->validate([
            'NgayNhan'  => 'required|date|after_or_equal:today',
            'NgayTra'   => 'required|date|after:NgayNhan',
            'DsPhong'   => 'required|array|min:1',
            'DsPhong.*.MaPhong' => 'required|exists:phong,MaPhong',
            'DsPhong.*.GiaThue' => 'required|numeric|min:0',
        ]);

        DB::beginTransaction();
        try {
            // Xác định khách hàng
            $maKH = null;
            $user = $request->user();
            if ($user && method_exists($user, 'khachHang') && $user->khachHang) {
                $maKH = $user->khachHang->MaKhachHang;
            } else {
                $maKH = $request->MaKhachHang;
            }

            if (!$maKH) {
                throw new \Exception('Không xác định được khách hàng');
            }

            // Kiểm tra phòng trống
            foreach ($request->DsPhong as $p) {
                $isBooked = ChiTietDatPhong::whereHas('phieuDatPhong', function ($q) use ($request) {
                    $q->whereIn('TrangThai', ['Chờ xác nhận', 'Đã nhận phòng'])
                      ->where('NgayNhanDuKien', '<', $request->NgayTra)
                      ->where('NgayTraDuKien', '>', $request->NgayNhan);
                })->where('MaPhong', $p['MaPhong'])->exists();

                if ($isBooked) {
                    $phong = Phong::find($p['MaPhong']);
                    throw new \Exception("Phòng {$phong->SoPhong} đã được đặt trong khoảng thời gian này");
                }
            }

            // Tạo phiếu đặt phòng
            $phieu = PhieuDatPhong::create([
                'MaKhachHang'     => $maKH,
                'MaNhanVien'      => $request->MaNhanVien ?? null,
                'MaGoi'           => $request->MaGoi ?? null,
                'NgayDat'         => now(),
                'NgayNhanDuKien'  => $request->NgayNhan,
                'NgayTraDuKien'   => $request->NgayTra,
                'TienCoc'         => $request->TienCoc ?? 0,
                'TrangThai'       => 'Chờ xác nhận',
                'GhiChu'          => $request->GhiChu ?? null,
            ]);

            // Chi tiết phòng
            foreach ($request->DsPhong as $p) {
                ChiTietDatPhong::create([
                    'MaPhieuDat'      => $phieu->MaPhieuDat,
                    'MaPhong'         => $p['MaPhong'],
                    'GiaThueThucTe'   => $p['GiaThue'],
                    'ThuocGoiCombo'   => $p['ThuocGoiCombo'] ?? 0,
                ]);
            }

            // Apply combo services
            if ($phieu->MaGoi) {
                $comboDetails = ChiTietGoiCombo::with('dichVu')->where('MaGoi', $phieu->MaGoi)->get();
                foreach ($comboDetails as $ct) {
                    SuDungDichVu::create([
                        'MaPhieuDat'    => $phieu->MaPhieuDat,
                        'MaDichVu'      => $ct->MaDichVu,
                        'SoLuong'       => $ct->SoLuongMacDinh,
                        'NgaySuDung'    => $request->NgayNhan,
                        'ThanhTien'     => $ct->SoLuongMacDinh * $ct->dichVu->DonGia,
                        'ThuocGoiCombo' => 1,
                    ]);
                }
            }

            // Thêm dịch vụ ngoài combo nếu có
            if ($request->has('DsDichVu')) {
                foreach ($request->DsDichVu as $dv) {
                    $dichVu = \App\Models\DichVu::findOrFail($dv['MaDichVu']);
                    SuDungDichVu::create([
                        'MaPhieuDat'    => $phieu->MaPhieuDat,
                        'MaDichVu'      => $dv['MaDichVu'],
                        'SoLuong'       => $dv['SoLuong'],
                        'NgaySuDung'    => $request->NgayNhan,
                        'ThanhTien'     => $dv['SoLuong'] * $dichVu->DonGia,
                        'ThuocGoiCombo' => 0,
                    ]);
                }
            }

            DB::commit();

            return response()->json([
                'message'    => 'Đặt phòng thành công!',
                'MaPhieuDat' => $phieu->MaPhieuDat,
                'data'       => $phieu->load(['chiTietDatPhongs.phong.loaiPhong', 'goiCombo']),
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }

    /** PUT /api/admin/bookings/{id}/status — Admin: đổi trạng thái */
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'TrangThai' => 'required|in:Chờ xác nhận,Đã nhận phòng,Đã trả phòng,Đã hủy',
        ]);

        $phieu = PhieuDatPhong::findOrFail($id);
        $phieu->update([
            'TrangThai'  => $request->TrangThai,
            'MaNhanVien' => $request->user()->MaNhanVien ?? $phieu->MaNhanVien,
        ]);

        // Nếu trả phòng, đổi trạng thái phòng về Trống
        if ($request->TrangThai === 'Đã trả phòng') {
            $phieu->chiTietDatPhongs->each(function ($ct) {
                Phong::where('MaPhong', $ct->MaPhong)->update(['TrangThai' => 'Trống']);
            });
        }

        // Nếu nhận phòng, đổi trạng thái phòng thành Đang sử dụng
        if ($request->TrangThai === 'Đã nhận phòng') {
            $phieu->chiTietDatPhongs->each(function ($ct) {
                Phong::where('MaPhong', $ct->MaPhong)->update(['TrangThai' => 'Đang sử dụng']);
            });
        }

        return response()->json([
            'message' => 'Cập nhật trạng thái thành công!',
            'data'    => $phieu,
        ]);
    }

    /** POST /api/bookings/{id}/services — Thêm/sửa/xóa dịch vụ */
    public function modifyService(Request $request, $maPhieuDat)
    {
        DB::beginTransaction();
        try {
            $dichVuInfo = DB::table('dichvu')->where('MaDichVu', $request->MaDichVu)->first();
            if (!$dichVuInfo) {
                throw new \Exception('Dịch vụ không tồn tại');
            }

            $thanhTien = $dichVuInfo->DonGia * $request->SoLuong;

            $existing = SuDungDichVu::where('MaPhieuDat', $maPhieuDat)
                                    ->where('MaDichVu', $request->MaDichVu)
                                    ->where('ThuocGoiCombo', $request->ThuocGoiCombo ?? 0)
                                    ->first();

            if ($existing) {
                if ($request->SoLuong <= 0) {
                    $existing->delete();
                } else {
                    $existing->update([
                        'SoLuong'  => $request->SoLuong,
                        'ThanhTien' => $request->SoLuong * $dichVuInfo->DonGia,
                    ]);
                }
            } else if ($request->SoLuong > 0) {
                SuDungDichVu::create([
                    'MaPhieuDat'    => $maPhieuDat,
                    'MaDichVu'      => $request->MaDichVu,
                    'SoLuong'       => $request->SoLuong,
                    'NgaySuDung'    => now(),
                    'ThanhTien'     => $thanhTien,
                    'ThuocGoiCombo' => $request->ThuocGoiCombo ?? 0,
                ]);
            }

            DB::commit();
            return response()->json(['message' => 'Cập nhật dịch vụ thành công']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /** GET /api/bookings/{id}/bill — Tính hóa đơn nháp */
    public function calculateBill($maPhieuDat)
    {
        $phieu = PhieuDatPhong::with(['chiTietDatPhongs', 'suDungDichVus.dichVu', 'goiCombo'])->findOrFail($maPhieuDat);

        $tongTienPhong = $phieu->chiTietDatPhongs->sum('GiaThueThucTe');
        $tongDichVuCombo = $phieu->suDungDichVus->where('ThuocGoiCombo', 1)->sum('ThanhTien');
        $tongDichVuLe = $phieu->suDungDichVus->where('ThuocGoiCombo', 0)->sum('ThanhTien');

        $giamGia = 0;
        $tienCombo = 0;

        if ($phieu->goiCombo) {
            $tienCombo = $phieu->goiCombo->GiaGoi;
            $giamGia = max(0, $tongDichVuCombo - $tienCombo);
        }

        $tongThanhToan = $tongTienPhong + $tongDichVuCombo + $tongDichVuLe - $giamGia;

        return response()->json([
            'MaPhieuDat'            => $maPhieuDat,
            'TienPhong'             => $tongTienPhong,
            'TienDichVuNgoai'       => $tongDichVuLe,
            'TienDichVuTrongCombo'  => $tongDichVuCombo,
            'GiaTriComboGoc'        => $tienCombo,
            'GiamGiaTuCombo'        => $giamGia,
            'TongThanhToan'         => $tongThanhToan,
        ]);
    }

    // === USER BOOKINGS ===

    /** GET /api/user/bookings — My bookings */
    public function myBookings(Request $request)
    {
        $maKH = $request->user()->khachHang->MaKhachHang;

        $bookings = PhieuDatPhong::with(['chiTietDatPhongs.phong.loaiPhong', 'goiCombo', 'hoaDon'])
            ->where('MaKhachHang', $maKH)
            ->orderBy('NgayDat', 'desc')
            ->get();

        return response()->json($bookings);
    }

    /** GET /api/user/bookings/{id} — My booking detail */
    public function myBookingDetail(Request $request, $id)
    {
        $maKH = $request->user()->khachHang->MaKhachHang;

        $phieu = PhieuDatPhong::with([
            'chiTietDatPhongs.phong.loaiPhong',
            'suDungDichVus.dichVu',
            'goiCombo.chiTiet.dichVu',
            'hoaDon',
        ])->where('MaKhachHang', $maKH)->findOrFail($id);

        return response()->json($phieu);
    }

    /** GET /api/combo/{id}/preview — Public: Xem chi tiết combo */
    public function getComboPreview($id)
    {
        $combo = GoiCombo::with('chiTiet.dichVu')->find($id);
        if (!$combo) return response()->json(['error' => 'Combo not found'], 404);

        $tongGiaTriGoc = 0;
        $dichvus = [];
        foreach ($combo->chiTiet as $ct) {
            $lineTotal = $ct->dichVu->DonGia * $ct->SoLuongMacDinh;
            $tongGiaTriGoc += $lineTotal;
            $dichvus[] = [
                'MaDichVu'  => $ct->MaDichVu,
                'TenDichVu' => $ct->dichVu->TenDichVu,
                'SoLuong'   => $ct->SoLuongMacDinh,
                'DonGia'    => $ct->dichVu->DonGia,
                'ThanhTien' => $lineTotal,
            ];
        }

        return response()->json([
            'MaGoi'              => $combo->MaGoi,
            'TenGoi'             => $combo->TenGoi,
            'MucGiaChaoBan'      => $combo->GiaGoi,
            'PhanTramGiam'       => $combo->PhanTramGiam,
            'TongGiaTriDichVuGoc'=> $tongGiaTriGoc,
            'GiamGiaUuDai'       => max(0, $tongGiaTriGoc - $combo->GiaGoi),
            'DanhSachDichVu'     => $dichvus,
        ]);
    }

    // === ADMIN DASHBOARD STATS ===

    /** GET /api/admin/dashboard — Dashboard stats */
    public function dashboard()
    {
        $tongPhong = Phong::count();
        $phongTrong = Phong::where('TrangThai', 'Trống')->count();
        $phongDangSD = Phong::where('TrangThai', 'Đang sử dụng')->count();
        $bookingsHomNay = PhieuDatPhong::whereDate('NgayDat', today())->count();
        $bookingsChoDuyet = PhieuDatPhong::where('TrangThai', 'Chờ xác nhận')->count();

        $doanhThuThang = HoaDon::where('TrangThaiThanhToan', 'Đã thanh toán')
            ->whereMonth('NgayLap', now()->month)
            ->whereYear('NgayLap', now()->year)
            ->sum('TongThanhToan');

        $tongKhach = \App\Models\KhachHang::count();

        return response()->json([
            'tongPhong'         => $tongPhong,
            'phongTrong'        => $phongTrong,
            'phongDangSD'       => $phongDangSD,
            'bookingsHomNay'    => $bookingsHomNay,
            'bookingsChoDuyet'  => $bookingsChoDuyet,
            'doanhThuThang'     => $doanhThuThang,
            'tongKhach'         => $tongKhach,
            'tyLeLapDay'        => $tongPhong > 0 ? round($phongDangSD / $tongPhong * 100) : 0,
        ]);
    }
}
