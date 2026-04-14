import React from 'react';
import { Link } from 'react-router-dom';
import ComboCard from '../../components/combo/ComboCard';
import EmptyState from '../../components/common/EmptyState';

export default function ComboSection({ combos, loading }) {
  return (
    <section className="py-24 px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <span className="text-primary font-semibold tracking-[0.2em] uppercase text-sm">Ưu đãi độc quyền</span>
          <h2 className="text-4xl md:text-5xl font-notoSerif text-on-surface mt-4">
            Gói Combo <span className="italic">Nghỉ Dưỡng</span>
          </h2>
        </div>
        <Link to="/combos" className="text-primary font-bold flex items-center gap-2 hover:translate-x-2 transition-transform duration-300 text-sm">
          Tất cả ưu đãi <span className="material-symbols-outlined text-lg">arrow_right_alt</span>
        </Link>
      </div>
      
      {combos && combos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {combos.map(combo => (
            <ComboCard key={combo.MaGoi} combo={combo} />
          ))}
        </div>
      ) : (
        <EmptyState 
          icon="card_giftcard" 
          title="Đang cập nhật ưu đãi" 
          description="Các gói combo đặc biệt sẽ sớm được cập nhật."
        />
      )}
    </section>
  );
}
