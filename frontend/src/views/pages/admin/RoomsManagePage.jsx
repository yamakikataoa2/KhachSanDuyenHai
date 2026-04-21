import React, { useState, useEffect, useMemo } from 'react';
import PageHeader from '../../components/common/PageHeader';
import StatusBadge from '../../components/common/StatusBadge';
import { formatVND } from '../../../utils/formatters';
import roomService from '../../../services/roomService';
import { SkeletonCard } from '../../components/common/LoadingSkeleton';

const emptyForm = { SoPhong: '', MaLoaiPhong: '', TrangThai: 'Trống' };

export default function RoomsManagePage() {
  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [roomsRes, typesRes] = await Promise.all([roomService.getRooms(), roomService.getRoomTypes()]);
      setRooms(Array.isArray(roomsRes) ? roomsRes : roomsRes.data || []);
      setRoomTypes(Array.isArray(typesRes) ? typesRes : typesRes.data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetchData(); }, []);

  const filtered = useMemo(() => rooms.filter(r => {
    const matchSearch = !search || r.SoPhong?.includes(search) || r.loai_phong?.TenLoai?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || r.TrangThai === statusFilter;
    return matchSearch && matchStatus;
  }), [rooms, search, statusFilter]);

  const openAdd = () => { setForm({ ...emptyForm, MaLoaiPhong: roomTypes[0]?.MaLoaiPhong || '' }); setModal('add'); };
  const openEdit = (r) => { setForm({ SoPhong: r.SoPhong, MaLoaiPhong: r.MaLoaiPhong, TrangThai: r.TrangThai }); setModal(r); };

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      if (modal === 'add') await roomService.createRoom(form);
      else await roomService.updateRoom(modal.MaPhong, form);
      setModal(null); await fetchData();
    } catch (err) { alert('Lỗi: ' + (err.response?.data?.message || err.message)); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    setSaving(true);
    try { await roomService.deleteRoom(id); setDeleteConfirm(null); await fetchData(); }
    catch (err) { alert('Lỗi: ' + (err.response?.data?.message || err.message)); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="space-y-6 animate-fade-in"><PageHeader title="Quản lý Phòng" icon="bed" /><SkeletonCard /><SkeletonCard /></div>;

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Quản lý Phòng" description={`Tổng ${rooms.length} phòng`} icon="bed"
        actions={<button onClick={openAdd} className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-amber-900 transition-colors text-sm shadow-sm"><span className="material-symbols-outlined text-lg">add</span>Thêm phòng</button>}
      />

      {/* Filters */}
      <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)] flex flex-wrap gap-4">
        <div className="flex items-center bg-surface-container-high/60 rounded-xl px-3 py-2.5 flex-1 min-w-[200px] border border-transparent focus-within:border-primary transition-colors">
          <span className="material-symbols-outlined text-on-surface-variant text-lg mr-2">search</span>
          <input type="text" placeholder="Tìm số phòng hoặc loại phòng..." className="bg-transparent outline-none text-sm w-full text-on-surface" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="bg-surface-container-high/60 rounded-xl px-3 py-2.5 text-sm outline-none border border-transparent focus:border-primary cursor-pointer text-on-surface min-w-[150px]" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">Tất cả trạng thái</option>
          <option value="Trống">Trống</option>
          <option value="Đang sử dụng">Đang sử dụng</option>
          <option value="Đã đặt">Đã đặt</option>
          <option value="Bảo trì">Bảo trì</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="bg-surface-container-high/50">
              {['Số phòng', 'Loại phòng', 'Giá/đêm', 'Sức chứa', 'Trạng thái', 'Thao tác'].map(h => (
                <th key={h} className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant px-5 py-3">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.length === 0 && <tr><td colSpan={6} className="px-5 py-8 text-center text-on-surface-variant text-sm">Không tìm thấy phòng nào.</td></tr>}
              {filtered.map((r, i) => (
                <tr key={r.MaPhong} className={`${i%2?'bg-surface-container-low/30':''} hover:bg-amber-50/40 transition-colors`}>
                  <td className="px-5 py-3.5 text-sm font-mono font-bold text-primary">{r.SoPhong}</td>
                  <td className="px-5 py-3.5 text-sm font-medium text-on-surface">{r.loai_phong?.TenLoai || 'N/A'}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-on-surface">{formatVND(r.loai_phong?.GiaMacDinh)}</td>
                  <td className="px-5 py-3.5 text-sm text-on-surface-variant">{r.loai_phong?.SoNguoiToiDa || '—'} khách</td>
                  <td className="px-5 py-3.5"><StatusBadge status={r.TrangThai} /></td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(r)} className="p-1.5 text-slate-400 hover:text-primary hover:bg-amber-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button>
                      <button onClick={() => setDeleteConfirm(r)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModal(null)} />
          <form onSubmit={handleSave} className="relative bg-surface-container-lowest rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <h3 className="text-lg font-bold text-on-surface mb-5">{modal === 'add' ? 'Thêm phòng' : `Sửa phòng ${modal.SoPhong}`}</h3>
            <div className="space-y-4">
              <div><label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Số phòng *</label>
                <input required value={form.SoPhong} onChange={e => setForm(p => ({...p, SoPhong: e.target.value}))} className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm" /></div>
              <div><label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Loại phòng *</label>
                <select required value={form.MaLoaiPhong} onChange={e => setForm(p => ({...p, MaLoaiPhong: e.target.value}))} className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm cursor-pointer">
                  {roomTypes.map(rt => <option key={rt.MaLoaiPhong} value={rt.MaLoaiPhong}>{rt.TenLoai} — {formatVND(rt.GiaMacDinh)}</option>)}
                </select></div>
              <div><label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Trạng thái</label>
                <select value={form.TrangThai} onChange={e => setForm(p => ({...p, TrangThai: e.target.value}))} className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm cursor-pointer">
                  <option value="Trống">Trống</option><option value="Đang sử dụng">Đang sử dụng</option><option value="Đã đặt">Đã đặt</option><option value="Bảo trì">Bảo trì</option>
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
            <p className="text-sm text-on-surface-variant mb-6">Xóa phòng <strong className="text-primary">{deleteConfirm.SoPhong}</strong>?</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-colors">Hủy</button>
              <button disabled={saving} onClick={() => handleDelete(deleteConfirm.MaPhong)} className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50">{saving ? 'Đang xóa...' : 'Xóa'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
