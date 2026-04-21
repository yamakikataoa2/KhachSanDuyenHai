import React, { useState, useEffect, useMemo } from 'react';
import PageHeader from '../../components/common/PageHeader';
import { formatVND } from '../../../utils/formatters';
import roomService from '../../../services/roomService';
import { SkeletonCard } from '../../components/common/LoadingSkeleton';

const emptyForm = { TenLoai: '', MoTa: '', SoNguoiToiDa: 2, DienTich: '', GiaMacDinh: '', AnhDaiDien: '', TrangThai: 'Hoạt động' };

export default function RoomTypesPage() {
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null); // null | 'add' | roomTypeObj
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await roomService.getRoomTypes();
      setRoomTypes(Array.isArray(res) ? res : res.data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = useMemo(() => roomTypes.filter(r =>
    !search || r.TenLoai?.toLowerCase().includes(search.toLowerCase())
  ), [roomTypes, search]);

  const openAdd = () => { setForm(emptyForm); setModal('add'); };
  const openEdit = (r) => {
    setForm({ TenLoai: r.TenLoai || '', MoTa: r.MoTa || '', SoNguoiToiDa: r.SoNguoiToiDa || 2, DienTich: r.DienTich || '', GiaMacDinh: r.GiaMacDinh || '', AnhDaiDien: r.AnhDaiDien || '', TrangThai: r.TrangThai || 'Hoạt động' });
    setModal(r);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (modal === 'add') {
        await roomService.createRoomType(form);
      } else {
        await roomService.updateRoomType(modal.MaLoaiPhong, form);
      }
      setModal(null);
      await fetchData();
    } catch (err) { alert('Lỗi: ' + (err.response?.data?.message || err.message)); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    setSaving(true);
    try {
      await roomService.deleteRoomType(id);
      setDeleteConfirm(null);
      await fetchData();
    } catch (err) { alert('Lỗi: ' + (err.response?.data?.message || err.message)); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="space-y-6 animate-fade-in"><PageHeader title="Loại phòng" description="Quản lý danh mục loại phòng" icon="category" /><SkeletonCard /><SkeletonCard /></div>;

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Loại phòng" description="Quản lý danh mục loại phòng trong khách sạn" icon="category"
        actions={<button onClick={openAdd} className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-amber-900 transition-colors text-sm shadow-sm"><span className="material-symbols-outlined text-lg">add</span>Thêm loại phòng</button>}
      />

      {/* Search */}
      <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)]">
        <div className="flex items-center bg-surface-container-high/60 rounded-xl px-3 py-2.5 max-w-md border border-transparent focus-within:border-primary transition-colors">
          <span className="material-symbols-outlined text-on-surface-variant text-lg mr-2">search</span>
          <input type="text" placeholder="Tìm loại phòng..." className="bg-transparent outline-none text-sm w-full text-on-surface" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="bg-surface-container-high/50">
              {['Hình ảnh', 'Tên loại phòng', 'Giá mặc định', 'Sức chứa', 'Diện tích', 'Trạng thái', 'Thao tác'].map(h => (
                <th key={h} className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant px-5 py-3">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.length === 0 && <tr><td colSpan={7} className="px-5 py-8 text-center text-on-surface-variant text-sm">Không tìm thấy loại phòng nào.</td></tr>}
              {filtered.map((r, i) => (
                <tr key={r.MaLoaiPhong || i} className={`${i%2?'bg-surface-container-low/30':''} hover:bg-amber-50/40 transition-colors`}>
                  <td className="px-5 py-3"><div className="w-16 h-12 rounded-lg overflow-hidden bg-surface-container-high"><img src={r.AnhDaiDien} alt={r.TenLoai} className="w-full h-full object-cover" onError={e => e.target.style.display='none'} /></div></td>
                  <td className="px-5 py-3 text-sm font-semibold text-on-surface font-notoSerif">{r.TenLoai}</td>
                  <td className="px-5 py-3 text-sm font-semibold text-primary">{formatVND(r.GiaMacDinh)}</td>
                  <td className="px-5 py-3 text-sm text-on-surface-variant">{r.SoNguoiToiDa} khách</td>
                  <td className="px-5 py-3 text-sm text-on-surface-variant">{r.DienTich}m²</td>
                  <td className="px-5 py-3"><span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${r.TrangThai === 'Hoạt động' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>{r.TrangThai}</span></td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(r)} className="p-1.5 text-slate-400 hover:text-primary hover:bg-amber-50 rounded-lg transition-colors" title="Sửa"><span className="material-symbols-outlined text-lg">edit</span></button>
                      <button onClick={() => setDeleteConfirm(r)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Xóa"><span className="material-symbols-outlined text-lg">delete</span></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModal(null)} />
          <form onSubmit={handleSave} className="relative bg-surface-container-lowest rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-scale-in max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-on-surface mb-5">{modal === 'add' ? 'Thêm loại phòng' : 'Sửa loại phòng'}</h3>
            <div className="space-y-4">
              <div><label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Tên loại phòng *</label>
                <input required value={form.TenLoai} onChange={e => setForm(p => ({...p, TenLoai: e.target.value}))} className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm" /></div>
              <div className="grid grid-cols-3 gap-3">
                <div><label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Giá/đêm *</label>
                  <input required type="number" value={form.GiaMacDinh} onChange={e => setForm(p => ({...p, GiaMacDinh: e.target.value}))} className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm" /></div>
                <div><label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Sức chứa *</label>
                  <input required type="number" min="1" value={form.SoNguoiToiDa} onChange={e => setForm(p => ({...p, SoNguoiToiDa: e.target.value}))} className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm" /></div>
                <div><label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Diện tích (m²)</label>
                  <input type="number" value={form.DienTich} onChange={e => setForm(p => ({...p, DienTich: e.target.value}))} className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm" /></div>
              </div>
              <div><label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">URL ảnh đại diện</label>
                <input value={form.AnhDaiDien} onChange={e => setForm(p => ({...p, AnhDaiDien: e.target.value}))} placeholder="https://..." className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm" /></div>
              <div><label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Mô tả</label>
                <textarea rows={3} value={form.MoTa} onChange={e => setForm(p => ({...p, MoTa: e.target.value}))} className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm resize-none" /></div>
              <div><label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Trạng thái</label>
                <select value={form.TrangThai} onChange={e => setForm(p => ({...p, TrangThai: e.target.value}))} className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm cursor-pointer">
                  <option value="Hoạt động">Hoạt động</option><option value="Tạm ngưng">Tạm ngưng</option>
                </select></div>
            </div>
            <div className="flex gap-3 justify-end mt-6">
              <button type="button" onClick={() => setModal(null)} className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-colors">Hủy</button>
              <button type="submit" disabled={saving} className="px-5 py-2 text-sm font-medium bg-primary text-white rounded-xl hover:bg-amber-900 transition-colors disabled:opacity-50">
                {saving ? 'Đang lưu...' : (modal === 'add' ? 'Thêm mới' : 'Cập nhật')}
              </button>
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
            <p className="text-sm text-on-surface-variant mb-6">Bạn chắc chắn muốn xóa loại phòng <strong className="text-primary">{deleteConfirm.TenLoai}</strong>? Thao tác này không thể hoàn tác.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-colors">Hủy</button>
              <button disabled={saving} onClick={() => handleDelete(deleteConfirm.MaLoaiPhong)} className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50">
                {saving ? 'Đang xóa...' : 'Xóa'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
