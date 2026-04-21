import React, { useState, useEffect, useMemo } from 'react';
import PageHeader from '../../components/common/PageHeader';
import adminService from '../../../services/adminService';
import { SkeletonCard } from '../../components/common/LoadingSkeleton';

const emptyForm = { TenVaiTro: '', MoTa: '' };

export default function RolesPage() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await adminService.getRoles();
      setRoles(Array.isArray(res) ? res : res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = useMemo(() => roles.filter(role =>
    !search || 
    role.TenVaiTro?.toLowerCase().includes(search.toLowerCase()) || 
    role.MoTa?.toLowerCase().includes(search.toLowerCase())
  ), [roles, search]);

  const openAdd = () => { 
    setForm(emptyForm); 
    setModal('add'); 
  };
  
  const openEdit = (role) => {
    setForm({ 
      TenVaiTro: role.TenVaiTro || '', 
      MoTa: role.MoTa || ''
    });
    setModal(role);
  };

  const handleSave = async (e) => {
    e.preventDefault(); 
    setSaving(true);
    try {
      if (modal === 'add') {
        await adminService.createRole(form);
      } else {
        await adminService.updateRole(modal.MaVaiTro, form);
      }
      setModal(null); 
      await fetchData();
    } catch (err) { 
      alert('Lỗi: ' + (err.response?.data?.message || err.message)); 
    } finally { 
      setSaving(false); 
    }
  };

  const handleDelete = async (id) => {
    setSaving(true);
    try { 
      await adminService.deleteRole(id); 
      setDeleteConfirm(null); 
      await fetchData(); 
    } catch (err) { 
      alert('Lỗi: ' + (err.response?.data?.message || err.message)); 
    } finally { 
      setSaving(false); 
    }
  };

  if (loading) return <div className="space-y-6 animate-fade-in"><PageHeader title="Phân quyền" description="Quản lý vai trò và quyền truy cập" icon="admin_panel_settings" /><div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"><SkeletonCard /><SkeletonCard /></div></div>;

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Phân quyền" description={`Quản lý ${roles.length} loại vai trò hệ thống`} icon="admin_panel_settings"
        actions={<button onClick={openAdd} className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-amber-900 transition-colors text-sm shadow-sm"><span className="material-symbols-outlined text-lg">add</span>Tạo vai trò</button>}
      />

      <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)]">
        <div className="flex items-center bg-surface-container-high/60 rounded-xl px-3 py-2.5 max-w-md border border-transparent focus-within:border-primary transition-colors">
          <span className="material-symbols-outlined text-on-surface-variant text-lg mr-2">search</span>
          <input type="text" placeholder="Tìm tên vai trò hoặc mô tả..." className="bg-transparent outline-none text-sm w-full text-on-surface" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.length === 0 && <p className="text-on-surface-variant text-sm col-span-full text-center py-8">Không tìm thấy phân quyền nào.</p>}
        {filtered.map(role => (
          <div key={role.MaVaiTro} className="relative bg-surface-container-lowest rounded-2xl p-6 shadow-[0_2px_12px_rgba(77,70,53,0.06)] hover:shadow-[0_8px_32px_rgba(77,70,53,0.1)] transition-all duration-300 group">
            <div className="absolute top-4 right-4 flex opacity-0 group-hover:opacity-100 transition-opacity">
               <button onClick={() => openEdit(role)} className="p-1.5 text-slate-400 hover:text-primary hover:bg-amber-50 rounded-lg transition-colors" title="Sửa"><span className="material-symbols-outlined text-lg">edit</span></button>
               {role.TenVaiTro !== 'Admin' && (
                 <button onClick={() => setDeleteConfirm(role)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Xóa"><span className="material-symbols-outlined text-lg">delete</span></button>
               )}
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center"><span className="material-symbols-outlined text-xl text-primary">shield_person</span></div>
              <div>
                <h3 className="font-semibold text-on-surface">{role.TenVaiTro}</h3>
                <p className="text-xs text-on-surface-variant">{role.tai_khoan_nhan_vien_count || 0} người dùng</p>
              </div>
            </div>
            <p className="text-sm text-on-surface-variant mb-4 min-h-[40px]">{role.MoTa}</p>
            <button onClick={() => openEdit(role)} className="w-full py-2.5 bg-surface-container-high rounded-xl text-sm font-medium text-on-surface hover:bg-primary-container transition-colors">Chỉnh sửa quyền</button>
          </div>
        ))}
      </div>

      {/* Modal Add/Edit */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModal(null)} />
          <form onSubmit={handleSave} className="relative bg-surface-container-lowest rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-scale-in max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-on-surface mb-5">{modal === 'add' ? 'Tạo vai trò mới' : 'Sửa thông tin vai trò'}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Tên Vai Trò *</label>
                <input required value={form.TenVaiTro} onChange={e => setForm(p => ({...p, TenVaiTro: e.target.value}))} disabled={modal !== 'add' && modal?.TenVaiTro === 'Admin'} className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm disabled:opacity-50" />
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Mô tả</label>
                <textarea rows={3} value={form.MoTa} onChange={e => setForm(p => ({...p, MoTa: e.target.value}))} className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm resize-none" />
              </div>
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

      {/* Modal Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          <div className="relative bg-surface-container-lowest rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-scale-in">
            <h3 className="text-lg font-bold text-on-surface mb-2">Xác nhận xóa</h3>
            <p className="text-sm text-on-surface-variant mb-6">
              Bạn có chắc chắn muốn xóa vai trò <strong className="text-primary">{deleteConfirm.TenVaiTro}</strong>? 
            </p>
            <div className="bg-error-container/20 px-4 py-3 rounded-xl mb-6 border border-error/20">
               <p className="text-xs text-error font-medium">Lưu ý: Không thể xóa vai trò nếu đang có nhân viên được gán quyền này.</p>
            </div>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-colors">Hủy</button>
              <button disabled={saving} onClick={() => handleDelete(deleteConfirm.MaVaiTro)} className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50">
                {saving ? 'Đang xóa...' : 'Xóa'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
