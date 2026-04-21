<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\KhachHang;
use App\Models\TaiKhoanKhachHang;
use App\Models\TaiKhoanNhanVien;

class AuthController extends Controller
{
    /**
     * POST /api/auth/register
     * Đăng ký khách hàng mới
     */
    public function register(Request $request)
    {
        $request->validate([
            'HoTen'       => 'required|string|max:100',
            'Email'       => 'required|email|max:100|unique:khachhang,Email',
            'SoDienThoai' => 'required|string|max:15|unique:khachhang,SoDienThoai',
            'MatKhau'     => 'required|string|min:6',
        ]);

        DB::beginTransaction();
        try {
            // Tạo khách hàng
            $khachHang = KhachHang::create([
                'HoTen'       => $request->HoTen,
                'Email'       => $request->Email,
                'SoDienThoai' => $request->SoDienThoai,
                'DiaChi'      => $request->DiaChi ?? null,
                'CCCD_CMND'   => $request->CCCD_CMND ?? null,
            ]);

            // Tạo tài khoản
            $taiKhoan = TaiKhoanKhachHang::create([
                'TenDangNhap' => $request->Email,
                'MatKhau'     => Hash::make($request->MatKhau),
                'MaKhachHang' => $khachHang->MaKhachHang,
                'TrangThai'   => 'Hoạt động',
            ]);

            // Tạo token
            $token = $taiKhoan->createToken('customer-token')->plainTextToken;

            DB::commit();

            return response()->json([
                'message' => 'Đăng ký thành công!',
                'token'   => $token,
                'user'    => [
                    'id'          => $khachHang->MaKhachHang,
                    'HoTen'       => $khachHang->HoTen,
                    'Email'       => $khachHang->Email,
                    'SoDienThoai' => $khachHang->SoDienThoai,
                    'DiaChi'      => $khachHang->DiaChi,
                    'role'        => 'customer',
                ],
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Đăng ký thất bại: ' . $e->getMessage()], 500);
        }
    }

    /**
     * POST /api/auth/login
     * Đăng nhập khách hàng
     */
    public function login(Request $request)
    {
        $request->validate([
            'TenDangNhap' => 'required|string',
            'MatKhau'     => 'required|string',
        ]);

        $taiKhoan = TaiKhoanKhachHang::where('TenDangNhap', $request->TenDangNhap)->first();

        if (!$taiKhoan || !Hash::check($request->MatKhau, $taiKhoan->MatKhau)) {
            return response()->json(['message' => 'Tên đăng nhập hoặc mật khẩu không đúng'], 401);
        }

        if ($taiKhoan->TrangThai === 'Bị khóa') {
            return response()->json(['message' => 'Tài khoản đã bị khóa'], 403);
        }

        // Cập nhật lần đăng nhập cuối
        $taiKhoan->update(['LanDangNhapCuoi' => now()]);

        $token = $taiKhoan->createToken('customer-token')->plainTextToken;

        $khachHang = $taiKhoan->khachHang;

        return response()->json([
            'message' => 'Đăng nhập thành công!',
            'token'   => $token,
            'user'    => [
                'id'          => $khachHang->MaKhachHang,
                'HoTen'       => $khachHang->HoTen,
                'Email'       => $khachHang->Email,
                'SoDienThoai' => $khachHang->SoDienThoai,
                'DiaChi'      => $khachHang->DiaChi,
                'CCCD_CMND'   => $khachHang->CCCD_CMND,
                'role'        => 'customer',
            ],
        ]);
    }

    /**
     * POST /api/auth/admin-login
     * Đăng nhập nhân viên / admin
     */
    public function adminLogin(Request $request)
    {
        $request->validate([
            'TenDangNhap' => 'required|string',
            'MatKhau'     => 'required|string',
        ]);

        $taiKhoan = TaiKhoanNhanVien::with(['nhanVien', 'vaiTro'])->where('TenDangNhap', $request->TenDangNhap)->first();

        if (!$taiKhoan || !Hash::check($request->MatKhau, $taiKhoan->MatKhau)) {
            return response()->json(['message' => 'Tên đăng nhập hoặc mật khẩu không đúng'], 401);
        }

        if ($taiKhoan->TrangThai === 'Bị khóa') {
            return response()->json(['message' => 'Tài khoản đã bị khóa'], 403);
        }

        $taiKhoan->update(['LanDangNhapCuoi' => now()]);

        $token = $taiKhoan->createToken('admin-token')->plainTextToken;

        return response()->json([
            'message' => 'Đăng nhập thành công!',
            'token'   => $token,
            'user'    => [
                'id'       => $taiKhoan->MaNhanVien,
                'HoTen'    => $taiKhoan->nhanVien->HoTen,
                'ChucVu'   => $taiKhoan->nhanVien->ChucVu,
                'VaiTro'   => $taiKhoan->vaiTro->TenVaiTro,
                'MaVaiTro' => $taiKhoan->MaVaiTro,
                'role'     => 'admin',
            ],
        ]);
    }

    /**
     * POST /api/auth/logout
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Đăng xuất thành công']);
    }

    /**
     * GET /api/auth/me
     * Lấy thông tin user đang đăng nhập
     */
    public function me(Request $request)
    {
        $user = $request->user();
        $tokenable = $user;

        // Kiểm tra loại tài khoản
        if ($tokenable instanceof TaiKhoanKhachHang) {
            $khachHang = $tokenable->khachHang;
            return response()->json([
                'user' => [
                    'id'          => $khachHang->MaKhachHang,
                    'HoTen'       => $khachHang->HoTen,
                    'Email'       => $khachHang->Email,
                    'SoDienThoai' => $khachHang->SoDienThoai,
                    'DiaChi'      => $khachHang->DiaChi,
                    'CCCD_CMND'   => $khachHang->CCCD_CMND,
                    'role'        => 'customer',
                ],
            ]);
        }

        if ($tokenable instanceof TaiKhoanNhanVien) {
            $tokenable->load(['nhanVien', 'vaiTro']);
            return response()->json([
                'user' => [
                    'id'       => $tokenable->MaNhanVien,
                    'HoTen'    => $tokenable->nhanVien->HoTen,
                    'ChucVu'   => $tokenable->nhanVien->ChucVu,
                    'VaiTro'   => $tokenable->vaiTro->TenVaiTro,
                    'MaVaiTro' => $tokenable->MaVaiTro,
                    'role'     => 'admin',
                ],
            ]);
        }

        return response()->json(['message' => 'Unknown user type'], 400);
    }

    /**
     * PUT /api/user/change-password
     * Đổi mật khẩu
     */
    public function changePassword(Request $request)
    {
        $request->validate([
            'MatKhauCu'  => 'required|string',
            'MatKhauMoi' => 'required|string|min:6',
        ]);

        $user = $request->user();

        if (!Hash::check($request->MatKhauCu, $user->MatKhau)) {
            return response()->json(['message' => 'Mật khẩu hiện tại không đúng'], 422);
        }

        $user->update(['MatKhau' => Hash::make($request->MatKhauMoi)]);

        return response()->json(['message' => 'Đổi mật khẩu thành công!']);
    }
}
