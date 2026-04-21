import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import StatCard from '../../components/common/StatCard';
import StatusBadge from '../../components/common/StatusBadge';
import { formatVND, formatDate } from '../../../utils/formatters';
import adminService from '../../../services/adminService';
import { SkeletonCard } from '../../components/common/LoadingSkeleton';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [revenueChart, setRevenueChart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const data = await adminService.getDashboard();
        if (isMounted) {
          setStats(data);
          setRecentBookings(data.recentBookings || []);
          setRevenueChart(data.revenueChart || []);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchDashboard();
    return () => { isMounted = false; };
  }, []);

  if (loading || !stats) {
    return (
      <div className="animate-fade-in space-y-8">
         <PageHeader title="Dashboard" description="Tổng quan hoạt động khách sạn hôm nay" icon="dashboard" />
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /></div>
      </div>
    );
  }

  // Revenue chart calculations
  const maxRevenue = Math.max(...revenueChart.map(r => r.revenue), 1);
  const totalWeekRevenue = revenueChart.reduce((sum, r) => sum + r.revenue, 0);

  const baoTri = Math.max(0, stats.tongPhong - stats.phongTrong - stats.phongDangSD);

  return (
    <div className="animate-fade-in space-y-8">
      <PageHeader 
        title="Dashboard" 
        description="Tổng quan hoạt động khách sạn hôm nay"
        icon="dashboard"
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon="bed" label="Tổng phòng" value={stats.tongPhong} subtitle={`${stats.tyLeLapDay}% lấp đầy`} trend={`${stats.phongDangSD} đang dùng`} trendUp color="primary" />
        <StatCard icon="receipt_long" label="Đơn hôm nay" value={stats.bookingsHomNay} subtitle="Đơn đặt phòng mới" color="info" />
        <StatCard icon="payments" label="Doanh thu tháng" value={formatVND(stats.doanhThuThang || 0)} subtitle="Doanh thu hiện tại" color="success" />
        <StatCard icon="group" label="Chờ xác nhận" value={stats.bookingsChoDuyet} subtitle="Cần xử lý" color="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart — Real Data */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-6 rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-on-surface">Doanh thu 7 ngày qua</h3>
              <p className="text-xs text-on-surface-variant mt-1">Tổng: {formatVND(totalWeekRevenue)}</p>
            </div>
            {totalWeekRevenue > 0 && (
              <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                {formatVND(totalWeekRevenue)}
              </span>
            )}
          </div>
          <div className="flex items-end gap-3 h-48">
            {revenueChart.map((item, i) => {
              const heightPct = maxRevenue > 0 ? Math.max(5, (item.revenue / maxRevenue) * 100) : 5;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-semibold text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.revenue > 0 ? `${(item.revenue / 1000000).toFixed(1)}tr` : '0'}
                  </span>
                  <div 
                    className="w-full bg-primary-container/60 hover:bg-primary-container rounded-t-lg transition-all duration-500 cursor-pointer min-h-[8px] relative"
                    style={{ height: `${heightPct}%` }}
                    title={`${item.date}: ${formatVND(item.revenue)}`}
                  >
                    {item.revenue > 0 && (
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-on-surface text-surface-container-lowest text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {formatVND(item.revenue)}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-on-surface-variant font-medium">{item.weekday || item.date}</span>
                </div>
              );
            })}
          </div>
          {revenueChart.every(r => r.revenue === 0) && (
            <p className="text-center text-sm text-on-surface-variant mt-4">Chưa có doanh thu trong 7 ngày qua</p>
          )}
        </div>

        {/* Quick Stats - Room Status */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)]">
          <h3 className="font-semibold text-on-surface mb-6">Tình trạng phòng</h3>
          <div className="space-y-4">
            {[
              { label: 'Đang sử dụng', value: stats.phongDangSD, total: stats.tongPhong, color: 'bg-emerald-500' },
              { label: 'Phòng trống', value: stats.phongTrong, total: stats.tongPhong, color: 'bg-blue-500' },
              { label: 'Bảo trì / Dọn dẹp', value: baoTri, total: stats.tongPhong, color: 'bg-amber-500' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-on-surface-variant">{item.label}</span>
                  <span className="font-semibold text-on-surface">{item.value}</span>
                </div>
                <div className="w-full bg-surface-container-high rounded-full h-2">
                  <div className={`${item.color} h-2 rounded-full transition-all duration-500`} style={{ width: `${stats.tongPhong > 0 ? (item.value / item.total) * 100 : 0}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-surface-container-high">
            <div className="flex items-center justify-between">
              <span className="text-sm text-on-surface-variant">Tổng khách hàng</span>
              <span className="font-bold text-primary text-lg">{stats.tongKhach}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)] overflow-hidden">
        <div className="flex items-center justify-between p-6 pb-4">
          <h3 className="font-semibold text-on-surface">Đơn đặt phòng gần đây</h3>
          <Link to="/admin/bookings" className="text-primary text-sm font-semibold hover:underline">Xem tất cả</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-container-high/50">
                <th className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant px-6 py-3">Mã đơn</th>
                <th className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant px-6 py-3">Khách hàng</th>
                <th className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant px-6 py-3">Phòng</th>
                <th className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant px-6 py-3">Check-in</th>
                <th className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant px-6 py-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-4 text-center text-sm text-on-surface-variant">Không có đơn đặt phòng nào.</td></tr>
              )}
              {recentBookings.map((b, i) => (
                <tr key={b.MaPhieuDat || i} className={`${i % 2 === 0 ? 'bg-surface-container-lowest' : 'bg-surface-container-low/30'} hover:bg-amber-50/40 transition-colors`}>
                  <td className="px-6 py-4 text-sm font-mono font-semibold text-primary">{b.MaPhieuDat}</td>
                  <td className="px-6 py-4 text-sm text-on-surface">{b.khach_hang?.HoTen || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{b.chi_tiet_dat_phongs?.[0]?.phong?.loai_phong?.TenLoai || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{formatDate(b.NgayNhanDuKien)}</td>
                  <td className="px-6 py-4"><StatusBadge status={b.TrangThai} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
