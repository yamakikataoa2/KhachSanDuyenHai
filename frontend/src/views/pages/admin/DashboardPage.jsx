import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import StatCard from '../../components/common/StatCard';
import StatusBadge from '../../components/common/StatusBadge';
import { mockDashboardStats, mockBookings, formatVND, formatDate } from '../../../data/mockData';

export default function DashboardPage() {
  const stats = mockDashboardStats;
  const recentBookings = mockBookings.slice(0, 5);
  const maxRevenue = Math.max(...stats.doanhThuTuan);

  return (
    <div className="animate-fade-in space-y-8">
      <PageHeader 
        title="Dashboard" 
        description="Tổng quan hoạt động khách sạn hôm nay"
        icon="dashboard"
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon="bed" label="Tổng phòng" value={stats.tongPhong} subtitle={`${stats.tyLeLapDay}% lấp đầy`} trend="+5%" trendUp color="primary" />
        <StatCard icon="receipt_long" label="Đơn hôm nay" value={stats.donHomNay} subtitle="Đơn đặt phòng mới" trend="+12%" trendUp color="info" />
        <StatCard icon="payments" label="Doanh thu tháng" value={formatVND(stats.doanhThuThang)} subtitle="Tháng 4, 2026" trend="+8.5%" trendUp color="success" />
        <StatCard icon="group" label="Khách đang ở" value={stats.khachDangO} subtitle="Hiện đang lưu trú" color="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-6 rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-on-surface">Doanh thu 7 ngày qua</h3>
              <p className="text-xs text-on-surface-variant mt-1">Đơn vị: triệu VNĐ</p>
            </div>
            <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-3 py-1 rounded-full">+15.2%</span>
          </div>
          <div className="flex items-end gap-3 h-48">
            {stats.doanhThuTuan.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-semibold text-on-surface-variant">{val}tr</span>
                <div 
                  className="w-full bg-primary-container/60 hover:bg-primary-container rounded-t-lg transition-all duration-300 cursor-pointer min-h-[8px]"
                  style={{ height: `${(val / maxRevenue) * 100}%` }}
                />
                <span className="text-[10px] text-on-surface-variant font-medium">{stats.tenNgayTuan[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)]">
          <h3 className="font-semibold text-on-surface mb-6">Tình trạng phòng</h3>
          <div className="space-y-4">
            {[
              { label: 'Đang sử dụng', value: 32, total: 45, color: 'bg-emerald-500' },
              { label: 'Phòng trống', value: 10, total: 45, color: 'bg-blue-500' },
              { label: 'Đang dọn dẹp', value: 2, total: 45, color: 'bg-amber-500' },
              { label: 'Bảo trì', value: 1, total: 45, color: 'bg-red-500' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-on-surface-variant">{item.label}</span>
                  <span className="font-semibold text-on-surface">{item.value}</span>
                </div>
                <div className="w-full bg-surface-container-high rounded-full h-2">
                  <div className={`${item.color} h-2 rounded-full transition-all duration-500`} style={{ width: `${(item.value / item.total) * 100}%` }} />
                </div>
              </div>
            ))}
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
                <th className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant px-6 py-3">Tổng tiền</th>
                <th className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant px-6 py-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((b, i) => (
                <tr key={i} className={`${i % 2 === 0 ? 'bg-surface-container-lowest' : 'bg-surface-container-low/30'} hover:bg-amber-50/40 transition-colors`}>
                  <td className="px-6 py-4 text-sm font-mono font-semibold text-primary">{b.MaPhieuDat}</td>
                  <td className="px-6 py-4 text-sm text-on-surface">{b.KhachHang}</td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{b.LoaiPhong}</td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{formatDate(b.NgayNhanPhong)}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-on-surface">{formatVND(b.TongTien)}</td>
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
