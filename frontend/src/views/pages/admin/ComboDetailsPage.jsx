import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import { formatVND } from '../../../utils/formatters';
import comboService from '../../../services/comboService';
import { SkeletonCard } from '../../components/common/LoadingSkeleton';

export default function ComboDetailsPage() {
  const [searchParams] = useSearchParams();
  const comboId = searchParams.get('id');
  const [combo, setCombo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const fetchCombo = async () => {
      try {
        if (comboId) {
          const res = await comboService.getComboDetail(comboId);
          if (isMounted) setCombo(res);
        } else {
          // If no id param, get first combo from list
          const combos = await comboService.getCombos();
          const list = Array.isArray(combos) ? combos : combos.data || [];
          if (isMounted && list.length > 0) setCombo(list[0]);
        }
      } catch (err) {
        console.error('Failed to fetch combo:', err);
        if (isMounted) setError('Không thể tải thông tin gói combo');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchCombo();
    return () => { isMounted = false; };
  }, [comboId]);

  if (loading) {
    return (
      <div className="animate-fade-in space-y-6">
        <PageHeader title="Chi tiết Gói Combo" description="Đang tải..." icon="card_giftcard" />
        <SkeletonCard />
      </div>
    );
  }

  if (error || !combo) {
    return (
      <div className="animate-fade-in space-y-6">
        <PageHeader title="Chi tiết Gói Combo" description="Lỗi" icon="card_giftcard" />
        <div className="bg-error-container text-error p-8 rounded-2xl text-center">
          <span className="material-symbols-outlined text-3xl mb-2 block">error</span>
          <p>{error || 'Không tìm thấy gói combo'}</p>
          <Link to="/admin/combos" className="text-primary mt-4 inline-block font-semibold hover:underline">← Quay lại danh sách</Link>
        </div>
      </div>
    );
  }

  const dichVus = combo.dich_vus || combo.DichVuChiTiet || [];

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Chi tiết Gói Combo" description={combo.TenGoi} icon="card_giftcard" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(77,70,53,0.06)]">
          <div className="h-64 overflow-hidden bg-surface-container-high">
            <img src={combo.AnhDaiDien || 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80'} alt={combo.TenGoi} className="w-full h-full object-cover" />
          </div>
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-notoSerif font-bold text-on-surface">{combo.TenGoi}</h2>
            <p className="text-on-surface-variant leading-relaxed">{combo.MoTa}</p>
            <div>
              <h3 className="font-semibold text-on-surface mb-3">Dịch vụ bao gồm</h3>
              <div className="space-y-2">
                {dichVus.map((dv, i) => (
                  <div key={dv.MaDV || i} className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl">
                    <span className="material-symbols-outlined text-primary text-lg">{dv.Icon || dv.pivot?.Icon || 'check_circle'}</span>
                    <span className="text-sm text-on-surface flex-1">{dv.TenDV}</span>
                    {(dv.pivot?.SoLuong || dv.SoLuong) && (
                      <span className="text-xs text-on-surface-variant">x{dv.pivot?.SoLuong || dv.SoLuong}</span>
                    )}
                    <span className="text-sm font-semibold text-primary">{formatVND(dv.DonGia || dv.pivot?.DonGia || 0)}</span>
                  </div>
                ))}
                {dichVus.length === 0 && (
                  <p className="text-sm text-on-surface-variant">Chưa có dịch vụ nào</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)]">
            <h3 className="font-semibold text-on-surface mb-4">Thông tin gói</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Giá gốc:</span>
                <span className="font-medium text-on-surface-variant line-through">{formatVND(combo.GiaGoc || 0)}</span>
              </div>
              {combo.PhanTramGiam > 0 && (
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Giảm giá:</span>
                  <span className="font-medium text-emerald-600">-{combo.PhanTramGiam}%</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-surface-container-high">
                <span className="text-on-surface font-semibold">Giá combo:</span>
                <span className="font-bold text-primary text-lg">{formatVND(combo.GiaCombo || combo.GiaTrungBinh || 0)}</span>
              </div>
              <div className="flex justify-between"><span className="text-on-surface-variant">Thời gian:</span><span className="font-medium">{combo.SoNgay} ngày {Math.max(0, combo.SoNgay - 1)} đêm</span></div>
              <div className="flex justify-between"><span className="text-on-surface-variant">Số dịch vụ:</span><span className="font-medium">{dichVus.length}</span></div>
              <div className="flex justify-between"><span className="text-on-surface-variant">Trạng thái:</span><span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${combo.TrangThai === 'Hoạt động' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>{combo.TrangThai || 'Hoạt động'}</span></div>
            </div>
          </div>
          <Link to="/admin/combos" className="block w-full text-center py-3 bg-primary text-white rounded-xl font-medium hover:bg-amber-900 transition-colors">
            Chỉnh sửa gói
          </Link>
        </div>
      </div>
    </div>
  );
}
