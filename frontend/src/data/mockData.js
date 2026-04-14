// =====================================================
// MOCK DATA - Dữ liệu giả để render UI khi chưa có backend
// Khi có server Laravel, thay bằng API calls thật
// =====================================================

export const mockRooms = [
  {
    MaLoaiPhong: 1, TenLoai: 'Phòng Deluxe', GiaMacDinh: 2500000, SoNguoiToiDa: 2, DienTich: 35,
    MoTa: 'Phòng Deluxe sang trọng với view thành phố, trang bị đầy đủ tiện nghi cao cấp. Nội thất tinh tế, giường king-size êm ái và phòng tắm marble hiện đại.',
    AnhDaiDien: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
    TienNghi: ['WiFi miễn phí', 'Minibar', 'TV 55"', 'Két sắt', 'Máy pha cà phê', 'Áo choàng tắm'],
  },
  {
    MaLoaiPhong: 2, TenLoai: 'Phòng Suite Imperial', GiaMacDinh: 5800000, SoNguoiToiDa: 3, DienTich: 65,
    MoTa: 'Suite rộng rãi với phòng khách riêng, bồn tắm Jacuzzi và ban công panorama. Không gian lý tưởng cho kỳ nghỉ lãng mạn.',
    AnhDaiDien: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    TienNghi: ['WiFi miễn phí', 'Phòng khách riêng', 'Jacuzzi', 'Ban công', 'Butler service', 'Nespresso'],
  },
  {
    MaLoaiPhong: 3, TenLoai: 'Presidential Suite', GiaMacDinh: 12000000, SoNguoiToiDa: 4, DienTich: 120,
    MoTa: 'Trải nghiệm đỉnh cao — phòng ngủ master, phòng khách, bếp riêng, và dịch vụ quản gia 24/7.',
    AnhDaiDien: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    TienNghi: ['Butler 24/7', 'Bếp riêng', 'Phòng xông hơi', 'Limousine đưa đón', 'Champagne welcome', 'Phòng gym riêng'],
  },
  {
    MaLoaiPhong: 4, TenLoai: 'Ocean View Room', GiaMacDinh: 3200000, SoNguoiToiDa: 2, DienTich: 40,
    MoTa: 'Phòng hướng biển trọn vẹn, đón bình minh mỗi sáng từ giường ngủ comfort.',
    AnhDaiDien: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
    TienNghi: ['View biển', 'Ban công riêng', 'Bồn tắm đứng', 'WiFi', 'Minibar'],
  },
  {
    MaLoaiPhong: 5, TenLoai: 'Garden Villa', GiaMacDinh: 7500000, SoNguoiToiDa: 4, DienTich: 85,
    MoTa: 'Villa riêng biệt giữa vườn nhiệt đới, hồ bơi riêng, không gian hoàn toàn yên tĩnh.',
    AnhDaiDien: 'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=800&q=80',
    TienNghi: ['Hồ bơi riêng', 'Vườn nhiệt đới', 'Outdoor shower', 'BBQ area', 'Yoga deck'],
  },
  {
    MaLoaiPhong: 6, TenLoai: 'Family Suite', GiaMacDinh: 4500000, SoNguoiToiDa: 5, DienTich: 75,
    MoTa: 'Phòng gia đình rộng rãi với 2 phòng ngủ, khu vui chơi trẻ em và tiện nghi cho cả nhà.',
    AnhDaiDien: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
    TienNghi: ['2 phòng ngủ', 'Kids corner', 'Bồn tắm lớn', 'WiFi', 'Truyền hình cáp'],
  },
];

