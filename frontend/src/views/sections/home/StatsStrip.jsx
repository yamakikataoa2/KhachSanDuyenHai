import React from 'react';
import { Link } from 'react-router-dom';

const stats = [
  { number: '5★', label: 'Đánh giá' },
  { number: '120+', label: 'Phòng nghỉ' },
  { number: '15+', label: 'Dịch vụ' },
  { number: '98%', label: 'Hài lòng' },
];

export default function StatsStrip() {
  return (
    <section className="py-12 px-8 shimmer-bg">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <div key={i} className={`text-center animate-float-up stagger-${i + 1}`}>
            <p className="text-3xl md:text-4xl font-notoSerif font-bold text-primary mb-1">{s.number}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-on-surface-variant font-semibold">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
