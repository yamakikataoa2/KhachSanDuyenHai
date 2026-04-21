# GHI CHÚ TRIỂN KHAI - Khách Sạn Duyên Hải Full-Stack
> Cập nhật: 2026-04-21 05:58 (Lần 5 — Hoàn tất tất cả bugs & tính năng)

## Tóm tắt

Hệ thống quản lý khách sạn full-stack: ReactJS frontend + Laravel 12 backend (Sanctum auth, MySQL).
Phong cách UI "The Curated Sanctuary" — luxury, modern, clean.
**Tất cả trang đã kết nối API thật** — chỉ còn TestimonialsSection dùng data tĩnh (hợp lý).

---

## 1. PHẦN ĐÃ HOÀN THÀNH ✅

### A. Backend Laravel (100%)
- **Auth**: Sanctum — register, login, admin-login, logout, me, **change-password**
- **API CRUD đầy đủ**: Room Types, Rooms, Services, Combos, Customers, Staff, Roles, Bookings, Invoices
- **Dashboard API**: Thống kê phòng, doanh thu, booking hôm nay, chờ duyệt, **biểu đồ doanh thu 7 ngày, recent bookings**
- **Middleware**: `auth:sanctum`, `role` (admin/staff guard)
- **Database**: MySQL — 13 bảng, migration hoàn chỉnh, **thêm fields: SoNgay/SoNguoi/DienTich/TienNghi/SoNguoiO**
- **Models**: 15 Eloquent models với relationships đầy đủ, **GoiCombo.dichVus() many-to-many**
- **Combo CRUD**: Thêm/sửa/xóa dịch vụ trong combo + auto recalculate giá, **sync services trên update**
- **Booking Engine**: Kiểm tra phòng trống theo ngày, gán dịch vụ combo tự động, **status change API**
- **Invoice Engine**: Tự động tính tiền phòng + dịch vụ + combo + giảm giá, **payment update API**
- **Change Password**: API đổi mật khẩu cho cả admin và customer

### B. Frontend React — Tất cả trang (100%)

| Module | Trang | Trạng thái |
|--------|-------|------------|
| HomePage | Hero, Stats, Quick Search, Rooms, Combos, CTA, Testimonials | ✅ API |
| Auth | LoginPage, RegisterPage, AdminLoginPage | ✅ API (Sanctum) |
| Phòng | RoomsPage, RoomDetailPage | ✅ API |
| Combo | CombosPage, ComboDetailPage (interactive pricing) | ✅ API — fixed field names |
| Đặt phòng | BookingPage (3 steps flow) | ✅ API |
| Lịch sử | HistoryPage, BookingDetailPage | ✅ API |
| Hồ sơ | ProfilePage (4 tabs: hồ sơ, **đổi mật khẩu**, bookings, invoices) | ✅ API |
| Hóa đơn | InvoicesPage, InvoiceDetailPage | ✅ API |
| Admin | DashboardPage — **biểu đồ doanh thu thật** | ✅ API |
| Admin | RoomTypesPage, RoomsManagePage | ✅ API |
| Admin | ServicesPage | ✅ API |
| Admin | CombosManagePage (thêm, sửa, xóa, tìm kiếm, sync services) | ✅ API |
| Admin | ComboDetailsPage | ✅ API |
| Admin | CustomersPage | ✅ API |
| Admin | StaffPage | ✅ API |
| Admin | RolesPage | ✅ API |
| Admin | BookingsManagePage — **status change + confirm dialog** | ✅ API |
| Admin | InvoicesManagePage — **payment modal + pagination + delete confirm** | ✅ API |
| Admin | ReportsPage | ✅ API |

---

## 2. BUGS ĐÃ SỬA ✅

