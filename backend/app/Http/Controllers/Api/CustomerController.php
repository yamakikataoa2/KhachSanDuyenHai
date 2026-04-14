<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\KhachHang;
use App\Models\TaiKhoanKhachHang;

class CustomerController extends Controller
{
    /** GET /api/admin/customers — Admin */
    public function index(Request $request)
    {
        $query = KhachHang::withCount('phieuDatPhong');

        if ($request->has('search')) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('HoTen', 'like', "%{$s}%")
                  ->orWhere('Email', 'like', "%{$s}%")
                  ->orWhere('SoDienThoai', 'like', "%{$s}%");
            });
        }

        return response()->json($query->orderBy('MaKhachHang', 'desc')->get());
    }

    /** GET /api/admin/customers/{id} — Admin */
    public function show($id)
    {
        $khachHang = KhachHang::with(['phieuDatPhong' => function ($q) {
            $q->orderBy('NgayDat', 'desc')->limit(10);
        }])->withCount('phieuDatPhong')->findOrFail($id);

        return response()->json($khachHang);
    }

    /** POST /api/admin/customers — Admin */
    public function store(Request $request)
    {
        $request->validate([
            'HoTen'       => 'required|string|max:100',
            'SoDienThoai' => 'required|string|max:15|unique:khachhang,SoDienThoai',
        ]);

        $khachHang = KhachHang::create($request->only([
            'HoTen', 'CCCD_CMND', 'SoDienThoai', 'Email', 'DiaChi'
        ]));

        return response()->json([
            'message' => 'Tạo khách hàng thành công!',
            'data'    => $khachHang,
        ], 201);
    }

    /** PUT /api/admin/customers/{id} — Admin */
    public function update(Request $request, $id)
    {
        $khachHang = KhachHang::findOrFail($id);
        $khachHang->update($request->only([
            'HoTen', 'CCCD_CMND', 'SoDienThoai', 'Email', 'DiaChi'
        ]));

        return response()->json([
            'message' => 'Cập nhật khách hàng thành công!',
            'data'    => $khachHang,
        ]);
    }

    /** DELETE /api/admin/customers/{id} — Admin */
    public function destroy($id)
    {
        $khachHang = KhachHang::findOrFail($id);

        if ($khachHang->phieuDatPhong()->exists()) {
            return response()->json(['message' => 'Không thể xóa khách hàng có lịch sử đặt phòng'], 422);
        }

        // Xóa tài khoản liên kết
        $khachHang->taiKhoan()->delete();
        $khachHang->delete();

        return response()->json(['message' => 'Xóa khách hàng thành công!']);
    }

    // === USER PROFILE ===

    /** GET /api/user/profile — Logged-in customer */
    public function profile(Request $request)
    {
        $taiKhoan = $request->user();
        $khachHang = $taiKhoan->khachHang;

        return response()->json([
            'MaKhachHang' => $khachHang->MaKhachHang,
            'HoTen'       => $khachHang->HoTen,
            'Email'       => $khachHang->Email,
            'SoDienThoai' => $khachHang->SoDienThoai,
            'DiaChi'      => $khachHang->DiaChi,
            'CCCD_CMND'   => $khachHang->CCCD_CMND,
            'TenDangNhap' => $taiKhoan->TenDangNhap,
            'NgayTaoTK'   => $taiKhoan->created_at,
        ]);
    }

    /** PUT /api/user/profile — Logged-in customer cập nhật */
    public function updateProfile(Request $request)
    {
        $taiKhoan = $request->user();
        $khachHang = $taiKhoan->khachHang;

        $khachHang->update($request->only([
            'HoTen', 'SoDienThoai', 'DiaChi', 'CCCD_CMND'
        ]));

        return response()->json([
            'message' => 'Cập nhật hồ sơ thành công!',
            'data'    => $khachHang,
        ]);
    }
}
