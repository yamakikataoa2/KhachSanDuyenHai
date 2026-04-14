<?php
$models = [
    'LoaiPhong' => [
        'table' => 'loaiphong',
        'primaryKey' => 'MaLoaiPhong',
        'fillable' => ['TenLoai', 'AnhDaiDien', 'MoTa', 'SoNguoiToiDa', 'GiaMacDinh', 'TrangThai'],
        'rels' => "
    public function phong() { return \$this->hasMany(Phong::class, 'MaLoaiPhong'); }
"
    ],
    'Phong' => [
        'table' => 'phong',
        'primaryKey' => 'MaPhong',
        'fillable' => ['SoPhong', 'MaLoaiPhong', 'TrangThai'],
        'rels' => "
    public function loaiPhong() { return \$this->belongsTo(LoaiPhong::class, 'MaLoaiPhong'); }
"
    ],
    'KhachHang' => [
        'table' => 'khachhang',
        'primaryKey' => 'MaKhachHang',
        'fillable' => ['HoTen', 'CCCD_CMND', 'SoDienThoai', 'Email', 'DiaChi'],
        'rels' => "
    public function taiKhoan() { return \$this->hasOne(TaiKhoanKhachHang::class, 'MaKhachHang'); }
    public function phieuDatPhong() { return \$this->hasMany(PhieuDatPhong::class, 'MaKhachHang'); }
"
    ],
    'TaiKhoanKhachHang' => [
        'table' => 'taikhoankhachhang',
        'primaryKey' => 'id',
        'fillable' => ['TenDangNhap', 'MatKhau', 'MaKhachHang', 'TrangThai', 'LanDangNhapCuoi'],
        'rels' => "
    public function khachHang() { return \$this->belongsTo(KhachHang::class, 'MaKhachHang'); }
"
    ],
    'VaiTro' => [
        'table' => 'vaitro',
        'primaryKey' => 'MaVaiTro',
        'fillable' => ['TenVaiTro', 'MoTa'],
        'rels' => "
    public function taiKhoanNhanVien() { return \$this->hasMany(TaiKhoanNhanVien::class, 'MaVaiTro'); }
"
    ],
    'NhanVien' => [
        'table' => 'nhanvien',
        'primaryKey' => 'MaNhanVien',
        'fillable' => ['HoTen', 'ChucVu', 'SoDienThoai'],
        'rels' => "
    public function taiKhoan() { return \$this->hasOne(TaiKhoanNhanVien::class, 'MaNhanVien'); }
"
    ],
    'TaiKhoanNhanVien' => [
        'table' => 'taikhoannhanvien',
        'primaryKey' => 'id',
        'fillable' => ['TenDangNhap', 'MatKhau', 'MaNhanVien', 'MaVaiTro', 'TrangThai', 'LanDangNhapCuoi'],
        'rels' => "
    public function nhanVien() { return \$this->belongsTo(NhanVien::class, 'MaNhanVien'); }
    public function vaiTro() { return \$this->belongsTo(VaiTro::class, 'MaVaiTro'); }
"
    ],
    'DichVu' => [
        'table' => 'dichvu',
        'primaryKey' => 'MaDichVu',
        'fillable' => ['TenDichVu', 'AnhDaiDien', 'DonGia', 'DonViTinh', 'TrangThai'],
        'rels' => "
    public function chiTietGoiCombo() { return \$this->hasMany(ChiTietGoiCombo::class, 'MaDichVu'); }
"
    ],
    'GoiCombo' => [
        'table' => 'goicombo',
        'primaryKey' => 'MaGoi',
        'fillable' => ['TenGoi', 'AnhDaiDien', 'GiaGoi', 'MoTa', 'TrangThai'],
        'rels' => "
    public function chiTiet() { return \$this->hasMany(ChiTietGoiCombo::class, 'MaGoi'); }
"
    ],
    'ChiTietGoiCombo' => [
        'table' => 'chitietgoicombo',
        'primaryKey' => 'MaChiTietGoi',
        'fillable' => ['MaGoi', 'MaDichVu', 'SoLuongMacDinh', 'DonGiaGoc', 'GhiChu'],
        'rels' => "
    public function goiCombo() { return \$this->belongsTo(GoiCombo::class, 'MaGoi'); }
    public function dichVu() { return \$this->belongsTo(DichVu::class, 'MaDichVu'); }
"
    ],
    'PhieuDatPhong' => [
        'table' => 'phieudatphong',
        'primaryKey' => 'MaPhieuDat',
        'fillable' => ['MaKhachHang', 'MaNhanVien', 'MaGoi', 'NgayDat', 'NgayNhanDuKien', 'NgayTraDuKien', 'TienCoc', 'TrangThai', 'GhiChu'],
        'rels' => "
    public function khachHang() { return \$this->belongsTo(KhachHang::class, 'MaKhachHang'); }
    public function nhanVien() { return \$this->belongsTo(NhanVien::class, 'MaNhanVien'); }
    public function goiCombo() { return \$this->belongsTo(GoiCombo::class, 'MaGoi'); }
    public function chiTietPhongs() { return \$this->hasMany(ChiTietDatPhong::class, 'MaPhieuDat'); }
    public function suDungDichVus() { return \$this->hasMany(SuDungDichVu::class, 'MaPhieuDat'); }
    public function hoaDon() { return \$this->hasOne(HoaDon::class, 'MaPhieuDat'); }
"
    ],
    'ChiTietDatPhong' => [
        'table' => 'chitietdatphong',
        'primaryKey' => 'id',
        'fillable' => ['MaPhieuDat', 'MaPhong', 'GiaThueThucTe', 'ThuocGoiCombo'],
        'rels' => "
    public function phieuDatPhong() { return \$this->belongsTo(PhieuDatPhong::class, 'MaPhieuDat'); }
    public function phong() { return \$this->belongsTo(Phong::class, 'MaPhong'); }
"
    ],
    'SuDungDichVu' => [
        'table' => 'sudungdichvu',
        'primaryKey' => 'MaSuDung',
        'fillable' => ['MaPhieuDat', 'MaDichVu', 'SoLuong', 'NgaySuDung', 'ThanhTien', 'ThuocGoiCombo'],
        'rels' => "
    public function phieuDat() { return \$this->belongsTo(PhieuDatPhong::class, 'MaPhieuDat'); }
    public function dichVu() { return \$this->belongsTo(DichVu::class, 'MaDichVu'); }
"
    ],
    'HoaDon' => [
        'table' => 'hoadon',
        'primaryKey' => 'MaHoaDon',
        'fillable' => ['MaPhieuDat', 'MaNhanVien', 'NgayLap', 'TongTienGoiCombo', 'TongTienPhong', 'TongTienDichVu', 'PhuThu', 'GiamGia', 'TongThanhToan', 'TrangThaiThanhToan', 'PhuongThucThanhToan'],
        'rels' => "
    public function phieuDatPhong() { return \$this->belongsTo(PhieuDatPhong::class, 'MaPhieuDat'); }
    public function nhanVien() { return \$this->belongsTo(NhanVien::class, 'MaNhanVien'); }
"
    ],
];

foreach ($models as $name => $data) {
    $fillable = "'" . implode("', '", $data['fillable']) . "'";
    $content = "<?php\n\nnamespace App\Models;\n\nuse Illuminate\Database\Eloquent\Factories\HasFactory;\nuse Illuminate\Database\Eloquent\Model;\n\nclass {$name} extends Model\n{\n    use HasFactory;\n\n    protected \$table = '{$data['table']}';\n    protected \$primaryKey = '{$data['primaryKey']}';\n    protected \$fillable = [{$fillable}];\n\n{$data['rels']}}\n";
    file_put_contents(__DIR__ . "/app/Models/{$name}.php", $content);
}
echo "Done generating models.";
