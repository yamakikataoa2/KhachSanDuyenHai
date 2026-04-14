import React, { useState, useEffect } from 'react';
import HeroSection from '../../sections/home/HeroSection';
import SearchBookingSection from '../../sections/home/SearchBookingSection';
import StatsStrip from '../../sections/home/StatsStrip';
import FeaturedRoomsSection from '../../sections/home/FeaturedRoomsSection';
import ComboSection from '../../sections/home/ComboSection';
import AmenitiesSection from '../../sections/home/AmenitiesSection';
import CTASection from '../../sections/home/CTASection';
import TestimonialsSection from '../../sections/home/TestimonialsSection';
import { mockRooms, mockCombos } from '../../../data/mockData';

export default function HomePage() {
  const [rooms, setRooms] = useState([]);
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRooms(mockRooms);
      setCombos(mockCombos);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <HeroSection />
      <SearchBookingSection />
      <div className="h-12" />
      <StatsStrip />
      <FeaturedRoomsSection rooms={rooms} loading={loading} />
      <AmenitiesSection />
      <ComboSection combos={combos} loading={loading} />
      <CTASection />
      <TestimonialsSection />
    </div>
  );
}
