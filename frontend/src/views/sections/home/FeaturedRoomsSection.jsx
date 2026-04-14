import React from 'react';
import RoomCard from '../../components/room/RoomCard';
import { SkeletonCard } from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';

export default function FeaturedRoomsSection({ rooms, loading }) {
  return (
    <section className="py-24 bg-surface-container-low relative z-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-[0.2em] uppercase text-sm">Phòng nghỉ</span>
          <h2 className="text-4xl md:text-5xl font-notoSerif text-on-surface mt-4">
            Phòng Nghỉ <span className="italic">Sang Trọng</span>
          </h2>
          <div className="w-20 h-0.5 bg-primary-container mx-auto mt-6 rounded-full" />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : rooms && rooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rooms.slice(0, 6).map(room => (
              <RoomCard key={room.MaLoaiPhong} room={room} />
            ))}
          </div>
        ) : (
          <EmptyState 
            icon="hotel" 
            title="Đang cập nhật phòng" 
            description="Danh sách phòng đang được cập nhật. Vui lòng quay lại sau."
          />
        )}
      </div>
    </section>
  );
}
