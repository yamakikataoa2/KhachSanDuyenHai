import React, { useState, useEffect } from 'react';
import HeroSection from '../../sections/home/HeroSection';
import SearchBookingSection from '../../sections/home/SearchBookingSection';
import StatsStrip from '../../sections/home/StatsStrip';
import FeaturedRoomsSection from '../../sections/home/FeaturedRoomsSection';
import ComboSection from '../../sections/home/ComboSection';
import AmenitiesSection from '../../sections/home/AmenitiesSection';
import CTASection from '../../sections/home/CTASection';
import TestimonialsSection from '../../sections/home/TestimonialsSection';
import roomService from '../../../services/roomService';
import comboService from '../../../services/comboService';
export default function HomePage() {
  const [rooms, setRooms] = useState([]);
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        const [roomTypesRes, combosRes] = await Promise.all([
          roomService.getRoomTypes(),
          comboService.getCombos()
        ]);
        if (isMounted) {
          setRooms(roomTypesRes);
          setCombos(combosRes);
        }
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
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
