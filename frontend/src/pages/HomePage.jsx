import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function HomePage() {
  const [rooms, setRooms] = useState([]);
  const [combos, setCombos] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/home')
      .then(res => {
        setRooms(res.data.rooms);
        setCombos(res.data.combos);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-background text-on-surface">
      
{/*  Top Navigation Bar  */}
<nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-[0_20px_40px_rgba(77,70,53,0.06)]">
<div className="flex justify-between items-center w-full px-8 py-4 max-w-full">
<div className="text-2xl font-notoSerif italic text-amber-800">The Curated Sanctuary</div>
<div className="hidden md:flex items-center space-x-8 font-notoSerif tracking-wide text-sm uppercase">
<a className="text-amber-700 border-b-2 border-amber-700/30 pb-1 hover:text-amber-600 transition-colors duration-300" href="#">Rooms</a>
<a className="text-slate-600 font-medium hover:text-amber-600 transition-colors duration-300" href="#">Offers</a>
<a className="text-slate-600 font-medium hover:text-amber-600 transition-colors duration-300" href="#">Services</a>
<a className="text-slate-600 font-medium hover:text-amber-600 transition-colors duration-300" href="#">About Us</a>
</div>
<div className="flex items-center space-x-6">
<button className="material-symbols-outlined text-on-surface hover:text-amber-600 transition-colors duration-300">person</button>
<button className="bg-primary-container text-on-primary-container px-6 py-2 rounded-lg font-notoSerif uppercase tracking-wider text-sm hover:brightness-110 transition-all scale-95 transition-transform duration-200">Book Now</button>
</div>
</div>
</nav>
{/*  Hero Section  */}
<header className="relative h-screen w-full flex items-center justify-center overflow-hidden">
<img alt="Luxury resort exterior" className="absolute inset-0 w-full h-full object-cover" data-alt="wide angle shot of a luxury beachfront resort with infinity pool at dusk, golden lighting illuminating the warm stone architecture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRq3ATpUPY8TFVh4cCLE6cyKRqbpxDL8a1F74D41VSWnuGPF862SyASpjxyEa1-WZVM7YPOELoJgBYEEFVKHkuiQnrobasoxG3gYg4mWvwaSsyn5tn6vY-uLVO680eWcs70VyoAOAZn05Z0Wug8K2x2K9xV6ROuSeXaL_iaAdDew4pk5GJzdI7AX2g_lF_jVWNhpiRrTB2BlBKR6z0p94xbCMkQzHykFYv8NToXNUKEIgRYLOnDZ8P34tbT55_KUa3PIfStDq5R18"/>
<div className="absolute inset-0 bg-black/30"></div>
<div className="relative z-10 text-center text-white px-4 max-w-4xl">
<h1 className="font-notoSerif text-5xl md:text-7xl mb-6 leading-tight drop-shadow-lg">Trải Nghiệm Sự Sang Trọng Đích Thực</h1>
<p className="text-lg md:text-xl font-light mb-10 opacity-90 tracking-wide">Nghỉ dưỡng 5 sao tại trung tâm thành phố với dịch vụ đẳng cấp quốc tế.</p>
<button className="bg-primary-container text-on-primary-container px-10 py-4 rounded-xl text-lg font-medium hover:scale-105 transition-transform duration-300 shadow-xl">Đặt phòng ngay</button>
</div>
</header>
{/*  Quick Search Bar  */}
<div className="relative z-20 max-w-6xl mx-auto px-4 -mt-16">
<div className="bg-surface-container-lowest/80 backdrop-blur-xl p-8 rounded-2xl shadow-[0_20px_40px_rgba(77,70,53,0.12)] flex flex-wrap md:flex-nowrap gap-6 items-end">
<div className="flex-1 min-w-[200px]">
<label className="block text-xs uppercase tracking-widest text-on-surface-variant font-semibold mb-2">Check-in</label>
<div className="bg-surface-container-high border-b border-surface-container-highest p-3 rounded-t-lg flex items-center">
<span className="material-symbols-outlined text-primary mr-2">calendar_today</span>
<input className="bg-transparent border-none focus:ring-0 w-full text-sm" placeholder="Chọn ngày" type="text"/>
</div>
</div>
<div className="flex-1 min-w-[200px]">
<label className="block text-xs uppercase tracking-widest text-on-surface-variant font-semibold mb-2">Check-out</label>
<div className="bg-surface-container-high border-b border-surface-container-highest p-3 rounded-t-lg flex items-center">
<span className="material-symbols-outlined text-primary mr-2">event_busy</span>
<input className="bg-transparent border-none focus:ring-0 w-full text-sm" placeholder="Chọn ngày" type="text"/>
</div>
</div>
<div className="flex-1 min-w-[150px]">
<label className="block text-xs uppercase tracking-widest text-on-surface-variant font-semibold mb-2">Guests</label>
<div className="bg-surface-container-high border-b border-surface-container-highest p-3 rounded-t-lg flex items-center">
<span className="material-symbols-outlined text-primary mr-2">group</span>
<select className="bg-transparent border-none focus:ring-0 w-full text-sm appearance-none">
<option>2 Người lớn</option>
<option>1 Người lớn</option>
<option>Gia đình</option>
</select>
</div>
</div>
<div className="flex-1 min-w-[150px]">
<label className="block text-xs uppercase tracking-widest text-on-surface-variant font-semibold mb-2">Room Type</label>
<div className="bg-surface-container-high border-b border-surface-container-highest p-3 rounded-t-lg flex items-center">
<span className="material-symbols-outlined text-primary mr-2">bed</span>
<select className="bg-transparent border-none focus:ring-0 w-full text-sm appearance-none">
<option>Deluxe Room</option>
<option>Suite Luxury</option>
<option>Penthouse</option>
</select>
</div>
</div>
<button className="bg-primary hover:bg-amber-900 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors duration-300">
<span className="material-symbols-outlined">search</span>
                Tìm kiếm
            </button>
</div>
</div>
{/*  Intro Section  */}
<section className="py-24 px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
<div className="relative">
<div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
<img alt="Hotel interior" className="w-full h-full object-cover" data-alt="Elegant hotel lounge with high ceilings, velvet armchairs, and warm ambient lighting from crystal chandeliers" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAA8IUOX0xJUc6DR9qJ0t3KkAPutb-C5cNLcGljqgk7tM85_d352_n2dk-HuWhvE97Md1agGyaPJ8C7y86QKuADBbRJTTYx6yTdg4RVmHHhU_fusPeociDwQSArNdTF6dOvBunYUrQYW1LXUL-xP7HFJsI7oxibwLmDybrtcb_Iv-ZhpGSB5DIH4avJKi9LnWUWeEUhlQem3A9za1kVCOvXrANVgYU28nzvkXZS7tjvbGo_NciJGIdZW0KHi2NAfaHLvP9zo7h6LCM"/>
</div>
<div className="absolute -bottom-8 -right-8 w-1/2 aspect-square rounded-2xl overflow-hidden border-[12px] border-surface shadow-2xl hidden md:block">
<img alt="Pool view" className="w-full h-full object-cover" data-alt="Sunlight sparkling on the clear blue water of a luxury infinity pool overlooking a tropical garden at sunrise" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYEvzj-5sEeY6vQhcJEDnA1DV5nR6KKDQAKaGp7PCCfR3p5R3P9kSzUuYzMssI9Phzz4hFM7O5WZ-Q9ZuYUVV98kYdBxMpvXjirK5bcIWiQHE0a0N3uYPqk0Ceme2BNjgxAx3y9aBNs86MpUa-mJ7ToM3l3KBKB9Wm343OQ7VzzuYVLJCG1OsqHQiixTlCDYS5ObnoUQ76MwPL-6e25JiqxLjaChMGuIx0B5-3lExZxSqG9ZEM6GjfNgLCqu4oG25rvNQe2mTx_qo"/>
</div>
</div>
<div className="space-y-8">
<span className="text-primary font-notoSerif italic text-xl">Về chúng tôi</span>
<h2 className="text-4xl md:text-5xl font-notoSerif text-on-surface leading-tight">Nơi Di Sản Gặp Gỡ Sự Hiện Đại</h2>
<p className="text-on-surface-variant leading-relaxed text-lg">
                The Curated Sanctuary không chỉ là một khách sạn; đó là một hành trình khám phá sự tinh tế. Với hơn 50 năm kinh nghiệm trong ngành dịch vụ cao cấp, chúng tôi kiến tạo những không gian nơi mọi chi tiết đều được chăm chút tỉ mỉ, từ hương thơm thảo mộc tại sảnh đợi đến chất liệu lụa tơ tằm của từng chiếc gối.
            </p>
<p className="text-on-surface-variant leading-relaxed text-lg">
                Mỗi vị khách đến với chúng tôi đều được chào đón như một thành viên trong gia đình hoàng gia, với dịch vụ quản gia cá nhân sẵn sàng phục vụ 24/7.
            </p>
<button className="border-b-2 border-primary text-primary font-semibold py-2 hover:text-amber-900 transition-colors duration-300">Khám phá câu chuyện của chúng tôi</button>
</div>
</section>
{/*  Featured Rooms  */}
<section className="py-24 bg-surface-container-low">
<div className="max-w-7xl mx-auto px-8">
<div className="text-center mb-16 space-y-4">
<h2 className="text-4xl font-notoSerif">Phòng Nghỉ Sang Trọng</h2>
<div className="w-24 h-1 bg-primary-container mx-auto"></div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {rooms.map(room => (
      <div key={room.MaLoaiPhong} className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col">
        <div className="h-64 overflow-hidden relative">
          <img alt={room.TenLoai} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" src={room.AnhDaiDien || "https://placehold.co/600x400?text=No+Image"} />
        </div>
        <div className="p-8 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-notoSerif font-bold">{room.TenLoai}</h3>
            <span className="text-primary font-bold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(room.GiaMacDinh)}<span className="text-xs font-normal text-on-surface-variant">/đêm</span></span>
          </div>
          <div className="flex gap-4 mb-6 text-sm text-on-surface-variant">
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">group</span> Tối đa {room.SoNguoiToiDa} Khách</span>
          </div>
          <button className="mt-auto w-full border border-outline-variant py-3 rounded-lg hover:bg-primary-container hover:border-primary-container hover:text-on-primary-container transition-all">Chi tiết</button>
        </div>
      </div>
    ))}
</div>
</div>
</section>
{/*  Featured Combos  */}
<section className="py-24 px-8 max-w-7xl mx-auto">
<div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
<div className="space-y-4">
<span className="text-primary font-semibold tracking-widest uppercase text-sm">Ưu đãi độc quyền</span>
<h2 className="text-4xl font-notoSerif">Gói Combo Nghỉ Dưỡng</h2>
</div>
<button className="text-primary font-bold flex items-center gap-2 hover:translate-x-2 transition-transform duration-300">
                Tất cả ưu đãi <span className="material-symbols-outlined">arrow_right_alt</span>
</button>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  {combos.map(combo => (
    <div key={combo.MaGoi} className="relative group rounded-3xl overflow-hidden h-[400px]">
      <img alt={combo.TenGoi} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={combo.AnhDaiDien || "https://placehold.co/600x400?text=No+Image"} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-10 text-white w-full">
        <div className="flex justify-between items-end">
          <div>
            <span className="bg-primary-container text-on-primary-container text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">Ưu đãi</span>
            <h3 className="text-3xl font-notoSerif mb-2">{combo.TenGoi}</h3>
            <p className="opacity-80 text-sm mb-6 max-w-sm">{combo.MoTa}</p>
          </div>
          <a href={`/combo?id=${combo.MaGoi}`} className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 py-3 rounded-xl hover:bg-white hover:text-on-surface transition-all">Xem ưu đãi</a>
        </div>
      </div>
    </div>
  ))}
</div>
</section>
{/*  Amenities Section  */}
<section className="py-24 bg-surface">
<div className="max-w-7xl mx-auto px-8">
<div className="grid grid-cols-1 md:grid-cols-4 gap-12">
<div className="flex flex-col items-center text-center space-y-4 p-8 rounded-2xl hover:bg-surface-container-low transition-colors duration-300">
<div className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center">
<span className="material-symbols-outlined text-primary text-4xl" data-weight="fill">pool</span>
</div>
<h4 className="text-xl font-notoSerif">Hồ Bơi Vô Cực</h4>
<p className="text-sm text-on-surface-variant">Tận hưởng làn nước mát lành với tầm nhìn panorama toàn thành phố.</p>
</div>
<div className="flex flex-col items-center text-center space-y-4 p-8 rounded-2xl hover:bg-surface-container-low transition-colors duration-300">
<div className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center">
<span className="material-symbols-outlined text-primary text-4xl" data-weight="fill">restaurant</span>
</div>
<h4 className="text-xl font-notoSerif">Ẩm Thực Buffet</h4>
<p className="text-sm text-on-surface-variant">Tinh hoa ẩm thực Á - Âu được chế biến bởi các đầu bếp hàng đầu.</p>
</div>
<div className="flex flex-col items-center text-center space-y-4 p-8 rounded-2xl hover:bg-surface-container-low transition-colors duration-300">
<div className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center">
<span className="material-symbols-outlined text-primary text-4xl" data-weight="fill">spa</span>
</div>
<h4 className="text-xl font-notoSerif">Dịch Vụ Spa</h4>
<p className="text-sm text-on-surface-variant">Thư giãn tâm hồn với các liệu trình trị liệu truyền thống độc đáo.</p>
</div>
<div className="flex flex-col items-center text-center space-y-4 p-8 rounded-2xl hover:bg-surface-container-low transition-colors duration-300">
<div className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center">
<span className="material-symbols-outlined text-primary text-4xl" data-weight="fill">fitness_center</span>
</div>
<h4 className="text-xl font-notoSerif">Trung Tâm Gym</h4>
<p className="text-sm text-on-surface-variant">Trang thiết bị hiện đại giúp bạn duy trì vóc dáng ngay cả khi nghỉ dưỡng.</p>
</div>
</div>
</div>
</section>
{/*  Testimonials Section  */}
<section className="py-24 bg-surface-container-low overflow-hidden">
<div className="max-w-4xl mx-auto px-8 text-center relative">
<span className="material-symbols-outlined text-6xl text-primary/20 mb-8">format_quote</span>
<div className="relative">
<p className="text-2xl md:text-3xl font-notoSerif italic leading-relaxed text-on-surface mb-12">
                    "Một trải nghiệm tuyệt vời chưa từng có. Từ lúc bước vào sảnh cho đến lúc check-out, mọi thứ đều hoàn hảo. Đội ngũ nhân viên cực kỳ chuyên nghiệp và thân thiện."
                </p>
<div className="flex flex-col items-center">
<div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-primary-container p-1">
<img alt="Guest photo" className="w-full h-full object-cover rounded-full" data-alt="Portrait of a smiling professional woman in her 30s, natural lighting, outdoors background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3K9BCg5XGBNV_GF8XX5ZnnF1gr1febC7UO4sjpodrF6JyY2MOPpXCr7JQlaBnMc9JGVkYM1Zbr4aWKIr-iQTOr-Ww_G9-O-pU7S8fFFQ6CCiBqwEJJgLNmBL-Tz7L0AVV8_jNajHJP4I5wlB25BIiakSzvXt-MiuS5SP9Lh2SZ2AFH_mb3-weLY0HKTqdNvZ2PnYbaKFUEL4WlTHwgNpju70TMrQwjI0eu4ZXo-EHDvzcnXca9tteSHGmfULi0iB9nywhVb5NmtI"/>
</div>
<h5 className="font-bold text-lg">Nguyễn Thị Mai Anh</h5>
<p className="text-sm text-on-surface-variant">Doanh nhân - Hà Nội</p>
</div>
</div>
{/*  Slider dots  */}
<div className="flex justify-center gap-3 mt-12">
<div className="w-2 h-2 rounded-full bg-primary"></div>
<div className="w-2 h-2 rounded-full bg-outline-variant"></div>
<div className="w-2 h-2 rounded-full bg-outline-variant"></div>
</div>
</div>
</section>
{/*  Footer  */}
<footer className="bg-slate-50 dark:bg-slate-950 w-full border-t border-slate-100 dark:border-slate-800">
<div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-12 py-16 w-full">
<div className="space-y-6">
<div className="text-xl font-notoSerif text-slate-800 dark:text-slate-200">The Curated Sanctuary</div>
<p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    Đỉnh cao của sự sang trọng và dịch vụ tận tâm. Khám phá không gian nghỉ dưỡng hoàn mỹ ngay giữa lòng thành phố.
                </p>
<div className="flex gap-4">
<span className="material-symbols-outlined text-amber-700 cursor-pointer hover:opacity-70">social_leaderboard</span>
<span className="material-symbols-outlined text-amber-700 cursor-pointer hover:opacity-70">camera_alt</span>
<span className="material-symbols-outlined text-amber-700 cursor-pointer hover:opacity-70">mail</span>
</div>
</div>
<div className="space-y-6">
<h6 className="font-bold text-slate-800 dark:text-slate-200">Khám Phá</h6>
<ul className="space-y-4 font-notoSerif text-sm">
<li><a className="text-slate-500 hover:text-amber-700 transition-colors" href="#">Hệ thống phòng</a></li>
<li><a className="text-slate-500 hover:text-amber-700 transition-colors" href="#">Nhà hàng &amp; Bar</a></li>
<li><a className="text-slate-500 hover:text-amber-700 transition-colors" href="#">Dịch vụ Spa</a></li>
<li><a className="text-slate-500 hover:text-amber-700 transition-colors" href="#">Sự kiện &amp; Tiệc cưới</a></li>
</ul>
</div>
<div className="space-y-6">
<h6 className="font-bold text-slate-800 dark:text-slate-200">Thông Tin</h6>
<ul className="space-y-4 font-notoSerif text-sm">
<li><a className="text-slate-500 hover:text-amber-700 transition-colors" href="#">Về chúng tôi</a></li>
<li><a className="text-slate-500 hover:text-amber-700 transition-colors" href="#">Liên hệ</a></li>
<li><a className="text-slate-500 hover:text-amber-700 transition-colors" href="#">Chính sách bảo mật</a></li>
<li><a className="text-slate-500 hover:text-amber-700 transition-colors" href="#">Điều khoản dịch vụ</a></li>
</ul>
</div>
<div className="space-y-6">
<h6 className="font-bold text-slate-800 dark:text-slate-200">Newsletter</h6>
<p className="text-slate-500 dark:text-slate-400 text-sm">Đăng ký nhận tin để không bỏ lỡ các ưu đãi mới nhất.</p>
<div className="flex">
<input className="bg-white border border-slate-200 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-amber-700" placeholder="Email của bạn" type="email"/>
<button className="bg-amber-700 text-white px-4 py-2 rounded-r-lg hover:bg-amber-800 transition-colors">Gửi</button>
</div>
</div>
</div>
<div className="px-12 py-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
<p>© 2024 The Curated Sanctuary. All rights reserved.</p>
<div className="flex gap-6 mt-4 md:mt-0">
<a className="hover:text-amber-700" href="#">Privacy Policy</a>
<a className="hover:text-amber-700" href="#">Terms of Service</a>
<a className="hover:text-amber-700" href="#">Sitemap</a>
</div>
</div>
</footer>

    </div>
  );
}
