<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GoiCombo extends Model
{
    use HasFactory;

    protected $table = 'goicombo';
    protected $primaryKey = 'MaGoi';
    protected $fillable = ['TenGoi', 'AnhDaiDien', 'GiaGoi', 'PhanTramGiam', 'MoTa', 'TrangThai'];

    public function chiTiet()
    {
        return $this->hasMany(ChiTietGoiCombo::class, 'MaGoi', 'MaGoi');
    }

    public function phieuDatPhongs()
    {
        return $this->hasMany(PhieuDatPhong::class, 'MaGoi', 'MaGoi');
    }
}
