<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GoiCombo extends Model
{
    use HasFactory;

    protected $table = 'goicombo';
    protected $primaryKey = 'MaGoi';
    protected $fillable = ['TenGoi', 'AnhDaiDien', 'GiaGoi', 'PhanTramGiam', 'MoTa', 'SoNgay', 'SoNguoi', 'TrangThai'];

    public function chiTiet()
    {
        return $this->hasMany(ChiTietGoiCombo::class, 'MaGoi', 'MaGoi');
    }

    // D2: Many-to-many relationship qua chitietgoicombo
    public function dichVus()
    {
        return $this->belongsToMany(DichVu::class, 'chitietgoicombo', 'MaGoi', 'MaDichVu')
            ->withPivot('SoLuongMacDinh', 'DonGiaGoc', 'GhiChu')
            ->withTimestamps();
    }

    public function phieuDatPhongs()
    {
        return $this->hasMany(PhieuDatPhong::class, 'MaGoi', 'MaGoi');
    }
}
