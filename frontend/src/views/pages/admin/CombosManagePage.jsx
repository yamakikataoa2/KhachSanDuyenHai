import React, { useState, useEffect, useMemo } from 'react';
import PageHeader from '../../components/common/PageHeader';
import { formatVND } from '../../../utils/formatters';
import comboService from '../../../services/comboService';
import adminService from '../../../services/adminService';
import { SkeletonCard } from '../../components/common/LoadingSkeleton';

export default function CombosManagePage() {
  const [combos, setCombos] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCombo, setSelectedCombo] = useState(null);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      comboService.getAllCombos(),
      adminService.getServices()
    ]).then(([combosRes, servicesRes]) => {
      if (isMounted) {
        setCombos(combosRes);
        setAllServices(servicesRes);
      }
    }).catch(err => {
      console.error("Failed to fetch combos and services", err);
    }).finally(() => {
      if (isMounted) setLoading(false);
    });
    return () => { isMounted = false; };
  }, []);

  if (loading) {
     return <div className="space-y-6 animate-fade-in"><PageHeader title="Quản lý Gói Combo" description="Tạo và quản lý các gói combo ưu đãi" icon="card_giftcard" /><div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"><SkeletonCard /><SkeletonCard /><SkeletonCard /></div></div>;
  }

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Quản lý Gói Combo" description="Tạo và quản lý các gói combo ưu đãi" icon="card_giftcard"
        actions={
          <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-amber-900 transition-colors text-sm shadow-sm">
            <span className="material-symbols-outlined text-lg">add</span>Tạo combo mới
          </button>
        }
      />

      {selectedCombo ? (
        <ComboEditor combo={selectedCombo} allServices={allServices} onBack={() => setSelectedCombo(null)} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {combos.map(combo => (
            <div key={combo.MaGoi} className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(77,70,53,0.06)] hover:shadow-[0_8px_32px_rgba(77,70,53,0.1)] transition-all duration-300 group flex flex-col">
              <div className="h-44 overflow-hidden relative bg-surface-container-high">
                <img alt={combo.TenGoi} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={combo.AnhDaiDien || 'https://via.placeholder.com/400x300'} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-4 flex gap-2">
                  <span className="bg-primary-container text-on-primary-container text-xs font-bold px-2.5 py-0.5 rounded-full">{combo.SoNgay} ngày</span>
                  <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full">-{combo.PhanTramGiam}%</span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-on-surface font-notoSerif text-lg mb-1">{combo.TenGoi}</h3>
                <p className="text-xs text-on-surface-variant mb-3 line-clamp-2">{combo.MoTa}</p>
                <div className="mb-4 flex-1">
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold mb-2">Dịch vụ ({combo.dich_vus?.length || 0})</p>
                  <div className="flex flex-wrap gap-1.5">
                    {combo.dich_vus?.slice(0, 3).map((dv, i) => (
                      <span key={i} className="text-[10px] bg-surface-container-high px-2 py-0.5 rounded-full text-on-surface-variant line-clamp-1 max-w-[120px]">{dv.TenDV} x{dv.pivot?.SoLuong || 1}</span>
                    ))}
                    {(combo.dich_vus?.length || 0) > 3 && <span className="text-[10px] text-primary font-semibold">+{combo.dich_vus.length - 3}</span>}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-surface-container-high filter-none">
                  <div>
                    <span className="text-xs text-on-surface-variant line-through mr-2">{formatVND(combo.GiaGoc)}</span>
                    <span className="text-primary font-bold">{formatVND(combo.GiaCombo)}</span>
                  </div>
                  <button onClick={() => setSelectedCombo(combo)} className="flex items-center gap-1.5 text-sm text-primary font-semibold hover:text-amber-800 transition-colors">
                    <span className="material-symbols-outlined text-lg">edit</span>Sửa gói
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ComboEditor({ combo, allServices, onBack }) {
  // Map combo.dich_vus (backend relation) to our internal editable format
  const mappedServices = (combo.dich_vus || []).map(s => ({
    MaDV: s.MaDV,
    TenDV: s.TenDV,
    SoLuong: s.pivot?.SoLuong || 1,
    DonGia: s.DonGia,
    DonVi: s.DonVi || 'Lần',
    Icon: s.Icon || 'check_circle'
  }));

  const [services, setServices] = useState(mappedServices);
  const [discount, setDiscount] = useState(combo.PhanTramGiam || 0);
  const [showPicker, setShowPicker] = useState(false);

  const pricing = useMemo(() => {
    const giaGoc = services.reduce((sum, s) => sum + s.DonGia * s.SoLuong, 0);
    const giamGia = Math.round(giaGoc * discount / 100);
    return { giaGoc, giamGia, tongThanhToan: giaGoc - giamGia };
  }, [services, discount]);

  const updateQty = (idx, delta) => {
    setServices(prev => prev.map((s, i) => i !== idx ? s : { ...s, SoLuong: Math.max(1, s.SoLuong + delta) }));
  };

  const updatePrice = (idx, price) => {
    setServices(prev => prev.map((s, i) => i !== idx ? s : { ...s, DonGia: Math.max(0, price) }));
  };

  const removeService = (idx) => setServices(prev => prev.filter((_, i) => i !== idx));

  const addService = (svc) => {
    if (services.find(s => s.MaDV === svc.MaDV)) return;
    setServices(prev => [...prev, { MaDV: svc.MaDV, TenDV: svc.TenDV, SoLuong: 1, DonGia: svc.DonGia, DonVi: svc.DonVi || 'Lần', Icon: svc.Icon || 'check_circle' }]);
    setShowPicker(false);
  };

  const available = allServices.filter(s => !services.find(sv => sv.MaDV === s.MaDV));

  return (
    <div className="animate-fade-in">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-primary mb-4 transition-colors">
        <span className="material-symbols-outlined text-lg">arrow_back</span> Quay lại danh sách
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Service Editor */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-surface-container-high/50">
              <h3 className="font-semibold text-on-surface">Dịch vụ trong gói — {combo.TenGoi}</h3>
              <button onClick={() => setShowPicker(true)} className="flex items-center gap-1.5 text-sm text-primary font-semibold hover:text-amber-800 transition-colors">
                <span className="material-symbols-outlined text-lg">add_circle</span>Thêm dịch vụ
              </button>
            </div>
            {services.length > 0 ? (
              <div className="divide-y divide-surface-container-high/30">
                {services.map((svc, idx) => (
                  <div key={svc.MaDV} className="flex items-center gap-4 px-6 py-4 hover:bg-surface-container-low/30 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary text-base">{svc.Icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-on-surface text-sm">{svc.TenDV}</p>
                      <p className="text-xs text-on-surface-variant">{svc.DonVi}</p>
                    </div>
                    {/* Editable price */}
                    <div className="w-28 flex-shrink-0">
                      <label className="text-[9px] text-on-surface-variant font-bold uppercase mb-0.5 block">Đơn giá</label>
                      <input type="number" value={svc.DonGia} onChange={e => updatePrice(idx, parseInt(e.target.value) || 0)}
                        className="w-full bg-surface-container-high/50 px-2 py-1.5 rounded-lg text-sm text-right outline-none border border-transparent focus:border-primary/40" />
                    </div>
                    {/* Quantity */}
                    <div className="flex items-center gap-0.5 bg-surface-container-high/50 rounded-lg px-0.5 py-0.5 flex-shrink-0">
                      <button onClick={() => updateQty(idx, -1)} className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-surface-container-highest transition-colors">
                        <span className="material-symbols-outlined text-sm">remove</span>
                      </button>
                      <span className="w-8 text-center text-sm font-bold">{svc.SoLuong}</span>
                      <button onClick={() => updateQty(idx, 1)} className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-surface-container-highest transition-colors">
                        <span className="material-symbols-outlined text-sm">add</span>
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-on-surface w-28 text-right flex-shrink-0">{formatVND(svc.DonGia * svc.SoLuong)}</p>
                    <button onClick={() => removeService(idx)} className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <span className="material-symbols-outlined text-3xl text-on-surface-variant/30 mb-2 block">playlist_remove</span>
                <p className="text-sm text-on-surface-variant">Chưa có dịch vụ. Nhấn "Thêm dịch vụ" để bắt đầu.</p>
              </div>
            )}
          </div>
        </div>

        {/* Pricing Sidebar */}
        <div className="space-y-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)] p-6 space-y-4">
            <h3 className="font-semibold text-on-surface text-sm">Tính giá combo</h3>
            <div>
              <label className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mb-1.5 block">Phần trăm giảm giá (%)</label>
              <input type="number" value={discount} onChange={e => setDiscount(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                className="w-full bg-surface-container-high/50 px-4 py-3 rounded-xl text-lg font-bold text-center outline-none border border-transparent focus:border-primary/40" />
            </div>
            <div className="space-y-2.5 text-sm">
              {services.map(s => (
                <div key={s.MaDV} className="flex justify-between">
                  <span className="text-on-surface-variant truncate mr-2">{s.TenDV} x{s.SoLuong}</span>
                  <span className="text-on-surface font-medium flex-shrink-0">{formatVND(s.DonGia * s.SoLuong)}</span>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-surface-container-high space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Giá gốc</span>
                <span className="font-medium">{formatVND(pricing.giaGoc)}</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Giảm {discount}%</span>
                <span className="font-medium">-{formatVND(pricing.giamGia)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-primary pt-2 border-t border-surface-container-high">
                <span>Giá combo</span>
                <span>{formatVND(pricing.tongThanhToan)}</span>
              </div>
            </div>
            <button className="w-full bg-primary text-white py-3 rounded-xl font-semibold text-sm hover:bg-amber-900 transition-colors shadow-sm mt-2">
              Lưu thay đổi (Demo)
            </button>
          </div>
        </div>
      </div>

      {/* Service Picker Modal */}
      {showPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowPicker(false)} />
          <div className="relative bg-surface-container-lowest rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] flex flex-col animate-scale-in">
            <div className="flex items-center justify-between px-6 py-4 border-b border-surface-container-high flex-shrink-0">
              <h3 className="text-lg font-notoSerif font-bold text-on-surface">Thêm dịch vụ</h3>
              <button onClick={() => setShowPicker(false)} className="p-1 text-on-surface-variant hover:text-on-surface rounded-lg hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="overflow-y-auto flex-1 p-4 space-y-1">
              {available.length > 0 ? available.map(svc => (
                <button key={svc.MaDV} onClick={() => addService(svc)}
                  className="w-full flex items-center gap-4 p-3.5 rounded-xl hover:bg-surface-container-low transition-colors text-left">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary text-base">{svc.Icon || 'check_circle'}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-on-surface text-sm">{svc.TenDV}</p>
                    <p className="text-xs text-on-surface-variant">{svc.NhomDV?.TenNhom || 'Khác'}</p>
                  </div>
                  <p className="text-sm font-semibold text-primary flex-shrink-0">{svc.DonGia > 0 ? formatVND(svc.DonGia) : 'Miễn phí'}</p>
                </button>
              )) : (
                <p className="p-8 text-center text-on-surface-variant text-sm">Đã thêm tất cả dịch vụ có sẵn</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
