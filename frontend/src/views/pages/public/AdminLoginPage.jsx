import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../store/AuthContext';

export default function AdminLoginPage() {
  const [tenDangNhap, setTenDangNhap] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await adminLogin(tenDangNhap, matKhau);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'linear-gradient(135deg, #1c1c19 0%, #2d2a24 50%, #1c1c19 100%)' }}>
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
          </div>
          <h1 className="text-3xl font-notoSerif font-bold text-white mb-2">Quản Trị Viên</h1>
          <p className="text-white/60 text-sm">Đăng nhập vào hệ thống quản lý khách sạn</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-300 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">error</span>
                {error}
              </div>
            )}
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-white/60 font-semibold mb-2">Tên đăng nhập</label>
              <input type="text" placeholder="admin" value={tenDangNhap} onChange={e => setTenDangNhap(e.target.value)} required
                className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl outline-none focus:border-primary text-sm text-white placeholder:text-white/30" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-white/60 font-semibold mb-2">Mật khẩu</label>
              <input type="password" placeholder="••••••••" value={matKhau} onChange={e => setMatKhau(e.target.value)} required
                className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl outline-none focus:border-primary text-sm text-white placeholder:text-white/30" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-amber-700 transition-colors shadow-lg text-sm disabled:opacity-60 flex items-center justify-center gap-2">
              {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin-slow" />}
              {loading ? 'Đang xác thực...' : 'Đăng nhập Quản trị'}
            </button>
          </form>
          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <p className="text-white/40 text-xs">Quay lại <a href="/login" className="text-primary hover:underline">trang đăng nhập</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
