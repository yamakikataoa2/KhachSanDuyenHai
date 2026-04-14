<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DichVu;

class ServiceController extends Controller
{
    /** GET /api/services — Public */
    public function index(Request $request)
    {
        $query = DichVu::query();

        if ($request->has('TrangThai')) {
            $query->where('TrangThai', $request->TrangThai);
        }
        if ($request->has('NhomDV')) {
            $query->where('NhomDV', $request->NhomDV);
        }

        return response()->json($query->orderBy('NhomDV')->orderBy('TenDichVu')->get());
    }

    /** GET /api/services/{id} */
    public function show($id)
    {
        return response()->json(DichVu::findOrFail($id));
    }

    /** POST /api/admin/services — Admin */
    public function store(Request $request)
    {
        $request->validate([
            'TenDichVu' => 'required|string|max:100',
            'DonGia'    => 'required|numeric|min:0',
            'DonViTinh' => 'required|string|max:20',
        ]);

        $dichVu = DichVu::create($request->only([
            'TenDichVu', 'AnhDaiDien', 'DonGia', 'DonViTinh', 'NhomDV', 'TrangThai'
        ]));

        return response()->json([
            'message' => 'Tạo dịch vụ thành công!',
            'data'    => $dichVu,
        ], 201);
    }

    /** PUT /api/admin/services/{id} — Admin */
    public function update(Request $request, $id)
    {
        $dichVu = DichVu::findOrFail($id);
        $dichVu->update($request->only([
            'TenDichVu', 'AnhDaiDien', 'DonGia', 'DonViTinh', 'NhomDV', 'TrangThai'
        ]));

        return response()->json([
            'message' => 'Cập nhật dịch vụ thành công!',
            'data'    => $dichVu,
        ]);
    }

    /** DELETE /api/admin/services/{id} — Admin */
    public function destroy($id)
    {
        $dichVu = DichVu::findOrFail($id);

        if ($dichVu->chiTietGoiCombo()->exists()) {
            return response()->json(['message' => 'Không thể xóa dịch vụ đang được sử dụng trong gói combo'], 422);
        }

        $dichVu->delete();
        return response()->json(['message' => 'Xóa dịch vụ thành công!']);
    }
}
