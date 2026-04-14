import React from 'react';

export default function SearchBookingSection() {
  return (
    <div className="relative z-30 max-w-5xl mx-auto px-6 -mt-24">
      <div className="glass rounded-3xl shadow-[0_24px_48px_rgba(77,70,53,0.14)] p-6 md:p-8 ghost-border animate-float-up stagger-2">
        <div className="flex flex-wrap lg:flex-nowrap gap-4 items-end">
          {[
            { label: 'Check-in', icon: 'event_available', type: 'date', placeholder: 'Ngày nhận phòng' },
            { label: 'Check-out', icon: 'event_busy', type: 'date', placeholder: 'Ngày trả phòng' },
          ].map((field, i) => (
            <div key={i} className="flex-1 min-w-[160px]">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold mb-2 pl-1">{field.label}</label>
              <div className="bg-surface-container/80 py-3 px-4 rounded-2xl flex items-center gap-3 border border-transparent focus-within:border-primary/40 transition-all hover:bg-surface-container-high/60">
                <span className="material-symbols-outlined text-primary text-lg">{field.icon}</span>
                <input className="bg-transparent border-none outline-none w-full text-sm text-on-surface placeholder:text-on-surface-variant/50" placeholder={field.placeholder} type={field.type} />
              </div>
            </div>
          ))}
          <div className="flex-1 min-w-[130px]">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold mb-2 pl-1">Số khách</label>
            <div className="bg-surface-container/80 py-3 px-4 rounded-2xl flex items-center gap-3 border border-transparent focus-within:border-primary/40 transition-all hover:bg-surface-container-high/60">
              <span className="material-symbols-outlined text-primary text-lg">group</span>
              <select className="bg-transparent border-none outline-none w-full text-sm text-on-surface cursor-pointer appearance-none">
                <option>1 Khách</option>
                <option>2 Khách</option>
                <option>3 Khách</option>
                <option>4 Khách</option>
                <option>5+ Khách</option>
              </select>
            </div>
          </div>
          <button className="bg-primary hover:bg-amber-900 text-white px-7 py-3 rounded-2xl font-semibold flex items-center gap-2.5 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap hover:-translate-y-0.5 text-sm">
            <span className="material-symbols-outlined text-lg">search</span>
            Tìm phòng
          </button>
        </div>
      </div>
    </div>
  );
}
