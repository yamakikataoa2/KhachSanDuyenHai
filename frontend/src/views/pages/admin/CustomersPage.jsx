import React, { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import { mockCustomers, formatVND } from '../../../data/mockData';

export default function CustomersPage() {
  const [search, setSearch] = useState('');
  const filtered = mockCustomers.filter(c => !search || c.HoTen.toLowerCase().includes(search.toLowerCase()) || c.Email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Khách hàng" description="Quản lý thông tin khách hàng" icon="group" />
      <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)]">
        <div className="flex items-center bg-surface-container-high/60 rounded-xl px-3 py-2.5 max-w-md border border-transparent focus-within:border-primary transition-colors">
          <span className="material-symbols-outlined text-on-surface-variant text-lg mr-2">search</span>
          <input type="text" placeholder="Tìm khách hàng..." className="bg-transparent outline-none text-sm w-full text-on-surface" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="bg-surface-container-lowest rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)] overflow-hidden overflow-x-auto">
        <table className="w-full">
          <thead><tr className="bg-surface-container-high/50">
            {['Khách hàng', 'Email', 'Điện thoại', 'Địa chỉ', 'Số lần đặt', 'Tổng chi tiêu', 'Thao tác'].map(h => (
              <th key={h} className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant px-5 py-3">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr key={c.MaKH} className={`${i%2?'bg-surface-container-low/30':''} hover:bg-amber-50/40 transition-colors`}>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-sm">{c.HoTen.charAt(0)}</div>
                    <span className="text-sm font-medium text-on-surface">{c.HoTen}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-sm text-on-surface-variant">{c.Email}</td>
                <td className="px-5 py-3.5 text-sm text-on-surface-variant">{c.SoDienThoai}</td>
                <td className="px-5 py-3.5 text-sm text-on-surface-variant">{c.DiaChi}</td>
                <td className="px-5 py-3.5 text-sm font-semibold text-on-surface text-center">{c.SoLanDat}</td>
                <td className="px-5 py-3.5 text-sm font-semibold text-primary">{formatVND(c.TongChiTieu)}</td>
                <td className="px-5 py-3.5">
                  <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-amber-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">visibility</span></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
