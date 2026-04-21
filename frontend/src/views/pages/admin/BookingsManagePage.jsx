import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import StatCard from '../../components/common/StatCard';
import StatusBadge from '../../components/common/StatusBadge';
import { formatVND, formatDate } from '../../../utils/formatters';
import bookingService from '../../../services/bookingService';
import { SkeletonCard } from '../../components/common/LoadingSkeleton';

export default function BookingsManagePage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await bookingService.getAllBookings();
      setBookings(Array.isArray(res) ? res : res.data || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const stats = useMemo(() => ({
    total: bookings.length,
    pending: bookings.filter(b => b.TrangThai === 'Chờ xác nhận').length,
    checkedIn: bookings.filter(b => b.TrangThai === 'Đã nhận phòng').length,
    checkedOut: bookings.filter(b => b.TrangThai === 'Đã trả phòng').length,
  }), [bookings]);

  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const customerName = b.khach_hang?.HoTen || '';
      const matchSearch = !search ||
        (b.MaPhieuDat && b.MaPhieuDat.toString().includes(search)) ||
        customerName.toLowerCase().includes(search.toLowerCase());
      const matchStatus = !statusFilter || b.TrangThai === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [bookings, search, statusFilter]);

  const handleStatusChange = async (id, newStatus) => {
    setStatusUpdating(id);
    try {
      await bookingService.updateBookingStatus(id, { TrangThai: newStatus });
      await fetchBookings();
    } catch (err) {
      alert('Lỗi: ' + (err.response?.data?.message || err.message));
    } finally {
      setStatusUpdating(null);
      setShowConfirmModal(null);
    }
  };

  const getNextActions = (status) => {
    switch (status) {
      case 'Chờ xác nhận': return [
        { label: 'Nhận phòng', status: 'Đã nhận phòng', icon: 'login', color: 'text-emerald-600 hover:bg-emerald-50' },
        { label: 'Hủy', status: 'Đã hủy', icon: 'cancel', color: 'text-red-500 hover:bg-red-50' },
      ];
      case 'Đã nhận phòng': return [
        { label: 'Trả phòng', status: 'Đã trả phòng', icon: 'logout', color: 'text-blue-600 hover:bg-blue-50' },
      ];
      default: return [];
    }
  };

  if (loading) {
    return <div className="space-y-6 animate-fade-in"><PageHeader title="Quản lý Đặt phòng" description="Xem và xử lý đơn đặt phòng" icon="receipt_long" /><SkeletonCard /><SkeletonCard /></div>;
  }

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Quản lý Đặt phòng" description="Xem và xử lý đơn đặt phòng" icon="receipt_long" />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="receipt_long" label="Tổng đơn" value={stats.total} color="primary" />
        <StatCard icon="pending" label="Chờ xác nhận" value={stats.pending} color="warning" />
        <StatCard icon="login" label="Đã nhận phòng" value={stats.checkedIn} color="success" />
        <StatCard icon="logout" label="Đã trả phòng" value={stats.checkedOut} color="info" />
      </div>

      {/* Filters */}
      <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)]">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[220px]">
            <div className="flex items-center bg-surface-container-high/60 rounded-xl px-3 py-2.5 border border-transparent focus-within:border-primary transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant text-lg mr-2">search</span>
              <input type="text" placeholder="Tìm mã đơn hoặc khách hàng..." className="bg-transparent outline-none text-sm w-full text-on-surface" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
          <div className="min-w-[160px]">
            <select className="w-full bg-surface-container-high/60 rounded-xl px-3 py-2.5 text-sm outline-none border border-transparent focus:border-primary transition-colors cursor-pointer text-on-surface"
              value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="">Tất cả trạng thái</option>
              <option value="Chờ xác nhận">Chờ xác nhận</option>
              <option value="Đã nhận phòng">Đã nhận phòng</option>
              <option value="Đã trả phòng">Đã trả phòng</option>
              <option value="Đã hủy">Đã hủy</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-container-high/50">
                {['Mã đơn', 'Khách hàng', 'Phòng', 'Check-in', 'Check-out', 'Combo', 'Trạng thái', 'Thao tác'].map(h => (
                  <th key={h} className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 && (
                <tr><td colSpan={8} className="px-5 py-8 text-center text-on-surface-variant text-sm">Không tìm thấy đơn đặt phòng.</td></tr>
              )}
              {filteredBookings.map((b, i) => (
                <tr key={b.MaPhieuDat || i} className={`${i % 2 ? 'bg-surface-container-low/30' : ''} hover:bg-amber-50/40 transition-colors`}>
                  <td className="px-5 py-3.5 text-sm font-mono font-semibold text-primary">{b.MaPhieuDat}</td>
                  <td className="px-5 py-3.5">
                    <p className="text-sm font-medium text-on-surface">{b.khach_hang?.HoTen || 'N/A'}</p>
                    <p className="text-xs text-on-surface-variant">{b.khach_hang?.SoDienThoai || ''}</p>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-on-surface-variant">{b.chi_tiet_dat_phongs?.[0]?.phong?.loai_phong?.TenLoai || 'N/A'}</td>
                  <td className="px-5 py-3.5 text-sm text-on-surface-variant">{formatDate(b.NgayNhanDuKien)}</td>
                  <td className="px-5 py-3.5 text-sm text-on-surface-variant">{formatDate(b.NgayTraDuKien)}</td>
                  <td className="px-5 py-3.5 text-sm text-on-surface-variant">
                    {b.goi_combo ? <span className="bg-primary-container/30 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">{b.goi_combo.TenGoi}</span> : '—'}
                  </td>
                  <td className="px-5 py-3.5"><StatusBadge status={b.TrangThai} /></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <Link to={`/admin/bookings/${b.MaPhieuDat}`} className="p-1.5 text-slate-400 hover:text-primary hover:bg-amber-50 rounded-lg transition-colors" title="Xem chi tiết">
                        <span className="material-symbols-outlined text-lg">visibility</span>
                      </Link>
                      {getNextActions(b.TrangThai).map(action => (
                        <button key={action.status} 
                          disabled={statusUpdating === b.MaPhieuDat}
                          onClick={() => setShowConfirmModal({ id: b.MaPhieuDat, ...action })}
                          className={`p-1.5 ${action.color} rounded-lg transition-colors disabled:opacity-50`} 
                          title={action.label}>
                          <span className="material-symbols-outlined text-lg">{action.icon}</span>
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowConfirmModal(null)} />
          <div className="relative bg-surface-container-lowest rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-scale-in">
            <h3 className="text-lg font-bold text-on-surface mb-2">Xác nhận thao tác</h3>
            <p className="text-sm text-on-surface-variant mb-6">
              Bạn muốn <strong>{showConfirmModal.label}</strong> cho đơn <strong className="text-primary">#{showConfirmModal.id}</strong>?
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowConfirmModal(null)} className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-colors">
                Hủy bỏ
              </button>
              <button 
                onClick={() => handleStatusChange(showConfirmModal.id, showConfirmModal.status)}
                disabled={statusUpdating}
                className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-xl hover:bg-amber-900 transition-colors disabled:opacity-50">
                {statusUpdating ? 'Đang xử lý...' : 'Xác nhận'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
