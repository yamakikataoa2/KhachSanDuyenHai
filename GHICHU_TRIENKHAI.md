# GHI CHÚ TRIỂN KHAI - Refactoring Frontend Khách Sạn Duyên Hải v2
> Cập nhật: 2026-04-13 (Lần 2 - Major UI Overhaul)

## Tóm tắt

Refactoring toàn diện frontend từ UI placeholder thành hệ thống chuyên nghiệp phong cách "The Curated Sanctuary" — luxury, modern, clean.

---

## 1. Các tính năng mới (v2)

### A. HomePage Redesign
- **HeroSection**: Cinematic left-aligned layout (92vh), multi-layer gradient, dual CTA pill buttons, star rating badge, float-up animation
- **SearchBookingSection**: Rounded inputs, hover/focus states, improved glassmorphism, stagger animation
- **StatsStrip**: NEW — 4-column stats bar (5★ · 120+ phòng · 15+ dịch vụ · 98% hài lòng) với shimmer background
- **CTASection**: NEW — Full-width promotional section với background image, overlay, và dual CTA buttons
- Section order mới: Hero → Search → Stats → Rooms → Amenities → Combos → CTA → Testimonials

### B. Combo Service CRUD (Core Feature)
**Public ComboDetailPage:**
- Xem danh sách dịch vụ trong gói combo với icon, đơn giá, số lượng
- **Thêm dịch vụ**: Modal picker từ danh sách `mockAllServices` (15 dịch vụ)
- **Sửa số lượng**: Stepper buttons (−/+) trực tiếp trên từng dòng
- **Xóa dịch vụ**: Nút xóa từng dịch vụ
- **Real-time pricing**: Tự động tính giá gốc → giảm giá % → tổng thanh toán
- Price breakdown sidebar chi tiết từng dòng dịch vụ

**Admin CombosManagePage:**
- Card grid view → Click "Sửa gói" → Inline combo editor
- Editable unit price (input number) + quantity stepper + remove button per service
- Add service modal (grouped by category)
- **Editable discount %** (input number 0-100)
- Real-time price recalculation sidebar
- "Lưu thay đổi" button

### C. User Account System
**ProfilePage (tabbed interface):**
- Tab 1 — Hồ sơ cá nhân: Edit form (6 fields), membership badge (Gold), loyalty points
- Tab 2 — Lịch sử đặt phòng: Booking cards with combo preview tags
- Tab 3 — Hóa đơn: Data table with status badges and detail links

**BookingDetailPage (enhanced):**
- Room hero image with booking ID + status badge
- Booking info grid (check-in, check-out, guests, date)
- **Combo service detail**: Full service list with quantity, unit price, line total
- Price breakdown: Room cost + service cost − combo discount = total

**HistoryPage:**
- Now uses `mockUserBookings` (user-specific data)
- Combo preview tags on each booking card

### D. Design System Improvements
- New keyframes: `float-up` (spring curve), `scale-in`, `shimmer`
- Stagger animation utilities: `.stagger-1` through `.stagger-6`
- Improved `.glass` (increased blur+saturation)
- New `.glass-dark` for dark overlays
- `.shimmer-bg` for subtle background animation
- Number input stepper styling (hidden native spinners)

### E. Component Upgrades
- **RoomCard**: Floating price badge, hover overlay, description, better CTA transition
- **ComboCard**: Discount badge, original/combo price display, day/night count

---

## 2. Mock Data Updates

### Cấu trúc mới cho Combo:
```javascript
{
  MaGoi, TenGoi, SoNgay, MoTa, AnhDaiDien,
  LoaiPhong, SoNguoi,
  DichVuChiTiet: [
    { MaDV, TenDV, SoLuong, DonGia, DonVi, Icon }
  ],
  GiaGoc, PhanTramGiam, GiaCombo,
}
```

