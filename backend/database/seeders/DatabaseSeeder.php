<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        // ═══════════════════════════════════════════════
        // 1. VAI TRÒ (Roles)
        // ═══════════════════════════════════════════════
        DB::table('vaitro')->insert([
            ['TenVaiTro' => 'Admin', 'MoTa' => 'Quản trị viên hệ thống - toàn quyền', 'created_at' => $now, 'updated_at' => $now],
            ['TenVaiTro' => 'Quản lý', 'MoTa' => 'Quản lý đặt phòng, khách hàng, nhân viên', 'created_at' => $now, 'updated_at' => $now],
            ['TenVaiTro' => 'Lễ Tân', 'MoTa' => 'Nhân viên tiếp đón, xử lý check-in/out', 'created_at' => $now, 'updated_at' => $now],
            ['TenVaiTro' => 'Kế toán', 'MoTa' => 'Quản lý hóa đơn, thanh toán', 'created_at' => $now, 'updated_at' => $now],
            ['TenVaiTro' => 'Nhân viên', 'MoTa' => 'Xem thông tin cơ bản', 'created_at' => $now, 'updated_at' => $now],
        ]);

        // ═══════════════════════════════════════════════
        // 2. NHÂN VIÊN + TÀI KHOẢN
        // ═══════════════════════════════════════════════
        $staffData = [
            ['HoTen' => 'Nguyễn Quản Trị', 'ChucVu' => 'Quản lý', 'SoDienThoai' => '0901234567', 'Email' => 'admin@hotel.com', 'TenDN' => 'admin', 'MaVT' => 1],
            ['HoTen' => 'Trần Quốc Anh', 'ChucVu' => 'Quản lý', 'SoDienThoai' => '0901111111', 'Email' => 'anh.tran@hotel.com', 'TenDN' => 'quanly', 'MaVT' => 2],
            ['HoTen' => 'Nguyễn Minh Tâm', 'ChucVu' => 'Lễ tân trưởng', 'SoDienThoai' => '0902222222', 'Email' => 'tam.nguyen@hotel.com', 'TenDN' => 'letan', 'MaVT' => 3],
            ['HoTen' => 'Lê Thị Hồng', 'ChucVu' => 'Kế toán', 'SoDienThoai' => '0903333333', 'Email' => 'hong.le@hotel.com', 'TenDN' => 'ketoan', 'MaVT' => 4],
            ['HoTen' => 'Phạm Văn Tuấn', 'ChucVu' => 'Bếp trưởng', 'SoDienThoai' => '0904444444', 'Email' => 'tuan.pham@hotel.com', 'TenDN' => 'nhanvien1', 'MaVT' => 5],
        ];

        foreach ($staffData as $s) {
            $nvId = DB::table('nhanvien')->insertGetId([
                'HoTen' => $s['HoTen'], 'ChucVu' => $s['ChucVu'],
                'SoDienThoai' => $s['SoDienThoai'], 'Email' => $s['Email'],
                'created_at' => $now, 'updated_at' => $now,
            ]);
            DB::table('taikhoannhanvien')->insert([
                'TenDangNhap' => $s['TenDN'], 'MatKhau' => Hash::make('123456'),
                'MaNhanVien' => $nvId, 'MaVaiTro' => $s['MaVT'], 'TrangThai' => 'Hoạt động',
                'created_at' => $now, 'updated_at' => $now,
            ]);
        }

        // ═══════════════════════════════════════════════
        // 3. LOẠI PHÒNG
        // ═══════════════════════════════════════════════
        $roomTypeIds = [];
        $roomTypes = [
            ['TenLoai' => 'Phòng Deluxe', 'MoTa' => 'Phòng Deluxe sang trọng 35m², view thành phố, trang bị đầy đủ tiện nghi cao cấp. Nội thất tinh tế, giường king-size êm ái và phòng tắm marble hiện đại.', 'SoNguoiToiDa' => 2, 'DienTich' => 35, 'TienNghi' => json_encode(['WiFi miễn phí','Điều hòa','TV 55 inch','Minibar','Két an toàn','Máy pha cà phê','Bồn tắm đứng']), 'GiaMacDinh' => 2500000, 'AnhDaiDien' => 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80'],
            ['TenLoai' => 'Phòng Suite Imperial', 'MoTa' => 'Suite rộng rãi 65m² với phòng khách riêng, bồn tắm Jacuzzi và ban công panorama. Không gian lý tưởng cho kỳ nghỉ lãng mạn.', 'SoNguoiToiDa' => 3, 'DienTich' => 65, 'TienNghi' => json_encode(['WiFi miễn phí','Điều hòa','TV 65 inch','Minibar','Két an toàn','Bồn tắm Jacuzzi','Phòng khách riêng','Ban công panorama','Máy pha cà phê','Áo choàng tắm']), 'GiaMacDinh' => 5800000, 'AnhDaiDien' => 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80'],
            ['TenLoai' => 'Presidential Suite', 'MoTa' => 'Trải nghiệm đỉnh cao 120m² — phòng ngủ master, phòng khách, bếp riêng, và dịch vụ quản gia 24/7.', 'SoNguoiToiDa' => 4, 'DienTich' => 120, 'TienNghi' => json_encode(['WiFi miễn phí','Điều hòa','TV 75 inch','Minibar cao cấp','Két an toàn','Bồn tắm Jacuzzi','Phòng khách','Bếp riêng','Quản gia 24/7','Phòng làm việc','Âm thanh Bose']), 'GiaMacDinh' => 12000000, 'AnhDaiDien' => 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80'],
            ['TenLoai' => 'Ocean View Room', 'MoTa' => 'Phòng hướng biển 40m², đón bình minh mỗi sáng từ giường ngủ comfort, ban công riêng.', 'SoNguoiToiDa' => 2, 'DienTich' => 40, 'TienNghi' => json_encode(['WiFi miễn phí','Điều hòa','TV 55 inch','Minibar','Két an toàn','Ban công hướng biển','Máy pha cà phê','Bồn tắm đứng']), 'GiaMacDinh' => 3200000, 'AnhDaiDien' => 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80'],
            ['TenLoai' => 'Garden Villa', 'MoTa' => 'Villa riêng biệt 85m² giữa vườn nhiệt đới, hồ bơi riêng, không gian hoàn toàn yên tĩnh.', 'SoNguoiToiDa' => 4, 'DienTich' => 85, 'TienNghi' => json_encode(['WiFi miễn phí','Điều hòa','TV 65 inch','Minibar','Két an toàn','Hồ bơi riêng','Vườn nhiệt đới','Bồn tắm ngoài trời','Phòng khách','Sân vườn BBQ']), 'GiaMacDinh' => 7500000, 'AnhDaiDien' => 'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=800&q=80'],
            ['TenLoai' => 'Family Suite', 'MoTa' => 'Phòng gia đình rộng rãi 75m² với 2 phòng ngủ, khu vui chơi trẻ em và tiện nghi cho cả nhà.', 'SoNguoiToiDa' => 5, 'DienTich' => 75, 'TienNghi' => json_encode(['WiFi miễn phí','Điều hòa','TV 55 inch','Minibar','Két an toàn','2 Phòng ngủ','Khu vui chơi trẻ em','Bồn tắm lớn','Bàn ăn gia đình','Máy giặt']), 'GiaMacDinh' => 4500000, 'AnhDaiDien' => 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80'],
        ];

        foreach ($roomTypes as $rt) {
            $roomTypeIds[] = DB::table('loaiphong')->insertGetId(array_merge($rt, [
                'TrangThai' => 'Hoạt động', 'created_at' => $now, 'updated_at' => $now,
            ]));
        }

        // ═══════════════════════════════════════════════
        // 4. PHÒNG (3 phòng mỗi loại = 18 phòng)
        // ═══════════════════════════════════════════════
        $roomNumber = 100;
        foreach ($roomTypeIds as $index => $rtId) {
            $floor = ($index + 1) * 100;
            for ($i = 1; $i <= 3; $i++) {
                DB::table('phong')->insert([
                    'SoPhong' => (string)($floor + $i), 'MaLoaiPhong' => $rtId,
                    'TrangThai' => 'Trống', 'created_at' => $now, 'updated_at' => $now,
                ]);
            }
        }

        // ═══════════════════════════════════════════════
        // 5. DỊCH VỤ (15 dịch vụ)
        // ═══════════════════════════════════════════════
        $serviceIds = [];
        $services = [
            ['TenDichVu' => 'Spa & Massage', 'DonGia' => 800000, 'DonViTinh' => 'lần', 'NhomDV' => 'Wellness'],
            ['TenDichVu' => 'Đưa đón sân bay', 'DonGia' => 500000, 'DonViTinh' => 'lượt', 'NhomDV' => 'Vận chuyển'],
            ['TenDichVu' => 'Giặt ủi Express', 'DonGia' => 200000, 'DonViTinh' => 'kg', 'NhomDV' => 'Tiện ích'],
            ['TenDichVu' => 'Room Service 24/7', 'DonGia' => 150000, 'DonViTinh' => 'lần', 'NhomDV' => 'Ẩm thực'],
            ['TenDichVu' => 'Tour City nửa ngày', 'DonGia' => 1200000, 'DonViTinh' => 'người', 'NhomDV' => 'Trải nghiệm'],
            ['TenDichVu' => 'Yoga & Fitness', 'DonGia' => 0, 'DonViTinh' => 'buổi', 'NhomDV' => 'Wellness'],
            ['TenDichVu' => 'Buffet sáng', 'DonGia' => 350000, 'DonViTinh' => 'người', 'NhomDV' => 'Ẩm thực'],
            ['TenDichVu' => 'Dinner for 2', 'DonGia' => 1500000, 'DonViTinh' => 'set', 'NhomDV' => 'Ẩm thực'],
            ['TenDichVu' => 'Champagne welcome', 'DonGia' => 600000, 'DonViTinh' => 'chai', 'NhomDV' => 'Đồ uống'],
            ['TenDichVu' => 'Late checkout', 'DonGia' => 500000, 'DonViTinh' => 'lần', 'NhomDV' => 'Tiện ích'],
            ['TenDichVu' => 'Spa Couple 90 phút', 'DonGia' => 1800000, 'DonViTinh' => 'set', 'NhomDV' => 'Wellness'],
            ['TenDichVu' => 'Kids Club', 'DonGia' => 300000, 'DonViTinh' => 'trẻ/ngày', 'NhomDV' => 'Trẻ em'],
            ['TenDichVu' => 'Meeting Room 4h', 'DonGia' => 2000000, 'DonViTinh' => 'phòng', 'NhomDV' => 'Business'],
            ['TenDichVu' => 'Business Lounge', 'DonGia' => 400000, 'DonViTinh' => 'ngày', 'NhomDV' => 'Business'],
            ['TenDichVu' => 'Hồ bơi không giới hạn', 'DonGia' => 0, 'DonViTinh' => '', 'NhomDV' => 'Wellness'],
        ];

        foreach ($services as $sv) {
            $serviceIds[] = DB::table('dichvu')->insertGetId(array_merge($sv, [
                'TrangThai' => 'Hoạt động', 'created_at' => $now, 'updated_at' => $now,
            ]));
        }

        // ═══════════════════════════════════════════════
        // 6. GÓI COMBO
        // ═══════════════════════════════════════════════
        $combo1Id = DB::table('goicombo')->insertGetId([
            'TenGoi' => 'Trăng Mật Hoàn Hảo', 'GiaGoi' => 13175000, 'PhanTramGiam' => 15,
            'MoTa' => 'Gói nghỉ dưỡng lãng mạn 3 ngày dành cho cặp đôi — bao gồm Suite view biển, dinner tại nhà hàng, spa couple và rượu champagne.',
            'SoNgay' => 3, 'SoNguoi' => 2,
            'AnhDaiDien' => 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
            'TrangThai' => 'Hoạt động', 'created_at' => $now, 'updated_at' => $now,
        ]);

        $combo2Id = DB::table('goicombo')->insertGetId([
            'TenGoi' => 'Gia Đình Hạnh Phúc', 'GiaGoi' => 12800000, 'PhanTramGiam' => 20,
            'MoTa' => 'Kỳ nghỉ gia đình trọn vẹn 2 ngày với phòng Family Suite, buffet sáng, tour city và các hoạt động cho bé.',
            'SoNgay' => 2, 'SoNguoi' => 5,
            'AnhDaiDien' => 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80',
            'TrangThai' => 'Hoạt động', 'created_at' => $now, 'updated_at' => $now,
        ]);

        $combo3Id = DB::table('goicombo')->insertGetId([
            'TenGoi' => 'Business Executive', 'GiaGoi' => 8280000, 'PhanTramGiam' => 10,
            'MoTa' => 'Gói 2 ngày dành cho doanh nhân — phòng Deluxe, meeting room, airport transfer và laundry express.',
            'SoNgay' => 2, 'SoNguoi' => 1,
            'AnhDaiDien' => 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
            'TrangThai' => 'Hoạt động', 'created_at' => $now, 'updated_at' => $now,
        ]);

        // ═══════════════════════════════════════════════
        // 7. CHI TIẾT GÓI COMBO
        // ═══════════════════════════════════════════════
        // Combo 1: Trăng Mật
        $combo1Services = [
            ['MaDichVu' => $serviceIds[7], 'SoLuong' => 2, 'DonGia' => 1500000],  // Dinner for 2
            ['MaDichVu' => $serviceIds[10], 'SoLuong' => 1, 'DonGia' => 1800000], // Spa Couple
            ['MaDichVu' => $serviceIds[8], 'SoLuong' => 1, 'DonGia' => 600000],   // Champagne
            ['MaDichVu' => $serviceIds[9], 'SoLuong' => 1, 'DonGia' => 500000],   // Late checkout
        ];
        foreach ($combo1Services as $cs) {
            DB::table('chitietgoicombo')->insert([
                'MaGoi' => $combo1Id, 'MaDichVu' => $cs['MaDichVu'],
                'SoLuongMacDinh' => $cs['SoLuong'], 'DonGiaGoc' => $cs['DonGia'],
                'created_at' => $now, 'updated_at' => $now,
            ]);
        }

        // Combo 2: Gia Đình
        $combo2Services = [
            ['MaDichVu' => $serviceIds[6], 'SoLuong' => 4, 'DonGia' => 350000],   // Buffet sáng
            ['MaDichVu' => $serviceIds[11], 'SoLuong' => 2, 'DonGia' => 300000],  // Kids Club
            ['MaDichVu' => $serviceIds[4], 'SoLuong' => 4, 'DonGia' => 1200000],  // Tour City
            ['MaDichVu' => $serviceIds[14], 'SoLuong' => 1, 'DonGia' => 0],       // Hồ bơi
        ];
        foreach ($combo2Services as $cs) {
            DB::table('chitietgoicombo')->insert([
                'MaGoi' => $combo2Id, 'MaDichVu' => $cs['MaDichVu'],
                'SoLuongMacDinh' => $cs['SoLuong'], 'DonGiaGoc' => $cs['DonGia'],
                'created_at' => $now, 'updated_at' => $now,
            ]);
        }

        // Combo 3: Business
        $combo3Services = [
            ['MaDichVu' => $serviceIds[12], 'SoLuong' => 1, 'DonGia' => 2000000], // Meeting Room
            ['MaDichVu' => $serviceIds[1], 'SoLuong' => 2, 'DonGia' => 500000],   // Airport
            ['MaDichVu' => $serviceIds[2], 'SoLuong' => 2, 'DonGia' => 200000],   // Laundry
            ['MaDichVu' => $serviceIds[13], 'SoLuong' => 2, 'DonGia' => 400000],  // Business Lounge
        ];
        foreach ($combo3Services as $cs) {
            DB::table('chitietgoicombo')->insert([
                'MaGoi' => $combo3Id, 'MaDichVu' => $cs['MaDichVu'],
                'SoLuongMacDinh' => $cs['SoLuong'], 'DonGiaGoc' => $cs['DonGia'],
                'created_at' => $now, 'updated_at' => $now,
            ]);
        }

        // ═══════════════════════════════════════════════
        // 8. KHÁCH HÀNG + TÀI KHOẢN
        // ═══════════════════════════════════════════════
        $customerData = [
            ['HoTen' => 'Nguyễn Văn An', 'SoDienThoai' => '0911234567', 'Email' => 'an.nguyen@email.com', 'DiaChi' => 'TP. Hồ Chí Minh', 'CCCD' => '079190001234'],
            ['HoTen' => 'Trần Thị Bình', 'SoDienThoai' => '0912345678', 'Email' => 'binh.tran@email.com', 'DiaChi' => 'Hà Nội', 'CCCD' => '079190001235'],
            ['HoTen' => 'Lê Hoàng Cường', 'SoDienThoai' => '0923456789', 'Email' => 'cuong.le@email.com', 'DiaChi' => 'Đà Nẵng', 'CCCD' => '079190001236'],
            ['HoTen' => 'Phạm Minh Đức', 'SoDienThoai' => '0934567890', 'Email' => 'duc.pham@email.com', 'DiaChi' => 'Hải Phòng', 'CCCD' => '079190001237'],
            ['HoTen' => 'Hoàng Thị Em', 'SoDienThoai' => '0945678901', 'Email' => 'em.hoang@email.com', 'DiaChi' => 'Nha Trang', 'CCCD' => '079190001238'],
            ['HoTen' => 'Võ Thanh Phong', 'SoDienThoai' => '0956789012', 'Email' => 'phong.vo@email.com', 'DiaChi' => 'Cần Thơ', 'CCCD' => '079190001239'],
        ];

        $customerIds = [];
        foreach ($customerData as $c) {
            $khId = DB::table('khachhang')->insertGetId([
                'HoTen' => $c['HoTen'], 'SoDienThoai' => $c['SoDienThoai'],
                'Email' => $c['Email'], 'DiaChi' => $c['DiaChi'], 'CCCD_CMND' => $c['CCCD'],
                'created_at' => $now, 'updated_at' => $now,
            ]);
            $customerIds[] = $khId;

            // Tạo tài khoản cho mỗi khách hàng
            DB::table('taikhoankhachhang')->insert([
                'TenDangNhap' => $c['Email'], 'MatKhau' => Hash::make('123456'),
                'MaKhachHang' => $khId, 'TrangThai' => 'Hoạt động',
                'created_at' => $now, 'updated_at' => $now,
            ]);
        }

        // ═══════════════════════════════════════════════
        // 9. PHIẾU ĐẶT PHÒNG (6 bookings)
        // ═══════════════════════════════════════════════
        // Lấy phòng IDs
        $phongs = DB::table('phong')->pluck('MaPhong')->toArray();

        $bookings = [
            ['MaKH' => $customerIds[0], 'MaGoi' => $combo1Id, 'NgayDat' => '2026-04-08', 'NgayNhan' => '2026-04-15', 'NgayTra' => '2026-04-18', 'TrangThai' => 'Đã nhận phòng', 'GhiChu' => 'Kỷ niệm 5 năm ngày cưới', 'Phong' => $phongs[9], 'GiaThue' => 3200000],
            ['MaKH' => $customerIds[1], 'MaGoi' => null, 'NgayDat' => '2026-04-09', 'NgayNhan' => '2026-04-14', 'NgayTra' => '2026-04-16', 'TrangThai' => 'Đã nhận phòng', 'GhiChu' => 'Kỷ niệm ngày cưới', 'Phong' => $phongs[6], 'GiaThue' => 12000000],
            ['MaKH' => $customerIds[2], 'MaGoi' => null, 'NgayDat' => '2026-04-10', 'NgayNhan' => '2026-04-20', 'NgayTra' => '2026-04-22', 'TrangThai' => 'Chờ xác nhận', 'GhiChu' => '', 'Phong' => $phongs[3], 'GiaThue' => 5800000],
            ['MaKH' => $customerIds[3], 'MaGoi' => $combo3Id, 'NgayDat' => '2026-04-10', 'NgayNhan' => '2026-04-20', 'NgayTra' => '2026-04-22', 'TrangThai' => 'Chờ xác nhận', 'GhiChu' => 'Công tác', 'Phong' => $phongs[0], 'GiaThue' => 2500000],
            ['MaKH' => $customerIds[4], 'MaGoi' => null, 'NgayDat' => '2026-04-11', 'NgayNhan' => '2026-04-25', 'NgayTra' => '2026-04-28', 'TrangThai' => 'Đã hủy', 'GhiChu' => 'Khách hủy vì lý do cá nhân', 'Phong' => $phongs[12], 'GiaThue' => 7500000],
            ['MaKH' => $customerIds[5], 'MaGoi' => $combo2Id, 'NgayDat' => '2026-03-15', 'NgayNhan' => '2026-03-20', 'NgayTra' => '2026-03-22', 'TrangThai' => 'Đã trả phòng', 'GhiChu' => 'Kỳ nghỉ gia đình', 'Phong' => $phongs[15], 'GiaThue' => 4500000],
        ];

        foreach ($bookings as $b) {
            $phieuId = DB::table('phieudatphong')->insertGetId([
                'MaKhachHang' => $b['MaKH'], 'MaGoi' => $b['MaGoi'],
                'NgayDat' => $b['NgayDat'], 'NgayNhanDuKien' => $b['NgayNhan'],
                'NgayTraDuKien' => $b['NgayTra'], 'TrangThai' => $b['TrangThai'],
                'GhiChu' => $b['GhiChu'], 'TienCoc' => 0,
                'created_at' => $now, 'updated_at' => $now,
            ]);

            // Chi tiết phòng
            DB::table('chitietdatphong')->insert([
                'MaPhieuDat' => $phieuId, 'MaPhong' => $b['Phong'],
                'GiaThueThucTe' => $b['GiaThue'], 'ThuocGoiCombo' => 0,
                'created_at' => $now, 'updated_at' => $now,
            ]);

            // Apply combo services nếu có
            if ($b['MaGoi']) {
                $comboDetails = DB::table('chitietgoicombo')
                    ->join('dichvu', 'chitietgoicombo.MaDichVu', '=', 'dichvu.MaDichVu')
                    ->where('MaGoi', $b['MaGoi'])
                    ->select('chitietgoicombo.*', 'dichvu.DonGia as DonGiaDV')
                    ->get();

                foreach ($comboDetails as $cd) {
                    DB::table('sudungdichvu')->insert([
                        'MaPhieuDat' => $phieuId, 'MaDichVu' => $cd->MaDichVu,
                        'SoLuong' => $cd->SoLuongMacDinh, 'NgaySuDung' => $b['NgayNhan'],
                        'ThanhTien' => $cd->SoLuongMacDinh * $cd->DonGiaDV,
                        'ThuocGoiCombo' => 1,
                        'created_at' => $now, 'updated_at' => $now,
                    ]);
                }
            }
        }

        // ═══════════════════════════════════════════════
        // 10. HÓA ĐƠN (3 hóa đơn)
        // ═══════════════════════════════════════════════
        $phieuDats = DB::table('phieudatphong')
            ->whereIn('TrangThai', ['Đã xác nhận', 'Đã trả phòng', 'Đã nhận phòng'])
            ->get();

        foreach ($phieuDats as $pd) {
            $tongTienPhong = DB::table('chitietdatphong')->where('MaPhieuDat', $pd->MaPhieuDat)->sum('GiaThueThucTe');
            $tongDV = DB::table('sudungdichvu')->where('MaPhieuDat', $pd->MaPhieuDat)->sum('ThanhTien');
            $tongDVCombo = DB::table('sudungdichvu')->where('MaPhieuDat', $pd->MaPhieuDat)->where('ThuocGoiCombo', 1)->sum('ThanhTien');

            $giamGia = 0;
            $tienCombo = 0;
            if ($pd->MaGoi) {
                $combo = DB::table('goicombo')->where('MaGoi', $pd->MaGoi)->first();
                $tienCombo = $combo->GiaGoi;
                $giamGia = max(0, $tongDVCombo - $tienCombo);
            }

            $tongThanhToan = $tongTienPhong + $tongDV - $giamGia;

            DB::table('hoadon')->insert([
                'MaPhieuDat' => $pd->MaPhieuDat, 'MaNhanVien' => 1,
                'NgayLap' => $now, 'TongTienGoiCombo' => $tienCombo,
                'TongTienPhong' => $tongTienPhong, 'TongTienDichVu' => $tongDV,
                'PhuThu' => 0, 'GiamGia' => $giamGia,
                'TongThanhToan' => max(0, $tongThanhToan),
                'TrangThaiThanhToan' => $pd->TrangThai === 'Đã trả phòng' ? 'Đã thanh toán' : 'Chưa thanh toán',
                'PhuongThucThanhToan' => 'Thẻ tín dụng',
                'created_at' => $now, 'updated_at' => $now,
            ]);
        }

        echo "\n✅ Database seeded with Full Luxury Data successfully!\n";
        echo "   Admin: admin / 123456\n";
        echo "   Customer: an.nguyen@email.com / 123456\n";
    }
}