// === All available services (for the service picker) ===
export const mockAllServices = [
  { MaDV: 1, TenDV: 'Spa & Massage', DonGia: 800000, DonVi: 'lần', Icon: 'spa', NhomDV: 'Wellness' },
  { MaDV: 2, TenDV: 'Đưa đón sân bay', DonGia: 500000, DonVi: 'lượt', Icon: 'airport_shuttle', NhomDV: 'Vận chuyển' },
  { MaDV: 3, TenDV: 'Giặt ủi Express', DonGia: 200000, DonVi: 'kg', Icon: 'local_laundry_service', NhomDV: 'Tiện ích' },
  { MaDV: 4, TenDV: 'Room Service 24/7', DonGia: 150000, DonVi: 'lần', Icon: 'room_service', NhomDV: 'Ẩm thực' },
  { MaDV: 5, TenDV: 'Tour City nửa ngày', DonGia: 1200000, DonVi: 'người', Icon: 'tour', NhomDV: 'Trải nghiệm' },
  { MaDV: 6, TenDV: 'Yoga & Fitness', DonGia: 0, DonVi: 'buổi', Icon: 'fitness_center', NhomDV: 'Wellness' },
  { MaDV: 7, TenDV: 'Buffet sáng', DonGia: 350000, DonVi: 'người', Icon: 'restaurant', NhomDV: 'Ẩm thực' },
  { MaDV: 8, TenDV: 'Dinner for 2', DonGia: 1500000, DonVi: 'set', Icon: 'dinner_dining', NhomDV: 'Ẩm thực' },
  { MaDV: 9, TenDV: 'Champagne welcome', DonGia: 600000, DonVi: 'chai', Icon: 'wine_bar', NhomDV: 'Đồ uống' },
  { MaDV: 10, TenDV: 'Late checkout', DonGia: 500000, DonVi: 'lần', Icon: 'schedule', NhomDV: 'Tiện ích' },
  { MaDV: 11, TenDV: 'Spa Couple 90 phút', DonGia: 1800000, DonVi: 'set', Icon: 'spa', NhomDV: 'Wellness' },
  { MaDV: 12, TenDV: 'Kids Club', DonGia: 300000, DonVi: 'trẻ/ngày', Icon: 'child_care', NhomDV: 'Trẻ em' },
  { MaDV: 13, TenDV: 'Meeting Room 4h', DonGia: 2000000, DonVi: 'phòng', Icon: 'groups', NhomDV: 'Business' },
  { MaDV: 14, TenDV: 'Business Lounge', DonGia: 400000, DonVi: 'ngày', Icon: 'laptop_mac', NhomDV: 'Business' },
  { MaDV: 15, TenDV: 'Hồ bơi không giới hạn', DonGia: 0, DonVi: '', Icon: 'pool', NhomDV: 'Wellness' },
];

