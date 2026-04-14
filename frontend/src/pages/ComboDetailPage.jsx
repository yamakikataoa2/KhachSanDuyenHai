import React from 'react';

export default function ComboDetailPage() {
  return (
    <div className="bg-background text-on-surface min-h-screen overflow-x-hidden">
      
{/*  TopNavBar  */}
<nav className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-slate-900/80 backdrop-blur-md shadow-[0_20px_40px_rgba(77,70,53,0.06)] flex justify-between items-center px-8 py-4">
<div className="text-2xl font-notoSerif italic text-amber-800 dark:text-amber-200">The Curated Sanctuary</div>
<div className="hidden md:flex gap-8 items-center">
<a className="font-notoSerif tracking-wide text-sm uppercase text-amber-700 dark:text-amber-400 border-b-2 border-amber-700/30 pb-1" href="#">Rooms</a>
<a className="font-notoSerif tracking-wide text-sm uppercase text-slate-600 dark:text-slate-400 font-medium hover:text-amber-600 transition-colors duration-300" href="#">Offers</a>
<a className="font-notoSerif tracking-wide text-sm uppercase text-slate-600 dark:text-slate-400 font-medium hover:text-amber-600 transition-colors duration-300" href="#">Services</a>
<a className="font-notoSerif tracking-wide text-sm uppercase text-slate-600 dark:text-slate-400 font-medium hover:text-amber-600 transition-colors duration-300" href="#">About Us</a>
</div>
<div className="flex items-center gap-6">
<span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:bg-slate-50 p-2 rounded-full transition-all">person</span>
<button className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-lg font-medium text-sm hover:brightness-105 transition-all shadow-sm">Book Now</button>
</div>
</nav>
<main className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
{/*  Combo Header  */}
<header className="relative mb-16 rounded-xl overflow-hidden bg-surface-container-low p-8 md:p-12 flex flex-col md:flex-row items-end justify-between gap-8">
<div className="z-10 max-w-2xl">
<nav className="flex mb-4 text-xs tracking-widest uppercase text-primary/70 font-medium">
<span>Combo Offers</span>
<span className="mx-2">/</span>
<span>Romantic Getaway</span>
</nav>
<h1 className="text-4xl md:text-6xl font-notoSerif text-on-surface mb-4 leading-tight">Gói Nghỉ Dưỡng Lãng Mạn</h1>
<p className="text-on-surface-variant text-lg leading-relaxed max-w-xl">Kiến tạo những kỷ niệm khó quên cùng người thương trong không gian sang trọng và các dịch vụ chăm sóc tinh tế được thiết kế riêng.</p>
</div>
<div className="z-10 text-right">
<div className="inline-block bg-primary-container/10 text-primary px-4 py-1 rounded-full text-sm font-semibold mb-2">
                    Tiết kiệm 1.200.000đ
                </div>
<div className="text-4xl md:text-5xl font-notoSerif text-primary mb-1">5.500.000đ</div>
<div className="text-on-surface-variant line-through opacity-60">6.700.000đ</div>
</div>
{/*  Decorative Image Background Element  */}
<div className="absolute top-0 right-0 h-full w-1/3 opacity-10 hidden lg:block">
<img className="h-full w-full object-cover grayscale" data-alt="Soft focused detail of luxury resort spa room with warm candlelight and rose petals on white linen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAX_vXIBTj0mMRmhVfzaIuVpfnSiNHG9msN0VGtEdumAltQRy7o9UbywpHa2L4j9MjMpFZ8B5PXI8Jpj3Zg8noMSUpETOvT3OGAtTApwHivbG3DA8yQ-GjOjBUhBZlZmHiXANQp5HB_yapqXOjN9RUs2229ehBHm81UoMgNlb-urAfXE2yM8AxaYrnzRXuEIEEAUGjvdzfMqMnJjvKfKkrEsVbOoZmaeIhYEl6g5Jdcpo-rVmmPTxqTGuYIK7sKL5I7eMBp3KFmzBE"/>
</div>
</header>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
{/*  Left Column: Service Details  */}
<div className="lg:col-span-8 space-y-12">
{/*  Service List Table  */}
<section>
<h2 className="text-2xl font-notoSerif mb-6 border-b border-outline-variant pb-4">Chi tiết dịch vụ trong gói</h2>
<div className="overflow-hidden">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container text-on-surface-variant text-xs uppercase tracking-widest font-semibold">
<th className="py-4 px-6 rounded-tl-lg">Dịch vụ</th>
<th className="py-4 px-2 text-center">Số lượng</th>
<th className="py-4 px-6 text-right rounded-tr-lg">Đơn giá</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-container-high">
{/*  Service Row 1  */}
<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="py-6 px-6">
<div className="flex items-center gap-4">
<img className="w-16 h-16 rounded-lg object-cover shadow-sm" data-alt="Luxury hotel bedroom suite with golden morning sunlight streaming through sheer curtains" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeaMMaQjsST_GeRzVy2pwj9LG497KLqRQtX0U1UDLP-SxUNC7TIOwYfXO4WAk7QHzHjr5Fbl8g1rLkFNm0zO_i5LzThdvvwqGOo__6nS1LA-Adu4Ug8s7jeTrYaROyKQGkcOx6qOB7j96SdNooJhxr58-lMV8levi6Fv9YeK0YBHxrhhAoo7PkXCAGg60qP9nGZZLjzB1Y8DXthPIy-6GVhHvyYwzFJDV3Q3lV9CL9LykbHOI_hPTXbZ8tWPKTnkssEpYFIYDdfLw"/>
<div>
<div className="font-semibold text-on-surface">Deluxe Ocean View Room</div>
<div className="text-xs text-on-surface-variant">Hạng phòng cao cấp, hướng biển</div>
</div>
</div>
</td>
<td className="py-6 px-2">
<div className="flex items-center justify-center gap-3">
<button className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container-high transition-all">
<span className="material-symbols-outlined text-sm">remove</span>
</button>
<span className="w-4 text-center font-medium">1</span>
<button className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container-high transition-all">
<span className="material-symbols-outlined text-sm">add</span>
</button>
</div>
</td>
<td className="py-6 px-6 text-right font-medium">4.500.000đ</td>
</tr>
{/*  Service Row 2  */}
<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="py-6 px-6">
<div className="flex items-center gap-4">
<img className="w-16 h-16 rounded-lg object-cover shadow-sm" data-alt="Relaxing spa setting with warm bamboo massage tools and smooth dark stones on light wood surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCYDdRJ7MlolDtNAScySeWnlDmHI3dKvLrdYYsRZXjdkQpRT3pGXXvlCCPUIRUuPxBfDwYGiQWj4NGGkbdiRiSJ3WXqdR1zSoJvQEGBBY1Ql2dzem4FUimF6Aw-zbuT0KtEjeE486ZWmg32OseB_P4k-fKpNQu5_NzXlFPaBXbltpuJY7td61Eh_L9nshJUMJmTKYN9ojIemMUyAKHwFaRa3-FhKADSQKHaSEFfxByeieQX5bVw6rll7czhOBMVbHvBKvLQ7l9MvQ"/>
<div>
<div className="font-semibold text-on-surface">Couples Spa Therapy</div>
<div className="text-xs text-on-surface-variant">90 phút liệu trình chuyên sâu cho 2 người</div>
</div>
</div>
</td>
<td className="py-6 px-2">
<div className="flex items-center justify-center gap-3">
<button className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container-high transition-all">
<span className="material-symbols-outlined text-sm">remove</span>
</button>
<span className="w-4 text-center font-medium">1</span>
<button className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container-high transition-all">
<span className="material-symbols-outlined text-sm">add</span>
</button>
</div>
</td>
<td className="py-6 px-6 text-right font-medium">1.500.000đ</td>
</tr>
{/*  Service Row 3  */}
<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="py-6 px-6">
<div className="flex items-center gap-4">
<img className="w-16 h-16 rounded-lg object-cover shadow-sm" data-alt="Artistic spread of luxury breakfast buffet with fresh fruits, pastries and gourmet coffee on white table" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7cofQk1wXa_aJb4lBBJn_euzbPvMpyGlWced2659GbTHqZ32016VCns_vrmLts7oNCVFiRsJWnfLWwnZAiFiB0knmXEsQmDOsTTHJtJPNuUIl9fngufDXi8w-CGvLjrCoJhiddE1PbZT1pvxp1dS88w-LSxid4jWnuUo6YaXZ8VRarvus4l7JgUHzGLtpXEzIFTqERmU8kXts2K3_cKj-z7AZsIw6fYfx03PmGI20VCKIPT04MUQpqmm0U77dAtgjUA2icXdQbgU"/>
<div>
<div className="font-semibold text-on-surface">Buffet Breakfast</div>
<div className="text-xs text-on-surface-variant">Thực đơn quốc tế cao cấp</div>
</div>
</div>
</td>
<td className="py-6 px-2">
<div className="flex items-center justify-center gap-3">
<button className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container-high transition-all">
<span className="material-symbols-outlined text-sm">remove</span>
</button>
<span className="w-4 text-center font-medium">2</span>
<button className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container-high transition-all">
<span className="material-symbols-outlined text-sm">add</span>
</button>
</div>
</td>
<td className="py-6 px-6 text-right font-medium">700.000đ</td>
</tr>
</tbody>
</table>
</div>
</section>
{/*  Add Services Section  */}
<section>
<div className="flex justify-between items-center mb-6">
<h2 className="text-2xl font-notoSerif">Gợi ý thêm cho bạn</h2>
<span className="text-sm text-primary font-medium cursor-pointer hover:underline">Xem tất cả</span>
</div>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
{/*  Extra 1  */}
<div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow">
<img className="w-full h-32 rounded-lg object-cover mb-4" data-alt="Luxury black sedan chauffeur car waiting in front of modern airport terminal" src="https://lh3.googleusercontent.com/aida-public/AB6AXuANJAuIY4tKuCC7SV9MU2eSzYQP2YJyqhbjQ_bl_XidTIyx5B4Gk8Wdt8ZiubtNoGDjE_heYKblZPTQ0GiC-Hv6bPEi6PDzSxkEK9Vz8DeivhegYiWyY-DenQgkrwaqgxfjHE3oto9mK6FVzRQbb1V7lEETapAJu5oNvlEWNegwwenph7_kQ_L7hWGsYMxxI4lzIV51jkTSGGbZF99_pSn9Ki49wOoZ0gKju0EoFKK6cQLrxT_0yDSQDCK-VbAhpN4LsQbVVMv2xZI"/>
<div className="font-semibold text-on-surface mb-1">Airport Pick-up</div>
<div className="text-primary font-medium text-sm mb-3">500.000đ</div>
<button className="w-full py-2 border border-primary text-primary rounded-lg text-sm font-semibold hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-base">add</span>
                                Thêm
                            </button>
</div>
{/*  Extra 2  */}
<div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow">
<img className="w-full h-32 rounded-lg object-cover mb-4" data-alt="Bottle of expensive champagne in ice bucket with two crystal glasses on bedside table" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXIR0RVVVgMJtYbACkky7Mdzxa0quInpXT_KSTUqlM_ri6wpwVlUm92ec7erWyRSc9_25TpSeMJryj5sttJhv8Q9HQviHcujkkoMOpB5N6ALQDNAgs1Q7mipoQ3InXnXkXrKX4sok7OZUuVBYP8wFrbleJjjuw7GItqsMuJ2BEC4S9i4Gb0c989X8CgHOLbkPPY6i-jS3-ZY68pSy_-MWfoCXv5a5jwvG1VlC_5SKBVSKUJyoUKTM-7Ab8oIBr2IvZ7LR-eCHPE1Q"/>
<div className="font-semibold text-on-surface mb-1">Champagne in room</div>
<div className="text-primary font-medium text-sm mb-3">1.200.000đ</div>
<button className="w-full py-2 border border-primary text-primary rounded-lg text-sm font-semibold hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-base">add</span>
                                Thêm
                            </button>
</div>
{/*  Extra 3  */}
<div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow">
<img className="w-full h-32 rounded-lg object-cover mb-4" data-alt="Analog clock showing late afternoon hour on high-end wood desk in hotel room" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBupbqjKF39rW_lhwhKeZKSZ8F2cTetGpCBK1JA8aweJVtRbt_69Fu1VmWsgjw3CQjX0_cJkhq4KMMBKCaF22PV1CM1iG7c2YeWPIBcsSYOlqrrrBMiT58d1dzFrfAWGkEirktF40U4NN5b6H6NujNC_BwnUAGuTtpoEV16_svZ85CAJrdNdhsHXIqpEz7bv8cgcBZ116NO_4h5Ktw2gk2h6yECoW3eVqFtxa7aVcfsG6sfi5vA66e573zo6QV0g0vfK0a01wpEPX0"/>
<div className="font-semibold text-on-surface mb-1">Late check-out</div>
<div className="text-primary font-medium text-sm mb-3">800.000đ</div>
<button className="w-full py-2 border border-primary text-primary rounded-lg text-sm font-semibold hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-base">add</span>
                                Thêm
                            </button>
</div>
</div>
</section>
</div>
{/*  Right Column: Calculation Box  */}
<div className="lg:col-span-4">
<aside className="sticky top-32 bg-surface-container-low rounded-2xl p-8 shadow-[0_10px_30px_rgba(77,70,53,0.04)]">
<h3 className="text-xl font-notoSerif mb-6">Tóm tắt thanh toán</h3>
<div className="space-y-4 mb-8">
<div className="flex justify-between text-on-surface-variant">
<span>Tổng giá trị gốc</span>
<span className="font-medium">6.700.000đ</span>
</div>
<div className="flex justify-between text-on-surface-variant">
<span>Giá combo ưu đãi</span>
<span className="font-medium">5.500.000đ</span>
</div>
<div className="flex justify-between text-primary font-medium">
<span>Tổng tiết kiệm</span>
<span>- 1.200.000đ</span>
</div>
<div className="pt-4 border-t border-outline-variant/30 flex justify-between items-end">
<div>
<div className="text-xs uppercase tracking-widest text-on-surface-variant mb-1 font-semibold">Tổng cộng</div>
<div className="text-3xl font-notoSerif text-on-surface">5.500.000đ</div>
</div>
<div className="text-xs text-on-surface-variant opacity-60">Đã bao gồm thuế &amp; phí</div>
</div>
</div>
<div className="space-y-4">
<button className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold tracking-wide hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20">
                            Áp dụng cho đơn đặt phòng
                        </button>
<p className="text-[11px] text-center text-on-surface-variant leading-relaxed px-4">
                            Bằng cách chọn áp dụng, gói combo này sẽ được tích hợp vào quy trình đặt phòng hiện tại của bạn.
                        </p>
</div>
<div className="mt-8 p-4 bg-surface-container-highest rounded-lg border-l-4 border-primary/40 flex gap-3">
<span className="material-symbols-outlined text-primary text-xl">info</span>
<div className="text-xs text-on-surface-variant leading-normal">
                            Chính sách hủy: Miễn phí hủy trước 48 giờ. Sau thời gian này, phí 50% giá trị combo sẽ được áp dụng.
                        </div>
</div>
</aside>
</div>
</div>
</main>
{/*  Footer  */}
<footer className="w-full border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
<div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-12 py-16 w-full">
<div className="col-span-1 md:col-span-1">
<div className="text-xl font-notoSerif text-slate-800 dark:text-slate-200 mb-6 italic">The Curated Sanctuary</div>
<p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 font-notoSerif">Nơi tinh hoa hội tụ, mang đến trải nghiệm nghỉ dưỡng xa hoa và riêng tư tuyệt đối cho quý khách.</p>
</div>
<div>
<h4 className="text-amber-700 dark:text-amber-500 font-notoSerif font-bold mb-4">Quick Links</h4>
<div className="flex flex-col gap-3">
<a className="text-slate-500 dark:text-slate-400 text-sm hover:underline hover:text-amber-700" href="#">Contact Us</a>
<a className="text-slate-500 dark:text-slate-400 text-sm hover:underline hover:text-amber-700" href="#">Newsletter</a>
<a className="text-slate-500 dark:text-slate-400 text-sm hover:underline hover:text-amber-700" href="#">Sitemap</a>
</div>
</div>
<div>
<h4 className="text-amber-700 dark:text-amber-500 font-notoSerif font-bold mb-4">Legal</h4>
<div className="flex flex-col gap-3">
<a className="text-slate-500 dark:text-slate-400 text-sm hover:underline hover:text-amber-700" href="#">Privacy Policy</a>
<a className="text-slate-500 dark:text-slate-400 text-sm hover:underline hover:text-amber-700" href="#">Terms of Service</a>
</div>
</div>
<div>
<h4 className="text-amber-700 dark:text-amber-500 font-notoSerif font-bold mb-4">Contact</h4>
<p className="text-slate-500 dark:text-slate-400 text-sm mb-2">info@curatedsanctuary.com</p>
<p className="text-slate-500 dark:text-slate-400 text-sm">+84 (0) 24 1234 5678</p>
</div>
</div>
<div className="px-12 py-6 border-t border-slate-200/50 dark:border-slate-800/50 flex justify-center items-center">
<span className="text-slate-500 dark:text-slate-400 text-xs font-notoSerif">© 2024 The Curated Sanctuary. All rights reserved.</span>
</div>
</footer>

    </div>
  );
}
