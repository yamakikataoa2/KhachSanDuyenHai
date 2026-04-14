<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DichVu extends Model
{
    use HasFactory;

    protected $table = 'dichvu';
    protected $primaryKey = 'MaDichVu';
    protected $fillable = ['TenDichVu', 'AnhDaiDien', 'DonGia', 'DonViTinh', 'NhomDV', 'TrangThai'];

    public function chiTietGoiCombo()
    {
        return $this->hasMany(ChiTietGoiCombo::class, 'MaDichVu', 'MaDichVu');
    }

    public function suDungDichVu()
    {
        return $this->hasMany(SuDungDichVu::class, 'MaDichVu', 'MaDichVu');
    }
}
