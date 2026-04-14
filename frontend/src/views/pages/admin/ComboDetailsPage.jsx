import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import { mockCombos, formatVND } from '../../../data/mockData';

export default function ComboDetailsPage() {
  const combo = mockCombos[0];
  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Chi tiết Gói Combo" description={combo.TenGoi} icon="card_giftcard" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(77,70,53,0.06)]">
          <div className="h-64 overflow-hidden"><img src={combo.AnhDaiDien} alt={combo.TenGoi} className="w-full h-full object-cover" /></div>
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-notoSerif font-bold text-on-surface">{combo.TenGoi}</h2>
            <p className="text-on-surface-variant leading-relaxed">{combo.MoTa}</p>
            <div>
              <h3 className="font-semibold text-on-surface mb-3">Dịch vụ bao gồm</h3>
              <div className="space-y-2">
                {combo.DichVu.map((dv, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl">
                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                    <span className="text-sm text-on-surface">{dv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)]">
            <h3 className="font-semibold text-on-surface mb-4">Thông tin gói</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-on-surface-variant">Giá gói:</span><span className="font-bold text-primary">{formatVND(combo.GiaTrungBinh)}</span></div>
              <div className="flex justify-between"><span className="text-on-surface-variant">Thời gian:</span><span className="font-medium">{combo.SoNgay} ngày {combo.SoNgay - 1} đêm</span></div>
              <div className="flex justify-between"><span className="text-on-surface-variant">Số dịch vụ:</span><span className="font-medium">{combo.DichVu.length}</span></div>
            </div>
          </div>
          <button className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-amber-900 transition-colors">Chỉnh sửa gói</button>
        </div>
      </div>
    </div>
  );
}
