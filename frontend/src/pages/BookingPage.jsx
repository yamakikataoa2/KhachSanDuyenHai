import React from 'react';

export default function BookingPage() {
  return (
    <div className="bg-background text-on-surface min-h-screen overflow-x-hidden">
      
{/*  TopNavBar (Shared Component Logic)  */}
<nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-[0_20px_40px_rgba(77,70,53,0.06)]">
<div className="flex justify-between items-center w-full px-8 py-4 max-w-full">
<div className="text-2xl font-notoSerif italic text-amber-800">The Curated Sanctuary</div>
<div className="hidden md:flex items-center gap-8 font-notoSerif tracking-wide text-sm uppercase">
<a className="text-slate-600 font-medium hover:text-amber-600 transition-colors duration-300" href="#">Rooms</a>
<a className="text-slate-600 font-medium hover:text-amber-600 transition-colors duration-300" href="#">Offers</a>
<a className="text-slate-600 font-medium hover:text-amber-600 transition-colors duration-300" href="#">Services</a>
<a className="text-slate-600 font-medium hover:text-amber-600 transition-colors duration-300" href="#">About Us</a>
</div>
<div className="flex items-center gap-6">
<span className="material-symbols-outlined text-slate-600 cursor-pointer">person</span>
<button className="bg-primary-container text-on-primary-container px-6 py-2 rounded-lg font-medium hover:brightness-105 transition-all">Book Now</button>
</div>
</div>
</nav>
{/*  Main Content Area  */}
<main className="pt-32 pb-24 px-8 max-w-7xl mx-auto">
{/*  Step Progress Bar  */}
<div className="mb-16">
<div className="flex justify-between items-center max-w-3xl mx-auto relative">
{/*  Line background  */}
<div className="absolute top-1/2 left-0 w-full h-[1px] bg-outline-variant/30 -z-10"></div>
<div className="flex flex-col items-center gap-3">
<div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-sm">1</div>
<span className="text-xs font-medium text-slate-500 uppercase tracking-widest">Chọn ngày</span>
</div>
<div className="flex flex-col items-center gap-3">
<div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm ring-4 ring-surface shadow-lg">2</div>
<span className="text-xs font-bold text-amber-800 uppercase tracking-widest">Chọn phòng</span>
</div>
<div className="flex flex-col items-center gap-3">
<div className="w-10 h-10 rounded-full bg-surface-container-high text-slate-400 flex items-center justify-center font-bold text-sm">3</div>
<span className="text-xs font-medium text-slate-500 uppercase tracking-widest">Dịch vụ</span>
</div>
<div className="flex flex-col items-center gap-3">
<div className="w-10 h-10 rounded-full bg-surface-container-high text-slate-400 flex items-center justify-center font-bold text-sm">4</div>
<span className="text-xs font-medium text-slate-500 uppercase tracking-widest">Xác nhận</span>
</div>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
{/*  Filters Sidebar (Left)  */}
<aside className="lg:col-span-3 space-y-8">
<div className="bg-surface-container-lowest p-8 rounded-xl">
<h3 className="font-notoSerif text-xl mb-6 text-on-surface">Bộ lọc</h3>
<div className="space-y-8">
<div>
<label className="block text-sm font-semibold text-slate-700 mb-4">Khoảng giá</label>
<input className="w-full accent-primary" max="20000000" min="2000000" step="500000" type="range"/>
<div className="flex justify-between text-xs font-medium mt-2 text-slate-500">
<span>2.000.000đ</span>
<span>20.000.000đ</span>
</div>
</div>
<div>
<label className="block text-sm font-semibold text-slate-700 mb-4">Loại phòng</label>
<div className="space-y-3">
<label className="flex items-center gap-3 cursor-pointer group">
<input className="rounded border-outline-variant text-primary focus:ring-primary h-5 w-5" type="checkbox"/>
<span className="text-sm text-slate-600 group-hover:text-primary transition-colors">Deluxe Suites</span>
</label>
<label className="flex items-center gap-3 cursor-pointer group">
<input className="rounded border-outline-variant text-primary focus:ring-primary h-5 w-5" type="checkbox"/>
<span className="text-sm text-slate-600 group-hover:text-primary transition-colors">Ocean Panorama</span>
</label>
<label className="flex items-center gap-3 cursor-pointer group">
<input className="rounded border-outline-variant text-primary focus:ring-primary h-5 w-5" type="checkbox"/>
<span className="text-sm text-slate-600 group-hover:text-primary transition-colors">Garden Sanctuary</span>
</label>
</div>
</div>
<div>
<label className="block text-sm font-semibold text-slate-700 mb-4">Hướng nhìn</label>
<div className="flex flex-wrap gap-2">
<button className="px-4 py-2 rounded-full border border-outline-variant text-xs font-medium hover:bg-primary-container/10 transition-colors">Sea View</button>
<button className="px-4 py-2 rounded-full border border-outline-variant text-xs font-medium hover:bg-primary-container/10 transition-colors">Garden View</button>
<button className="px-4 py-2 rounded-full border border-outline-variant text-xs font-medium hover:bg-primary-container/10 transition-colors">Mountain View</button>
</div>
</div>
</div>
</div>
</aside>
{/*  Room List (Center)  */}
<section className="lg:col-span-6 space-y-8">
{/*  Room Card 1  */}
<div className="bg-surface-container-lowest rounded-xl overflow-hidden group hover:shadow-[0_20px_40px_rgba(77,70,53,0.06)] transition-all duration-500">
<div className="relative h-72 overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="luxury hotel suite with ocean view balcony sunset soft golden lighting white linens minimalist interior" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChdkRgnf2n71F8RNCzTT1zMbLMqHGf59G8QG4ymwoA7a3DrWzvL2fEvSkWzd-YEg_o_o9xtqHjXZgplL5Nf8Rkl-1X5nR3rYMkmr-WwwUVG2-o4XYK6y_E5SxBWPtwayXTfP-kce5G-5hviQ313SKRE7JIJN2TAvGmBSAKtqhrJ5P9drrdtYpnVFRDuo3cdwCFsZFgnEjJW0TMnfVOtxS9jxbcHLecSO4nrUhZS3JZhsA-xvo_XrTlOdvg5y9E6RdGTTlhLx0FfRg"/>
<div className="absolute top-4 right-4 bg-surface/90 backdrop-blur px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-amber-800">Popular</div>
<div className="absolute bottom-4 left-4 flex gap-2">
<button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur text-white flex items-center justify-center hover:bg-white/40 transition-colors">
<span className="material-symbols-outlined text-sm">chevron_left</span>
</button>
<button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur text-white flex items-center justify-center hover:bg-white/40 transition-colors">
<span className="material-symbols-outlined text-sm">chevron_right</span>
</button>
</div>
</div>
<div className="p-8">
<div className="flex justify-between items-start mb-4">
<div>
<h2 className="text-2xl font-notoSerif mb-2">Deluxe Ocean View</h2>
<div className="flex items-center gap-4 text-slate-500 text-xs font-medium">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">square_foot</span> 45m²</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">group</span> 2 Guests</span>
</div>
</div>
<div className="text-right">
<div className="text-2xl font-bold text-amber-800">4.500.000đ</div>
<div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Per Night</div>
</div>
</div>
<div className="flex gap-6 mb-8 py-4 border-y border-surface-container-low">
<div className="flex flex-col items-center gap-2">
<span className="material-symbols-outlined text-amber-700/60">wifi</span>
<span className="text-[10px] text-slate-500 uppercase font-medium">Free Wifi</span>
</div>
<div className="flex flex-col items-center gap-2">
<span className="material-symbols-outlined text-amber-700/60">bathtub</span>
<span className="text-[10px] text-slate-500 uppercase font-medium">Bathtub</span>
</div>
<div className="flex flex-col items-center gap-2">
<span className="material-symbols-outlined text-amber-700/60">coffee_maker</span>
<span className="text-[10px] text-slate-500 uppercase font-medium">Mini Bar</span>
</div>
<div className="flex flex-col items-center gap-2">
<span className="material-symbols-outlined text-amber-700/60">ac_unit</span>
<span className="text-[10px] text-slate-500 uppercase font-medium">Air Con</span>
</div>
</div>
<button className="w-full bg-primary-container text-on-primary-container py-4 rounded-lg font-bold uppercase tracking-widest text-sm hover:brightness-105 transition-all shadow-md shadow-primary-container/20">Chọn phòng</button>
</div>
</div>
{/*  Room Card 2  */}
<div className="bg-surface-container-lowest rounded-xl overflow-hidden group hover:shadow-[0_20px_40px_rgba(77,70,53,0.06)] transition-all duration-500">
<div className="relative h-72 overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="expansive master suite with teak wood furniture floor to ceiling windows overlooking lush tropical gardens morning light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC199gEdpGZSIGaa0o-CWjU63cN8RAjnre73v9GP3zt9RHgbxC9p5ocYw-CCgJcdpZtryg6UZdw_FY_WnuL8soTjJ2VglJJh_CxlPYWXylb_bX6c-KegIbWZ9L5TgLsYOq8nkIPLUwmASP-GkxK_rV_XDXArnDP8gDSCNdl1uBzT9LCpiJ_YP81pYb05bX3NXOST0XfMUf8XGuenHgSNr-JHpXoqXsb8hdfMRK1ql2DF98XzxXiTNkzLkqW-Bsx_fh-vLNdZM6wYNs"/>
<div className="absolute bottom-4 left-4 flex gap-2">
<button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur text-white flex items-center justify-center hover:bg-white/40 transition-colors">
<span className="material-symbols-outlined text-sm">chevron_left</span>
</button>
<button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur text-white flex items-center justify-center hover:bg-white/40 transition-colors">
<span className="material-symbols-outlined text-sm">chevron_right</span>
</button>
</div>
</div>
<div className="p-8">
<div className="flex justify-between items-start mb-4">
<div>
<h2 className="text-2xl font-notoSerif mb-2">Grand Garden Sanctuary</h2>
<div className="flex items-center gap-4 text-slate-500 text-xs font-medium">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">square_foot</span> 60m²</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">group</span> 4 Guests</span>
</div>
</div>
<div className="text-right">
<div className="text-2xl font-bold text-amber-800">6.200.000đ</div>
<div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Per Night</div>
</div>
</div>
<div className="flex gap-6 mb-8 py-4 border-y border-surface-container-low">
<div className="flex flex-col items-center gap-2">
<span className="material-symbols-outlined text-amber-700/60">deck</span>
<span className="text-[10px] text-slate-500 uppercase font-medium">Private Deck</span>
</div>
<div className="flex flex-col items-center gap-2">
<span className="material-symbols-outlined text-amber-700/60">hot_tub</span>
<span className="text-[10px] text-slate-500 uppercase font-medium">Jacuzzi</span>
</div>
<div className="flex flex-col items-center gap-2">
<span className="material-symbols-outlined text-amber-700/60">restaurant</span>
<span className="text-[10px] text-slate-500 uppercase font-medium">Kitchenette</span>
</div>
<div className="flex flex-col items-center gap-2">
<span className="material-symbols-outlined text-amber-700/60">local_parking</span>
<span className="text-[10px] text-slate-500 uppercase font-medium">VIP Parking</span>
</div>
</div>
<button className="w-full bg-surface-container-highest text-on-surface py-4 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-outline-variant transition-all">Chọn phòng</button>
</div>
</div>
</section>
{/*  Booking Summary Sidebar (Right)  */}
<aside className="lg:col-span-3 sticky top-28">
<div className="bg-surface-container-low border border-primary-container/10 p-8 rounded-xl">
<h3 className="font-notoSerif text-xl mb-6 text-on-surface border-b border-outline-variant/20 pb-4">Chi tiết đặt phòng</h3>
<div className="space-y-6 mb-8">
<div className="flex justify-between items-start">
<div>
<span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block mb-1">Check-in</span>
<p className="text-sm font-semibold text-slate-800">12 Th06, 2024</p>
</div>
<div className="text-right">
<span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block mb-1">Check-out</span>
<p className="text-sm font-semibold text-slate-800">15 Th06, 2024</p>
</div>
</div>
<div className="flex justify-between py-4 border-y border-outline-variant/10">
<span className="text-sm text-slate-600">Số đêm</span>
<span className="text-sm font-bold text-slate-900">3 Đêm</span>
</div>
<div className="flex justify-between">
<span className="text-sm text-slate-600">Khách</span>
<span className="text-sm font-bold text-slate-900">2 Người lớn</span>
</div>
</div>
<div className="bg-white/50 p-4 rounded-lg mb-8">
<div className="flex justify-between items-center mb-2">
<span className="text-xs text-slate-500">Phòng Deluxe (x1)</span>
<span className="text-xs font-medium text-slate-800">13.500.000đ</span>
</div>
<div className="flex justify-between items-center text-amber-700 mb-4">
<span className="text-xs">Thuế &amp; Phí (10%)</span>
<span className="text-xs font-medium">1.350.000đ</span>
</div>
<div className="flex justify-between items-end pt-2 border-t border-amber-700/10">
<span className="text-sm font-notoSerif font-bold text-slate-900">Tổng cộng</span>
<span className="text-xl font-bold text-amber-800">14.850.000đ</span>
</div>
</div>
<button className="w-full bg-primary text-on-primary py-4 rounded-lg font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all cursor-not-allowed opacity-50" disabled="">
                        Tiếp tục
                    </button>
<p className="text-center text-[10px] text-slate-400 mt-4 italic">Vui lòng chọn phòng để tiếp tục bước 3</p>
</div>
<div className="mt-6 flex items-center gap-4 p-4 border border-outline-variant/20 rounded-lg">
<span className="material-symbols-outlined text-amber-700" style="font-variation-settings: 'FILL' 1;">verified_user</span>
<div>
<p className="text-[10px] font-bold uppercase text-slate-800">Secure Booking</p>
<p className="text-[10px] text-slate-500">Your information is protected by 256-bit encryption.</p>
</div>
</div>
</aside>
</div>
</main>
{/*  Footer (Shared Component Logic)  */}
<footer className="bg-slate-50 border-t border-slate-100">
<div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-12 py-16 w-full font-notoSerif leading-relaxed">
<div className="col-span-1 md:col-span-1">
<div className="text-xl font-notoSerif text-slate-800 mb-6">The Curated Sanctuary</div>
<p className="text-sm text-slate-500 mb-6">Experience the art of living in our meticulously crafted retreats designed for the modern soul.</p>
</div>
<div>
<h4 className="text-amber-700 font-bold text-sm mb-6 uppercase tracking-widest">Navigation</h4>
<ul className="space-y-4">
<li><a className="text-slate-500 text-sm hover:underline hover:text-amber-700" href="#">Rooms</a></li>
<li><a className="text-slate-500 text-sm hover:underline hover:text-amber-700" href="#">Offers</a></li>
<li><a className="text-slate-500 text-sm hover:underline hover:text-amber-700" href="#">Services</a></li>
</ul>
</div>
<div>
<h4 className="text-amber-700 font-bold text-sm mb-6 uppercase tracking-widest">Support</h4>
<ul className="space-y-4">
<li><a className="text-slate-500 text-sm hover:underline hover:text-amber-700" href="#">Contact Us</a></li>
<li><a className="text-slate-500 text-sm hover:underline hover:text-amber-700" href="#">Privacy Policy</a></li>
<li><a className="text-slate-500 text-sm hover:underline hover:text-amber-700" href="#">Terms of Service</a></li>
</ul>
</div>
<div>
<h4 className="text-amber-700 font-bold text-sm mb-6 uppercase tracking-widest">Newsletter</h4>
<p className="text-xs text-slate-500 mb-4 italic">Join our elite circle for exclusive offers.</p>
<div className="flex">
<input className="bg-white border border-slate-200 px-4 py-2 text-xs w-full focus:outline-none focus:border-amber-700" placeholder="Email address" type="email"/>
<button className="bg-amber-700 text-white px-4 py-2 text-xs uppercase font-bold">Join</button>
</div>
</div>
</div>
<div className="px-12 py-8 border-t border-slate-100 flex justify-between items-center">
<p className="text-xs text-slate-400">© 2024 The Curated Sanctuary. All rights reserved.</p>
<div className="flex gap-6">
<span className="material-symbols-outlined text-slate-400 hover:text-amber-700 cursor-pointer">social_leaderboard</span>
<span className="material-symbols-outlined text-slate-400 hover:text-amber-700 cursor-pointer">photo_camera</span>
<span className="material-symbols-outlined text-slate-400 hover:text-amber-700 cursor-pointer">share</span>
</div>
</div>
</footer>

    </div>
  );
}
