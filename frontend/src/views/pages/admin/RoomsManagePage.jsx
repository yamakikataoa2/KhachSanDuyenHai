import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import StatusBadge from '../../components/common/StatusBadge';
import { mockRooms, formatVND } from '../../../data/mockData';

export default function RoomsManagePage() {
  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Quản lý Phòng nghỉ" description="Danh sách và quản lý toàn bộ phòng trong khách sạn" icon="bed"
        actions={<button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-amber-900 transition-colors text-sm shadow-sm"><span className="material-symbols-outlined text-lg">add</span>Thêm phòng</button>}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockRooms.map((room) => (
          <div key={room.MaLoaiPhong} className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(77,70,53,0.06)] hover:shadow-[0_8px_32px_rgba(77,70,53,0.1)] transition-all duration-300 group">
            <div className="h-48 overflow-hidden relative">
              <img alt={room.TenLoai} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={room.AnhDaiDien} />
              <div className="absolute top-3 right-3">
                <StatusBadge status="Hoạt động" />
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-on-surface font-notoSerif">{room.TenLoai}</h3>
                <span className="text-primary font-bold text-sm">{formatVND(room.GiaMacDinh)}<span className="text-xs text-on-surface-variant font-normal">/đêm</span></span>
              </div>
              <div className="flex gap-4 text-xs text-on-surface-variant mb-4">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">group</span>{room.SoNguoiToiDa} khách</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">square_foot</span>{room.DienTich}m²</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 text-center py-2 bg-surface-container-high rounded-lg text-sm font-medium text-on-surface hover:bg-primary-container transition-colors">Sửa</button>
                <button className="px-3 py-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
