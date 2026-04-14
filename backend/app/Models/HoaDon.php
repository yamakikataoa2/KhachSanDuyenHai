<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HoaDon extends Model
{
    use HasFactory;

    protected $table = 'hoadon';
    protected $primaryKey = 'MaHoaDon';
    protected $fillable = ['MaPhieuDat', 'MaNhanVien', 'NgayLap', 'TongTienGoiCombo', 'TongTienPhong', 'TongTienDichVu', 'PhuThu', 'GiamGia', 'TongThanhToan', 'TrangThaiThanhToan', 'PhuongThucThanhToan'];


    public function phieuDatPhong() { return $this->belongsTo(PhieuDatPhong::class, 'MaPhieuDat'); }
    public function nhanVien() { return $this->belongsTo(NhanVien::class, 'MaNhanVien'); }
}
