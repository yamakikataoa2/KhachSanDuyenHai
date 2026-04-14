import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { mockUserBookings, mockRooms, formatVND, formatDate } from '../../../data/mockData';
import StatusBadge from '../../components/common/StatusBadge';

export default function BookingDetailPage() {
  const { id } = useParams();
  const booking = mockUserBookings.find(b => b.MaPhieuDat === id) || mockUserBookings[0];
  const room = mockRooms.find(r => r.MaLoaiPhong === booking.MaLoaiPhong) || mockRooms[0];

  return (
    <div className="animate-fade-in max-w-4xl mx-auto px-6 md:px-8 py-10">
      <Link to="/profile" className="inline-flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-primary mb-6 transition-colors">
        <span className="material-symbols-outlined text-lg">arrow_back</span> Lịch sử đặt phòng
      </Link>

      {/* Room hero */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)] overflow-hidden">
        <div className="h-56 overflow-hidden relative">
          <img src={room.AnhDaiDien} alt={room.TenLoai} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end">
            <div>
              <p className="text-white/70 text-xs font-mono">{booking.MaPhieuDat}</p>
              <h1 className="text-2xl font-notoSerif font-bold text-white">{booking.LoaiPhong}</h1>
            </div>
            <StatusBadge status={booking.TrangThai} />
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          {/* Booking info grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: 'login', label: 'Check-in', value: formatDate(booking.NgayNhanPhong) },
              { icon: 'logout', label: 'Check-out', value: formatDate(booking.NgayTraPhong) },
              { icon: 'group', label: 'Số khách', value: `${booking.SoKhach} người` },
              { icon: 'event', label: 'Ngày đặt', value: formatDate(booking.NgayDat) },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-[10px] uppercase tracking-[0.15em] text-on-surface-variant font-bold mb-1.5">{item.label}</p>
                <p className="text-sm font-medium text-on-surface flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-lg">{item.icon}</span>{item.value}
                </p>
              </div>
            ))}
          </div>

          {booking.GhiChu && (
            <div className="p-4 bg-surface-container-low/60 rounded-xl">
              <p className="text-[10px] uppercase tracking-[0.15em] text-on-surface-variant font-bold mb-1">Ghi chú</p>
              <p className="text-sm text-on-surface">{booking.GhiChu}</p>
            </div>
          )}

          {/* Combo & Services Detail */}
          {booking.ComboInfo && (
            <div className="border-t border-surface-container-high pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary-container/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-lg">card_giftcard</span>
                </div>
                <div>
                  <h3 className="font-semibold text-on-surface">{booking.ComboInfo.TenGoi}</h3>
                  <p className="text-xs text-emerald-600 font-semibold">Giảm {booking.ComboInfo.PhanTramGiam}% cho gói combo</p>
                </div>
              </div>
              <div className="bg-surface-container-low/40 rounded-xl overflow-hidden">
                <div className="divide-y divide-surface-container-high/30">
                  {booking.ComboInfo.DichVuDaChon.map((dv, i) => (
                    <div key={i} className="flex items-center justify-between px-5 py-3">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                        <div>
                          <p className="text-sm text-on-surface font-medium">{dv.TenDV}</p>
                          <p className="text-xs text-on-surface-variant">Số lượng: {dv.SoLuong} • {formatVND(dv.DonGia)}/{dv.SoLuong > 1 ? 'mỗi' : 'lần'}</p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-on-surface">{formatVND(dv.ThanhTien)}</p>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-3 bg-surface-container-high/30 flex justify-between text-sm">
                  <span className="text-on-surface-variant font-medium">Tổng dịch vụ</span>
                  <span className="font-bold text-on-surface">{formatVND(booking.ComboInfo.TongDichVu)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Price Summary */}
          <div className="bg-surface-container-low/60 rounded-xl p-5 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-on-surface-variant">Tiền phòng</span>
              <span className="font-medium text-on-surface">{formatVND(booking.TienPhong)}</span>
            </div>
            {booking.ComboInfo && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Dịch vụ combo</span>
                  <span className="font-medium text-on-surface">{formatVND(booking.ComboInfo.TongDichVu)}</span>
                </div>
                <div className="flex justify-between text-sm text-emerald-600">
                  <span>Giảm combo ({booking.ComboInfo.PhanTramGiam}%)</span>
                  <span className="font-medium">-{formatVND(Math.round((booking.TienPhong + booking.ComboInfo.TongDichVu - booking.TongTien)))}</span>
                </div>
              </>
            )}
            <div className="flex justify-between pt-3 border-t border-outline-variant/20">
              <span className="text-on-surface font-bold">Tổng thanh toán</span>
              <span className="text-2xl font-bold text-primary">{formatVND(booking.TongTien)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
