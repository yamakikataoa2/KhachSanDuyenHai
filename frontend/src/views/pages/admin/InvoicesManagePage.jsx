import React, { useState, useEffect, useMemo } from 'react';
import PageHeader from '../../components/common/PageHeader';
import StatCard from '../../components/common/StatCard';
import StatusBadge from '../../components/common/StatusBadge';
import EmptyState from '../../components/common/EmptyState';
import { formatVND, formatDate } from '../../../utils/formatters';
import adminService from '../../../services/adminService';
import { SkeletonCard } from '../../components/common/LoadingSkeleton';

export default function InvoicesManagePage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [methodFilter, setMethodFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    let isMounted = true;
    adminService.getInvoices()
      .then(res => {
        if (isMounted) setInvoices(Array.isArray(res) ? res : res.data || []);
      })
      .catch(err => console.error("Error fetching invoices:", err))
      .finally(() => { if (isMounted) setLoading(false); });
    return () => { isMounted = false; };
  }, []);

  // Stats
  const totalInvoices = invoices.length;
  const unpaid = invoices.filter(i => i.TrangThaiThanhToan !== 'Đã thanh toán').length;
  const paid = invoices.filter(i => i.TrangThaiThanhToan === 'Đã thanh toán').length;
  const totalRevenue = invoices
    .filter(i => i.TrangThaiThanhToan === 'Đã thanh toán')
    .reduce((sum, i) => sum + (Number(i.TongThanhToan) || 0), 0);

  // Filtered data
  const filteredInvoices = useMemo(() => {
    return invoices.filter(inv => {
      const customerName = inv.phieu_dat_phong?.khach_hang?.HoTen || '';
      const email = inv.phieu_dat_phong?.khach_hang?.Email || '';
      const matchSearch = !search || 
        (inv.MaHoaDon && inv.MaHoaDon.toLowerCase().includes(search.toLowerCase())) ||
        customerName.toLowerCase().includes(search.toLowerCase()) ||
        email.toLowerCase().includes(search.toLowerCase());
      const matchStatus = !statusFilter || inv.TrangThaiThanhToan === statusFilter;
      const matchMethod = !methodFilter || inv.PhuongThucThanhToan === methodFilter;
      const matchDate = !dateFilter || formatDate(inv.NgayLap) === formatDate(dateFilter);
      return matchSearch && matchStatus && matchMethod && matchDate;
    });
  }, [invoices, search, statusFilter, methodFilter, dateFilter]);

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('');
    setMethodFilter('');
    setDateFilter('');
  };

  if (loading) {
    return (
       <div className="animate-fade-in space-y-6">
          <PageHeader title="Quản lý Hóa đơn" description="Theo dõi và quản lý toàn bộ hóa đơn thanh toán" icon="payments" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
             <SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard />
          </div>
       </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader 
        title="Quản lý Hóa đơn" 
        description="Theo dõi và quản lý toàn bộ hóa đơn thanh toán"
        icon="payments"
        actions={
          <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-amber-900 transition-colors text-sm shadow-sm">
            <span className="material-symbols-outlined text-lg">add</span>
            Tạo hóa đơn
          </button>
        }
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="receipt" label="Tổng hóa đơn" value={totalInvoices} color="primary" />
        <StatCard icon="pending" label="Chưa thanh toán" value={unpaid} subtitle="Cần xử lý" color="warning" />
        <StatCard icon="check_circle" label="Đã thanh toán" value={paid} color="success" />
        <StatCard icon="account_balance" label="Doanh thu" value={formatVND(totalRevenue)} subtitle="Từ hóa đơn đã thanh toán" color="info" />
      </div>

      {/* Filters */}
      <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)]">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[220px]">
            <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant mb-1.5">Tìm kiếm</label>
            <div className="flex items-center bg-surface-container-high/60 rounded-xl px-3 py-2.5 border border-transparent focus-within:border-primary transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant text-lg mr-2">search</span>
              <input 
                type="text" 
                placeholder="Mã hóa đơn hoặc tên khách hàng..." 
                className="bg-transparent outline-none text-sm w-full text-on-surface placeholder:text-on-surface-variant/50" 
                value={search} 
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="min-w-[160px]">
            <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant mb-1.5">Trạng thái</label>
            <select 
              className="w-full bg-surface-container-high/60 rounded-xl px-3 py-2.5 text-sm outline-none border border-transparent focus:border-primary transition-colors cursor-pointer text-on-surface"
              value={statusFilter} 
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="">Tất cả</option>
              <option value="Đã thanh toán">Đã thanh toán</option>
              <option value="Chưa thanh toán">Chưa thanh toán</option>
              <option value="Đang xử lý">Đang xử lý</option>
              <option value="Đã hủy">Đã hủy</option>
            </select>
          </div>
          <div className="min-w-[160px]">
            <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant mb-1.5">Phương thức</label>
            <select 
              className="w-full bg-surface-container-high/60 rounded-xl px-3 py-2.5 text-sm outline-none border border-transparent focus:border-primary transition-colors cursor-pointer text-on-surface"
              value={methodFilter} 
              onChange={e => setMethodFilter(e.target.value)}
            >
              <option value="">Tất cả</option>
              <option value="Thẻ tín dụng">Thẻ tín dụng</option>
              <option value="Chuyển khoản">Chuyển khoản</option>
              <option value="Tiền mặt">Tiền mặt</option>
            </select>
          </div>
          <div className="min-w-[160px]">
            <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant mb-1.5">Ngày lập</label>
            <input 
              type="date" 
              className="w-full bg-surface-container-high/60 rounded-xl px-3 py-2.5 text-sm outline-none border border-transparent focus:border-primary transition-colors text-on-surface"
              value={dateFilter} 
              onChange={e => setDateFilter(e.target.value)}
            />
          </div>
          {(search || statusFilter || methodFilter || dateFilter) && (
            <button onClick={clearFilters} className="text-sm text-red-500 hover:text-red-700 font-medium px-3 py-2.5 hover:bg-red-50 rounded-xl transition-colors">
              Xóa bộ lọc
            </button>
          )}
        </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)] overflow-hidden">
        {filteredInvoices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-container-high/50">
                  <th className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant px-6 py-3.5">Mã hóa đơn</th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant px-6 py-3.5">Khách hàng</th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant px-6 py-3.5">Phiếu đặt</th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant px-6 py-3.5">Ngày lập</th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant px-6 py-3.5">Tổng tiền</th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant px-6 py-3.5">Trạng thái</th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant px-6 py-3.5">Phương thức</th>
                  <th className="text-right text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant px-6 py-3.5">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((inv, idx) => (
                  <tr key={inv.MaHoaDon || idx} className={`${idx % 2 === 0 ? '' : 'bg-surface-container-low/30'} hover:bg-amber-50/40 transition-colors`}>
                    <td className="px-6 py-4 text-sm font-mono font-semibold text-primary">{inv.MaHoaDon || `HD${inv.MaPhieuDat}`}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-on-surface">{inv.phieu_dat_phong?.khach_hang?.HoTen || 'N/A'}</p>
                        <p className="text-xs text-on-surface-variant">{inv.phieu_dat_phong?.khach_hang?.Email || 'N/A'}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant font-mono">{inv.MaPhieuDat}</td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">{formatDate(inv.NgayLap)}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-on-surface">{formatVND(inv.TongThanhToan)}</td>
                    <td className="px-6 py-4"><StatusBadge status={inv.TrangThaiThanhToan} /></td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-on-surface-variant flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm">
                          {inv.PhuongThucThanhToan === 'Thẻ tín dụng' ? 'credit_card' : 
                           inv.PhuongThucThanhToan === 'Chuyển khoản' ? 'account_balance' : 'payments'}
                        </span>
                        {inv.PhuongThucThanhToan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 text-slate-400 hover:text-primary hover:bg-amber-50 rounded-lg transition-colors" title="Xem chi tiết">
                          <span className="material-symbols-outlined text-lg">visibility</span>
                        </button>
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Cập nhật">
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="In hóa đơn">
                          <span className="material-symbols-outlined text-lg">print</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState 
            icon="search_off"
            title="Không tìm thấy hóa đơn"
            description="Không có hóa đơn nào phù hợp với bộ lọc. Thử thay đổi điều kiện tìm kiếm."
            actionLabel="Xóa bộ lọc"
            onAction={clearFilters}
          />
        )}

        {/* Pagination */}
        {filteredInvoices.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-surface-container-high/50">
            <p className="text-sm text-on-surface-variant">
              Hiển thị <span className="font-semibold text-on-surface">{filteredInvoices.length}</span> / {invoices.length} hóa đơn
            </p>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1.5 text-sm text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors">Trước</button>
              <button className="px-3 py-1.5 text-sm bg-primary text-white rounded-lg font-medium">1</button>
              <button className="px-3 py-1.5 text-sm text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors">Sau</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
