<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class TaiKhoanKhachHang extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'taikhoankhachhang';
    protected $primaryKey = 'id';
    protected $fillable = ['TenDangNhap', 'MatKhau', 'MaKhachHang', 'TrangThai', 'LanDangNhapCuoi'];

    protected $hidden = ['MatKhau'];

    // Sanctum uses 'password' by default, map to our column
    public function getAuthPassword()
    {
        return $this->MatKhau;
    }

    public function khachHang()
    {
        return $this->belongsTo(KhachHang::class, 'MaKhachHang', 'MaKhachHang');
    }
}
