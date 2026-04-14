<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\TaiKhoanNhanVien;

class CheckRole
{
    /**
     * Kiểm tra user có quyền admin/staff không
     * Usage: middleware('role:Admin') hoặc middleware('role:Admin,Lễ Tân')
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = $request->user();

        if (!$user || !($user instanceof TaiKhoanNhanVien)) {
            return response()->json(['message' => 'Không có quyền truy cập. Vui lòng đăng nhập bằng tài khoản quản trị.'], 403);
        }

        $user->load('vaiTro');
        $userRole = $user->vaiTro->TenVaiTro;

        // Nếu không truyền roles cụ thể, chỉ cần là nhân viên là OK
        if (empty($roles)) {
            return $next($request);
        }

        // Admin có full quyền
        if ($userRole === 'Admin') {
            return $next($request);
        }

        // Check role cụ thể
        if (in_array($userRole, $roles)) {
            return $next($request);
        }

        return response()->json(['message' => 'Bạn không có quyền thực hiện thao tác này'], 403);
    }
}
