import React, { useState, useEffect, useMemo } from 'react';
import PageHeader from '../../components/common/PageHeader';
import StatusBadge from '../../components/common/StatusBadge';
import adminService from '../../../services/adminService';
import { SkeletonCard } from '../../components/common/LoadingSkeleton';

const emptyForm = { HoTen: '', SoDienThoai: '', Email: '', ChucVu: 'Nhân viên', VaiTroId: '' }; // Add VaiTroId if needed

export default function StaffPage() {
  const [staff, setStaff] = useState([]);
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
      const [staffRes, rolesRes] = await Promise.all([
        adminService.getStaff(),
        adminService.getRoles()
      ]);
      setStaff(Array.isArray(staffRes) ? staffRes : staffRes.data || []);
      setRoles(Array.isArray(rolesRes) ? rolesRes : rolesRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = useMemo(() => staff.filter(nv =>
    !search || 
    nv.HoTen?.toLowerCase().includes(search.toLowerCase()) || 
    nv.Email?.toLowerCase().includes(search.toLowerCase()) || 
    nv.SoDienThoai?.includes(search) ||
    nv.ChucVu?.toLowerCase().includes(search.toLowerCase())
  ), [staff, search]);

  const openAdd = () => { 
    setForm({ ...emptyForm, VaiTroId: roles.length > 0 ? roles[0].MaVaiTro : '' }); 
    setModal('add'); 
  };
  
  const openEdit = (nv) => {
    setForm({ 
      HoTen: nv.HoTen || '', 
      SoDienThoai: nv.SoDienThoai || '', 
      Email: nv.Email || '', 
      ChucVu: nv.ChucVu || '',
      VaiTroId: nv.taiKhoan?.MaVaiTro || (roles.length > 0 ? roles[0].MaVaiTro : '')
    });
    setModal(nv);
  };

  const handleSave = async (e) => {
    e.preventDefault(); 
    setSaving(true);
    try {
      if (modal === 'add') {
        await adminService.createStaff(form);
      } else {
        await adminService.updateStaff(modal.MaNhanVien, form);
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
      await adminService.deleteStaff(id); 
      setDeleteConfirm(null); 
      await fetchData(); 
    } catch (err) { 
      alert('Lỗi: ' + (err.response?.data?.message || err.message)); 
    } finally { 
      setSaving(false); 
    }
  };

  if (loading) return <div className="space-y-6 animate-fade-in"><PageHeader title="Nhân viên" description="Quản lý đội ngũ nhân viên khách sạn" icon="badge" /><div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"><SkeletonCard /><SkeletonCard /></div></div>;

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Nhân viên" description={`Quản lý ${staff.length} nhân viên trong đội ngũ`} icon="badge"
        actions={<button onClick={openAdd} className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-amber-900 transition-colors text-sm shadow-sm"><span className="material-symbols-outlined text-lg">person_add</span>Thêm nhân viên</button>}
      />

      <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)]">
        <div className="flex items-center bg-surface-container-high/60 rounded-xl px-3 py-2.5 max-w-md border border-transparent focus-within:border-primary transition-colors">
          <span className="material-symbols-outlined text-on-surface-variant text-lg mr-2">search</span>
          <input type="text" placeholder="Tìm tên, email, SDT, chức vụ..." className="bg-transparent outline-none text-sm w-full text-on-surface" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.length === 0 && <p className="text-on-surface-variant text-sm col-span-full text-center py-8">Không tìm thấy nhân viên nào.</p>}
        {filtered.map(nv => (
          <div key={nv.MaNhanVien} className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0_2px_12px_rgba(77,70,53,0.06)] hover:shadow-[0_8px_32px_rgba(77,70,53,0.1)] transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-lg flex-shrink-0">{(nv.HoTen || 'N').charAt(0)}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-on-surface text-sm truncate">{nv.HoTen}</h3>
                <p className="text-xs text-primary font-medium">{nv.ChucVu}</p>
                <p className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant mt-1">{nv.taiKhoan?.vaiTro?.TenVaiTro || 'Chưa có phân quyền'}</p>
              </div>
              <StatusBadge status={nv.taiKhoan?.TrangThai || 'Khóa'} />
            </div>
            
            <div className="mt-4 pt-4 border-t border-surface-container-high space-y-2 text-xs text-on-surface-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">email</span>
                <span className="truncate">{nv.Email || '—'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">phone</span>
                {nv.SoDienThoai || '—'}
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <button onClick={() => openEdit(nv)} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-surface-container-high rounded-xl text-xs font-medium text-on-surface hover:bg-primary-container hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[16px]">edit</span> Thay đổi
              </button>
              <button onClick={() => setDeleteConfirm(nv)} className="px-3 py-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors" title="Xóa">
                <span className="material-symbols-outlined text-lg">delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add/Edit */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModal(null)} />
          <form onSubmit={handleSave} className="relative bg-surface-container-lowest rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-scale-in max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-on-surface mb-5">{modal === 'add' ? 'Thêm nhân viên' : 'Sửa thông tin nhân viên'}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Họ và Tên *</label>
                <input required value={form.HoTen} onChange={e => setForm(p => ({...p, HoTen: e.target.value}))} className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm" />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Số điện thoại *</label>
                  <input required value={form.SoDienThoai} onChange={e => setForm(p => ({...p, SoDienThoai: e.target.value}))} className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Cấp Quyền *</label>
                  <select required value={form.VaiTroId} onChange={e => setForm(p => ({...p, VaiTroId: e.target.value}))} className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm cursor-pointer">
                    {roles.length === 0 && <option value="">Đang tải vai trò...</option>}
                    {roles.map(r => (
                      <option key={r.MaVaiTro} value={r.MaVaiTro}>{r.TenVaiTro}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Email</label>
                <input type="email" value={form.Email} onChange={e => setForm(p => ({...p, Email: e.target.value}))} className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm" />
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Chức vụ (VD: Lễ tân, Quản lý, ...)</label>
                <input value={form.ChucVu} onChange={e => setForm(p => ({...p, ChucVu: e.target.value}))} className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary text-sm" />
              </div>
              
              {modal === 'add' && (
                <div className="bg-primary-container/30 px-4 py-3 rounded-xl mt-2 border border-primary/20">
                  <p className="text-xs text-on-surface-variant">
                    <span className="material-symbols-outlined text-sm align-middle text-primary mr-1">info</span>
                    Nhân viên mới sẽ có thể đăng nhập bằng Email và mật khẩu mặc định: <strong>123456</strong>
                  </p>
                </div>
              )}
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
              Bạn có chắc chắn muốn xóa nhân viên <strong className="text-primary">{deleteConfirm.HoTen}</strong>? Thao tác này có thể ảnh hưởng đến lịch sử hoạt động.
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-colors">Hủy</button>
              <button disabled={saving} onClick={() => handleDelete(deleteConfirm.MaNhanVien)} className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50">
                {saving ? 'Đang xóa...' : 'Xóa dữ liệu'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