### Thêm mới:
- `mockAllServices`: 15 dịch vụ (grouped by: Wellness, Vận chuyển, Ẩm thực, Trải nghiệm, Tiện ích, Business, Trẻ em)
- `mockUser`: Thông tin user đã đăng nhập (membership, loyalty points)
- `mockUserBookings`: 3 booking với `ComboInfo` chi tiết (DichVuDaChon: TenDV, SoLuong, DonGia, ThanhTien)

---

## 3. Files thay đổi (v2)

### Mới tạo:
```
src/views/sections/home/StatsStrip.jsx      — Stats bar mới
src/views/sections/home/CTASection.jsx      — CTA promotional section
```

### Cập nhật lớn:
```
src/data/mockData.js                        — +mockAllServices, +mockUser, +mockUserBookings, combo DichVuChiTiet
src/index.css                               — +float-up, +scale-in, +shimmer, +stagger, +glass-dark, +number input
src/views/sections/home/HeroSection.jsx     — Cinematic left-aligned redesign
src/views/sections/home/SearchBookingSection.jsx — Polished inputs, stagger animation
src/views/pages/public/HomePage.jsx         — New section order + StatsStrip + CTA
src/views/pages/public/ComboDetailPage.jsx  — Full CRUD: add/edit/delete services, real-time pricing
src/views/pages/public/ProfilePage.jsx      — Tabbed: profile + bookings + invoices, membership badge
src/views/pages/public/BookingDetailPage.jsx — Combo services detail, price breakdown
src/views/pages/public/HistoryPage.jsx      — mockUserBookings, combo preview tags
src/views/pages/admin/CombosManagePage.jsx  — Inline combo editor with service CRUD + editable discount
src/views/components/room/RoomCard.jsx      — Floating price, hover overlay, description
src/views/components/combo/ComboCard.jsx    — Discount badge, price comparison
```

---

## 4. Build

```
✓ 71 modules transformed
✓ built in 260ms
✓ 0 errors
```

---

## 5. Cấu trúc thư mục

```
src/
├── app/
│   ├── layouts/
│   │   ├── AdminLayout.jsx     — Mobile sidebar, grouped menu, skeleton loading
│   │   └── PublicLayout.jsx    — Nav, mobile menu, 4-column footer
│   └── router/
│       ├── index.jsx
│       ├── publicRoutes.jsx    — 13 routes
│       └── adminRoutes.jsx     — 12 routes
├── data/
│   └── mockData.js             — 10 entities + helpers
├── views/
│   ├── components/
│   │   ├── common/             — 6 shared: Skeleton, Empty, Error, Badge, Stat, Header
│   │   ├── room/RoomCard.jsx   — Floating price badge
│   │   └── combo/ComboCard.jsx — Discount badge
│   ├── pages/
│   │   ├── admin/              — 12 admin pages (all functional)
│   │   └── public/             — 13 public pages (all functional)
│   └── sections/home/
│       ├── HeroSection.jsx     — Cinematic hero
│       ├── SearchBookingSection.jsx
│       ├── StatsStrip.jsx      — NEW
│       ├── FeaturedRoomsSection.jsx
│       ├── AmenitiesSection.jsx
│       ├── ComboSection.jsx
│       ├── CTASection.jsx      — NEW
│       └── TestimonialsSection.jsx
└── index.css                   — 35+ tokens, 6 keyframes, 15+ utilities
```

---

## 6. Chưa làm (backlog)

### Ưu tiên cao
- [ ] Kết nối API Laravel (thay mockData)
- [ ] Authentication flow (JWT, protected routes, redirect)
- [ ] Persist combo edits to backend
- [ ] Image upload cho admin

### Ưu tiên trung bình
- [ ] Framer Motion page transitions
- [ ] Toast/notification cho CRUD actions
- [ ] Form validation (react-hook-form)
- [ ] Pagination component tái sử dụng
- [ ] Dark mode toggle

### Ưu tiên thấp
- [ ] PWA support
- [ ] i18n (đa ngôn ngữ)
- [ ] E2E tests (Playwright)
- [ ] Responsive fine-tuning cho tablet
