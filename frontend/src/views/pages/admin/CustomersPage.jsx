import React, { useState, useEffect, useMemo } from 'react';
import PageHeader from '../../components/common/PageHeader';
import { formatVND } from '../../../utils/formatters';
import adminService from '../../../services/adminService';
import { SkeletonCard } from '../../components/common/LoadingSkeleton';

const emptyForm = { HoTen: '', SoDienThoai: '', Email: '', DiaChi: '', CCCD_CMND: '' };

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchData = async () => {
    try { setLoading(true); const res = await adminService.getCustomers(); setCustomers(Array.isArray(res) ? res : res.data || []); }
    catch (err) { console.error(err); } finally { setLoading(false); }
  };
  useEffect(() => { fetchData(); }, []);

  const filtered = useMemo(() => customers.filter(c =>
    !search || c.HoTen?.toLowerCase().includes(search.toLowerCase()) || c.Email?.toLowerCase().includes(search.toLowerCase()) || c.SoDienThoai?.includes(search)
  ), [customers, search]);

  const openAdd = () => { setForm(emptyForm); setModal('add'); };
  const openEdit = (c) => {
    setForm({ HoTen: c.HoTen || '', SoDienThoai: c.SoDienThoai || '', Email: c.Email || '', DiaChi: c.DiaChi || '', CCCD_CMND: c.CCCD_CMND || '' });
    setModal(c);
  };

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      if (modal === 'add') await adminService.createCustomer(form);
      else await adminService.updateCustomer(modal.MaKhachHang, form);
      setModal(null); await fetchData();
    } catch (err) { alert('Lỗi: ' + (err.response?.data?.message || err.message)); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    setSaving(true);
    try { await adminService.deleteCustomer(id); setDeleteConfirm(null); await fetchData(); }
    catch (err) { alert('Lỗi: ' + (err.response?.data?.message || err.message)); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="space-y-6 animate-fade-in"><PageHeader title="Khách hàng" icon="group" /><SkeletonCard /><SkeletonCard /></div>;

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Khách hàng" description={`${customers.length} khách hàng`} icon="group"
        actions={<button onClick={openAdd} className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-amber-900 transition-colors text-sm shadow-sm"><span className="material-symbols-outlined text-lg">person_add</span>Thêm khách hàng</button>}
      />

      <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)]">
        <div className="flex items-center bg-surface-container-high/60 rounded-xl px-3 py-2.5 max-w-md border border-transparent focus-within:border-primary transition-colors">
          <span className="material-symbols-outlined text-on-surface-variant text-lg mr-2">search</span>
          <input type="text" placeholder="Tìm tên, email hoặc số điện thoại..." className="bg-transparent outline-none text-sm w-full text-on-surface" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)] overflow-hidden overflow-x-auto">
        <table className="w-full">
          <thead><tr className="bg-surface-container-high/50">
            {['Khách hàng', 'Email', 'Điện thoại', 'Địa chỉ', 'CMND/CCCD', 'Thao tác'].map(h => (
              <th key={h} className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant px-5 py-3">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.length === 0 && <tr><td colSpan={6} className="px-5 py-8 text-center text-on-surface-variant text-sm">Không tìm thấy khách hàng nào.</td></tr>}
            {filtered.map((c, i) => (
              <tr key={c.MaKhachHang || i} className={`${i%2?'bg-surface-container-low/30':''} hover:bg-amber-50/40 transition-colors`}>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-sm">{(c.HoTen || 'K').charAt(0)}</div>
                    <span className="text-sm font-medium text-on-surface">{c.HoTen}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-sm text-on-surface-variant">{c.Email || '—'}</td>
                <td className="px-5 py-3.5 text-sm text-on-surface-variant">{c.SoDienThoai || '—'}</td>
                <td className="px-5 py-3.5 text-sm text-on-surface-variant max-w-[200px] truncate">{c.DiaChi || '—'}</td>
                <td className="px-5 py-3.5 text-sm font-mono text-on-surface-variant">{c.CCCD_CMND || '—'}</td>
                <td className="px-5 py-3.5">
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(c)} className="p-1.5 text-slate-400 hover:text-primary hover:bg-amber-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button>
                    <button onClick={() => setDeleteConfirm(c)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModal(null)} />
          <form onSubmit={handleSave} className="relative bg-surface-container-lowest rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-scale-in">
            <h3 className="text-lg font-bold text-on-surface mb-5">{modal === 'add' ? 'Thêm khách hàng' : 'Sửa khách hàng'}</h3>
            <div className="space-y-4">
              <div><label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Họ và tên *</label>
                <input required value={form.HoTen} onChange={e => setForm(p => ({...p, HoTen: e.target.value}))} className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Số điện thoại *</label>
                  <input required value={form.SoDienThoai} onChange={e => setForm(p => ({...p, SoDienThoai: e.target.value}))} className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm" /></div>
                <div><label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Email</label>
                  <input type="email" value={form.Email} onChange={e => setForm(p => ({...p, Email: e.target.value}))} className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm" /></div>
              </div>
              <div><label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">CCCD/CMND</label>
                <input value={form.CCCD_CMND} onChange={e => setForm(p => ({...p, CCCD_CMND: e.target.value}))} className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm" /></div>
              <div><label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Địa chỉ</label>
                <input value={form.DiaChi} onChange={e => setForm(p => ({...p, DiaChi: e.target.value}))} className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm" /></div>
            </div>
            <div className="flex gap-3 justify-end mt-6">
              <button type="button" onClick={() => setModal(null)} className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-colors">Hủy</button>
              <button type="submit" disabled={saving} className="px-5 py-2 text-sm font-medium bg-primary text-white rounded-xl hover:bg-amber-900 transition-colors disabled:opacity-50">{saving ? 'Đang lưu...' : (modal === 'add' ? 'Thêm mới' : 'Cập nhật')}</button>
            </div>
          </form>
        </div>
      )}

      {/* Delete */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          <div className="relative bg-surface-container-lowest rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-scale-in">
            <h3 className="text-lg font-bold text-on-surface mb-2">Xác nhận xóa</h3>
            <p className="text-sm text-on-surface-variant mb-6">Xóa khách hàng <strong className="text-primary">{deleteConfirm.HoTen}</strong>?</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-colors">Hủy</button>
              <button disabled={saving} onClick={() => handleDelete(deleteConfirm.MaKhachHang)} className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50">{saving ? 'Đang xóa...' : 'Xóa'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
