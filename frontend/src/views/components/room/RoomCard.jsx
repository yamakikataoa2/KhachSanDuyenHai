import React from 'react';
import { Link } from 'react-router-dom';
import { formatVND } from '../../../data/mockData';

export default function RoomCard({ room }) {
  return (
    <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(77,70,53,0.06)] hover:shadow-[0_12px_40px_rgba(77,70,53,0.12)] transition-all duration-400 flex flex-col group h-full">
      <div className="h-60 overflow-hidden relative">
        <img alt={room.TenLoai} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 bg-surface-container-high" src={room.AnhDaiDien || "https://placehold.co/600x400?text=No+Image"} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-primary font-bold text-sm px-3 py-1 rounded-full shadow-sm">
          {formatVND(room.GiaMacDinh)}<span className="text-[10px] text-on-surface-variant font-normal">/đêm</span>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-lg font-notoSerif font-bold text-on-surface mb-2">{room.TenLoai}</h3>
        <div className="flex gap-4 mb-4 text-xs text-on-surface-variant">
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">group</span> {room.SoNguoiToiDa} khách</span>
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">square_foot</span> {room.DienTich}m²</span>
        </div>
        <p className="text-sm text-on-surface-variant line-clamp-2 mb-5 leading-relaxed">{room.MoTa}</p>
        <Link to={`/rooms/${room.MaLoaiPhong}`} className="mt-auto flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all duration-300">
          Xem chi tiết
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
