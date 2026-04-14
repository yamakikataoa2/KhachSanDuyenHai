<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChiTietGoiCombo extends Model
{
    use HasFactory;

    protected $table = 'chitietgoicombo';
    protected $primaryKey = 'MaChiTietGoi';
    protected $fillable = ['MaGoi', 'MaDichVu', 'SoLuongMacDinh', 'DonGiaGoc', 'GhiChu'];


    public function goiCombo() { return $this->belongsTo(GoiCombo::class, 'MaGoi'); }
    public function dichVu() { return $this->belongsTo(DichVu::class, 'MaDichVu'); }
}
