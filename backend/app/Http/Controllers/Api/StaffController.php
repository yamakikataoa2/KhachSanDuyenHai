<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\NhanVien;
use App\Models\TaiKhoanNhanVien;

class StaffController extends Controller
{
    /** GET /api/admin/staff — Admin */
    public function index()
    {
        $staff = NhanVien::with('taiKhoan.vaiTro')->orderBy('MaNhanVien', 'desc')->get();
        return response()->json($staff);
    }

    /** GET /api/admin/staff/{id} */
    public function show($id)
    {
        return response()->json(
            NhanVien::with('taiKhoan.vaiTro')->findOrFail($id)
        );
    }

    /** POST /api/admin/staff — Admin */
    public function store(Request $request)
    {
        $request->validate([
            'HoTen'       => 'required|string|max:100',
            'ChucVu'      => 'required|string|max:50',
            'SoDienThoai' => 'required|string|max:15|unique:nhanvien,SoDienThoai',
            'TenDangNhap' => 'required|string|max:50|unique:taikhoannhanvien,TenDangNhap',
            'MatKhau'     => 'required|string|min:6',
            'MaVaiTro'    => 'required|exists:vaitro,MaVaiTro',
        ]);

        $nhanVien = NhanVien::create($request->only(['HoTen', 'ChucVu', 'SoDienThoai', 'Email']));

        TaiKhoanNhanVien::create([
            'TenDangNhap' => $request->TenDangNhap,
            'MatKhau'     => Hash::make($request->MatKhau),
            'MaNhanVien'  => $nhanVien->MaNhanVien,
            'MaVaiTro'    => $request->MaVaiTro,
            'TrangThai'   => 'Hoạt động',
        ]);

        return response()->json([
            'message' => 'Tạo nhân viên thành công!',
            'data'    => $nhanVien->load('taiKhoan.vaiTro'),
        ], 201);
    }

    /** PUT /api/admin/staff/{id} — Admin */
    public function update(Request $request, $id)
    {
        $nhanVien = NhanVien::findOrFail($id);
        $nhanVien->update($request->only(['HoTen', 'ChucVu', 'SoDienThoai', 'Email']));

        // Cập nhật tài khoản nếu có
        if ($nhanVien->taiKhoan && $request->has('MaVaiTro')) {
            $nhanVien->taiKhoan->update(['MaVaiTro' => $request->MaVaiTro]);
        }

        if ($nhanVien->taiKhoan && $request->has('TrangThaiTK')) {
            $nhanVien->taiKhoan->update(['TrangThai' => $request->TrangThaiTK]);
        }

        return response()->json([
            'message' => 'Cập nhật nhân viên thành công!',
            'data'    => $nhanVien->load('taiKhoan.vaiTro'),
        ]);
    }

    /** DELETE /api/admin/staff/{id} — Admin */
    public function destroy($id)
    {
        $nhanVien = NhanVien::findOrFail($id);
        $nhanVien->taiKhoan()->delete();
        $nhanVien->delete();

        return response()->json(['message' => 'Xóa nhân viên thành công!']);
    }
}
