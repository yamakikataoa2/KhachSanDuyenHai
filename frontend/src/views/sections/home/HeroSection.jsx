import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <header className="relative h-[92vh] min-h-[680px] w-full flex items-end overflow-hidden">
      <img 
        alt="Luxury resort exterior" 
        className="absolute inset-0 w-full h-full object-cover object-center scale-[1.02]" 
        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=85"
        loading="eager"
      />
      {/* Multi-layer gradient for cinematic feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 pb-32 md:pb-40">
        <div className="max-w-2xl animate-float-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-primary-fixed-dim" />
            <p className="uppercase tracking-[0.35em] text-xs font-inter text-primary-fixed-dim font-semibold">
              ★★★★★ Luxury Hotel & Resort
            </p>
          </div>
          <h1 className="font-notoSerif text-5xl md:text-6xl lg:text-7xl mb-5 leading-[1.08] text-white font-medium">
            Nơi Nghỉ Dưỡng <br />
            <span className="italic text-primary-fixed-dim">Đẳng Cấp</span> Bậc Nhất
          </h1>
          <p className="text-base md:text-lg font-light mb-10 text-white/80 tracking-wide max-w-lg leading-relaxed">
            Khám phá trải nghiệm nghỉ dưỡng 5 sao hoàn hảo, nơi mỗi khoảnh khắc đều trở thành kỉ niệm.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/booking" 
              className="inline-flex items-center gap-2.5 bg-primary-container text-on-primary-container px-8 py-4 rounded-full text-sm font-semibold hover:scale-[1.03] transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <span className="material-symbols-outlined text-lg">calendar_month</span>
              Đặt phòng ngay
            </Link>
            <Link 
              to="/rooms" 
              className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-white/20 transition-all duration-300"
            >
              Khám phá phòng nghỉ
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom gradient for seamless blend */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
    </header>
  );
}
