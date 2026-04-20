import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/common/PageHeader';
import { formatVND } from '../../../utils/formatters';
import roomService from '../../../services/roomService';
import { SkeletonCard } from '../../components/common/LoadingSkeleton';

export default function RoomTypesPage() {
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    roomService.getRoomTypes()
      .then(res => {
        if (isMounted) setRoomTypes(Array.isArray(res) ? res : res.data || []);
      })
      .catch(err => console.error("Error fetching room types:", err))
      .finally(() => { if (isMounted) setLoading(false); });
    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return <div className="space-y-6 animate-fade-in"><PageHeader title="Loại phòng" description="Quản lý danh mục loại phòng trong khách sạn" icon="category" /><SkeletonCard /><SkeletonCard /></div>;
  }

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Loại phòng" description="Quản lý danh mục loại phòng trong khách sạn" icon="category"
        actions={<button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-amber-900 transition-colors text-sm shadow-sm"><span className="material-symbols-outlined text-lg">add</span>Thêm loại phòng</button>}
      />
      <div className="bg-surface-container-lowest rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="bg-surface-container-high/50">
              {['Hình ảnh', 'Tên loại phòng', 'Giá mặc định', 'Sức chứa', 'Diện tích', 'Số phòng', 'Thao tác'].map(h => (
                <th key={h} className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant px-5 py-3">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {roomTypes.length === 0 && <tr><td colSpan={7} className="px-5 py-8 text-center text-on-surface-variant text-sm">Không có dữ liệu.</td></tr>}
              {roomTypes.map((r, i) => (
                <tr key={r.MaLoaiPhong || i} className={`${i%2?'bg-surface-container-low/30':''} hover:bg-amber-50/40 transition-colors`}>
                  <td className="px-5 py-3"><div className="w-16 h-12 rounded-lg overflow-hidden bg-surface-container-high"><img src={r.AnhDaiDien || 'https://images.unsplash.com/photo-1618773928120-2c709c6cd49b?q=80&w=300'} alt={r.TenLoai} className="w-full h-full object-cover" /></div></td>
                  <td className="px-5 py-3 text-sm font-semibold text-on-surface font-notoSerif">{r.TenLoai}</td>
                  <td className="px-5 py-3 text-sm font-semibold text-primary">{formatVND(r.GiaMacDinh || r.GiaCoBan)}</td>
                  <td className="px-5 py-3 text-sm text-on-surface-variant">{r.SoNguoiToiDa || r.SoKhachToiDa} khách</td>
                  <td className="px-5 py-3 text-sm text-on-surface-variant">{r.DienTich}m²</td>
                  <td className="px-5 py-3 text-sm font-semibold text-on-surface">{r.phongs_count || r.phongs?.length || 0} phòng</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1">
                      <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-amber-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button>
                      <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button>
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
