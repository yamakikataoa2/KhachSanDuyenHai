<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChiTietDatPhong extends Model
{
    use HasFactory;

    protected $table = 'chitietdatphong';
    protected $primaryKey = 'id';
    protected $fillable = ['MaPhieuDat', 'MaPhong', 'GiaThueThucTe', 'ThuocGoiCombo'];


    public function phieuDatPhong() { return $this->belongsTo(PhieuDatPhong::class, 'MaPhieuDat'); }
    public function phong() { return $this->belongsTo(Phong::class, 'MaPhong'); }
}
