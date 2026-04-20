import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RoomCard from '../../components/room/RoomCard';
import roomService from '../../../services/roomService';

export default function RoomsPage() {
  const [filter, setFilter] = useState('');
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const data = await roomService.getRoomTypes();
        if (isMounted) setRooms(data);
      } catch (err) {
        console.error("Error fetching room types:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchRooms();
    return () => { isMounted = false; };
  }, []);

  const filtered = rooms.filter(r => !filter || r.TenLoai.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="animate-fade-in">
      {/* Page Hero */}
      <div className="bg-surface-container-low py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <span className="text-primary font-semibold tracking-[0.2em] uppercase text-sm">Accommodation</span>
          <h1 className="text-4xl md:text-5xl font-notoSerif text-on-surface mt-3 mb-4">Phòng Nghỉ <span className="italic">Sang Trọng</span></h1>
          <p className="text-on-surface-variant max-w-2xl leading-relaxed">Mỗi phòng tại The Curated Sanctuary đều được thiết kế tỉ mỉ, mang đến không gian nghỉ dưỡng đẳng cấp cho trải nghiệm khó quên.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Search */}
        <div className="flex items-center bg-surface-container-high/60 rounded-xl px-4 py-3 max-w-md mb-10 border border-transparent focus-within:border-primary transition-colors">
          <span className="material-symbols-outlined text-primary mr-3">search</span>
          <input type="text" placeholder="Tìm loại phòng..." className="bg-transparent outline-none w-full text-sm" value={filter} onChange={e => setFilter(e.target.value)} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(room => <RoomCard key={room.MaLoaiPhong} room={room} />)}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-3 block">search_off</span>
            <p className="text-on-surface-variant">Không tìm thấy phòng phù hợp</p>
          </div>
        )}
      </div>
    </div>
  );
}
