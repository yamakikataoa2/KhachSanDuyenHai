import React from 'react';
import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=80" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-28 md:py-36">
        <div className="max-w-xl">
          <p className="uppercase tracking-[0.3em] text-primary-fixed-dim text-xs font-bold mb-4">Trải nghiệm đặc biệt</p>
          <h2 className="text-4xl md:text-5xl font-notoSerif text-white mb-6 leading-tight">
            Sẵn sàng cho kỳ nghỉ <span className="italic text-primary-fixed-dim">đáng nhớ</span>?
          </h2>
          <p className="text-white/70 leading-relaxed mb-10">
            Đặt phòng ngay hôm nay để nhận ưu đãi đặc biệt lên đến 25% cho lần lưu trú đầu tiên.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/booking" className="bg-primary-container text-on-primary-container px-8 py-4 rounded-full font-semibold hover:scale-[1.03] transition-all shadow-xl text-sm">
              Đặt phòng với ưu đãi
            </Link>
            <Link to="/combos" className="border border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all text-sm">
              Xem gói combo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
