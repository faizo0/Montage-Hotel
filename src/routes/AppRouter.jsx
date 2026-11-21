import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PUBLIC_ROUTES, ADMIN_ROUTES } from '@/routes/routePaths';

// Layouts
import { PublicLayout } from '@/layouts/PublicLayout';
import { AdminLayout } from '@/layouts/AdminLayout';

// Public Pages
import { Home } from '@/pages/public/Home';
import { About } from '@/pages/public/About';
import { Rooms } from '@/pages/public/Rooms';
import { RoomDetails } from '@/pages/public/RoomDetails';
import { Dining } from '@/pages/public/Dining';
import { Spa } from '@/pages/public/Spa';
import { Experiences } from '@/pages/public/Experiences';
import { Events } from '@/pages/public/Events';
import { Gallery } from '@/pages/public/Gallery';
import { Offers } from '@/pages/public/Offers';
import { Booking } from '@/pages/public/Booking';
import { Contact } from '@/pages/public/Contact';
import { Login } from '@/pages/public/Login';
import { GuestPortal } from '@/pages/public/GuestPortal';

// Admin Pages
import { Dashboard } from '@/pages/admin/Dashboard';
import { Reservations } from '@/pages/admin/Reservations';
import { RoomManagement } from '@/pages/admin/RoomManagement';
import { Guests } from '@/pages/admin/Guests';
import { Housekeeping } from '@/pages/admin/Housekeeping';
import { Staff } from '@/pages/admin/Staff';
import { Restaurant } from '@/pages/admin/Restaurant';
import { Payments } from '@/pages/admin/Payments';
import { Analytics } from '@/pages/admin/Analytics';
import { Reports } from '@/pages/admin/Reports';
import { Settings } from '@/pages/admin/Settings';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Luxury Hospitality Website Routes */}
        <Route element={<PublicLayout />}>
          <Route path={PUBLIC_ROUTES.HOME} element={<Home />} />
          <Route path={PUBLIC_ROUTES.ABOUT} element={<About />} />
          <Route path={PUBLIC_ROUTES.ROOMS} element={<Rooms />} />
          <Route path={PUBLIC_ROUTES.ROOM_DETAILS} element={<RoomDetails />} />
          <Route path={PUBLIC_ROUTES.DINING} element={<Dining />} />
          <Route path={PUBLIC_ROUTES.SPA} element={<Spa />} />
          <Route path={PUBLIC_ROUTES.EXPERIENCES} element={<Experiences />} />
          <Route path={PUBLIC_ROUTES.EVENTS} element={<Events />} />
          <Route path={PUBLIC_ROUTES.GALLERY} element={<Gallery />} />
          <Route path={PUBLIC_ROUTES.OFFERS} element={<Offers />} />
          <Route path={PUBLIC_ROUTES.BOOKING} element={<Booking />} />
          <Route path={PUBLIC_ROUTES.CONTACT} element={<Contact />} />
          <Route path={PUBLIC_ROUTES.LOGIN} element={<Login />} />
          <Route path={PUBLIC_ROUTES.GUEST_PORTAL} element={<GuestPortal />} />
        </Route>

        {/* Executive Hotel Management Dashboard Routes */}
        <Route path={ADMIN_ROUTES.ROOT} element={<AdminLayout />}>
          <Route
            index
            element={<Navigate to={ADMIN_ROUTES.DASHBOARD} replace />}
          />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="rooms" element={<RoomManagement />} />
          <Route path="guests" element={<Guests />} />
          <Route path="housekeeping" element={<Housekeeping />} />
          <Route path="staff" element={<Staff />} />
          <Route path="restaurant" element={<Restaurant />} />
          <Route path="payments" element={<Payments />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to={PUBLIC_ROUTES.HOME} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
