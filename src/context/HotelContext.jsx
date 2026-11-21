import React, { createContext, useContext, useMemo, useState } from 'react';
import { ROOMS_DATA } from '@/data/roomsData';

const HotelContext = createContext(null);

function getDefaultDates() {
  const checkInDate = new Date();
  checkInDate.setDate(checkInDate.getDate() + 7);
  const checkOutDate = new Date(checkInDate);
  checkOutDate.setDate(checkOutDate.getDate() + 1);

  const toIso = (d) => d.toISOString().split('T')[0];
  return { checkIn: toIso(checkInDate), checkOut: toIso(checkOutDate) };
}

export function HotelProvider({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminSidebarOpen, setAdminSidebarOpen] = useState(false);
  const defaults = useMemo(() => getDefaultDates(), []);

  const [bookingSelection, setBookingSelection] = useState({
    suiteSlug: ROOMS_DATA[0].slug,
    stayPackage: 'daily',
    guests: 2,
    adults: 2,
    children: 0,
    rooms: 1,
    nights: 1,
    checkIn: defaults.checkIn,
    checkOut: defaults.checkOut,
  });

  const value = useMemo(
    () => ({
      mobileMenuOpen,
      setMobileMenuOpen,
      adminSidebarOpen,
      setAdminSidebarOpen,
      bookingSelection,
      setBookingSelection,
    }),
    [mobileMenuOpen, adminSidebarOpen, bookingSelection]
  );

  return (
    <HotelContext.Provider value={value}>{children}</HotelContext.Provider>
  );
}

export function useHotel() {
  const ctx = useContext(HotelContext);
  if (!ctx) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return ctx;
}
