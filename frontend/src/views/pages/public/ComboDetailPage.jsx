import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { formatVND } from '../../../utils/formatters';
import comboService from '../../../services/comboService';
import adminService from '../../../services/adminService';
import { SkeletonCard } from '../../components/common/LoadingSkeleton';

export default function ComboDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [combo, setCombo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allServices, setAllServices] = useState([]);
  const [services, setServices] = useState([]);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        const [comboData, svcsData] = await Promise.all([
          comboService.getComboDetail(id),
          adminService.getServices()
        ]);
        if (isMounted) {
          setCombo(comboData);
          setAllServices(svcsData);
          setServices(comboData.DanhSachDichVu.map(s => ({
            MaDV: s.MaDichVu,
            TenDV: s.TenDichVu,
            SoLuong: s.SoLuong,
            DonGia: s.DonGia,
            DonVi: s.DonViTinh,
            NhomDV: s.NhomDV,
            Icon: s.Icon || 'check_circle'
          })));
        }
      } catch (err) {
        console.error("Error fetching combo data:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, [id]);

  // Real-time pricing calculation
  const pricing = useMemo(() => {
    if (!combo) return { giaGoc: 0, giamGia: 0, tongThanhToan: 0, phanTram: 0 };
    const giaGoc = services.reduce((sum, s) => sum + s.DonGia * s.SoLuong, 0);
    const giamGia = Math.round(giaGoc * combo.PhanTramGiam / 100);
    const tongThanhToan = giaGoc - giamGia;
    return { giaGoc, giamGia, tongThanhToan, phanTram: combo.PhanTramGiam };
  }, [services, combo]);

  const updateQuantity = (idx, delta) => {
    setServices(prev => prev.map((s, i) => {
      if (i !== idx) return s;
      const newQty = Math.max(0, s.SoLuong + delta);
      return newQty === 0 ? null : { ...s, SoLuong: newQty };
    }).filter(Boolean));
  };

  const removeService = (idx) => {
    setServices(prev => prev.filter((_, i) => i !== idx));
  };

  const addService = (svc) => {
    const existing = services.find(s => s.MaDV === svc.MaDichVu);
    if (existing) {
      setServices(prev => prev.map(s => s.MaDV === svc.MaDichVu ? { ...s, SoLuong: s.SoLuong + 1 } : s));
    } else {
      setServices(prev => [...prev, { MaDV: svc.MaDichVu, TenDV: svc.TenDichVu, SoLuong: 1, DonGia: svc.DonGia, DonVi: svc.DonViTinh, NhomDV: svc.NhomDV, Icon: svc.Icon || 'check_circle' }]);
    }
    setShowPicker(false);
  };

  const handleBookingNavigate = () => {
    navigate('/booking', { state: { selectedCombo: combo, customServices: services, customPricing: pricing } });
  };

  const availableToAdd = allServices.filter(s => !services.find(sv => sv.MaDV === s.MaDichVu));

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-24">
        <SkeletonCard />
      </div>
    );
  }

  if (!combo) {
    return <div className="text-center py-24">Không tìm thấy combo!</div>;
  }

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="relative h-[42vh] min-h-[320px] overflow-hidden">
        <img src={combo.AnhDaiDien} alt={combo.TenGoi} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 max-w-7xl mx-auto">
          <Link to="/combos" className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white mb-4 transition-colors">
            <span className="material-symbols-outlined text-lg">arrow_back</span> Tất cả ưu đãi
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-primary-container text-on-primary-container text-xs font-bold px-3 py-1 rounded-full">{combo.SoNgay} ngày {combo.SoNgay - 1} đêm</span>
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full">Giảm {combo.PhanTramGiam}%</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-notoSerif text-white">{combo.TenGoi}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <div className="animate-float-up">
            <h2 className="text-xl font-notoSerif font-bold text-on-surface mb-3">Mô tả gói</h2>
            <p className="text-on-surface-variant leading-relaxed">{combo.MoTa}</p>
          </div>

          {/* Service Table */}
          <div className="animate-float-up stagger-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-notoSerif font-bold text-on-surface">Dịch vụ trong gói</h2>
              <button 
                onClick={() => setShowPicker(true)}
                className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-amber-800 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">add_circle</span>
                Thêm dịch vụ
              </button>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(77,70,53,0.06)]">
              {services.length > 0 ? (
                <div className="divide-y divide-surface-container-high/50">
                  {services.map((svc, idx) => (
                    <div key={svc.MaDV} className="flex items-center gap-4 p-4 hover:bg-surface-container-low/40 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-primary text-lg">{svc.Icon || 'check_circle'}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-on-surface text-sm">{svc.TenDV}</p>
                        <p className="text-xs text-on-surface-variant">{svc.DonGia > 0 ? `${formatVND(svc.DonGia)} / ${svc.DonVi}` : 'Miễn phí'}</p>
                      </div>
                      {/* Quantity stepper */}
                      <div className="flex items-center gap-1 bg-surface-container-high/60 rounded-xl px-1 py-0.5">
                        <button onClick={() => updateQuantity(idx, -1)} className="w-7 h-7 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface transition-colors">
                          <span className="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-on-surface">{svc.SoLuong}</span>
                        <button onClick={() => updateQuantity(idx, 1)} className="w-7 h-7 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface transition-colors">
                          <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                      </div>
                      {/* Subtotal */}
                      <p className="text-sm font-semibold text-on-surface w-28 text-right">{formatVND(svc.DonGia * svc.SoLuong)}</p>
                      {/* Remove */}
                      <button onClick={() => removeService(idx)} className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0">
                        <span className="material-symbols-outlined text-lg">close</span>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <span className="material-symbols-outlined text-3xl text-on-surface-variant/40 mb-3 block">playlist_remove</span>
                  <p className="text-sm text-on-surface-variant">Chưa có dịch vụ nào. Thêm dịch vụ để bắt đầu.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sticky Pricing Sidebar */}
        <div className="lg:sticky lg:top-24 h-fit space-y-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-[0_8px_32px_rgba(77,70,53,0.1)] p-6 space-y-5 animate-float-up stagger-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold mb-1">Giá gốc</p>
              <p className="text-lg text-on-surface-variant line-through">{formatVND(pricing.giaGoc)}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">-{pricing.phanTram}%</span>
              <p className="text-xs text-on-surface-variant">Tiết kiệm {formatVND(pricing.giamGia)}</p>
            </div>
            <div className="pt-3 border-t border-surface-container-high">
              <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold mb-1">Tổng thanh toán</p>
              <p className="text-3xl font-bold text-primary">{formatVND(pricing.tongThanhToan)}</p>
              <p className="text-xs text-on-surface-variant mt-1">/ {combo.SoNgay} ngày • cho {combo.SoNguoi} người</p>
            </div>
            <div className="space-y-2.5 pt-2">
              <button onClick={handleBookingNavigate} className="flex items-center justify-center gap-2 w-full bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-amber-900 transition-all shadow-md text-sm">
                <span className="material-symbols-outlined text-lg">calendar_month</span>
                Đặt combo ngay
              </button>
              <button className="w-full py-3 border border-outline-variant rounded-xl text-sm font-medium text-on-surface hover:bg-surface-container-high transition-colors">
                Yêu cầu tùy chỉnh
              </button>
            </div>
          </div>
          
          {/* Summary */}
          <div className="bg-surface-container-low/60 rounded-2xl p-5">
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3">Chi tiết giá</p>
            <div className="space-y-2 text-sm">
              {services.map(s => (
                <div key={s.MaDV} className="flex justify-between">
                  <span className="text-on-surface-variant">{s.TenDV} x{s.SoLuong}</span>
                  <span className="text-on-surface font-medium">{formatVND(s.DonGia * s.SoLuong)}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2 border-t border-outline-variant/20">
                <span className="text-on-surface-variant">Giá gốc</span>
                <span className="font-medium line-through text-on-surface-variant">{formatVND(pricing.giaGoc)}</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Giảm giá ({pricing.phanTram}%)</span>
                <span className="font-medium">-{formatVND(pricing.giamGia)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-outline-variant/20 font-bold text-primary">
                <span>Thanh toán</span>
                <span>{formatVND(pricing.tongThanhToan)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Picker Modal */}
      {showPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowPicker(false)} />
          <div className="relative bg-surface-container-lowest rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden animate-scale-in">
            <div className="flex items-center justify-between px-6 py-4 border-b border-surface-container-high">
              <h3 className="text-lg font-notoSerif font-bold text-on-surface">Thêm dịch vụ</h3>
              <button onClick={() => setShowPicker(false)} className="p-1 text-on-surface-variant hover:text-on-surface rounded-lg hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="overflow-y-auto max-h-[60vh] p-4 space-y-2">
              {availableToAdd.length > 0 ? availableToAdd.map(svc => (
                <button key={svc.MaDV} onClick={() => addService(svc)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-surface-container-low transition-colors text-left">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary text-lg">{svc.Icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-on-surface text-sm">{svc.TenDV}</p>
                    <p className="text-xs text-on-surface-variant">{svc.NhomDV}</p>
                  </div>
                  <p className="text-sm font-semibold text-primary flex-shrink-0">{svc.DonGia > 0 ? formatVND(svc.DonGia) : 'Miễn phí'}</p>
                  <span className="material-symbols-outlined text-on-surface-variant/40">add_circle</span>
                </button>
              )) : (
                <div className="p-8 text-center text-on-surface-variant text-sm">Đã thêm tất cả dịch vụ có sẵn</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
