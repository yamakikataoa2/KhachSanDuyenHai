<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KhachHang extends Model
{
    use HasFactory;

    protected $table = 'khachhang';
    protected $primaryKey = 'MaKhachHang';
    protected $fillable = ['HoTen', 'CCCD_CMND', 'SoDienThoai', 'Email', 'DiaChi'];


    public function taiKhoan() { return $this->hasOne(TaiKhoanKhachHang::class, 'MaKhachHang'); }
    public function phieuDatPhong() { return $this->hasMany(PhieuDatPhong::class, 'MaKhachHang'); }
}
