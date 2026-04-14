import React from 'react';
import { Link } from 'react-router-dom';
import { formatVND } from '../../../data/mockData';

export default function ComboCard({ combo }) {
  return (
    <div className="relative group rounded-2xl overflow-hidden h-[380px] shadow-[0_2px_12px_rgba(77,70,53,0.06)] hover:shadow-[0_12px_40px_rgba(77,70,53,0.12)] transition-all duration-400">
      <img alt={combo.TenGoi} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 bg-surface-container-high" src={combo.AnhDaiDien || "https://placehold.co/600x400?text=No+Image"} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 p-8 text-white w-full z-20">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-primary-container text-on-primary-container text-xs font-bold px-3 py-0.5 rounded-full shadow-sm">{combo.SoNgay} ngày {combo.SoNgay - 1} đêm</span>
          {combo.PhanTramGiam && <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-0.5 rounded-full">-{combo.PhanTramGiam}%</span>}
        </div>
        <h3 className="text-2xl font-notoSerif mb-2">{combo.TenGoi}</h3>
        <p className="opacity-80 text-sm mb-4 max-w-sm line-clamp-2 leading-relaxed">{combo.MoTa}</p>
        <div className="flex items-center justify-between gap-4">
          <div>
            {combo.GiaGoc && <span className="text-white/50 line-through text-xs mr-2">{formatVND(combo.GiaGoc)}</span>}
            <span className="text-primary-fixed-dim font-bold text-lg">{formatVND(combo.GiaCombo || combo.GiaTrungBinh)}</span>
          </div>
          <Link to={`/combos/${combo.MaGoi}`} className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-white hover:text-on-surface transition-all">
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
}
