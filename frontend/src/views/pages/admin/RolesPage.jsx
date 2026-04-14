import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import { mockRoles } from '../../../data/mockData';

export default function RolesPage() {
  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Phân quyền" description="Quản lý vai trò và quyền truy cập" icon="admin_panel_settings"
        actions={<button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-amber-900 transition-colors text-sm shadow-sm"><span className="material-symbols-outlined text-lg">add</span>Tạo vai trò</button>}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockRoles.map(role => (
          <div key={role.MaVaiTro} className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0_2px_12px_rgba(77,70,53,0.06)] hover:shadow-[0_8px_32px_rgba(77,70,53,0.1)] transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center"><span className="material-symbols-outlined text-xl text-primary">shield_person</span></div>
              <div>
                <h3 className="font-semibold text-on-surface">{role.TenVaiTro}</h3>
                <p className="text-xs text-on-surface-variant">{role.SoNguoiDung} người dùng</p>
              </div>
            </div>
            <p className="text-sm text-on-surface-variant mb-4">{role.MoTa}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {role.Quyen.map((q, i) => (
                <span key={i} className="text-[10px] bg-surface-container-high px-2.5 py-1 rounded-full text-on-surface-variant font-medium">{q}</span>
              ))}
            </div>
            <button className="w-full py-2.5 bg-surface-container-high rounded-xl text-sm font-medium text-on-surface hover:bg-primary-container transition-colors">Chỉnh sửa quyền</button>
          </div>
        ))}
      </div>
    </div>
  );
}
