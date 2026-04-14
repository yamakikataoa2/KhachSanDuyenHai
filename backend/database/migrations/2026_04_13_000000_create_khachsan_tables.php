<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('loaiphong', function (Blueprint $table) {
            $table->id('MaLoaiPhong');
            $table->string('TenLoai', 50);
            $table->text('AnhDaiDien')->nullable();
            $table->text('MoTa')->nullable();
            $table->integer('SoNguoiToiDa');
            $table->decimal('GiaMacDinh', 12, 2);
            $table->enum('TrangThai', ['Hoạt động', 'Tạm ngưng'])->default('Hoạt động');
            $table->timestamps();
        });

        Schema::create('phong', function (Blueprint $table) {
            $table->id('MaPhong');
            $table->string('SoPhong', 10)->unique();
            $table->foreignId('MaLoaiPhong')->references('MaLoaiPhong')->on('loaiphong');
            $table->enum('TrangThai', ['Trống', 'Đang sử dụng', 'Đã đặt', 'Bảo trì'])->default('Trống');
            $table->timestamps();
        });

        Schema::create('khachhang', function (Blueprint $table) {
            $table->id('MaKhachHang');
            $table->string('HoTen', 100);
            $table->string('CCCD_CMND', 20)->unique()->nullable();
            $table->string('SoDienThoai', 15)->unique();
            $table->string('Email', 100)->unique()->nullable();
            $table->text('DiaChi')->nullable();
            $table->timestamps();
        });

        Schema::create('taikhoankhachhang', function (Blueprint $table) {
            $table->id();
            $table->string('TenDangNhap', 50)->unique();
            $table->string('MatKhau');
            $table->foreignId('MaKhachHang')->references('MaKhachHang')->on('khachhang');
            $table->enum('TrangThai', ['Chưa xác thực', 'Hoạt động', 'Bị khóa'])->default('Chưa xác thực');
            $table->dateTime('LanDangNhapCuoi')->nullable();
            $table->timestamps();
        });

        Schema::create('vaitro', function (Blueprint $table) {
            $table->id('MaVaiTro');
            $table->string('TenVaiTro', 50);
            $table->text('MoTa')->nullable();
            $table->timestamps();
        });

        Schema::create('nhanvien', function (Blueprint $table) {
            $table->id('MaNhanVien');
            $table->string('HoTen', 100);
            $table->string('ChucVu', 50);
            $table->string('SoDienThoai', 15)->unique();
            $table->timestamps();
        });

        Schema::create('taikhoannhanvien', function (Blueprint $table) {
            $table->id();
            $table->string('TenDangNhap', 50)->unique();
            $table->string('MatKhau');
            $table->foreignId('MaNhanVien')->references('MaNhanVien')->on('nhanvien');
            $table->foreignId('MaVaiTro')->references('MaVaiTro')->on('vaitro');
            $table->enum('TrangThai', ['Hoạt động', 'Bị khóa'])->default('Hoạt động');
            $table->dateTime('LanDangNhapCuoi')->nullable();
            $table->timestamps();
        });

        Schema::create('dichvu', function (Blueprint $table) {
            $table->id('MaDichVu');
            $table->string('TenDichVu', 100);
            $table->text('AnhDaiDien')->nullable();
            $table->decimal('DonGia', 12, 2);
            $table->string('DonViTinh', 20);
            $table->enum('TrangThai', ['Hoạt động', 'Tạm ngưng'])->default('Hoạt động');
            $table->timestamps();
        });

        Schema::create('goicombo', function (Blueprint $table) {
            $table->id('MaGoi');
            $table->string('TenGoi', 100);
            $table->text('AnhDaiDien')->nullable();
            $table->decimal('GiaGoi', 12, 2);
            $table->text('MoTa')->nullable();
            $table->enum('TrangThai', ['Hoạt động', 'Tạm ngưng'])->default('Hoạt động');
            $table->timestamps();
        });

        Schema::create('chitietgoicombo', function (Blueprint $table) {
            $table->id('MaChiTietGoi');
            $table->foreignId('MaGoi')->references('MaGoi')->on('goicombo');
            $table->foreignId('MaDichVu')->references('MaDichVu')->on('dichvu');
            $table->integer('SoLuongMacDinh')->default(1);
            $table->decimal('DonGiaGoc', 12, 2)->nullable();
            $table->string('GhiChu')->nullable();
            $table->timestamps();
        });

        Schema::create('phieudatphong', function (Blueprint $table) {
            $table->id('MaPhieuDat');
            $table->foreignId('MaKhachHang')->references('MaKhachHang')->on('khachhang');
            $table->foreignId('MaNhanVien')->nullable()->references('MaNhanVien')->on('nhanvien');
            $table->foreignId('MaGoi')->nullable()->references('MaGoi')->on('goicombo');
            $table->dateTime('NgayDat');
            $table->dateTime('NgayNhanDuKien');
            $table->dateTime('NgayTraDuKien');
            $table->decimal('TienCoc', 12, 2)->default(0);
            $table->enum('TrangThai', ['Chờ xác nhận', 'Đã nhận phòng', 'Đã trả phòng', 'Đã hủy'])->default('Chờ xác nhận');
            $table->text('GhiChu')->nullable();
            $table->timestamps();
        });

        Schema::create('chitietdatphong', function (Blueprint $table) {
            $table->id();
            $table->foreignId('MaPhieuDat')->references('MaPhieuDat')->on('phieudatphong');
            $table->foreignId('MaPhong')->references('MaPhong')->on('phong');
            $table->decimal('GiaThueThucTe', 12, 2);
            $table->boolean('ThuocGoiCombo')->default(0);
            $table->timestamps();
        });

        Schema::create('sudungdichvu', function (Blueprint $table) {
            $table->id('MaSuDung');
            $table->foreignId('MaPhieuDat')->references('MaPhieuDat')->on('phieudatphong');
            $table->foreignId('MaDichVu')->references('MaDichVu')->on('dichvu');
            $table->integer('SoLuong');
            $table->dateTime('NgaySuDung');
            $table->decimal('ThanhTien', 12, 2);
            $table->boolean('ThuocGoiCombo')->default(0);
            $table->timestamps();
        });

        Schema::create('hoadon', function (Blueprint $table) {
            $table->id('MaHoaDon');
            $table->foreignId('MaPhieuDat')->references('MaPhieuDat')->on('phieudatphong');
            $table->foreignId('MaNhanVien')->nullable()->references('MaNhanVien')->on('nhanvien');
            $table->dateTime('NgayLap');
            $table->decimal('TongTienGoiCombo', 12, 2)->default(0);
            $table->decimal('TongTienPhong', 12, 2)->default(0);
            $table->decimal('TongTienDichVu', 12, 2)->default(0);
            $table->decimal('PhuThu', 12, 2)->default(0);
            $table->decimal('GiamGia', 12, 2)->default(0);
            $table->decimal('TongThanhToan', 12, 2)->default(0);
            $table->enum('TrangThaiThanhToan', ['Chưa thanh toán', 'Đã thanh toán'])->default('Chưa thanh toán');
            $table->enum('PhuongThucThanhToan', ['Tiền mặt', 'Chuyển khoản', 'Thẻ tín dụng'])->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('hoadon');
        Schema::dropIfExists('sudungdichvu');
        Schema::dropIfExists('chitietdatphong');
        Schema::dropIfExists('phieudatphong');
        Schema::dropIfExists('chitietgoicombo');
        Schema::dropIfExists('goicombo');
        Schema::dropIfExists('dichvu');
        Schema::dropIfExists('taikhoannhanvien');
        Schema::dropIfExists('nhanvien');
        Schema::dropIfExists('vaitro');
        Schema::dropIfExists('taikhoankhachhang');
        Schema::dropIfExists('khachhang');
        Schema::dropIfExists('phong');
        Schema::dropIfExists('loaiphong');
    }
};
