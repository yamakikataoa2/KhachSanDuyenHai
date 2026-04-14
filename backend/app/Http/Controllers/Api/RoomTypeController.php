<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LoaiPhong;

class RoomTypeController extends Controller
{
    /** GET /api/room-types — Public */
    public function index(Request $request)
    {
        $query = LoaiPhong::withCount('phong');

        if ($request->has('status')) {
            $query->where('TrangThai', $request->status);
        }

        $loaiPhongs = $query->orderBy('MaLoaiPhong', 'desc')->get();
        return response()->json($loaiPhongs);
    }

    /** GET /api/room-types/{id} — Public */
    public function show($id)
    {
        $loaiPhong = LoaiPhong::with('phong')->findOrFail($id);
        return response()->json($loaiPhong);
    }

    /** POST /api/admin/room-types — Admin */
    public function store(Request $request)
    {
        $request->validate([
            'TenLoai'       => 'required|string|max:50',
            'GiaMacDinh'    => 'required|numeric|min:0',
            'SoNguoiToiDa'  => 'required|integer|min:1',
        ]);

        $loaiPhong = LoaiPhong::create($request->only([
            'TenLoai', 'AnhDaiDien', 'MoTa', 'SoNguoiToiDa', 'GiaMacDinh', 'TrangThai'
        ]));

        return response()->json([
            'message' => 'Tạo loại phòng thành công!',
            'data'    => $loaiPhong,
        ], 201);
    }

    /** PUT /api/admin/room-types/{id} — Admin */
    public function update(Request $request, $id)
    {
        $loaiPhong = LoaiPhong::findOrFail($id);
        $loaiPhong->update($request->only([
            'TenLoai', 'AnhDaiDien', 'MoTa', 'SoNguoiToiDa', 'GiaMacDinh', 'TrangThai'
        ]));

        return response()->json([
            'message' => 'Cập nhật loại phòng thành công!',
            'data'    => $loaiPhong,
        ]);
    }

    /** DELETE /api/admin/room-types/{id} — Admin */
    public function destroy($id)
    {
        $loaiPhong = LoaiPhong::findOrFail($id);

        if ($loaiPhong->phong()->exists()) {
            return response()->json(['message' => 'Không thể xóa loại phòng đang có phòng'], 422);
        }

        $loaiPhong->delete();
        return response()->json(['message' => 'Xóa loại phòng thành công!']);
    }
}
