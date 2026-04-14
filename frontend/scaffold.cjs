const fs = require('fs');
const path = require('path');

const publicPages = ['HomePage', 'RoomsPage', 'RoomDetailPage', 'CombosPage', 'ComboDetailPage', 'BookingPage', 'BookingDetailPage', 'LoginPage', 'RegisterPage', 'ProfilePage', 'HistoryPage', 'InvoicesPage', 'InvoiceDetailPage'];
const adminPages = ['DashboardPage', 'RoomTypesPage', 'RoomsManagePage', 'ServicesPage', 'CombosManagePage', 'ComboDetailsPage', 'CustomersPage', 'StaffPage', 'RolesPage', 'BookingsManagePage', 'InvoicesManagePage', 'ReportsPage'];

function createComponentString(name) {
    return `import React from 'react';\n\nexport default function ${name}() {\n  return (\n    <div className="p-8">\n      <h1 className="text-2xl font-bold">${name}</h1>\n      <p className="mt-2 text-slate-500">Thành phần Placeholder đang chờ dữ liệu.</p>\n    </div>\n  );\n}\n`;
}

publicPages.forEach(page => {
    fs.writeFileSync(path.join(__dirname, 'src/views/pages/public', `${page}.jsx`), createComponentString(page));
});

adminPages.forEach(page => {
    fs.writeFileSync(path.join(__dirname, 'src/views/pages/admin', `${page}.jsx`), createComponentString(page));
});

// Errors
fs.writeFileSync(path.join(__dirname, 'src/views/pages/errors', 'NotFoundPage.jsx'), `
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface-container-lowest text-on-surface">
      <h1 className="text-9xl font-bold text-primary font-notoSerif">404</h1>
      <p className="mt-4 text-2xl font-medium text-on-surface-variant">Trang bạn tìm kiếm không tồn tại</p>
      <Link to="/" className="mt-8 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-amber-900 transition-all shadow-xl hover:-translate-y-1">
        Trở về Trải nghiệm
      </Link>
    </div>
  );
}
`);

// Layouts
fs.writeFileSync(path.join(__dirname, 'src/app/layouts', 'PublicLayout.jsx'), `
import React, { Suspense } from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface">
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-[0_20px_40px_rgba(77,70,53,0.06)]">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-full">
            <Link to="/" className="text-2xl font-notoSerif italic text-amber-800">The Curated Sanctuary</Link>
            <div className="hidden md:flex items-center space-x-8 font-notoSerif tracking-wide text-sm uppercase">
                <Link to="/rooms" className="text-slate-600 font-medium hover:text-amber-600 transition-colors duration-300">Rooms</Link>
                <Link to="/combos" className="text-slate-600 font-medium hover:text-amber-600 transition-colors duration-300">Offers</Link>
                <Link to="/services" className="text-slate-600 font-medium hover:text-amber-600 transition-colors duration-300">Services</Link>
                <Link to="/admin" className="text-slate-400 font-medium hover:text-amber-600 transition-colors duration-300">Admin</Link>
            </div>
            <div className="flex items-center space-x-6">
                <Link to="/profile" className="material-symbols-outlined text-on-surface hover:text-amber-600 transition-colors duration-300">person</Link>
                <Link to="/booking" className="bg-primary-container text-on-primary-container px-6 py-2 rounded-lg font-notoSerif uppercase tracking-wider text-sm hover:brightness-110 transition-all scale-95 hover:scale-100 duration-200 shadow-md">Book Now</Link>
            </div>
        </div>
      </nav>
      
      <main className="flex-1 mt-16 relative">
        <Suspense fallback={
            <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
                <div className="flex flex-col items-center">
                    <span className="material-symbols-outlined animate-spin text-4xl text-primary mb-4">progress_activity</span>
                    <span className="text-on-surface-variant font-medium">Đang tải...</span>
                </div>
            </div>
        }>
          <Outlet />
        </Suspense>
      </main>

      <footer className="bg-slate-50 dark:bg-slate-950 w-full border-t border-slate-100 dark:border-slate-800 mt-auto">
        <div className="px-12 py-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
            <p>© 2026 The Curated Sanctuary. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
`);
fs.writeFileSync(path.join(__dirname, 'src/app/layouts', 'AdminLayout.jsx'), `
import React, { Suspense } from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-slate-50/50 text-slate-900 font-inter text-sm">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
            <div className="h-16 flex items-center px-6 border-b border-slate-100">
                <Link to="/" className="text-primary font-bold text-lg font-notoSerif italic truncate flex gap-2 items-center">
                    <span className="material-symbols-outlined">hotel</span> Admin
                </Link>
            </div>
            
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 mt-4 px-3">Tổng quan</div>
                <Link to="/admin" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-primary rounded-lg transition-colors group">
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">dashboard</span> Dashboard
                </Link>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 mt-6 px-3">Quản lý Dịch vụ</div>
                <Link to="/admin/rooms" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-primary rounded-lg transition-colors group">
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">bed</span> Phòng nghỉ
                </Link>
                <Link to="/admin/combos" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-primary rounded-lg transition-colors group">
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">card_giftcard</span> Gói Combo
                </Link>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 mt-6 px-3">Giao dịch</div>
                <Link to="/admin/bookings" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-primary rounded-lg transition-colors group">
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">receipt_long</span> Đơn đặt phòng
                </Link>
                <Link to="/admin/invoices" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-primary rounded-lg transition-colors group">
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">payments</span> Hóa đơn
                </Link>
                
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 mt-6 px-3">Khác</div>
                <Link to="/" className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-100 hover:text-red-600 rounded-lg transition-colors group mt-auto">
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-red-500">logout</span> Về trang chủ
                </Link>
            </nav>
        </aside>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
            <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 bg-white/50 backdrop-blur-md">
                <h1 className="text-xl font-bold text-slate-800">Quản trị Hệ thống</h1>
                <div className="flex items-center gap-4">
                    <button className="material-symbols-outlined text-slate-500 hover:text-slate-800 transition-colors">notifications</button>
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">A</div>
                </div>
            </header>
            
            <main className="flex-1 overflow-auto p-8 relative">
                <Suspense fallback={
                    <div className="absolute inset-0 flex justify-center items-center bg-slate-50/50 backdrop-blur-sm z-50">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                }>
                    <Outlet />
                </Suspense>
            </main>
        </div>
    </div>
  );
}
`);
console.log("Done");
