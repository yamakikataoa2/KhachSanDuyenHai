<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SuDungDichVu extends Model
{
    use HasFactory;

    protected $table = 'sudungdichvu';
    protected $primaryKey = 'MaSuDung';
    protected $fillable = ['MaPhieuDat', 'MaDichVu', 'SoLuong', 'NgaySuDung', 'ThanhTien', 'ThuocGoiCombo'];


    public function phieuDat() { return $this->belongsTo(PhieuDatPhong::class, 'MaPhieuDat'); }
    public function dichVu() { return $this->belongsTo(DichVu::class, 'MaDichVu'); }
}
