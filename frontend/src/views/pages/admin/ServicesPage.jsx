import React, { useState, useEffect, useMemo } from 'react';
import PageHeader from '../../components/common/PageHeader';
import StatusBadge from '../../components/common/StatusBadge';
import { formatVND } from '../../../utils/formatters';
import adminService from '../../../services/adminService';
import { SkeletonCard } from '../../components/common/LoadingSkeleton';

const emptyForm = { TenDichVu: '', DonGia: '', DonViTinh: 'lượt', NhomDV: '', MoTa: '', AnhDaiDien: '', TrangThai: 'Hoạt động' };

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchData = async () => {
    try { setLoading(true); const res = await adminService.getServices(); setServices(Array.isArray(res) ? res : res.data || []); }
    catch (err) { console.error(err); } finally { setLoading(false); }
  };
  useEffect(() => { fetchData(); }, []);

  const filtered = useMemo(() => services.filter(s =>
    !search || s.TenDichVu?.toLowerCase().includes(search.toLowerCase()) || s.NhomDV?.toLowerCase().includes(search.toLowerCase())
  ), [services, search]);

  const openAdd = () => { setForm(emptyForm); setModal('add'); };
  const openEdit = (s) => {
    setForm({ TenDichVu: s.TenDichVu || '', DonGia: s.DonGia || s.Gia || '', DonViTinh: s.DonViTinh || s.DonVi || 'lượt', NhomDV: s.NhomDV || '', MoTa: s.MoTa || '', AnhDaiDien: s.AnhDaiDien || '', TrangThai: s.TrangThai || 'Hoạt động' });
    setModal(s);
  };

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      if (modal === 'add') await adminService.createService(form);
      else await adminService.updateService(modal.MaDichVu || modal.MaDV, form);
      setModal(null); await fetchData();
    } catch (err) { alert('Lỗi: ' + (err.response?.data?.message || err.message)); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    setSaving(true);
    try { await adminService.deleteService(id); setDeleteConfirm(null); await fetchData(); }
    catch (err) { alert('Lỗi: ' + (err.response?.data?.message || err.message)); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="space-y-6 animate-fade-in"><PageHeader title="Dịch vụ" icon="room_service" /><div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"><SkeletonCard /><SkeletonCard /><SkeletonCard /></div></div>;

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Dịch vụ" description={`${services.length} dịch vụ`} icon="room_service"
        actions={<button onClick={openAdd} className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-amber-900 transition-colors text-sm shadow-sm"><span className="material-symbols-outlined text-lg">add</span>Thêm dịch vụ</button>}
      />

      <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)]">
        <div className="flex items-center bg-surface-container-high/60 rounded-xl px-3 py-2.5 max-w-md border border-transparent focus-within:border-primary transition-colors">
          <span className="material-symbols-outlined text-on-surface-variant text-lg mr-2">search</span>
          <input type="text" placeholder="Tìm tên dịch vụ..." className="bg-transparent outline-none text-sm w-full text-on-surface" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.length === 0 && <p className="text-on-surface-variant text-sm col-span-full text-center py-8">Không tìm thấy dịch vụ nào.</p>}
        {filtered.map(svc => (
          <div key={svc.MaDichVu || svc.MaDV} className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0_2px_12px_rgba(77,70,53,0.06)] hover:shadow-[0_8px_32px_rgba(77,70,53,0.1)] transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center group-hover:bg-primary-container transition-colors"><span className="material-symbols-outlined text-2xl text-primary">{svc.Icon || 'room_service'}</span></div>
              <StatusBadge status={svc.TrangThai} />
            </div>
            <h3 className="font-semibold text-on-surface font-notoSerif mb-1">{svc.TenDichVu || svc.TenDV}</h3>
            {svc.NhomDV && <p className="text-[10px] uppercase tracking-wider text-primary font-bold mb-2">{svc.NhomDV}</p>}
            <p className="text-xs text-on-surface-variant mb-4 leading-relaxed line-clamp-2">{svc.MoTa}</p>
            <div className="flex items-center justify-between pt-3 border-t border-surface-container-high">
              <span className="text-primary font-bold text-sm">{formatVND(svc.DonGia || svc.Gia)}/{svc.DonViTinh || svc.DonVi}</span>
              <div className="flex gap-1">
                <button onClick={() => openEdit(svc)} className="p-1.5 text-slate-400 hover:text-primary hover:bg-amber-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button>
                <button onClick={() => setDeleteConfirm(svc)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModal(null)} />
          <form onSubmit={handleSave} className="relative bg-surface-container-lowest rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-scale-in max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-on-surface mb-5">{modal === 'add' ? 'Thêm dịch vụ' : 'Sửa dịch vụ'}</h3>
            <div className="space-y-4">
              <div><label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Tên dịch vụ *</label>
                <input required value={form.TenDichVu} onChange={e => setForm(p => ({...p, TenDichVu: e.target.value}))} className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Đơn giá *</label>
                  <input required type="number" value={form.DonGia} onChange={e => setForm(p => ({...p, DonGia: e.target.value}))} className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm" /></div>
                <div><label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Đơn vị tính</label>
                  <input value={form.DonViTinh} onChange={e => setForm(p => ({...p, DonViTinh: e.target.value}))} className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm" /></div>
              </div>
              <div><label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Nhóm dịch vụ</label>
                <input value={form.NhomDV} onChange={e => setForm(p => ({...p, NhomDV: e.target.value}))} placeholder="VD: Wellness, Ẩm thực, Giải trí..." className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm" /></div>
              <div><label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Mô tả</label>
                <textarea rows={2} value={form.MoTa} onChange={e => setForm(p => ({...p, MoTa: e.target.value}))} className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm resize-none" /></div>
              <div><label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Trạng thái</label>
                <select value={form.TrangThai} onChange={e => setForm(p => ({...p, TrangThai: e.target.value}))} className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm cursor-pointer">
                  <option value="Hoạt động">Hoạt động</option><option value="Tạm ngưng">Tạm ngưng</option>
                </select></div>
            </div>
            <div className="flex gap-3 justify-end mt-6">
              <button type="button" onClick={() => setModal(null)} className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-colors">Hủy</button>
              <button type="submit" disabled={saving} className="px-5 py-2 text-sm font-medium bg-primary text-white rounded-xl hover:bg-amber-900 transition-colors disabled:opacity-50">{saving ? 'Đang lưu...' : (modal === 'add' ? 'Thêm mới' : 'Cập nhật')}</button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          <div className="relative bg-surface-container-lowest rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-scale-in">
            <h3 className="text-lg font-bold text-on-surface mb-2">Xác nhận xóa</h3>
            <p className="text-sm text-on-surface-variant mb-6">Xóa dịch vụ <strong className="text-primary">{deleteConfirm.TenDichVu || deleteConfirm.TenDV}</strong>?</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-colors">Hủy</button>
              <button disabled={saving} onClick={() => handleDelete(deleteConfirm.MaDichVu || deleteConfirm.MaDV)} className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50">{saving ? 'Đang xóa...' : 'Xóa'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
