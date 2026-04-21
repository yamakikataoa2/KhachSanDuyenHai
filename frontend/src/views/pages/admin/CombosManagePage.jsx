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
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [combosRes, servicesRes] = await Promise.all([
        comboService.getCombos(),
        adminService.getServices()
      ]);
      setCombos(Array.isArray(combosRes) ? combosRes : combosRes.data || []);
      setAllServices(Array.isArray(servicesRes) ? servicesRes : servicesRes.data || []);
    } catch (err) {
      console.error("Failed to fetch combos and services", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = useMemo(() => combos.filter(c => 
    !search || 
    c.TenGoi?.toLowerCase().includes(search.toLowerCase()) || 
    c.MoTa?.toLowerCase().includes(search.toLowerCase())
  ), [combos, search]);

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      await comboService.deleteCombo(id);
      setDeleteConfirm(null);
      await fetchData();
    } catch (err) {
      alert('Lỗi: ' + (err.response?.data?.message || err.message));
    } finally {
      setDeleting(false);
    }
  };

  const handleAddNew = () => {
    setSelectedCombo({ 
      isNew: true, 
      TenGoi: '', 
      MoTa: '', 
      SoNgay: 1, 
      SoNguoi: 2, 
      PhanTramGiam: 0, 
      AnhDaiDien: '', 
      dich_vus: [] 
    });
  };

  const handleSaved = async () => {
    setSelectedCombo(null);
    await fetchData();
  };

  if (loading) {
     return <div className="space-y-6 animate-fade-in"><PageHeader title="Quản lý Gói Combo" description="Tạo và quản lý các gói combo ưu đãi" icon="card_giftcard" /><div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"><SkeletonCard /><SkeletonCard /><SkeletonCard /></div></div>;
  }

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Quản lý Gói Combo" description="Tạo và quản lý các gói combo ưu đãi" icon="card_giftcard"
        actions={
          !selectedCombo && <button onClick={handleAddNew} className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-amber-900 transition-colors text-sm shadow-sm">
            <span className="material-symbols-outlined text-lg">add</span>Tạo combo mới
          </button>
        }
      />

      {selectedCombo ? (
        <ComboEditor combo={selectedCombo} allServices={allServices} onBack={() => setSelectedCombo(null)} onSaved={handleSaved} />
      ) : (
        <>
          <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)]">
            <div className="flex items-center bg-surface-container-high/60 rounded-xl px-3 py-2.5 max-w-md border border-transparent focus-within:border-primary transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant text-lg mr-2">search</span>
              <input type="text" placeholder="Tìm tên combo, mô tả..." className="bg-transparent outline-none text-sm w-full text-on-surface" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.length === 0 && <p className="text-on-surface-variant text-sm col-span-full text-center py-8">Không tìm thấy combo nào.</p>}
            {filtered.map(combo => (
              <div key={combo.MaGoi} className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(77,70,53,0.06)] hover:shadow-[0_8px_32px_rgba(77,70,53,0.1)] transition-all duration-300 group flex flex-col relative">
                <div className="absolute top-4 right-4 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button onClick={() => setDeleteConfirm(combo)} className="w-8 h-8 flex items-center justify-center bg-white/90 hover:bg-red-50 text-slate-500 hover:text-red-500 rounded-lg shadow-sm transition-colors" title="Xóa combo">
                     <span className="material-symbols-outlined text-[18px]">delete</span>
                   </button>
                </div>
                <div className="h-44 overflow-hidden relative bg-surface-container-high">
                  <img alt={combo.TenGoi} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={combo.AnhDaiDien || ''} onError={e => { e.target.style.display = 'none'; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 flex gap-2">
                    <span className="bg-primary-container text-on-primary-container text-xs font-bold px-2.5 py-0.5 rounded-full">{combo.SoNgay} ngày {combo.SoNguoi} người</span>
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
        </>
      )}

      {/* Modal Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          <div className="relative bg-surface-container-lowest rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-scale-in">
            <h3 className="text-lg font-bold text-on-surface mb-2">Xác nhận xóa</h3>
            <p className="text-sm text-on-surface-variant mb-6">
              Bạn có chắc chắn muốn xóa gói combo <strong className="text-primary">{deleteConfirm.TenGoi}</strong>? 
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-colors">Hủy</button>
              <button disabled={deleting} onClick={() => handleDelete(deleteConfirm.MaGoi)} className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50">
                {deleting ? 'Đang xóa...' : 'Xóa'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ComboEditor({ combo, allServices, onBack, onSaved }) {
  const mappedServices = (combo.dich_vus || []).map(s => ({
    MaDV: s.MaDV,
    TenDV: s.TenDV,
    SoLuong: s.pivot?.SoLuong || 1,
    DonGia: s.DonGia,
    DonVi: s.DonVi || 'Lần',
    Icon: s.Icon || 'check_circle'
  }));

  const [form, setForm] = useState({
    TenGoi: combo.TenGoi || '',
    MoTa: combo.MoTa || '',
    SoNgay: combo.SoNgay || 1,
    SoNguoi: combo.SoNguoi || 2,
    AnhDaiDien: combo.AnhDaiDien || ''
  });

  const [services, setServices] = useState(mappedServices);
  const [discount, setDiscount] = useState(combo.PhanTramGiam || 0);
  const [showPicker, setShowPicker] = useState(false);
  const [saving, setSaving] = useState(false);

  const pricing = useMemo(() => {
    const giaGoc = services.reduce((sum, s) => sum + s.DonGia * s.SoLuong, 0);
    const giamGia = Math.round(giaGoc * discount / 100);
    return { giaGoc, giamGia, tongThanhToan: giaGoc - giamGia };
  }, [services, discount]);

  const updateQty = (idx, delta) => setServices(prev => prev.map((s, i) => i !== idx ? s : { ...s, SoLuong: Math.max(1, s.SoLuong + delta) }));
  const updatePrice = (idx, price) => setServices(prev => prev.map((s, i) => i !== idx ? s : { ...s, DonGia: Math.max(0, price) }));
  const removeService = (idx) => setServices(prev => prev.filter((_, i) => i !== idx));

  const addService = (svc) => {
    if (services.find(s => s.MaDV === svc.MaDV)) return;
    setServices(prev => [...prev, { MaDV: svc.MaDV, TenDV: svc.TenDV, SoLuong: 1, DonGia: svc.DonGia, DonVi: svc.DonVi || 'Lần', Icon: svc.Icon || 'check_circle' }]);
    setShowPicker(false);
  };

  const available = allServices.filter(s => !services.find(sv => sv.MaDV === s.MaDV));

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.TenGoi) {
      alert("Vui lòng nhập tên gói combo");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        TenGoi: form.TenGoi,
        MoTa: form.MoTa,
        SoNgay: form.SoNgay,
        SoNguoi: form.SoNguoi,
        AnhDaiDien: form.AnhDaiDien,
        PhanTramGiam: discount,
        GiaGoc: pricing.giaGoc,
        GiaCombo: pricing.tongThanhToan,
        GiaGoi: pricing.tongThanhToan, // Backward compatibility
        TrangThai: 'Hoạt động',
        services: services.map(s => ({ MaDV: s.MaDV, SoLuong: s.SoLuong, DonGia: s.DonGia })),
      };

      if (combo.isNew) {
        await comboService.createCombo(payload);
      } else {
        await comboService.updateCombo(combo.MaGoi, payload);
      }
      onSaved();
    } catch (err) {
      console.error('Failed to save combo:', err);
      alert('Lỗi khi lưu thay đổi: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="animate-fade-in relative">
      <button type="button" onClick={onBack} className="flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-primary mb-4 transition-colors">
        <span className="material-symbols-outlined text-lg">arrow_back</span> Quay lại danh sách
      </button>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Thông tin cơ bản */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)] p-6 space-y-4">
            <h3 className="font-semibold text-on-surface border-b border-surface-container-high pb-3 mb-4">Thông tin cơ bản</h3>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Tên gói combo *</label>
              <input required value={form.TenGoi} onChange={e => setForm({...form, TenGoi: e.target.value})} className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm font-notoSerif" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Số ngày</label>
                <input type="number" min="1" value={form.SoNgay} onChange={e => setForm({...form, SoNgay: parseInt(e.target.value)||1})} className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Dành cho (người)</label>
                <input type="number" min="1" value={form.SoNguoi} onChange={e => setForm({...form, SoNguoi: parseInt(e.target.value)||1})} className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Ảnh đại diện (URL)</label>
              <input value={form.AnhDaiDien} onChange={e => setForm({...form, AnhDaiDien: e.target.value})} placeholder="https://..." className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Mô tả</label>
              <textarea rows={3} value={form.MoTa} onChange={e => setForm({...form, MoTa: e.target.value})} className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm resize-none" />
            </div>
          </div>

          {/* Service Editor */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-surface-container-high/50">
              <h3 className="font-semibold text-on-surface">Dịch vụ trong gói</h3>
              <button type="button" onClick={() => setShowPicker(true)} className="flex items-center gap-1.5 text-sm text-primary font-semibold hover:text-amber-800 transition-colors">
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
                      <button type="button" onClick={() => updateQty(idx, -1)} className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-surface-container-highest transition-colors">
                        <span className="material-symbols-outlined text-sm">remove</span>
                      </button>
                      <span className="w-8 text-center text-sm font-bold">{svc.SoLuong}</span>
                      <button type="button" onClick={() => updateQty(idx, 1)} className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-surface-container-highest transition-colors">
                        <span className="material-symbols-outlined text-sm">add</span>
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-on-surface w-28 text-right flex-shrink-0">{formatVND(svc.DonGia * svc.SoLuong)}</p>
                    <button type="button" onClick={() => removeService(idx)} className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0">
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
          <div className="bg-surface-container-lowest rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)] p-6 space-y-4 lg:sticky lg:top-6">
            <h3 className="font-semibold text-on-surface text-sm">Tính giá combo</h3>
            <div>
              <label className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mb-1.5 block">Phần trăm giảm giá (%)</label>
              <input type="number" value={discount} onChange={e => setDiscount(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                className="w-full bg-surface-container-high/50 px-4 py-3 rounded-xl text-lg font-bold text-center outline-none border border-transparent focus:border-primary/40" />
            </div>
            <div className="space-y-2.5 text-sm">
              {services.length === 0 && <p className="text-on-surface-variant text-xs mb-2">Chưa có dịch vụ</p>}
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
            <button type="submit" disabled={saving}
              className="w-full bg-primary text-white py-3 rounded-xl font-semibold text-sm hover:bg-amber-900 transition-colors shadow-sm mb-2 disabled:opacity-60 flex items-center justify-center gap-2">
              {saving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin-slow" />}
              {saving ? 'Đang lưu...' : (combo.isNew ? 'Tạo gói Combo' : 'Lưu thay đổi')}
            </button>
            <button type="button" onClick={onBack} disabled={saving} className="w-full bg-surface-container-high text-on-surface py-3 rounded-xl font-semibold text-sm hover:bg-surface-container-highest transition-colors">
              Hủy bỏ thao tác
            </button>
          </div>
        </div>
      </form>

      {/* Service Picker Modal */}
      {showPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowPicker(false)} />
          <div className="relative bg-surface-container-lowest rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] flex flex-col animate-scale-in">
            <div className="flex items-center justify-between px-6 py-4 border-b border-surface-container-high flex-shrink-0">
              <h3 className="text-lg font-notoSerif font-bold text-on-surface">Thêm dịch vụ</h3>
              <button type="button" onClick={() => setShowPicker(false)} className="p-1 text-on-surface-variant hover:text-on-surface rounded-lg hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="overflow-y-auto flex-1 p-4 space-y-1">
              {available.length > 0 ? available.map(svc => (
                <button type="button" key={svc.MaDV} onClick={() => addService(svc)}
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
