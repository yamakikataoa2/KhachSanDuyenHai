<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VaiTro extends Model
{
    use HasFactory;

    protected $table = 'vaitro';
    protected $primaryKey = 'MaVaiTro';
    protected $fillable = ['TenVaiTro', 'MoTa'];


    public function taiKhoanNhanVien() { return $this->hasMany(TaiKhoanNhanVien::class, 'MaVaiTro'); }
}
