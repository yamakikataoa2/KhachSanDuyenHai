import React, { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import StatusBadge from '../../components/common/StatusBadge';
import { mockBookings, formatVND, formatDate } from '../../../data/mockData';

export default function BookingsManagePage() {
  const [search, setSearch] = useState('');
  const filteredBookings = mockBookings.filter(b =>
    !search || b.MaPhieuDat.toLowerCase().includes(search.toLowerCase()) || b.KhachHang.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Quản lý Đặt phòng" description="Xem và xử lý đơn đặt phòng" icon="receipt_long"
        actions={<button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-amber-900 transition-colors text-sm shadow-sm"><span className="material-symbols-outlined text-lg">add</span>Tạo đơn mới</button>}
      />
      <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)]">
        <div className="flex items-center bg-surface-container-high/60 rounded-xl px-3 py-2.5 max-w-md border border-transparent focus-within:border-primary transition-colors">
          <span className="material-symbols-outlined text-on-surface-variant text-lg mr-2">search</span>
          <input type="text" placeholder="Tìm mã đơn hoặc khách hàng..." className="bg-transparent outline-none text-sm w-full text-on-surface" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="bg-surface-container-lowest rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-container-high/50">
                {['Mã đơn', 'Khách hàng', 'Phòng', 'Check-in', 'Check-out', 'Số khách', 'Tổng tiền', 'Trạng thái', 'Thao tác'].map(h => (
                  <th key={h} className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((b, i) => (
                <tr key={b.MaPhieuDat} className={`${i % 2 ? 'bg-surface-container-low/30' : ''} hover:bg-amber-50/40 transition-colors`}>
                  <td className="px-5 py-3.5 text-sm font-mono font-semibold text-primary">{b.MaPhieuDat}</td>
                  <td className="px-5 py-3.5 text-sm text-on-surface">{b.KhachHang}</td>
                  <td className="px-5 py-3.5 text-sm text-on-surface-variant">{b.LoaiPhong}</td>
                  <td className="px-5 py-3.5 text-sm text-on-surface-variant">{formatDate(b.NgayNhanPhong)}</td>
                  <td className="px-5 py-3.5 text-sm text-on-surface-variant">{formatDate(b.NgayTraPhong)}</td>
                  <td className="px-5 py-3.5 text-sm text-on-surface-variant text-center">{b.SoKhach}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-on-surface">{formatVND(b.TongTien)}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={b.TrangThai} /></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-amber-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">visibility</span></button>
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