// === Combos with structured service detail ===
export const mockCombos = [
  {
    MaGoi: 1, TenGoi: 'Trăng Mật Hoàn Hảo', SoNgay: 3,
    MoTa: 'Gói nghỉ dưỡng lãng mạn dành cho cặp đôi — bao gồm Suite view biển, dinner tại nhà hàng, spa couple và rượu champagne.',
    AnhDaiDien: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
    LoaiPhong: 'Ocean View Room', SoNguoi: 2,
    DichVuChiTiet: [
      { MaDV: 4, TenDV: 'Ocean View Room', SoLuong: 3, DonGia: 3200000, DonVi: 'đêm', Icon: 'bed' },
      { MaDV: 8, TenDV: 'Dinner for 2', SoLuong: 2, DonGia: 1500000, DonVi: 'set', Icon: 'dinner_dining' },
      { MaDV: 11, TenDV: 'Spa Couple 90 phút', SoLuong: 1, DonGia: 1800000, DonVi: 'set', Icon: 'spa' },
      { MaDV: 9, TenDV: 'Champagne welcome', SoLuong: 1, DonGia: 600000, DonVi: 'chai', Icon: 'wine_bar' },
      { MaDV: 10, TenDV: 'Late checkout', SoLuong: 1, DonGia: 500000, DonVi: 'lần', Icon: 'schedule' },
    ],
    GiaGoc: 15500000, PhanTramGiam: 15, GiaCombo: 13175000,
    // Legacy compat
    GiaTrungBinh: 13175000,
    DichVu: ['Ocean View Room 3 đêm', 'Dinner for 2 (x2)', 'Spa Couple 90 phút', 'Champagne welcome', 'Late checkout'],
  },
  {
    MaGoi: 2, TenGoi: 'Gia Đình Hạnh Phúc', SoNgay: 2,
    MoTa: 'Kỳ nghỉ gia đình trọn vẹn với phòng Family Suite, buffet sáng, tour city và các hoạt động cho bé.',
    AnhDaiDien: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80',
    LoaiPhong: 'Family Suite', SoNguoi: 4,
    DichVuChiTiet: [
      { MaDV: 6, TenDV: 'Family Suite', SoLuong: 2, DonGia: 4500000, DonVi: 'đêm', Icon: 'bed' },
      { MaDV: 7, TenDV: 'Buffet sáng', SoLuong: 4, DonGia: 350000, DonVi: 'người', Icon: 'restaurant' },
      { MaDV: 12, TenDV: 'Kids Club', SoLuong: 2, DonGia: 300000, DonVi: 'trẻ/ngày', Icon: 'child_care' },
      { MaDV: 5, TenDV: 'Tour City nửa ngày', SoLuong: 4, DonGia: 1200000, DonVi: 'người', Icon: 'tour' },
      { MaDV: 15, TenDV: 'Hồ bơi không giới hạn', SoLuong: 1, DonGia: 0, DonVi: '', Icon: 'pool' },
    ],
    GiaGoc: 16000000, PhanTramGiam: 20, GiaCombo: 12800000,
    GiaTrungBinh: 12800000,
    DichVu: ['Family Suite 2 đêm', 'Buffet sáng (x4)', 'Kids Club (x2)', 'City Tour (x4)', 'Hồ bơi không giới hạn'],
  },
  {
    MaGoi: 3, TenGoi: 'Business Executive', SoNgay: 2,
    MoTa: 'Gói dành cho doanh nhân — phòng Deluxe, meeting room, airport transfer và laundry express.',
    AnhDaiDien: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
    LoaiPhong: 'Phòng Deluxe', SoNguoi: 1,
    DichVuChiTiet: [
      { MaDV: 1, TenDV: 'Phòng Deluxe', SoLuong: 2, DonGia: 2500000, DonVi: 'đêm', Icon: 'bed' },
      { MaDV: 13, TenDV: 'Meeting Room 4h', SoLuong: 1, DonGia: 2000000, DonVi: 'phòng', Icon: 'groups' },
      { MaDV: 2, TenDV: 'Đưa đón sân bay', SoLuong: 2, DonGia: 500000, DonVi: 'lượt', Icon: 'airport_shuttle' },
      { MaDV: 3, TenDV: 'Giặt ủi Express', SoLuong: 2, DonGia: 200000, DonVi: 'kg', Icon: 'local_laundry_service' },
      { MaDV: 14, TenDV: 'Business Lounge', SoLuong: 2, DonGia: 400000, DonVi: 'ngày', Icon: 'laptop_mac' },
    ],
    GiaGoc: 9200000, PhanTramGiam: 10, GiaCombo: 8280000,
    GiaTrungBinh: 8280000,
    DichVu: ['Deluxe Room 2 đêm', 'Meeting room 4h', 'Airport transfer (x2)', 'Laundry express (x2)', 'Business lounge (x2)'],
  },
];

// === User data (logged-in user) ===
export const mockUser = {
  MaKH: 1, HoTen: 'Nguyễn Văn An', Email: 'an.nguyen@email.com',
  SoDienThoai: '0901234567', DiaChi: 'TP. Hồ Chí Minh',
  NgaySinh: '1990-05-15', GioiTinh: 'Nam',
  AnhDaiDien: null, HangThanhVien: 'Gold',
  NgayThamGia: '2024-08-20', DiemTichLuy: 2580,
};

