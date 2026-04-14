<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Phong;

class RoomController extends Controller
{
    /** GET /api/rooms — Public */
    public function index(Request $request)
    {
        $query = Phong::with('loaiPhong');

        if ($request->has('MaLoaiPhong')) {
            $query->where('MaLoaiPhong', $request->MaLoaiPhong);
        }
        if ($request->has('TrangThai')) {
            $query->where('TrangThai', $request->TrangThai);
        }

        return response()->json($query->orderBy('SoPhong')->get());
    }

    /** GET /api/rooms/available — Public, tìm phòng trống theo ngày */
    public function available(Request $request)
    {
        $request->validate([
            'NgayNhan' => 'required|date',
            'NgayTra'  => 'required|date|after:NgayNhan',
        ]);

        $ngayNhan = $request->NgayNhan;
        $ngayTra  = $request->NgayTra;

        // Tìm phòng không bị đặt trong khoảng ngày
        $roomsBooked = \App\Models\ChiTietDatPhong::whereHas('phieuDatPhong', function ($q) use ($ngayNhan, $ngayTra) {
            $q->whereIn('TrangThai', ['Chờ xác nhận', 'Đã nhận phòng'])
              ->where('NgayNhanDuKien', '<', $ngayTra)
              ->where('NgayTraDuKien', '>', $ngayNhan);
        })->pluck('MaPhong');

        $rooms = Phong::with('loaiPhong')
            ->where('TrangThai', 'Trống')
            ->whereNotIn('MaPhong', $roomsBooked)
            ->get();

        return response()->json($rooms);
    }

    /** GET /api/rooms/{id} */
    public function show($id)
    {
        return response()->json(Phong::with('loaiPhong')->findOrFail($id));
    }

    /** POST /api/admin/rooms — Admin */
    public function store(Request $request)
    {
        $request->validate([
            'SoPhong'     => 'required|string|max:10|unique:phong,SoPhong',
            'MaLoaiPhong' => 'required|exists:loaiphong,MaLoaiPhong',
        ]);

        $phong = Phong::create($request->only(['SoPhong', 'MaLoaiPhong', 'TrangThai']));

        return response()->json([
            'message' => 'Tạo phòng thành công!',
            'data'    => $phong->load('loaiPhong'),
        ], 201);
    }

    /** PUT /api/admin/rooms/{id} — Admin */
    public function update(Request $request, $id)
    {
        $phong = Phong::findOrFail($id);
        $phong->update($request->only(['SoPhong', 'MaLoaiPhong', 'TrangThai']));

        return response()->json([
            'message' => 'Cập nhật phòng thành công!',
            'data'    => $phong->load('loaiPhong'),
        ]);
    }

    /** DELETE /api/admin/rooms/{id} — Admin */
    public function destroy($id)
    {
        $phong = Phong::findOrFail($id);
        $phong->delete();
        return response()->json(['message' => 'Xóa phòng thành công!']);
    }
}
