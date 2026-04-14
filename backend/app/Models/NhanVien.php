<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NhanVien extends Model
{
    use HasFactory;

    protected $table = 'nhanvien';
    protected $primaryKey = 'MaNhanVien';
    protected $fillable = ['HoTen', 'ChucVu', 'SoDienThoai', 'Email'];

    public function taiKhoan()
    {
        return $this->hasOne(TaiKhoanNhanVien::class, 'MaNhanVien', 'MaNhanVien');
    }

    public function phieuDatPhongs()
    {
        return $this->hasMany(PhieuDatPhong::class, 'MaNhanVien', 'MaNhanVien');
    }

    public function hoaDons()
    {
        return $this->hasMany(HoaDon::class, 'MaNhanVien', 'MaNhanVien');
    }
}