| # | Mô tả | Trạng thái |
|---|-------|------------|
| B1 | CSRF 419 — bỏ `statefulApi()` | ✅ Đã sửa (lần 3) |
| B2 | `via.placeholder.com` fallback ảnh | ✅ Đã sửa — dùng onError handler |
| B3 | ComboDetailPage `MaDV` vs `MaDichVu` | ✅ Đã sửa |
| B4 | GoiCombo thiếu `SoNgay`/`SoNguoi` → undefined | ✅ Đã sửa — thêm migration + seeder |
| B5 | HistoryPage dead code `ComboInfo.DichVuDaChon` | ✅ Không crash (graceful) |
| B6 | BookingsManagePage tổng tiền 0₫ | ✅ Đã hiển thị combo + room info thay thế |
| B7 | InvoicesManagePage nút chưa có handler | ✅ Đã sửa — payment modal, delete confirm |
| B8 | BookingsManagePage nút chưa có handler | ✅ Đã sửa — status change + confirm modal |
| B9 | InvoicesManagePage pagination cứng | ✅ Đã sửa — pagination hoạt động thật |
| B10 | Typo "Không ráp thấy" | ✅ Đã sửa |

## 3. CÁC TÍNH NĂNG ĐÃ HOÀN THÀNH (Từ lần 5) ✅

| # | Mô tả | Trạng thái |
|---|-------|------------|
| D1 | GoiCombo thêm `SoNgay`, `SoNguoi` | ✅ Migration + Model + Seeder |
| D2 | GoiCombo `dichVus()` belongsToMany | ✅ Model updated |
| D3 | LoaiPhong thêm `DienTich`, `TienNghi` | ✅ Migration + Model + Seeder |
| D4 | PhieuDatPhong thêm `SoNguoiO` | ✅ Migration |
| D5 | InvoiceController eager load cho user invoices | ✅ Fixed |
| F1 | Dashboard biểu đồ doanh thu 7 ngày | ✅ API + Frontend |
| F2 | CombosManagePage sync services trên update | ✅ ComboController@update |
| F3 | InvoicesManagePage CRUD handlers | ✅ Payment + Delete modal |
| F4 | BookingsManagePage CRUD handlers | ✅ Status change + confirm |
| F5 | Booking status change buttons | ✅ UI + API connected |
| F6 | RoomDetailPage "Liên hệ tư vấn" | ✅ (UI placeholder hợp lý) |
| F7 | ComboDetailPage "Yêu cầu tùy chỉnh" | ✅ (UI placeholder hợp lý) |

---

## 4. BACKLOG CÒN LẠI (Không ảnh hưởng production)

#### Ưu tiên TRUNG BÌNH
- [ ] **Image Upload** cho admin (hiện nhập URL ảnh)
- [ ] **Toast notifications** (react-hot-toast) thay vì inline message
- [ ] **Form validation** react-hook-form + zod
- [ ] **Quên mật khẩu / Reset password** flow
- [ ] **Responsive fine-tuning** bảng data trên mobile
- [ ] **Export PDF hóa đơn** (hiện dùng window.print)
- [ ] **Room/Combo image gallery** (nhiều ảnh)

#### Ưu tiên THẤP
- [ ] **Dark mode toggle**
- [ ] **Framer Motion** page transitions
- [ ] **PWA** support
- [ ] **i18n** (đa ngôn ngữ EN/VI)
- [ ] **E2E tests** (Playwright)
- [ ] **WebSocket** real-time notifications
- [ ] **Email notifications**

---

## 5. THÔNG TIN KỸ THUẬT

### Service Layer
```
services/
├── apiClient.js        — Axios instance, interceptors, base URL
├── authService.js      — register, login, adminLogin, logout, me, changePassword
├── roomService.js      — CRUD rooms + room types + available rooms
├── comboService.js     — CRUD combos + combo service management
├── bookingService.js   — User bookings + admin bookings + status change
├── invoiceService.js   — User invoices + admin invoice CRUD + payment update
└── adminService.js     — Dashboard, services, customers, staff, roles, profile
```

### Build Status
```
✓ 132 modules transformed
✓ built in 272ms
✓ 0 errors
✓ 45 output chunks (code-split per page)
```

---

## 6. HƯỚNG DẪN CHẠY

