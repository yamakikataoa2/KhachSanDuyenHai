import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { mockRooms, formatVND } from '../../../data/mockData';

export default function RoomDetailPage() {
  const { id } = useParams();
  const room = mockRooms.find(r => String(r.MaLoaiPhong) === id) || mockRooms[0];

  return (
    <div className="animate-fade-in">
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img src={room.AnhDaiDien} alt={room.TenLoai} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white max-w-7xl mx-auto">
          <Link to="/rooms" className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white mb-4 transition-colors">
            <span className="material-symbols-outlined text-lg">arrow_back</span> Tất cả phòng
          </Link>
          <h1 className="text-4xl md:text-5xl font-notoSerif mb-2">{room.TenLoai}</h1>
          <p className="text-white/80 text-sm flex items-center gap-4">
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">group</span> {room.SoNguoiToiDa} khách</span>
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">square_foot</span> {room.DienTich}m²</span>
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-2xl font-notoSerif font-bold text-on-surface mb-4">Giới thiệu</h2>
            <p className="text-on-surface-variant leading-relaxed">{room.MoTa}</p>
          </div>
          <div>
            <h2 className="text-2xl font-notoSerif font-bold text-on-surface mb-4">Tiện nghi</h2>
            <div className="grid grid-cols-2 gap-3">
              {room.TienNghi.map((tn, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl">
                  <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                  <span className="text-sm text-on-surface">{tn}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_8px_32px_rgba(77,70,53,0.1)]">
            <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Giá từ</p>
            <p className="text-3xl font-bold text-primary mb-1">{formatVND(room.GiaMacDinh)}</p>
            <p className="text-xs text-on-surface-variant mb-6">/ đêm • đã bao gồm thuế</p>
            <Link to="/booking" className="block text-center w-full bg-primary-container text-on-primary-container py-3.5 rounded-xl font-semibold hover:brightness-110 transition-all shadow-sm text-sm mb-3">
              Đặt phòng ngay
            </Link>
            <button className="w-full py-3 border border-outline-variant rounded-xl text-sm font-medium text-on-surface hover:bg-surface-container-high transition-colors">Liên hệ tư vấn</button>
          </div>
        </div>
      </div>
    </div>
  );
}
