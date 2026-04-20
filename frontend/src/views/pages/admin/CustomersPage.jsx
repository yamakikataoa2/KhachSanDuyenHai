import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/common/PageHeader';
import { formatVND } from '../../../utils/formatters';
import adminService from '../../../services/adminService';
import { SkeletonCard } from '../../components/common/LoadingSkeleton';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let isMounted = true;
    adminService.getCustomers()
      .then(res => {
        if (isMounted) setCustomers(Array.isArray(res) ? res : res.data || []);
      })
      .catch(err => console.error("Error fetching customers:", err))
      .finally(() => { if (isMounted) setLoading(false); });
    return () => { isMounted = false; };
  }, []);

  const filtered = customers.filter(c => 
    !search || 
    (c.HoTen && c.HoTen.toLowerCase().includes(search.toLowerCase())) || 
    (c.Email && c.Email.toLowerCase().includes(search.toLowerCase())) ||
    (c.SoDienThoai && c.SoDienThoai.includes(search))
  );

  if (loading) {
     return <div className="space-y-6 animate-fade-in"><PageHeader title="Khách hàng" description="Quản lý thông tin khách hàng" icon="group" /><SkeletonCard /><SkeletonCard /></div>;
  }

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Khách hàng" description="Quản lý thông tin khách hàng" icon="group" />
      <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)]">
        <div className="flex items-center bg-surface-container-high/60 rounded-xl px-3 py-2.5 max-w-md border border-transparent focus-within:border-primary transition-colors">
          <span className="material-symbols-outlined text-on-surface-variant text-lg mr-2">search</span>
          <input type="text" placeholder="Tìm tên, email hoặc số điện thoại..." className="bg-transparent outline-none text-sm w-full text-on-surface" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="bg-surface-container-lowest rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)] overflow-hidden overflow-x-auto">
        <table className="w-full">
          <thead><tr className="bg-surface-container-high/50">
            {['Khách hàng', 'Email', 'Điện thoại', 'Địa chỉ', 'Số lần đặt', 'CMND/CCCD', 'Thao tác'].map(h => (
              <th key={h} className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant px-5 py-3">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr key={c.MaKhachHang || i} className={`${i%2?'bg-surface-container-low/30':''} hover:bg-amber-50/40 transition-colors`}>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-sm">{(c.HoTen || 'K').charAt(0)}</div>
                    <span className="text-sm font-medium text-on-surface">{c.HoTen}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-sm text-on-surface-variant">{c.Email || '—'}</td>
                <td className="px-5 py-3.5 text-sm text-on-surface-variant">{c.SoDienThoai || '—'}</td>
                <td className="px-5 py-3.5 text-sm text-on-surface-variant">{c.DiaChi || '—'}</td>
                <td className="px-5 py-3.5 text-sm font-semibold text-on-surface text-center">{c.phieu_dat_phong_count || 0}</td>
                <td className="px-5 py-3.5 text-sm font-semibold text-on-surface-variant">{c.CCCD_CMND || '—'}</td>
                <td className="px-5 py-3.5">
                  <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-amber-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">visibility</span></button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="px-5 py-8 text-center text-on-surface-variant text-sm">Không tìm thấy khách hàng nào.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
