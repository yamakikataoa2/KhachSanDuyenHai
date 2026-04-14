<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PhieuDatPhong extends Model
{
    use HasFactory;

    protected $table = 'phieudatphong';
    protected $primaryKey = 'MaPhieuDat';
    protected $fillable = ['MaKhachHang', 'MaNhanVien', 'MaGoi', 'NgayDat', 'NgayNhanDuKien', 'NgayTraDuKien', 'TienCoc', 'TrangThai', 'GhiChu'];

    public function khachHang()
    {
        return $this->belongsTo(KhachHang::class, 'MaKhachHang', 'MaKhachHang');
    }

    public function nhanVien()
    {
        return $this->belongsTo(NhanVien::class, 'MaNhanVien', 'MaNhanVien');
    }

    public function goiCombo()
    {
        return $this->belongsTo(GoiCombo::class, 'MaGoi', 'MaGoi');
    }

    public function chiTietDatPhongs()
    {
        return $this->hasMany(ChiTietDatPhong::class, 'MaPhieuDat', 'MaPhieuDat');
    }

    public function suDungDichVus()
    {
        return $this->hasMany(SuDungDichVu::class, 'MaPhieuDat', 'MaPhieuDat');
    }

    public function hoaDon()
    {
        return $this->hasOne(HoaDon::class, 'MaPhieuDat', 'MaPhieuDat');
    }
}
