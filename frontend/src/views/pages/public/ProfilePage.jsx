import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../store/AuthContext';
import apiClient from '../../../services/apiClient';
import authService from '../../../services/authService';
import { formatVND, formatDate } from '../../../utils/formatters';

export default function ProfilePage() {
  const { user, logout, updateUser, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({ HoTen: '', SoDienThoai: '', DiaChi: '', CCCD_CMND: '' });
  const [pwForm, setPwForm] = useState({ MatKhauCu: '', MatKhauMoi: '', XacNhan: '' });
  const [pwMessage, setPwMessage] = useState('');

  useEffect(() => {
    if (!isAuthenticated) return;
    loadData();
  }, [isAuthenticated]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [profileRes, bookingsRes, invoicesRes] = await Promise.allSettled([
        apiClient.get('/user/profile'),
        apiClient.get('/user/bookings'),
        apiClient.get('/user/invoices'),
      ]);
      if (profileRes.status === 'fulfilled') {
        setProfile(profileRes.value);
        setForm({
          HoTen: profileRes.value.HoTen || '',
          SoDienThoai: profileRes.value.SoDienThoai || '',
          DiaChi: profileRes.value.DiaChi || '',
          CCCD_CMND: profileRes.value.CCCD_CMND || '',
        });
      }
      if (bookingsRes.status === 'fulfilled') setBookings(bookingsRes.value || []);
      if (invoicesRes.status === 'fulfilled') setInvoices(invoicesRes.value || []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const res = await apiClient.put('/user/profile', form);
      setMessage('Cập nhật hồ sơ thành công!');
      updateUser({ HoTen: form.HoTen, SoDienThoai: form.SoDienThoai });
    } catch (e) {
      setMessage('Lỗi cập nhật hồ sơ');
    }
    setSaving(false);
  };

  const statusColor = (s) => {
    const map = { 'Đã xác nhận': 'bg-emerald-100 text-emerald-700', 'Chờ xác nhận': 'bg-amber-100 text-amber-700', 'Đã nhận phòng': 'bg-blue-100 text-blue-700', 'Đã trả phòng': 'bg-gray-100 text-gray-600', 'Đã hủy': 'bg-red-100 text-red-600', 'Đã thanh toán': 'bg-emerald-100 text-emerald-700', 'Chưa thanh toán': 'bg-amber-100 text-amber-700' };
    return map[s] || 'bg-gray-100 text-gray-600';
  };

  const tabs = [
    { id: 'profile', label: 'Hồ sơ', icon: 'person' },
    { id: 'password', label: 'Đổi mật khẩu', icon: 'lock' },
    { id: 'bookings', label: 'Lịch sử đặt phòng', icon: 'hotel' },
    { id: 'invoices', label: 'Hóa đơn', icon: 'receipt_long' },
  ];

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin-slow" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-surface-container-low py-10 px-8">
        <div className="max-w-5xl mx-auto flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-primary-container flex items-center justify-center text-2xl font-bold text-on-primary-container">
            {(user?.HoTen || 'U').charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-notoSerif font-bold text-on-surface">{user?.HoTen || 'Người dùng'}</h1>
            <p className="text-on-surface-variant text-sm">{user?.Email || profile?.Email}</p>
          </div>
          <button onClick={logout} className="ml-auto px-5 py-2.5 border border-outline-variant rounded-xl text-sm font-medium hover:bg-surface-container-high transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">logout</span> Đăng xuất
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-5xl mx-auto px-8">
        <div className="flex gap-1 border-b border-outline-variant/30 mt-6">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`px-5 py-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === t.id ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'}`}>
              <span className="material-symbols-outlined text-lg">{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        <div className="py-8">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="max-w-lg space-y-5">
              {message && (
                <div className={`px-4 py-3 rounded-xl text-sm ${message.includes('thành công') ? 'bg-emerald-50 text-emerald-700' : 'bg-error-container text-error'}`}>
                  {message}
                </div>
              )}
              {[
                { field: 'HoTen', label: 'Họ và tên', type: 'text' },
                { field: 'SoDienThoai', label: 'Số điện thoại', type: 'tel' },
                { field: 'DiaChi', label: 'Địa chỉ', type: 'text' },
                { field: 'CCCD_CMND', label: 'CCCD/CMND', type: 'text' },
              ].map(f => (
                <div key={f.field}>
                  <label className="block text-xs uppercase tracking-[0.15em] text-on-surface-variant font-semibold mb-2">{f.label}</label>
                  <input type={f.type} value={form[f.field]} onChange={e => setForm(prev => ({ ...prev, [f.field]: e.target.value }))}
                    className="w-full bg-surface-container-high/60 px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary text-sm" />
                </div>
              ))}
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-on-surface-variant font-semibold mb-2">Email</label>
                <input type="email" value={profile?.Email || user?.Email || ''} disabled
                  className="w-full bg-surface-container-high/40 px-4 py-3 rounded-xl text-sm text-on-surface-variant cursor-not-allowed" />
              </div>
              <button type="submit" disabled={saving}
                className="bg-primary text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-amber-900 transition-colors shadow-md disabled:opacity-60 flex items-center gap-2">
                {saving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin-slow" />}
                {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
              </button>
            </form>
          )}

          {/* Change Password Tab */}
          {activeTab === 'password' && (
            <form onSubmit={async (e) => {
              e.preventDefault();
              setPwMessage('');
              if (pwForm.MatKhauMoi !== pwForm.XacNhan) {
                setPwMessage('Mật khẩu mới và xác nhận không khớp');
                return;
              }
              if (pwForm.MatKhauMoi.length < 6) {
                setPwMessage('Mật khẩu mới phải ít nhất 6 ký tự');
                return;
              }
              setSaving(true);
              try {
                await authService.changePassword(pwForm.MatKhauCu, pwForm.MatKhauMoi);
                setPwMessage('Đổi mật khẩu thành công!');
                setPwForm({ MatKhauCu: '', MatKhauMoi: '', XacNhan: '' });
              } catch (err) {
                setPwMessage(err.response?.data?.message || 'Lỗi đổi mật khẩu');
              }
              setSaving(false);
            }} className="max-w-lg space-y-5">
              {pwMessage && (
                <div className={`px-4 py-3 rounded-xl text-sm ${pwMessage.includes('thành công') ? 'bg-emerald-50 text-emerald-700' : 'bg-error-container text-error'}`}>
                  {pwMessage}
                </div>
              )}
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-on-surface-variant font-semibold mb-2">Mật khẩu hiện tại</label>
                <input type="password" value={pwForm.MatKhauCu} onChange={e => setPwForm(prev => ({ ...prev, MatKhauCu: e.target.value }))}
                  required className="w-full bg-surface-container-high/60 px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary text-sm" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-on-surface-variant font-semibold mb-2">Mật khẩu mới</label>
                <input type="password" value={pwForm.MatKhauMoi} onChange={e => setPwForm(prev => ({ ...prev, MatKhauMoi: e.target.value }))}
                  required minLength={6} className="w-full bg-surface-container-high/60 px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary text-sm" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-on-surface-variant font-semibold mb-2">Xác nhận mật khẩu mới</label>
                <input type="password" value={pwForm.XacNhan} onChange={e => setPwForm(prev => ({ ...prev, XacNhan: e.target.value }))}
                  required minLength={6} className="w-full bg-surface-container-high/60 px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary text-sm" />
              </div>
              <button type="submit" disabled={saving}
                className="bg-primary text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-amber-900 transition-colors shadow-md disabled:opacity-60 flex items-center gap-2">
                {saving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin-slow" />}
                {saving ? 'Đang xử lý...' : 'Đổi mật khẩu'}
              </button>
            </form>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              {bookings.length === 0 && <p className="text-on-surface-variant text-center py-12">Chưa có đặt phòng nào</p>}
              {bookings.map((b, i) => {
                const loaiPhong = b.chi_tiet_dat_phongs?.[0]?.phong?.loai_phong?.TenLoai || b.LoaiPhong || 'Phòng';
                const trangThai = b.TrangThai;
                return (
                  <div key={b.MaPhieuDat || i} className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/20 hover:shadow-card transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-on-surface font-notoSerif">{loaiPhong}</h3>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColor(trangThai)}`}>{trangThai}</span>
                        </div>
                        <div className="flex gap-4 text-xs text-on-surface-variant">
                          <span>📅 {b.NgayNhanDuKien || b.NgayNhanPhong} → {b.NgayTraDuKien || b.NgayTraPhong}</span>
                          {b.goi_combo && <span className="text-primary font-medium">📦 {b.goi_combo.TenGoi}</span>}
                          {b.ComboInfo?.TenGoi && <span className="text-primary font-medium">📦 {b.ComboInfo.TenGoi}</span>}
                        </div>
                        {b.GhiChu && <p className="text-xs text-on-surface-variant mt-1 italic">{b.GhiChu}</p>}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-primary font-bold">{formatVND(b.TongTien || b.hoa_don?.TongThanhToan || 0)}</p>
                        <p className="text-[10px] text-on-surface-variant">#{b.MaPhieuDat}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Invoices Tab */}
          {activeTab === 'invoices' && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-outline-variant/30">
                    <th className="text-left py-3 px-2 text-xs uppercase tracking-wider text-on-surface-variant font-semibold">Mã HĐ</th>
                    <th className="text-left py-3 px-2 text-xs uppercase tracking-wider text-on-surface-variant font-semibold">Ngày lập</th>
                    <th className="text-right py-3 px-2 text-xs uppercase tracking-wider text-on-surface-variant font-semibold">Tổng</th>
                    <th className="text-center py-3 px-2 text-xs uppercase tracking-wider text-on-surface-variant font-semibold">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.length === 0 && (
                    <tr><td colSpan={4} className="text-center py-12 text-on-surface-variant">Chưa có hóa đơn nào</td></tr>
                  )}
                  {invoices.map((inv, i) => (
                    <tr key={inv.MaHoaDon || i} className="border-b border-outline-variant/10 hover:bg-surface-container-low/50">
                      <td className="py-3 px-2 font-medium text-on-surface">HD-{String(inv.MaHoaDon).padStart(4, '0')}</td>
                      <td className="py-3 px-2 text-on-surface-variant">{formatDate(inv.NgayLap)}</td>
                      <td className="py-3 px-2 text-right font-bold text-primary">{formatVND(inv.TongThanhToan)}</td>
                      <td className="py-3 px-2 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColor(inv.TrangThaiThanhToan)}`}>
                          {inv.TrangThaiThanhToan}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
