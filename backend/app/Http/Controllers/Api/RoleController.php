<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\VaiTro;

class RoleController extends Controller
{
    /** GET /api/admin/roles */
    public function index()
    {
        $roles = VaiTro::withCount('taiKhoanNhanVien')->orderBy('MaVaiTro')->get();
        return response()->json($roles);
    }

    /** GET /api/admin/roles/{id} */
    public function show($id)
    {
        return response()->json(
            VaiTro::withCount('taiKhoanNhanVien')->findOrFail($id)
        );
    }

    /** POST /api/admin/roles — Admin */
    public function store(Request $request)
    {
        $request->validate([
            'TenVaiTro' => 'required|string|max:50|unique:vaitro,TenVaiTro',
        ]);

        $vaiTro = VaiTro::create($request->only(['TenVaiTro', 'MoTa']));

        return response()->json([
            'message' => 'Tạo vai trò thành công!',
            'data'    => $vaiTro,
        ], 201);
    }

    /** PUT /api/admin/roles/{id} — Admin */
    public function update(Request $request, $id)
    {
        $vaiTro = VaiTro::findOrFail($id);
        $vaiTro->update($request->only(['TenVaiTro', 'MoTa']));

        return response()->json([
            'message' => 'Cập nhật vai trò thành công!',
            'data'    => $vaiTro,
        ]);
    }

    /** DELETE /api/admin/roles/{id} — Admin */
    public function destroy($id)
    {
        $vaiTro = VaiTro::findOrFail($id);

        if ($vaiTro->taiKhoanNhanVien()->exists()) {
            return response()->json(['message' => 'Không thể xóa vai trò đang được sử dụng'], 422);
        }

        $vaiTro->delete();
        return response()->json(['message' => 'Xóa vai trò thành công!']);
    }
}
