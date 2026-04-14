import React, { Suspense, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { PageLoadingSkeleton } from '../../views/components/common/LoadingSkeleton';
import { useAuth } from '../../store/AuthContext';

const menuGroups = [
  {
    label: 'Tổng quan',
    items: [
      { to: '/admin', icon: 'dashboard', text: 'Dashboard', exact: true },
    ],
  },
  {
    label: 'Quản lý Dịch vụ',
    items: [
      { to: '/admin/rooms', icon: 'bed', text: 'Phòng nghỉ' },
      { to: '/admin/room-types', icon: 'category', text: 'Loại phòng' },
      { to: '/admin/combos', icon: 'card_giftcard', text: 'Gói Combo' },
      { to: '/admin/services', icon: 'room_service', text: 'Dịch vụ' },
    ],
  },
  {
    label: 'Giao dịch',
    items: [
      { to: '/admin/bookings', icon: 'receipt_long', text: 'Đơn đặt phòng' },
      { to: '/admin/invoices', icon: 'payments', text: 'Hóa đơn' },
      { to: '/admin/reports', icon: 'analytics', text: 'Báo cáo' },
    ],
  },
  {
    label: 'Người dùng',
    items: [
      { to: '/admin/customers', icon: 'group', text: 'Khách hàng' },
      { to: '/admin/staff', icon: 'badge', text: 'Nhân viên' },
      { to: '/admin/roles', icon: 'admin_panel_settings', text: 'Phân quyền' },
    ],
  },
];

function SidebarLink({ to, icon, text, exact, currentPath }) {
  const isActive = exact ? currentPath === to : currentPath.startsWith(to);
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
        ${isActive
          ? 'bg-amber-50 text-primary shadow-sm'
          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
        }`}
    >
      <span className={`material-symbols-outlined text-xl ${isActive ? 'text-primary' : 'text-slate-400'}`}
        style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
      >{icon}</span>
      {text}
    </Link>
  );
}

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-slate-50/80 text-slate-900 font-inter text-sm">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white flex flex-col transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        shadow-xl lg:shadow-none
      `}>
        <div className="h-16 flex items-center px-6 border-b border-slate-100 flex-shrink-0">
          <Link to="/admin" className="flex items-center gap-2.5 text-primary font-bold text-lg font-notoSerif">
            <span className="material-symbols-outlined text-2xl">apartment</span>
            <span className="italic">Admin</span>
          </Link>
          <button className="ml-auto lg:hidden text-slate-400 hover:text-slate-600" onClick={() => setSidebarOpen(false)}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1 admin-scrollbar">
          {menuGroups.map((group, gi) => (
            <div key={gi} className={gi > 0 ? 'mt-6' : 'mt-2'}>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-2 px-3">{group.label}</p>
              <div className="space-y-0.5">
                {group.items.map((item, ii) => (
                  <SidebarLink key={ii} {...item} currentPath={location.pathname} />
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 flex-shrink-0 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all text-sm"
          >
            <span className="material-symbols-outlined text-xl">home</span>
            Về trang chủ
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all text-sm"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            Đăng xuất
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-6 lg:px-8 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-slate-500 hover:text-slate-800" onClick={() => setSidebarOpen(true)}>
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h1 className="text-lg font-bold text-slate-800">Quản trị Hệ thống</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <span className="hidden md:block text-sm text-slate-600 font-medium">{user?.HoTen || 'Admin'}</span>
              <div className="w-9 h-9 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-sm">{(user?.HoTen || 'A').charAt(0)}</div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-6 lg:p-8">
          <Suspense fallback={<PageLoadingSkeleton />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
