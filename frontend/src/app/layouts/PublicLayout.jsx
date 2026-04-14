import React, { Suspense, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { SkeletonCard } from '../../views/components/common/LoadingSkeleton';
import { useAuth } from '../../store/AuthContext';

function PublicLoadingFallback() {
  return (
    <div className="animate-fade-in py-16 px-8 max-w-7xl mx-auto">
      <div className="space-y-4 mb-12">
        <div className="h-8 w-64 bg-surface-container-high animate-skeleton rounded-lg" />
        <div className="h-4 w-96 bg-surface-container-high animate-skeleton rounded-lg" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    </div>
  );
}

export default function PublicLayout() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navLinks = [
    { to: '/rooms', label: 'Phòng nghỉ' },
    { to: '/combos', label: 'Ưu đãi' },
    { to: '/history', label: 'Lịch sử' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-surface text-on-surface">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass shadow-[0_1px_20px_rgba(77,70,53,0.06)] border-b border-outline-variant/10">
        <div className="flex justify-between items-center w-full px-6 lg:px-8 py-4 max-w-full">
          <Link to="/" className="text-2xl font-notoSerif italic text-primary font-semibold">
            The Curated Sanctuary
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 font-inter tracking-wide text-sm">
            {navLinks.map(link => (
              <Link 
                key={link.to}
                to={link.to} 
                className={`font-medium transition-colors duration-300 ${
                  location.pathname === link.to || location.pathname.startsWith(link.to + '/')
                    ? 'text-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="hidden sm:flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-sm font-medium">
                  <span className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-xs font-bold">{(user?.HoTen || 'U').charAt(0)}</span>
                  <span className="hidden lg:inline">{user?.HoTen?.split(' ').pop()}</span>
                </Link>
                <button onClick={handleLogout} className="hidden sm:flex items-center gap-1 text-on-surface-variant hover:text-error transition-colors text-sm" title="Đăng xuất">
                  <span className="material-symbols-outlined text-lg">logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="hidden sm:flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-sm font-medium">
                <span className="material-symbols-outlined text-xl">person</span>
                Đăng nhập
              </Link>
            )}
            <Link to="/booking" className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-xl font-semibold tracking-wide text-sm hover:brightness-110 transition-all shadow-sm hover:shadow-md hidden sm:inline-flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">calendar_month</span>
              Đặt phòng
            </Link>
            <button className="md:hidden text-on-surface p-1" onClick={() => setMobileMenu(!mobileMenu)}>
              <span className="material-symbols-outlined text-2xl">{mobileMenu ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden bg-surface-container-lowest border-t border-outline-variant/10 px-6 py-4 space-y-2 animate-fade-in">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} className="block py-3 text-on-surface-variant hover:text-primary font-medium text-sm border-b border-surface-container-high" onClick={() => setMobileMenu(false)}>
                {link.label}
              </Link>
            ))}
            <Link to="/booking" className="block mt-3 text-center bg-primary-container text-on-primary-container px-6 py-3 rounded-xl font-semibold text-sm" onClick={() => setMobileMenu(false)}>
              Đặt phòng ngay
            </Link>
          </div>
        )}
      </nav>
      
      <main className="flex-1 mt-[72px]">
        <Suspense fallback={<PublicLoadingFallback />}>
          <Outlet />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="bg-inverse-surface text-inverse-on-surface mt-auto">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <h3 className="text-2xl font-notoSerif italic text-inverse-primary mb-4">The Curated Sanctuary</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Khách sạn 5 sao sang trọng tại trung tâm thành phố với dịch vụ đẳng cấp quốc tế.</p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-4">Khám phá</h4>
              <div className="space-y-3">
                <Link to="/rooms" className="block text-sm text-slate-300 hover:text-inverse-primary transition-colors">Phòng nghỉ</Link>
                <Link to="/combos" className="block text-sm text-slate-300 hover:text-inverse-primary transition-colors">Ưu đãi</Link>
                <Link to="/booking" className="block text-sm text-slate-300 hover:text-inverse-primary transition-colors">Đặt phòng</Link>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-4">Dịch vụ</h4>
              <div className="space-y-3">
                <p className="text-sm text-slate-300">Spa & Wellness</p>
                <p className="text-sm text-slate-300">Fine Dining</p>
                <p className="text-sm text-slate-300">Hồ bơi Infinity</p>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-4">Liên hệ</h4>
              <div className="space-y-3 text-sm text-slate-300">
                <p className="flex items-center gap-2"><span className="material-symbols-outlined text-lg text-slate-400">location_on</span>123 Luxury Avenue, TP. HCM</p>
                <p className="flex items-center gap-2"><span className="material-symbols-outlined text-lg text-slate-400">phone</span>+84 28 1234 5678</p>
                <p className="flex items-center gap-2"><span className="material-symbols-outlined text-lg text-slate-400">email</span>hello@curatedsanctuary.vn</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-700 px-8 py-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <p>© 2026 The Curated Sanctuary. All rights reserved.</p>
            <div className="flex gap-6 mt-3 md:mt-0">
              <a href="#" className="hover:text-inverse-primary transition-colors">Chính sách bảo mật</a>
              <a href="#" className="hover:text-inverse-primary transition-colors">Điều khoản</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
