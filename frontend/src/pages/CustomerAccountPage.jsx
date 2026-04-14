import React from 'react';

export default function CustomerAccountPage() {
  return (
    <div className="bg-background text-on-surface min-h-screen overflow-x-hidden">
      
<nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-[0_20px_40px_rgba(77,70,53,0.06)]">
<div className="flex justify-between items-center w-full px-8 py-4 max-w-full">
<div className="text-2xl font-notoSerif italic text-amber-800">The Curated Sanctuary</div>
<div className="hidden md:flex items-center space-x-8 font-notoSerif tracking-wide text-sm uppercase">
<a className="text-slate-600 hover:text-amber-600 transition-colors duration-300" href="#">Rooms</a>
<a className="text-slate-600 hover:text-amber-600 transition-colors duration-300" href="#">Offers</a>
<a className="text-slate-600 hover:text-amber-600 transition-colors duration-300" href="#">Services</a>
<a className="text-slate-600 hover:text-amber-600 transition-colors duration-300" href="#">About Us</a>
</div>
<div className="flex items-center space-x-6">
<button className="material-symbols-outlined text-slate-600 hover:text-amber-700">person</button>
<button className="bg-primary-container text-on-primary-container px-6 py-2 rounded-lg font-notoSerif text-sm tracking-widest uppercase hover:opacity-90 transition-all">Book Now</button>
</div>
</div>
</nav>
<main className="pt-28 pb-20 px-4 md:px-12 max-w-7xl mx-auto">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
<aside className="lg:col-span-3 space-y-8">
<div className="bg-surface-container-lowest p-8 rounded-xl text-center">
<div className="relative w-24 h-24 mx-auto mb-4">
<img alt="Profile Avatar" className="rounded-full w-full h-full object-cover border-2 border-primary-container p-1" data-alt="portrait of a sophisticated middle-aged man in a charcoal suit, clean studio lighting, high-end editorial photography style" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRrUWJzt3EP9KmuKFBVPajDFHpIADzSO_gJia-7uPjWrOjCj04CGJJAKoSe4Wgij4dN_CBx0z-Jf9353v2nOjrpsD2Xvti3C5UX0PxjJDIzMLN81_ApzcKnldAf5kjbKqgMhg8HlRTABl99pBxmmZi531XtpVTauqqW9SBZPS_Nc1u-y4h6vZ-t60kfJivBGiTw_N9IJSAFahsjYFX6K8mUMqvx-DBK2wYalzhH1IBIQvqYEJIg0Yuzqo1zALrqOSuD6De3EyajXQ"/>
<div className="absolute bottom-0 right-0 bg-primary-container text-on-primary-container text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm">GOLD</div>
</div>
<h2 className="text-xl font-notoSerif text-on-surface">Nguyễn Anh Tú</h2>
<p className="text-on-surface-variant text-sm mt-1">Thành viên từ 2022</p>
</div>
<nav className="space-y-1">
<a className="flex items-center space-x-4 px-6 py-4 rounded-lg text-slate-500 hover:bg-surface-container-low transition-colors group" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-medium text-sm">Hồ sơ</span>
</a>
<a className="relative flex items-center space-x-4 px-6 py-4 rounded-lg bg-surface-container-low text-primary group" href="#">
<div className="active-tab-indicator"></div>
<span className="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">calendar_month</span>
<span className="font-semibold text-sm">Lịch sử đặt phòng</span>
</a>
<a className="flex items-center space-x-4 px-6 py-4 rounded-lg text-slate-500 hover:bg-surface-container-low transition-colors group" href="#">
<span className="material-symbols-outlined">notifications</span>
<span className="font-medium text-sm">Thông báo</span>
</a>
<a className="flex items-center space-x-4 px-6 py-4 rounded-lg text-slate-500 hover:bg-surface-container-low transition-colors group" href="#">
<span className="material-symbols-outlined">security</span>
<span className="font-medium text-sm">Bảo mật</span>
</a>
<div className="pt-8 border-t border-surface-container-high mt-4">
<a className="flex items-center space-x-4 px-6 py-4 rounded-lg text-error hover:bg-error-container/20 transition-colors group" href="#">
<span className="material-symbols-outlined">logout</span>
<span className="font-medium text-sm">Đăng xuất</span>
</a>
</div>
</nav>
</aside>
<section className="lg:col-span-9 space-y-12">
<div>
<div className="flex justify-between items-end mb-8">
<div>
<h1 className="text-4xl font-notoSerif text-on-surface mb-2">Lịch sử đặt phòng</h1>
<p className="text-on-surface-variant">Quản lý các chuyến đi và dịch vụ của bạn tại Sanctuary.</p>
</div>
<div className="hidden md:block">
<select className="bg-surface border-none text-sm text-on-surface-variant focus:ring-0 cursor-pointer">
<option>Tất cả trạng thái</option>
<option>Đã hoàn thành</option>
<option>Chờ xác nhận</option>
<option>Đã hủy</option>
</select>
</div>
</div>
<div className="space-y-4">
<div className="bg-surface-container-lowest p-6 rounded-xl flex flex-col md:flex-row items-center gap-6 transition-all hover:shadow-[0_10px_30px_rgba(77,70,53,0.04)]">
<div className="w-full md:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
<img alt="Room" className="w-full h-full object-cover" data-alt="luxury hotel suite with soft morning light, king bed with high-thread count white linens, minimalist interior design" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA61cSrZRbLzGUQRA_x8NdzKiy6FrBAxU3MyvlFUkLCRCgWZMJiGbwoot8-qjTWXAe7UnZL7Mejq_xMzRiRlDTDymDWps0bNPGTWxZIjFQhDVddupMd4Y9zNPEoA0KBYvL9cW-RWqwKVsZOlSiK4xbo0Xt9DC1jCIJAnERSFyjXw5-TWAo6EFJFvggxni1sXNFhcHxI2PY3GTVTtuTDINU0N5wKoy1_YVP5yhvWNgq-fx1u5s0vo7rKzS-9qRHJfjyDsVuqmPsl1J4"/>
</div>
<div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
<div>
<p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Mã đặt phòng</p>
<p className="font-medium text-on-surface">#CS-29401</p>
</div>
<div>
<p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Loại phòng</p>
<p className="font-medium text-on-surface">Royal Suite</p>
</div>
<div>
<p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Ngày nhận phòng</p>
<p className="font-medium text-on-surface">12/10/2024</p>
</div>
<div>
<p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Tổng cộng</p>
<p className="font-bold text-amber-800">12.500.000đ</p>
</div>
</div>
<div className="flex items-center space-x-4 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-surface-container-low">
<span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-700">Đã hoàn thành</span>
<button className="text-amber-700 text-xs font-bold uppercase tracking-widest hover:underline whitespace-nowrap">Chi tiết</button>
</div>
</div>
<div className="bg-surface-container-lowest p-6 rounded-xl flex flex-col md:flex-row items-center gap-6 transition-all hover:shadow-[0_10px_30px_rgba(77,70,53,0.04)]">
<div className="w-full md:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
<img alt="Room" className="w-full h-full object-cover" data-alt="ocean view luxury villa terrace with infinity pool and sunset lighting, high-end travel aesthetic" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAexKwdU5rkSiWYeOiguniOXARpZh09Ynlu-YSRpFkSHu854vRQYVHzvgj56QqcBVSAps5VS6W9AF0HEBEZXahFR2Bd6XFDFFoDdS1Q1kDB4yyQj0JhtQGXFDL0SXua5hG5FVpwclrq47_6PorOU7XqtvgMKGmi7YAfynkuhRbA4pissrNdhu9-cYuqS7AImAhTJBb47X2mNWg1nt3OOTwpKjjoQSD5f903secomuRmBq2kejnugi0SAzWOwup9yllLW49FgjX1L8c"/>
</div>
<div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
<div>
<p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Mã đặt phòng</p>
<p className="font-medium text-on-surface">#CS-30219</p>
</div>
<div>
<p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Loại phòng</p>
<p className="font-medium text-on-surface">Ocean View</p>
</div>
<div>
<p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Ngày nhận phòng</p>
<p className="font-medium text-on-surface">05/11/2024</p>
</div>
<div>
<p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Tổng cộng</p>
<p className="font-bold text-amber-800">8.200.000đ</p>
</div>
</div>
<div className="flex items-center space-x-4 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-surface-container-low">
<span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-blue-50 text-blue-700">Chờ xác nhận</span>
<button className="text-amber-700 text-xs font-bold uppercase tracking-widest hover:underline whitespace-nowrap">Chi tiết</button>
</div>
</div>
<div className="bg-surface-container-lowest p-6 rounded-xl flex flex-col md:flex-row items-center gap-6 opacity-80">
<div className="w-full md:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0 grayscale">
<img alt="Room" className="w-full h-full object-cover" data-alt="boutique hotel lobby with velvet chairs and warm fireplace, elegant interior architecture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfRbH0ghvtJTWMKjjNgmM38lQpjWmkch2OQybVdnJO7y7R9dQsXsCfcrfR7LnhTEEH1026KACcSRCxGKyKP8Ae3vqOLz1SDADbJE_raZAKGsyb0En8IEiFB9_V40BbrnUGufwUsh8MCXVcGUJU1Z2fpyZNprsh1dfXOkONJ5jfEu-QOpVFjn3eZ5uD3ikFIwWWeL69UTA8fxV6MJzpa6TpwJyCk9b9SFbSCKcBia_9O-CrY8IdgcbszyERIlEksL3RZ0ukr9Osnks"/>
</div>
<div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
<div>
<p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Mã đặt phòng</p>
<p className="font-medium text-on-surface">#CS-28152</p>
</div>
<div>
<p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Loại phòng</p>
<p className="font-medium text-on-surface">Deluxe Twin</p>
</div>
<div>
<p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Ngày nhận phòng</p>
<p className="font-medium text-on-surface">20/09/2024</p>
</div>
<div>
<p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Tổng cộng</p>
<p className="font-bold text-amber-800">4.500.000đ</p>
</div>
</div>
<div className="flex items-center space-x-4 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-surface-container-low">
<span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-rose-50 text-rose-700">Đã hủy</span>
<button className="text-amber-700 text-xs font-bold uppercase tracking-widest hover:underline whitespace-nowrap">Chi tiết</button>
</div>
</div>
</div>
</div>
<div className="pt-12 border-t border-surface-container-low">
<h2 className="text-3xl font-notoSerif text-on-surface mb-8">Sửa hồ sơ</h2>
<div className="bg-surface-container-low p-8 md:p-12 rounded-2xl">
<form className="grid grid-cols-1 md:grid-cols-2 gap-8">
<div className="space-y-1">
<label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Họ và Tên</label>
<input className="w-full bg-transparent border-0 border-b-2 border-surface-container-highest focus:border-primary focus:ring-0 py-2 text-on-surface font-medium placeholder-slate-400" type="text" value="Nguyễn Anh Tú"/>
</div>
<div className="space-y-1">
<label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Số điện thoại</label>
<input className="w-full bg-transparent border-0 border-b-2 border-surface-container-highest focus:border-primary focus:ring-0 py-2 text-on-surface font-medium placeholder-slate-400" type="tel" value="090 123 4567"/>
</div>
<div className="space-y-1">
<label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Email</label>
<input className="w-full bg-transparent border-0 border-b-2 border-surface-container-highest focus:border-primary focus:ring-0 py-2 text-on-surface font-medium placeholder-slate-400" type="email" value="anhtu.nguyen@sanctuary.com"/>
</div>
<div className="space-y-1">
<label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Địa chỉ</label>
<input className="w-full bg-transparent border-0 border-b-2 border-surface-container-highest focus:border-primary focus:ring-0 py-2 text-on-surface font-medium placeholder-slate-400" type="text" value="Quận 1, TP. Hồ Chí Minh"/>
</div>
<div className="md:col-span-2 pt-6 flex justify-end">
<button className="bg-primary text-white px-10 py-3 rounded-lg font-notoSerif text-sm tracking-widest uppercase hover:bg-amber-800 transition-all shadow-lg shadow-amber-900/10" type="button">Lưu thay đổi</button>
</div>
</form>
</div>
</div>
</section>
</div>
</main>
<footer className="bg-slate-50 border-t border-slate-100">
<div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-12 py-16 w-full max-w-7xl mx-auto">
<div className="space-y-4">
<div className="text-xl font-notoSerif text-slate-800">The Curated Sanctuary</div>
<p className="text-slate-500 text-sm font-notoSerif leading-relaxed">Defining the gold standard of luxury living since 1994. Your sanctuary awaits.</p>
</div>
<div>
<h4 className="text-amber-700 font-notoSerif mb-6 text-sm uppercase tracking-widest">Navigation</h4>
<ul className="space-y-4">
<li><a className="text-slate-500 text-sm hover:underline hover:text-amber-700" href="#">Contact Us</a></li>
<li><a className="text-slate-500 text-sm hover:underline hover:text-amber-700" href="#">Newsletter</a></li>
<li><a className="text-slate-500 text-sm hover:underline hover:text-amber-700" href="#">Sitemap</a></li>
</ul>
</div>
<div>
<h4 className="text-amber-700 font-notoSerif mb-6 text-sm uppercase tracking-widest">Legal</h4>
<ul className="space-y-4">
<li><a className="text-slate-500 text-sm hover:underline hover:text-amber-700" href="#">Privacy Policy</a></li>
<li><a className="text-slate-500 text-sm hover:underline hover:text-amber-700" href="#">Terms of Service</a></li>
</ul>
</div>
<div>
<h4 className="text-amber-700 font-notoSerif mb-6 text-sm uppercase tracking-widest">Connect</h4>
<div className="flex space-x-4">
<span className="material-symbols-outlined text-slate-400 hover:text-amber-700 cursor-pointer">public</span>
<span className="material-symbols-outlined text-slate-400 hover:text-amber-700 cursor-pointer">mail</span>
<span className="material-symbols-outlined text-slate-400 hover:text-amber-700 cursor-pointer">chat</span>
</div>
</div>
</div>
<div className="bg-white py-8 text-center border-t border-slate-100">
<p className="text-slate-400 text-xs font-notoSerif tracking-widest">© 2024 The Curated Sanctuary. All rights reserved.</p>
</div>
</footer>

    </div>
  );
}
