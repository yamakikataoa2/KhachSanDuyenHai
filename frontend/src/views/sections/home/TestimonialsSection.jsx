import React from 'react';
import { mockTestimonials } from '../../../data/mockData';

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-[0.2em] uppercase text-sm">Đánh giá</span>
          <h2 className="text-4xl md:text-5xl font-notoSerif text-on-surface mt-4">
            Khách Hàng <span className="italic">Nói Gì</span>
          </h2>
          <div className="w-20 h-0.5 bg-primary-container mx-auto mt-6 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockTestimonials.map((item, index) => (
            <div 
              key={index} 
              className="bg-surface-container-lowest p-8 rounded-2xl hover:shadow-[0_8px_32px_rgba(77,70,53,0.1)] transition-all duration-300 relative"
            >
              {/* Quote mark */}
              <span className="absolute top-6 right-8 text-6xl font-notoSerif text-primary-container/40 leading-none select-none">"</span>
              
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-lg text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              
              <p className="text-on-surface-variant leading-relaxed mb-6 italic text-sm">"{item.text}"</p>
              
              <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/20">
                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-sm">
                  {item.avatar}
                </div>
                <div>
                  <p className="font-semibold text-on-surface text-sm">{item.name}</p>
                  <p className="text-xs text-on-surface-variant">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
