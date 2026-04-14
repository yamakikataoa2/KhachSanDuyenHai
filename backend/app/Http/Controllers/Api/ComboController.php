<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\GoiCombo;
use App\Models\ChiTietGoiCombo;
use App\Models\DichVu;

class ComboController extends Controller
{
    /** GET /api/combos — Public */
    public function index(Request $request)
    {
        $query = GoiCombo::withCount('chiTiet');

        if ($request->has('TrangThai')) {
            $query->where('TrangThai', $request->TrangThai);
        }

        return response()->json($query->orderBy('MaGoi', 'desc')->get());
    }

    /** GET /api/combos/{id} — Public, bao gồm chi tiết dịch vụ */
    public function show($id)
    {
        $combo = GoiCombo::with('chiTiet.dichVu')->findOrFail($id);

        // Tính toán giá gốc từ các dịch vụ
        $tongGiaGoc = 0;
        $dichVuList = [];

        foreach ($combo->chiTiet as $ct) {
            $lineTotal = $ct->dichVu->DonGia * $ct->SoLuongMacDinh;
            $tongGiaGoc += $lineTotal;

            $dichVuList[] = [
                'MaChiTietGoi'  => $ct->MaChiTietGoi,
                'MaDichVu'      => $ct->MaDichVu,
                'TenDichVu'     => $ct->dichVu->TenDichVu,
                'DonGia'        => $ct->DonGiaGoc ?? $ct->dichVu->DonGia,
                'DonViTinh'     => $ct->dichVu->DonViTinh,
                'SoLuong'       => $ct->SoLuongMacDinh,
                'ThanhTien'     => $lineTotal,
                'NhomDV'        => $ct->dichVu->NhomDV,
                'GhiChu'        => $ct->GhiChu,
            ];
        }

        return response()->json([
            'MaGoi'          => $combo->MaGoi,
            'TenGoi'         => $combo->TenGoi,
            'AnhDaiDien'     => $combo->AnhDaiDien,
            'MoTa'           => $combo->MoTa,
            'GiaGoi'         => $combo->GiaGoi,
            'PhanTramGiam'   => $combo->PhanTramGiam,
            'TongGiaGoc'     => $tongGiaGoc,
            'GiamGia'        => max(0, $tongGiaGoc - $combo->GiaGoi),
            'TrangThai'      => $combo->TrangThai,
            'DanhSachDichVu' => $dichVuList,
        ]);
    }

    /** POST /api/admin/combos — Admin */
    public function store(Request $request)
    {
        $request->validate([
            'TenGoi'  => 'required|string|max:100',
            'GiaGoi'  => 'required|numeric|min:0',
        ]);

        $combo = GoiCombo::create($request->only([
            'TenGoi', 'AnhDaiDien', 'GiaGoi', 'PhanTramGiam', 'MoTa', 'TrangThai'
        ]));

        return response()->json([
            'message' => 'Tạo gói combo thành công!',
            'data'    => $combo,
        ], 201);
    }

    /** PUT /api/admin/combos/{id} — Admin */
    public function update(Request $request, $id)
    {
        $combo = GoiCombo::findOrFail($id);
        $combo->update($request->only([
            'TenGoi', 'AnhDaiDien', 'GiaGoi', 'PhanTramGiam', 'MoTa', 'TrangThai'
        ]));

        return response()->json([
            'message' => 'Cập nhật gói combo thành công!',
            'data'    => $combo,
        ]);
    }

    /** DELETE /api/admin/combos/{id} — Admin */
    public function destroy($id)
    {
        $combo = GoiCombo::findOrFail($id);

        if ($combo->phieuDatPhongs()->exists()) {
            return response()->json(['message' => 'Không thể xóa gói combo đang được sử dụng trong booking'], 422);
        }

        // Xóa chi tiết trước
        $combo->chiTiet()->delete();
        $combo->delete();

        return response()->json(['message' => 'Xóa gói combo thành công!']);
    }

    // === COMBO SERVICE CRUD ===

    /** POST /api/admin/combos/{id}/services — Thêm dịch vụ vào gói */
    public function addService(Request $request, $id)
    {
        $request->validate([
            'MaDichVu'        => 'required|exists:dichvu,MaDichVu',
            'SoLuongMacDinh'  => 'required|integer|min:1',
        ]);

        $combo = GoiCombo::findOrFail($id);

        // Check đã có chưa
        $existing = ChiTietGoiCombo::where('MaGoi', $id)->where('MaDichVu', $request->MaDichVu)->first();
        if ($existing) {
            return response()->json(['message' => 'Dịch vụ này đã có trong gói combo'], 422);
        }

        $dichVu = DichVu::findOrFail($request->MaDichVu);

        $chiTiet = ChiTietGoiCombo::create([
            'MaGoi'           => $id,
            'MaDichVu'        => $request->MaDichVu,
            'SoLuongMacDinh'  => $request->SoLuongMacDinh,
            'DonGiaGoc'       => $dichVu->DonGia,
            'GhiChu'          => $request->GhiChu ?? null,
        ]);

        // Recalculate combo price
        $newPrice = $this->recalculateComboPrice($combo);

        return response()->json([
            'message'   => 'Thêm dịch vụ vào gói thành công!',
            'data'      => $chiTiet->load('dichVu'),
            'GiaGoiMoi' => $newPrice,
        ]);
    }

    /** PUT /api/admin/combos/{id}/services/{serviceId} — Sửa số lượng */
    public function updateService(Request $request, $id, $serviceId)
    {
        $request->validate([
            'SoLuongMacDinh' => 'required|integer|min:1',
        ]);

        $chiTiet = ChiTietGoiCombo::where('MaGoi', $id)->where('MaDichVu', $serviceId)->firstOrFail();
        $chiTiet->update([
            'SoLuongMacDinh' => $request->SoLuongMacDinh,
            'DonGiaGoc'      => $request->DonGiaGoc ?? $chiTiet->DonGiaGoc,
            'GhiChu'         => $request->GhiChu ?? $chiTiet->GhiChu,
        ]);

        $combo = GoiCombo::findOrFail($id);
        $newPrice = $this->recalculateComboPrice($combo);

        return response()->json([
            'message'   => 'Cập nhật dịch vụ thành công!',
            'data'      => $chiTiet->load('dichVu'),
            'GiaGoiMoi' => $newPrice,
        ]);
    }

    /** DELETE /api/admin/combos/{id}/services/{serviceId} — Xóa dịch vụ */
    public function removeService($id, $serviceId)
    {
        $chiTiet = ChiTietGoiCombo::where('MaGoi', $id)->where('MaDichVu', $serviceId)->firstOrFail();
        $chiTiet->delete();

        $combo = GoiCombo::findOrFail($id);
        $newPrice = $this->recalculateComboPrice($combo);

        return response()->json([
            'message'   => 'Xóa dịch vụ khỏi gói thành công!',
            'GiaGoiMoi' => $newPrice,
        ]);
    }

    /**
     * Tính lại giá combo dựa trên PhanTramGiam
     */
    private function recalculateComboPrice(GoiCombo $combo)
    {
        $combo->load('chiTiet.dichVu');

        $tongGiaGoc = 0;
        foreach ($combo->chiTiet as $ct) {
            $tongGiaGoc += ($ct->DonGiaGoc ?? $ct->dichVu->DonGia) * $ct->SoLuongMacDinh;
        }

        $phanTramGiam = $combo->PhanTramGiam ?? 0;
        $giaGoi = $tongGiaGoc * (1 - $phanTramGiam / 100);

        $combo->update(['GiaGoi' => round($giaGoi)]);

        return round($giaGoi);
    }
}
