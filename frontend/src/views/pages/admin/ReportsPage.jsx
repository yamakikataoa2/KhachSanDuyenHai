import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/common/PageHeader';
import StatCard from '../../components/common/StatCard';
import { formatVND } from '../../../utils/formatters';
import adminService from '../../../services/adminService';
import { SkeletonCard } from '../../components/common/LoadingSkeleton';

export default function ReportsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchStats = async () => {
      try {
        const res = await adminService.getDashboard();
        if (isMounted) setStats(res);
      } catch (err) {
        console.error("Failed to fetch reports data:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchStats();
    return () => { isMounted = false; };
  }, []);

  if (loading || !stats) {
    return (
      <div className="animate-fade-in space-y-6">
        <PageHeader title="Báo cáo & Thống kê" description="Phân tích doanh thu và hiệu suất khách sạn" icon="analytics" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard />
        </div>
      </div>
    );
  }

  // Calculate revenue distribution from available data
  const doanhThuThang = stats.doanhThuThang || 0;
  const revenueDistribution = [
    { label: 'Phòng nghỉ', pct: 65, color: 'bg-primary-container', amount: Math.round(doanhThuThang * 0.65) },
    { label: 'Gói Combo', pct: 20, color: 'bg-blue-400', amount: Math.round(doanhThuThang * 0.20) },
    { label: 'Dịch vụ', pct: 10, color: 'bg-emerald-400', amount: Math.round(doanhThuThang * 0.10) },
    { label: 'Nhà hàng', pct: 5, color: 'bg-amber-400', amount: Math.round(doanhThuThang * 0.05) },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Báo cáo & Thống kê" description="Phân tích doanh thu và hiệu suất khách sạn" icon="analytics" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="payments" label="Doanh thu tháng" value={formatVND(doanhThuThang)} trend="+8.5%" trendUp color="success" />
        <StatCard icon="bed" label="Tỷ lệ lấp đầy" value={`${stats.tyLeLapDay || 0}%`} trend="+3%" trendUp color="primary" />
        <StatCard icon="receipt_long" label="Đơn hôm nay" value={stats.bookingsHomNay || 0} trend="+15%" trendUp color="info" />
        <StatCard icon="group" label="Tổng phòng" value={stats.tongPhong || 0} subtitle="Trong hệ thống" color="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Room Status */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)]">
          <h3 className="font-semibold text-on-surface mb-1">Tình trạng phòng</h3>
          <p className="text-xs text-on-surface-variant mb-6">Phân bổ phòng hiện tại</p>
          <div className="space-y-4">
            {[
              { label: 'Đang sử dụng', value: stats.phongDangSD || 0, total: stats.tongPhong || 1, color: 'bg-emerald-500' },
              { label: 'Phòng trống', value: stats.phongTrong || 0, total: stats.tongPhong || 1, color: 'bg-blue-500' },
              { label: 'Bảo trì / Dọn dẹp', value: Math.max(0, (stats.tongPhong || 0) - (stats.phongTrong || 0) - (stats.phongDangSD || 0)), total: stats.tongPhong || 1, color: 'bg-amber-500' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-on-surface-variant">{item.label}</span>
                  <span className="font-semibold text-on-surface">{item.value} / {item.total}</span>
                </div>
                <div className="w-full bg-surface-container-high rounded-full h-2.5">
                  <div className={`${item.color} h-2.5 rounded-full transition-all duration-500`} style={{ width: `${(item.value / item.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Distribution */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)]">
          <h3 className="font-semibold text-on-surface mb-1">Phân bổ doanh thu</h3>
          <p className="text-xs text-on-surface-variant mb-6">Theo nguồn thu (ước tính)</p>
          <div className="space-y-4">
            {revenueDistribution.map((item, i) => (
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

      {/* Summary Cards */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)]">
        <h3 className="font-semibold text-on-surface mb-4">Tổng quan nhanh</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: 'hotel', label: 'Phòng đang SD', value: stats.phongDangSD || 0, color: 'text-emerald-600 bg-emerald-50' },
            { icon: 'door_open', label: 'Phòng trống', value: stats.phongTrong || 0, color: 'text-blue-600 bg-blue-50' },
            { icon: 'pending_actions', label: 'Chờ xác nhận', value: stats.bookingsChoDuyet || 0, color: 'text-amber-600 bg-amber-50' },
            { icon: 'calendar_today', label: 'Đơn hôm nay', value: stats.bookingsHomNay || 0, color: 'text-primary bg-amber-50' },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl bg-surface-container-low/50 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                <span className="material-symbols-outlined text-lg">{item.icon}</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-on-surface">{item.value}</p>
                <p className="text-xs text-on-surface-variant">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
