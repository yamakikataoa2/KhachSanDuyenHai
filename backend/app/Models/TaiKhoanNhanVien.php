<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class TaiKhoanNhanVien extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'taikhoannhanvien';
    protected $primaryKey = 'id';
    protected $fillable = ['TenDangNhap', 'MatKhau', 'MaNhanVien', 'MaVaiTro', 'TrangThai', 'LanDangNhapCuoi'];

    protected $hidden = ['MatKhau'];

    public function getAuthPassword()
    {
        return $this->MatKhau;
    }

    public function nhanVien()
    {
        return $this->belongsTo(NhanVien::class, 'MaNhanVien', 'MaNhanVien');
    }

    public function vaiTro()
    {
        return $this->belongsTo(VaiTro::class, 'MaVaiTro', 'MaVaiTro');
    }
}
