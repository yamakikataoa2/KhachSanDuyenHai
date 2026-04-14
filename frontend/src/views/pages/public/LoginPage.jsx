import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../store/AuthContext';

export default function LoginPage() {
  const [tenDangNhap, setTenDangNhap] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/profile';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(tenDangNhap, matKhau);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-notoSerif font-bold text-on-surface mb-2">Chào mừng trở lại</h1>
          <p className="text-on-surface-variant text-sm">Đăng nhập để quản lý đặt phòng của bạn</p>
        </div>
        <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-[0_8px_32px_rgba(77,70,53,0.1)]">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-error-container text-error px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">error</span>
                {error}
              </div>
            )}
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-on-surface-variant font-semibold mb-2">Email / Tên đăng nhập</label>
              <input type="text" placeholder="you@example.com" value={tenDangNhap} onChange={e => setTenDangNhap(e.target.value)} required
                className="w-full bg-surface-container-high/60 px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary text-sm" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-on-surface-variant font-semibold mb-2">Mật khẩu</label>
              <input type="password" placeholder="••••••••" value={matKhau} onChange={e => setMatKhau(e.target.value)} required
                className="w-full bg-surface-container-high/60 px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary text-sm" />
            </div>
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-on-surface-variant cursor-pointer">
                <input type="checkbox" className="accent-primary" /> Ghi nhớ
              </label>
              <a href="#" className="text-primary font-medium hover:underline">Quên mật khẩu?</a>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-amber-900 transition-colors shadow-md text-sm disabled:opacity-60 flex items-center justify-center gap-2">
              {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin-slow" />}
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>
          <p className="text-center text-sm text-on-surface-variant mt-6">
            Chưa có tài khoản? <Link to="/register" className="text-primary font-semibold hover:underline">Đăng ký ngay</Link>
          </p>
          <div className="relative mt-6 mb-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-outline-variant/30"></div></div>
            <div className="relative flex justify-center"><span className="bg-surface-container-lowest px-3 text-xs text-on-surface-variant">hoặc</span></div>
          </div>
          <Link to="/admin/login" className="block text-center text-sm text-secondary font-medium hover:underline">
            Đăng nhập dành cho Quản trị viên →
          </Link>
        </div>
      </div>
    </div>
  );
}