// === User's bookings with combo/service details ===
export const mockUserBookings = [
  {
    MaPhieuDat: 'PD-001', NgayDat: '2026-04-08',
    LoaiPhong: 'Ocean View Room', MaLoaiPhong: 4,
    NgayNhanPhong: '2026-04-15', NgayTraPhong: '2026-04-18',
    SoKhach: 2, TrangThai: 'Đã xác nhận',
    TienPhong: 9600000,
    ComboInfo: {
      TenGoi: 'Trăng Mật Hoàn Hảo', MaGoi: 1, PhanTramGiam: 15,
      DichVuDaChon: [
        { TenDV: 'Dinner for 2', SoLuong: 2, DonGia: 1500000, ThanhTien: 3000000 },
        { TenDV: 'Spa Couple 90 phút', SoLuong: 1, DonGia: 1800000, ThanhTien: 1800000 },
        { TenDV: 'Champagne welcome', SoLuong: 1, DonGia: 600000, ThanhTien: 600000 },
        { TenDV: 'Late checkout', SoLuong: 1, DonGia: 500000, ThanhTien: 500000 },
      ],
      TongDichVu: 5900000,
    },
    TongTien: 13175000, GhiChu: 'Kỷ niệm 5 năm ngày cưới',
  },
  {
    MaPhieuDat: 'PD-004', NgayDat: '2026-04-10',
    LoaiPhong: 'Phòng Deluxe', MaLoaiPhong: 1,
    NgayNhanPhong: '2026-04-20', NgayTraPhong: '2026-04-22',
    SoKhach: 1, TrangThai: 'Chờ xác nhận',
    TienPhong: 5000000,
    ComboInfo: null,
    TongTien: 5000000, GhiChu: 'Công tác',
  },
  {
    MaPhieuDat: 'PD-006', NgayDat: '2026-03-15',
    LoaiPhong: 'Family Suite', MaLoaiPhong: 6,
    NgayNhanPhong: '2026-03-20', NgayTraPhong: '2026-03-22',
    SoKhach: 4, TrangThai: 'Đã trả phòng',
    TienPhong: 9000000,
    ComboInfo: {
      TenGoi: 'Gia Đình Hạnh Phúc', MaGoi: 2, PhanTramGiam: 20,
      DichVuDaChon: [
        { TenDV: 'Buffet sáng', SoLuong: 4, DonGia: 350000, ThanhTien: 1400000 },
        { TenDV: 'Kids Club', SoLuong: 2, DonGia: 300000, ThanhTien: 600000 },
        { TenDV: 'Tour City nửa ngày', SoLuong: 2, DonGia: 1200000, ThanhTien: 2400000 },
      ],
      TongDichVu: 4400000,
    },
    TongTien: 12800000, GhiChu: 'Kỳ nghỉ gia đình',
  },
];

