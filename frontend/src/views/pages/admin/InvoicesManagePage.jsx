import React, { useState, useEffect, useMemo } from 'react';
import PageHeader from '../../components/common/PageHeader';
import StatCard from '../../components/common/StatCard';
import StatusBadge from '../../components/common/StatusBadge';
import EmptyState from '../../components/common/EmptyState';
import { formatVND, formatDate } from '../../../utils/formatters';
import invoiceService from '../../../services/invoiceService';
import { SkeletonCard } from '../../components/common/LoadingSkeleton';

export default function InvoicesManagePage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [methodFilter, setMethodFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [page, setPage] = useState(1);
  const [editModal, setEditModal] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saving, setSaving] = useState(false);
  const perPage = 15;

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const res = await invoiceService.getAllInvoices();
      setInvoices(Array.isArray(res) ? res : res.data || []);
    } catch (err) {
      console.error("Error fetching invoices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchInvoices(); }, []);

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
        (inv.MaHoaDon && inv.MaHoaDon.toString().includes(search)) ||
        customerName.toLowerCase().includes(search.toLowerCase()) ||
        email.toLowerCase().includes(search.toLowerCase());
      const matchStatus = !statusFilter || inv.TrangThaiThanhToan === statusFilter;
      const matchMethod = !methodFilter || inv.PhuongThucThanhToan === methodFilter;
      const matchDate = !dateFilter || formatDate(inv.NgayLap) === formatDate(dateFilter);
      return matchSearch && matchStatus && matchMethod && matchDate;
    });
  }, [invoices, search, statusFilter, methodFilter, dateFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredInvoices.length / perPage);
  const paginatedInvoices = filteredInvoices.slice((page - 1) * perPage, page * perPage);

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('');
    setMethodFilter('');
    setDateFilter('');
    setPage(1);
  };

  // Update invoice
  const handleUpdateInvoice = async (id, data) => {
    setSaving(true);
    try {
      await invoiceService.updateInvoice(id, data);
      await fetchInvoices();
      setEditModal(null);
    } catch (err) {
      alert('Lỗi: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  // Delete invoice
  const handleDeleteInvoice = async (id) => {
    setSaving(true);
    try {
      await invoiceService.deleteInvoice(id);
      await fetchInvoices();
      setDeleteConfirm(null);
    } catch (err) {
      alert('Lỗi: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
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
              <input type="text" placeholder="Mã hóa đơn hoặc tên khách hàng..." className="bg-transparent outline-none text-sm w-full text-on-surface placeholder:text-on-surface-variant/50" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
            </div>
          </div>
          <div className="min-w-[160px]">
            <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant mb-1.5">Trạng thái</label>
            <select className="w-full bg-surface-container-high/60 rounded-xl px-3 py-2.5 text-sm outline-none border border-transparent focus:border-primary transition-colors cursor-pointer text-on-surface" value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
              <option value="">Tất cả</option>
              <option value="Đã thanh toán">Đã thanh toán</option>
              <option value="Chưa thanh toán">Chưa thanh toán</option>
            </select>
          </div>
          <div className="min-w-[160px]">
            <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant mb-1.5">Phương thức</label>
            <select className="w-full bg-surface-container-high/60 rounded-xl px-3 py-2.5 text-sm outline-none border border-transparent focus:border-primary transition-colors cursor-pointer text-on-surface" value={methodFilter} onChange={e => { setMethodFilter(e.target.value); setPage(1); }}>
              <option value="">Tất cả</option>
              <option value="Thẻ tín dụng">Thẻ tín dụng</option>
              <option value="Chuyển khoản">Chuyển khoản</option>
              <option value="Tiền mặt">Tiền mặt</option>
            </select>
          </div>
          {(search || statusFilter || methodFilter || dateFilter) && (
            <button onClick={clearFilters} className="text-sm text-red-500 hover:text-red-700 font-medium px-3 py-2.5 hover:bg-red-50 rounded-xl transition-colors">Xóa bộ lọc</button>
          )}
        </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)] overflow-hidden">
        {paginatedInvoices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-container-high/50">
                  <th className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant px-6 py-3.5">Mã HĐ</th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant px-6 py-3.5">Khách hàng</th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant px-6 py-3.5">Ngày lập</th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant px-6 py-3.5">Tổng tiền</th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant px-6 py-3.5">Trạng thái</th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant px-6 py-3.5">Phương thức</th>
                  <th className="text-right text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant px-6 py-3.5">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {paginatedInvoices.map((inv, idx) => (
                  <tr key={inv.MaHoaDon || idx} className={`${idx % 2 === 0 ? '' : 'bg-surface-container-low/30'} hover:bg-amber-50/40 transition-colors`}>
                    <td className="px-6 py-4 text-sm font-mono font-semibold text-primary">{inv.MaHoaDon}</td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-on-surface">{inv.phieu_dat_phong?.khach_hang?.HoTen || 'N/A'}</p>
                      <p className="text-xs text-on-surface-variant">{inv.phieu_dat_phong?.khach_hang?.Email || ''}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">{formatDate(inv.NgayLap)}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-on-surface">{formatVND(inv.TongThanhToan)}</td>
                    <td className="px-6 py-4"><StatusBadge status={inv.TrangThaiThanhToan} /></td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-on-surface-variant flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm">
                          {inv.PhuongThucThanhToan === 'Thẻ tín dụng' ? 'credit_card' : inv.PhuongThucThanhToan === 'Chuyển khoản' ? 'account_balance' : 'payments'}
                        </span>
                        {inv.PhuongThucThanhToan || '—'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {inv.TrangThaiThanhToan !== 'Đã thanh toán' && (
                          <button onClick={() => setEditModal(inv)} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Thanh toán">
                            <span className="material-symbols-outlined text-lg">check_circle</span>
                          </button>
                        )}
                        <button onClick={() => window.print()} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="In hóa đơn">
                          <span className="material-symbols-outlined text-lg">print</span>
                        </button>
                        <button onClick={() => setDeleteConfirm(inv)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Xóa">
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState icon="search_off" title="Không tìm thấy hóa đơn" description="Không có hóa đơn nào phù hợp với bộ lọc." actionLabel="Xóa bộ lọc" onAction={clearFilters} />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-surface-container-high/50">
            <p className="text-sm text-on-surface-variant">
              Hiển thị <span className="font-semibold text-on-surface">{(page - 1) * perPage + 1}-{Math.min(page * perPage, filteredInvoices.length)}</span> / {filteredInvoices.length} hóa đơn
            </p>
            <div className="flex items-center gap-1">
              <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1.5 text-sm text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors disabled:opacity-30">Trước</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setPage(i + 1)} className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${page === i + 1 ? 'bg-primary text-white font-medium' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>{i + 1}</button>
              ))}
              <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1.5 text-sm text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors disabled:opacity-30">Sau</button>
            </div>
          </div>
        )}
      </div>

      {/* Edit/Pay Modal */}
      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setEditModal(null)} />
          <div className="relative bg-surface-container-lowest rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <h3 className="text-lg font-bold text-on-surface mb-4">Thanh toán hóa đơn #{editModal.MaHoaDon}</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Tổng tiền</span><span className="font-bold text-primary">{formatVND(editModal.TongThanhToan)}</span></div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Phương thức thanh toán</label>
                <select id="payMethod" defaultValue={editModal.PhuongThucThanhToan || 'Tiền mặt'} className="w-full bg-surface-container-high/60 rounded-xl px-3 py-2.5 text-sm outline-none border border-transparent focus:border-primary text-on-surface">
                  <option value="Tiền mặt">Tiền mặt</option>
                  <option value="Chuyển khoản">Chuyển khoản</option>
                  <option value="Thẻ tín dụng">Thẻ tín dụng</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setEditModal(null)} className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-colors">Hủy</button>
              <button disabled={saving} onClick={() => {
                const method = document.getElementById('payMethod').value;
                handleUpdateInvoice(editModal.MaHoaDon, { TrangThaiThanhToan: 'Đã thanh toán', PhuongThucThanhToan: method });
              }} className="px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50">
                {saving ? 'Đang xử lý...' : 'Xác nhận thanh toán'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          <div className="relative bg-surface-container-lowest rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-scale-in">
            <h3 className="text-lg font-bold text-on-surface mb-2">Xác nhận xóa</h3>
            <p className="text-sm text-on-surface-variant mb-6">Bạn chắc chắn muốn xóa hóa đơn <strong className="text-primary">#{deleteConfirm.MaHoaDon}</strong>? Thao tác này không thể hoàn tác.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-colors">Hủy</button>
              <button disabled={saving} onClick={() => handleDeleteInvoice(deleteConfirm.MaHoaDon)} className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50">
                {saving ? 'Đang xóa...' : 'Xóa'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
