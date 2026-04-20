import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatVND, formatDate } from '../../../utils/formatters';
import StatusBadge from '../../components/common/StatusBadge';
import bookingService from '../../../services/bookingService';

export default function HistoryPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await bookingService.getMyBookings();
        if (isMounted) setBookings(data || []);
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchBookings();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="animate-fade-in max-w-5xl mx-auto px-6 md:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-notoSerif font-bold text-on-surface mb-1">Lịch sử đặt phòng</h1>
          <p className="text-on-surface-variant text-sm">Xem lại các đơn đặt phòng trước đây</p>
        </div>
        <Link to="/profile" className="flex items-center gap-1.5 text-sm text-primary font-semibold hover:text-amber-800 transition-colors">
          <span className="material-symbols-outlined text-lg">person</span>
          Tài khoản
        </Link>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12 text-on-surface-variant">Đang tải dữ liệu...</div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12 text-on-surface-variant">Bạn chưa có đặt phòng nào.</div>
        ) : bookings.map(b => (
          <Link key={b.MaPhieuDat} to={`/booking/${b.MaPhieuDat}`}
            className="block bg-surface-container-lowest rounded-2xl p-5 shadow-[0_2px_12px_rgba(77,70,53,0.06)] hover:shadow-[0_8px_32px_rgba(77,70,53,0.1)] transition-all duration-300 group">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-xl">hotel</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-semibold text-on-surface text-sm">{b.chi_tiet_dat_phongs?.[0]?.phong?.loai_phong?.TenLoai || b.LoaiPhong || 'Phòng'}</h3>
                    {b.goi_combo && (
                      <span className="bg-primary-container/30 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">{b.goi_combo.TenGoi}</span>
                    )}
                  </div>
                  <p className="text-xs text-on-surface-variant">{formatDate(b.NgayNhanDuKien || b.NgayNhanPhong)} → {formatDate(b.NgayTraDuKien || b.NgayTraPhong)} • {b.tong_so_khach || b.SoKhach || 1} khách</p>
                </div>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <StatusBadge status={b.TrangThai} />
                <span className="font-bold text-primary text-sm">{formatVND(b.hoa_don?.TongThanhToan || b.TongTien || 0)}</span>
                <span className="material-symbols-outlined text-on-surface-variant/40 group-hover:text-primary transition-colors">chevron_right</span>
              </div>
            </div>
            {/* Combo services preview */}
            {b.goi_combo && b.ComboInfo && (
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-surface-container-high/40">
                {b.ComboInfo.DichVuDaChon?.map((dv, i) => (
                  <span key={i} className="text-[10px] bg-surface-container-high/80 px-2.5 py-0.5 rounded-full text-on-surface-variant">{dv.TenDV} x{dv.SoLuong}</span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
