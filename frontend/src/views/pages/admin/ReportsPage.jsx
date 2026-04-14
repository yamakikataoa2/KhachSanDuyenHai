import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import StatCard from '../../components/common/StatCard';
import { mockDashboardStats, formatVND } from '../../../data/mockData';

export default function ReportsPage() {
  const stats = mockDashboardStats;
  const maxVal = Math.max(...stats.doanhThuTuan);

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Báo cáo & Thống kê" description="Phân tích doanh thu và hiệu suất khách sạn" icon="analytics" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="payments" label="Doanh thu tháng" value={formatVND(stats.doanhThuThang)} trend="+8.5%" trendUp color="success" />
        <StatCard icon="bed" label="Tỷ lệ lấp đầy" value={`${stats.tyLeLapDay}%`} trend="+3%" trendUp color="primary" />
        <StatCard icon="receipt_long" label="Tổng đơn tháng" value="124" trend="+15%" trendUp color="info" />
        <StatCard icon="group" label="Khách mới" value="28" subtitle="Trong tháng" color="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)]">
          <h3 className="font-semibold text-on-surface mb-1">Doanh thu theo ngày</h3>
          <p className="text-xs text-on-surface-variant mb-6">7 ngày gần nhất (đơn vị: triệu VNĐ)</p>
          <div className="flex items-end gap-3 h-48">
            {stats.doanhThuTuan.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-semibold text-on-surface-variant">{val}tr</span>
                <div className="w-full bg-primary-container/60 hover:bg-primary-container rounded-t-lg transition-all duration-300 cursor-pointer min-h-[8px]" style={{ height: `${(val / maxVal) * 100}%` }} />
                <span className="text-[10px] text-on-surface-variant font-medium">{stats.tenNgayTuan[i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)]">
          <h3 className="font-semibold text-on-surface mb-1">Phân bổ doanh thu</h3>
          <p className="text-xs text-on-surface-variant mb-6">Theo nguồn thu</p>
          <div className="space-y-4">
            {[
              { label: 'Phòng nghỉ', pct: 65, color: 'bg-primary-container', amount: 250000000 },
              { label: 'Gói Combo', pct: 20, color: 'bg-blue-400', amount: 77000000 },
              { label: 'Dịch vụ', pct: 10, color: 'bg-emerald-400', amount: 38500000 },
              { label: 'Nhà hàng', pct: 5, color: 'bg-amber-400', amount: 19500000 },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-on-surface-variant">{item.label}</span>
                  <span className="font-semibold text-on-surface">{formatVND(item.amount)} ({item.pct}%)</span>
                </div>
                <div className="w-full bg-surface-container-high rounded-full h-2.5">
                  <div className={`${item.color} h-2.5 rounded-full transition-all duration-500`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)]">
        <h3 className="font-semibold text-on-surface mb-4">Top phòng được đặt nhiều nhất</h3>
        <div className="space-y-3">
          {[
            { name: 'Phòng Deluxe', bookings: 45, revenue: 112500000 },
            { name: 'Ocean View Room', bookings: 38, revenue: 121600000 },
            { name: 'Phòng Suite Imperial', bookings: 22, revenue: 127600000 },
            { name: 'Family Suite', bookings: 18, revenue: 81000000 },
            { name: 'Garden Villa', bookings: 12, revenue: 90000000 },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-container-low transition-colors">
              <span className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-primary font-bold text-sm">{i + 1}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-on-surface">{item.name}</p>
                <p className="text-xs text-on-surface-variant">{item.bookings} lượt đặt</p>
              </div>
              <span className="text-sm font-semibold text-primary">{formatVND(item.revenue)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
