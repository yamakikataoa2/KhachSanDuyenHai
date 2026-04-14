import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import StatusBadge from '../../components/common/StatusBadge';
import { mockStaff } from '../../../data/mockData';

export default function StaffPage() {
  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Nhân viên" description="Quản lý đội ngũ nhân viên khách sạn" icon="badge"
        actions={<button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-amber-900 transition-colors text-sm shadow-sm"><span className="material-symbols-outlined text-lg">person_add</span>Thêm nhân viên</button>}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockStaff.map(nv => (
          <div key={nv.MaNV} className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0_2px_12px_rgba(77,70,53,0.06)] hover:shadow-[0_8px_32px_rgba(77,70,53,0.1)] transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-lg flex-shrink-0">{nv.HoTen.charAt(0)}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-on-surface text-sm">{nv.HoTen}</h3>
                <p className="text-xs text-primary font-medium">{nv.ChucVu}</p>
                <p className="text-xs text-on-surface-variant mt-0.5">{nv.PhongBan}</p>
              </div>
              <StatusBadge status={nv.TrangThai} />
            </div>
            <div className="mt-4 pt-4 border-t border-surface-container-high space-y-2 text-xs text-on-surface-variant">
              <div className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">email</span>{nv.Email}</div>
              <div className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">phone</span>{nv.SoDienThoai}</div>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 text-center py-2 bg-surface-container-high rounded-xl text-xs font-medium text-on-surface hover:bg-primary-container transition-colors">Chỉnh sửa</button>
              <button className="px-3 py-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
