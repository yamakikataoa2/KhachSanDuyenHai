import React, { useState, useEffect } from 'react';
import comboService from '../../../services/comboService';
import ComboCard from '../../components/combo/ComboCard';
import { SkeletonCard } from '../../components/common/LoadingSkeleton';

export default function CombosPage() {
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchCombos = async () => {
      try {
        setLoading(true);
        const data = await comboService.getCombos();
        if (isMounted) setCombos(data);
      } catch (err) {
        console.error("Error fetching combos:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchCombos();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="bg-surface-container-low py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <span className="text-primary font-semibold tracking-[0.2em] uppercase text-sm">Special Offers</span>
          <h1 className="text-4xl md:text-5xl font-notoSerif text-on-surface mt-3 mb-4">Ưu Đãi <span className="italic">Đặc Biệt</span></h1>
          <p className="text-on-surface-variant max-w-2xl leading-relaxed">Các gói combo nghỉ dưỡng trọn vẹn, tiết kiệm lên đến 30% so với đặt riêng lẻ.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {combos.map(combo => <ComboCard key={combo.MaGoi} combo={combo} />)}
          </div>
        )}
      </div>
    </div>
  );
}