// === Admin-level bookings ===
export const mockBookings = [
  { MaPhieuDat: 'PD-001', KhachHang: 'Nguyễn Văn An', LoaiPhong: 'Ocean View Room', NgayNhanPhong: '2026-04-15', NgayTraPhong: '2026-04-18', SoKhach: 2, TrangThai: 'Đã xác nhận', TongTien: 13175000, GhiChu: 'Kỷ niệm 5 năm ngày cưới' },
  { MaPhieuDat: 'PD-002', KhachHang: 'Trần Thị Bình', LoaiPhong: 'Presidential Suite', NgayNhanPhong: '2026-04-14', NgayTraPhong: '2026-04-16', SoKhach: 2, TrangThai: 'Đã nhận phòng', TongTien: 24000000, GhiChu: 'Kỷ niệm ngày cưới' },
  { MaPhieuDat: 'PD-003', KhachHang: 'Lê Hoàng Cường', LoaiPhong: 'Phòng Suite Imperial', NgayNhanPhong: '2026-04-20', NgayTraPhong: '2026-04-22', SoKhach: 3, TrangThai: 'Chờ xác nhận', TongTien: 11600000, GhiChu: '' },
  { MaPhieuDat: 'PD-004', KhachHang: 'Phạm Minh Đức', LoaiPhong: 'Ocean View Room', NgayNhanPhong: '2026-04-16', NgayTraPhong: '2026-04-19', SoKhach: 2, TrangThai: 'Đã xác nhận', TongTien: 9600000, GhiChu: 'Cần early check-in' },
  { MaPhieuDat: 'PD-005', KhachHang: 'Hoàng Thị Em', LoaiPhong: 'Garden Villa', NgayNhanPhong: '2026-04-25', NgayTraPhong: '2026-04-28', SoKhach: 4, TrangThai: 'Đã hủy', TongTien: 22500000, GhiChu: 'Khách hủy vì lý do cá nhân' },
  { MaPhieuDat: 'PD-006', KhachHang: 'Võ Thanh Phong', LoaiPhong: 'Family Suite', NgayNhanPhong: '2026-04-18', NgayTraPhong: '2026-04-20', SoKhach: 5, TrangThai: 'Đã xác nhận', TongTien: 9000000, GhiChu: 'Đi cùng 2 trẻ nhỏ' },
];

export const mockInvoices = [
  { MaHoaDon: 'HD-2026-0001', KhachHang: 'Nguyễn Văn An', MaPhieuDat: 'PD-001', NgayLap: '2026-04-10', TongThanhToan: 13175000, TrangThaiThanhToan: 'Đã thanh toán', PhuongThucThanhToan: 'Thẻ tín dụng', Email: 'an.nguyen@email.com', SoDienThoai: '0901234567' },
  { MaHoaDon: 'HD-2026-0002', KhachHang: 'Trần Thị Bình', MaPhieuDat: 'PD-002', NgayLap: '2026-04-11', TongThanhToan: 24000000, TrangThaiThanhToan: 'Đã thanh toán', PhuongThucThanhToan: 'Chuyển khoản', Email: 'binh.tran@email.com', SoDienThoai: '0912345678' },
  { MaHoaDon: 'HD-2026-0003', KhachHang: 'Lê Hoàng Cường', MaPhieuDat: 'PD-003', NgayLap: '2026-04-11', TongThanhToan: 11600000, TrangThaiThanhToan: 'Chưa thanh toán', PhuongThucThanhToan: 'Tiền mặt', Email: 'cuong.le@email.com', SoDienThoai: '0923456789' },
  { MaHoaDon: 'HD-2026-0004', KhachHang: 'Phạm Minh Đức', MaPhieuDat: 'PD-004', NgayLap: '2026-04-12', TongThanhToan: 5000000, TrangThaiThanhToan: 'Đã thanh toán', PhuongThucThanhToan: 'Thẻ tín dụng', Email: 'duc.pham@email.com', SoDienThoai: '0934567890' },
  { MaHoaDon: 'HD-2026-0005', KhachHang: 'Hoàng Thị Em', MaPhieuDat: 'PD-005', NgayLap: '2026-04-12', TongThanhToan: 3200000, TrangThaiThanhToan: 'Chưa thanh toán', PhuongThucThanhToan: 'Chuyển khoản', Email: 'em.hoang@email.com', SoDienThoai: '0945678901' },
  { MaHoaDon: 'HD-2026-0006', KhachHang: 'Võ Thanh Phong', MaPhieuDat: 'PD-006', NgayLap: '2026-04-13', TongThanhToan: 9000000, TrangThaiThanhToan: 'Đang xử lý', PhuongThucThanhToan: 'Thẻ tín dụng', Email: 'phong.vo@email.com', SoDienThoai: '0956789012' },
  { MaHoaDon: 'HD-2026-0007', KhachHang: 'Đặng Quốc Giang', MaPhieuDat: 'PD-007', NgayLap: '2026-04-13', TongThanhToan: 4500000, TrangThaiThanhToan: 'Đã hủy', PhuongThucThanhToan: 'Tiền mặt', Email: 'giang.dang@email.com', SoDienThoai: '0967890123' },
  { MaHoaDon: 'HD-2026-0008', KhachHang: 'Bùi Thị Hương', MaPhieuDat: 'PD-008', NgayLap: '2026-04-13', TongThanhToan: 25000000, TrangThaiThanhToan: 'Đã thanh toán', PhuongThucThanhToan: 'Thẻ tín dụng', Email: 'huong.bui@email.com', SoDienThoai: '0978901234' },
];

