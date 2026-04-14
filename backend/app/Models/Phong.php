<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Phong extends Model
{
    use HasFactory;

    protected $table = 'phong';
    protected $primaryKey = 'MaPhong';
    protected $fillable = ['SoPhong', 'MaLoaiPhong', 'TrangThai'];


    public function loaiPhong() { return $this->belongsTo(LoaiPhong::class, 'MaLoaiPhong'); }
}
