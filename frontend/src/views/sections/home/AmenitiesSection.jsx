import React from 'react';

const amenities = [
  { icon: 'spa', title: 'Spa & Wellness', desc: 'Liệu trình thư giãn cao cấp với tinh dầu thiên nhiên' },
  { icon: 'pool', title: 'Hồ Bơi Infinity', desc: 'Hồ bơi vô cực view toàn cảnh thành phố' },
  { icon: 'restaurant', title: 'Fine Dining', desc: 'Nhà hàng 5 sao với đầu bếp quốc tế' },
  { icon: 'fitness_center', title: 'Gym & Yoga', desc: 'Phòng tập hiện đại, lớp yoga mỗi sáng' },
  { icon: 'concierge', title: 'Concierge 24/7', desc: 'Dịch vụ hỗ trợ mọi lúc, butler riêng' },
  { icon: 'room_service', title: 'Room Service', desc: 'Phục vụ ẩm thực tại phòng 24/7' },
];

export default function AmenitiesSection() {
  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16 animate-slide-up">
          <span className="text-primary font-semibold tracking-[0.2em] uppercase text-sm">Tiện ích & Dịch vụ</span>
          <h2 className="text-4xl md:text-5xl font-notoSerif text-on-surface mt-4">
            Dịch Vụ <span className="italic">Đẳng Cấp</span>
          </h2>
          <div className="w-20 h-0.5 bg-primary-container mx-auto mt-6 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((item, index) => (
            <div 
              key={index} 
              className="bg-surface-container-lowest p-8 rounded-2xl hover:shadow-[0_8px_32px_rgba(77,70,53,0.1)] transition-all duration-300 group cursor-pointer hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-6 group-hover:bg-primary-container group-hover:scale-110 transition-all duration-300">
                <span className="material-symbols-outlined text-2xl text-primary group-hover:text-on-primary-container">{item.icon}</span>
              </div>
              <h3 className="text-lg font-semibold text-on-surface mb-2 font-notoSerif">{item.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