export const mockCustomers = [
  { MaKH: 1, HoTen: 'Nguyễn Văn An', Email: 'an.nguyen@email.com', SoDienThoai: '0901234567', DiaChi: 'TP. Hồ Chí Minh', SoLanDat: 5, TongChiTieu: 52000000 },
  { MaKH: 2, HoTen: 'Trần Thị Bình', Email: 'binh.tran@email.com', SoDienThoai: '0912345678', DiaChi: 'Hà Nội', SoLanDat: 3, TongChiTieu: 38000000 },
  { MaKH: 3, HoTen: 'Lê Hoàng Cường', Email: 'cuong.le@email.com', SoDienThoai: '0923456789', DiaChi: 'Đà Nẵng', SoLanDat: 2, TongChiTieu: 15000000 },
  { MaKH: 4, HoTen: 'Phạm Minh Đức', Email: 'duc.pham@email.com', SoDienThoai: '0934567890', DiaChi: 'Hải Phòng', SoLanDat: 8, TongChiTieu: 95000000 },
  { MaKH: 5, HoTen: 'Hoàng Thị Em', Email: 'em.hoang@email.com', SoDienThoai: '0945678901', DiaChi: 'Nha Trang', SoLanDat: 1, TongChiTieu: 3200000 },
  { MaKH: 6, HoTen: 'Võ Thanh Phong', Email: 'phong.vo@email.com', SoDienThoai: '0956789012', DiaChi: 'Cần Thơ', SoLanDat: 4, TongChiTieu: 32000000 },
];

export const mockStaff = [
  { MaNV: 1, HoTen: 'Trần Quốc Anh', ChucVu: 'Quản lý', PhongBan: 'Ban Giám đốc', Email: 'anh.tran@hotel.com', SoDienThoai: '0901111111', TrangThai: 'Đang làm việc' },
  { MaNV: 2, HoTen: 'Nguyễn Minh Tâm', ChucVu: 'Lễ tân trưởng', PhongBan: 'Lễ tân', Email: 'tam.nguyen@hotel.com', SoDienThoai: '0902222222', TrangThai: 'Đang làm việc' },
  { MaNV: 3, HoTen: 'Lê Thị Hồng', ChucVu: 'Nhân viên buồng phòng', PhongBan: 'Housekeeping', Email: 'hong.le@hotel.com', SoDienThoai: '0903333333', TrangThai: 'Đang làm việc' },
  { MaNV: 4, HoTen: 'Phạm Văn Tuấn', ChucVu: 'Bếp trưởng', PhongBan: 'Nhà hàng', Email: 'tuan.pham@hotel.com', SoDienThoai: '0904444444', TrangThai: 'Đang làm việc' },
  { MaNV: 5, HoTen: 'Hoàng Thị Mai', ChucVu: 'Nhân viên spa', PhongBan: 'Spa & Wellness', Email: 'mai.hoang@hotel.com', SoDienThoai: '0905555555', TrangThai: 'Nghỉ phép' },
];

