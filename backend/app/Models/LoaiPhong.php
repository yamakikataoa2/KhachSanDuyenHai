<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoaiPhong extends Model
{
    use HasFactory;

    protected $table = 'loaiphong';
    protected $primaryKey = 'MaLoaiPhong';
    protected $fillable = ['TenLoai', 'AnhDaiDien', 'MoTa', 'SoNguoiToiDa', 'DienTich', 'TienNghi', 'GiaMacDinh', 'TrangThai'];

    // Cast TienNghi từ JSON string
    protected $casts = [
        'TienNghi' => 'array',
    ];

    public function phong() { return $this->hasMany(Phong::class, 'MaLoaiPhong'); }
}