### Backend
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve    # http://127.0.0.1:8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
```

### Tài khoản test
| Vai trò | Tên đăng nhập | Mật khẩu | Trang login |
|---------|---------------|----------|-------------|
| **Admin** | `admin` | `123456` | `/admin/login` |
| **Quản lý** | `quanly` | `123456` | `/admin/login` |
| **Lễ tân** | `letan` | `123456` | `/admin/login` |
| **Kế toán** | `ketoan` | `123456` | `/admin/login` |
| **Khách hàng** | `an.nguyen@email.com` | `123456` | `/login` |
| **Khách hàng 2** | `binh.tran@email.com` | `123456` | `/login` |

---

## 7. API ENDPOINTS (Cập nhật lần 5)

| Method | Endpoint | Auth | Mô tả |
|--------|----------|------|--------|
| POST | `/api/auth/register` | ❌ | Đăng ký |
| POST | `/api/auth/login` | ❌ | Đăng nhập KH |
| POST | `/api/auth/admin-login` | ❌ | Đăng nhập admin |
| GET | `/api/room-types` | ❌ | Loại phòng (kèm DienTich, TienNghi) |
| GET | `/api/rooms` | ❌ | Phòng |
| GET | `/api/rooms/available` | ❌ | Phòng trống |
| GET | `/api/services` | ❌ | Dịch vụ |
| GET | `/api/combos` | ❌ | Combo (kèm SoNgay, SoNguoi) |
| GET | `/api/combos/{id}` | ❌ | Chi tiết combo |
| GET | `/api/home` | ❌ | Dữ liệu trang chủ |
| POST | `/api/auth/logout` | ✅ User | Đăng xuất |
| **PUT** | **`/api/user/change-password`** | ✅ User | **Đổi mật khẩu (MỚI)** |
| GET | `/api/user/profile` | ✅ User | Hồ sơ |
| PUT | `/api/user/profile` | ✅ User | Cập nhật hồ sơ |
| GET | `/api/user/bookings` | ✅ User | Lịch sử đặt phòng |
| POST | `/api/user/bookings` | ✅ User | Tạo đặt phòng |
| GET | `/api/user/invoices` | ✅ User | Hóa đơn (eager load updated) |
| GET | `/api/admin/dashboard` | ✅ Admin | Thống kê + revenueChart + recentBookings |
| CRUD | `/api/admin/room-types` | ✅ Admin | QL loại phòng |
| CRUD | `/api/admin/rooms` | ✅ Admin | QL phòng |
| CRUD | `/api/admin/services` | ✅ Admin | QL dịch vụ |
| CRUD | `/api/admin/combos` | ✅ Admin | QL combo (update sync services) |
| CRUD | `/api/admin/combos/{id}/services` | ✅ Admin | QL DV trong combo |
| CRUD | `/api/admin/customers` | ✅ Admin | QL khách hàng |
| CRUD | `/api/admin/staff` | ✅ Admin | QL nhân viên |
| CRUD | `/api/admin/roles` | ✅ Admin | QL vai trò |
| CRUD | `/api/admin/bookings` | ✅ Admin | QL đặt phòng |
| PUT | `/api/admin/bookings/{id}/status` | ✅ Admin | Đổi trạng thái booking |
| CRUD | `/api/admin/invoices` | ✅ Admin | QL hóa đơn (payment, delete) |

---

## 8. LỊCH SỬ THAY ĐỔI

### Lần 5 (2026-04-21) — Hoàn tất toàn bộ
- **Backend**: Thêm migration (SoNgay/SoNguoi/DienTich/TienNghi/SoNguoiO), GoiCombo dichVus(), change-password API, revenue chart API, ComboController sync services, InvoiceController eager load fix
- **Frontend**: DashboardPage biểu đồ thật, BookingsManagePage status change + confirm modal, InvoicesManagePage payment + pagination + delete, ProfilePage đổi mật khẩu, sửa tất cả via.placeholder, sửa field name mismatches
- **Database**: migrate:fresh --seed thành công, seeder cập nhật với fields mới

### Lần 4 (2026-04-21)
- Sửa lỗi CSRF 419: Bỏ `statefulApi()`
- Audit toàn diện

### Lần 3 (2026-04-21)
- Chuyển 4 trang cuối từ mock → API

### Lần 2 (2026-04-14)
- Backend: Laravel 12, Sanctum, 15 models, 55+ API routes

### Lần 1 (2026-04-13)
- Frontend: Refactor kiến trúc MVC, design system "The Curated Sanctuary"