export const mockServices = [
  { MaDV: 1, TenDV: 'Spa & Massage', MoTa: 'Liệu trình spa chuyên nghiệp với tinh dầu cao cấp', Gia: 800000, DonVi: 'lần', TrangThai: 'Hoạt động', Icon: 'spa' },
  { MaDV: 2, TenDV: 'Đưa đón sân bay', MoTa: 'Dịch vụ xe sang đưa đón sân bay 24/7', Gia: 500000, DonVi: 'lượt', TrangThai: 'Hoạt động', Icon: 'airport_shuttle' },
  { MaDV: 3, TenDV: 'Giặt ủi Express', MoTa: 'Giặt ủi nhanh trong 4 giờ', Gia: 200000, DonVi: 'kg', TrangThai: 'Hoạt động', Icon: 'local_laundry_service' },
  { MaDV: 4, TenDV: 'Room Service 24/7', MoTa: 'Phục vụ ẩm thực tại phòng bất kỳ lúc nào', Gia: 0, DonVi: '', TrangThai: 'Hoạt động', Icon: 'room_service' },
  { MaDV: 5, TenDV: 'Tour City', MoTa: 'Tour tham quan thành phố nửa ngày', Gia: 1200000, DonVi: 'người', TrangThai: 'Hoạt động', Icon: 'tour' },
  { MaDV: 6, TenDV: 'Yoga & Fitness', MoTa: 'Phòng gym hiện đại và lớp yoga mỗi sáng', Gia: 0, DonVi: '', TrangThai: 'Hoạt động', Icon: 'fitness_center' },
];

export const mockTestimonials = [
  { name: 'Nguyễn Minh Châu', role: 'Doanh nhân', avatar: 'NC', rating: 5, text: 'Trải nghiệm tuyệt vời! Presidential Suite vượt xa mong đợi. Dịch vụ butler chu đáo, view thành phố tuyệt đẹp.' },
  { name: 'Trần Anh Thư', role: 'Travel Blogger', avatar: 'TA', rating: 5, text: 'The Curated Sanctuary xứng đáng với danh hiệu 5 sao. Từ sảnh đón đến phòng nghỉ, mọi chi tiết đều được chăm chút.' },
  { name: 'Lê Quang Hải', role: 'Kiến trúc sư', avatar: 'LQ', rating: 5, text: 'Kiến trúc khách sạn hài hòa giữa hiện đại và cổ điển. Garden Villa là thiên đường nghỉ dưỡng cho gia đình tôi.' },
];

export const mockDashboardStats = {
  tongPhong: 45, donHomNay: 8, doanhThuThang: 385000000, khachDangO: 32, tyLeLapDay: 71,
  doanhThuTuan: [45, 52, 38, 65, 48, 72, 58],
  tenNgayTuan: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
};

export const mockRoles = [
  { MaVaiTro: 1, TenVaiTro: 'Admin', MoTa: 'Toàn quyền quản trị hệ thống', SoNguoiDung: 2, Quyen: ['Tất cả'] },
  { MaVaiTro: 2, TenVaiTro: 'Quản lý', MoTa: 'Quản lý đặt phòng, khách hàng, nhân viên', SoNguoiDung: 3, Quyen: ['Xem', 'Sửa', 'Xóa'] },
  { MaVaiTro: 3, TenVaiTro: 'Lễ tân', MoTa: 'Xử lý check-in/out, đặt phòng', SoNguoiDung: 5, Quyen: ['Xem', 'Sửa'] },
  { MaVaiTro: 4, TenVaiTro: 'Kế toán', MoTa: 'Quản lý hóa đơn, thanh toán', SoNguoiDung: 2, Quyen: ['Xem hóa đơn', 'Lập hóa đơn'] },
  { MaVaiTro: 5, TenVaiTro: 'Nhân viên', MoTa: 'Xem thông tin cơ bản', SoNguoiDung: 12, Quyen: ['Xem'] },
];

// Helper format tiền VND
export const formatVND = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// Helper format ngày
export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
};
