import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/common/PageHeader';
import StatusBadge from '../../components/common/StatusBadge';
import { formatVND } from '../../../utils/formatters';
import adminService from '../../../services/adminService';
import { SkeletonCard } from '../../components/common/LoadingSkeleton';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    adminService.getServices()
      .then(res => {
        if (isMounted) setServices(Array.isArray(res) ? res : res.data || []);
      })
      .catch(err => console.error("Error fetching services:", err))
      .finally(() => { if (isMounted) setLoading(false); });
    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return <div className="space-y-6 animate-fade-in"><PageHeader title="Dịch vụ" description="Quản lý dịch vụ khách sạn" icon="room_service" /><div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"><SkeletonCard /></div></div>;
  }

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Dịch vụ" description="Quản lý dịch vụ khách sạn" icon="room_service"
        actions={<button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-amber-900 transition-colors text-sm shadow-sm"><span className="material-symbols-outlined text-lg">add</span>Thêm dịch vụ</button>}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {services.length === 0 && <p className="text-on-surface-variant text-sm">Không có dữ liệu.</p>}
        {services.map(svc => (
          <div key={svc.MaDichVu || svc.MaDV} className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0_2px_12px_rgba(77,70,53,0.06)] hover:shadow-[0_8px_32px_rgba(77,70,53,0.1)] transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center group-hover:bg-primary-container transition-colors"><span className="material-symbols-outlined text-2xl text-primary">{svc.Icon || 'room_service'}</span></div>
              <StatusBadge status={svc.TrangThai} />
            </div>
            <h3 className="font-semibold text-on-surface font-notoSerif mb-2">{svc.TenDichVu || svc.TenDV}</h3>
            <p className="text-xs text-on-surface-variant mb-4 leading-relaxed line-clamp-2">{svc.MoTa}</p>
            <div className="flex items-center justify-between pt-3 border-t border-surface-container-high">
              <span className="text-primary font-bold text-sm">{svc.Gia > 0 ? `${formatVND(svc.Gia)}/${svc.DonViTinh || svc.DonVi}` : 'Miễn phí'}</span>
              <div className="flex gap-1">
                <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-amber-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button>
                <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
