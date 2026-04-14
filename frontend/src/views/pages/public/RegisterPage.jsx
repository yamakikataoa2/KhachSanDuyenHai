import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../store/AuthContext';

export default function RegisterPage() {
  const [form, setForm] = useState({ HoTen: '', Email: '', SoDienThoai: '', MatKhau: '', DiaChi: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.MatKhau.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }
    setLoading(true);
    try {
      await register(form);
      navigate('/profile', { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || 'Đăng ký thất bại';
      const errors = err.response?.data?.errors;
      if (errors) {
        setError(Object.values(errors).flat().join('. '));
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-notoSerif font-bold text-on-surface mb-2">Tạo tài khoản</h1>
          <p className="text-on-surface-variant text-sm">Đăng ký để tận hưởng các ưu đãi đặc biệt</p>
        </div>
        <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-[0_8px_32px_rgba(77,70,53,0.1)]">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-error-container text-error px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">error</span>
                {error}
              </div>
            )}
            {[
              { field: 'HoTen', label: 'Họ và tên', placeholder: 'Nhập họ tên đầy đủ', type: 'text', required: true },
              { field: 'Email', label: 'Email', placeholder: 'you@example.com', type: 'email', required: true },
              { field: 'SoDienThoai', label: 'Số điện thoại', placeholder: '0901234567', type: 'tel', required: true },
              { field: 'MatKhau', label: 'Mật khẩu', placeholder: 'Tối thiểu 6 ký tự', type: 'password', required: true },
              { field: 'DiaChi', label: 'Địa chỉ (tùy chọn)', placeholder: 'TP. Hồ Chí Minh', type: 'text', required: false },
            ].map(f => (
              <div key={f.field}>
                <label className="block text-xs uppercase tracking-[0.15em] text-on-surface-variant font-semibold mb-2">{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} value={form[f.field]} onChange={handleChange(f.field)} required={f.required}
                  className="w-full bg-surface-container-high/60 px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary text-sm" />
              </div>
            ))}
            <button type="submit" disabled={loading}
              className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-amber-900 transition-colors shadow-md text-sm disabled:opacity-60 flex items-center justify-center gap-2">
              {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin-slow" />}
              {loading ? 'Đang đăng ký...' : 'Đăng ký'}
            </button>
          </form>
          <p className="text-center text-sm text-on-surface-variant mt-6">
            Đã có tài khoản? <Link to="/login" className="text-primary font-semibold hover:underline">Đăng nhập</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
