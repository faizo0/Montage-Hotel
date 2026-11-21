import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Plus } from 'lucide-react';
import { Button } from '@/components/buttons/Button';
import { ADMIN_ROUTES, PUBLIC_ROUTES } from '@/routes/routePaths';
import { useHotel } from '@/context/HotelContext';

const ROUTE_TITLES = {
  [ADMIN_ROUTES.DASHBOARD]: 'Executive Overview',
  [ADMIN_ROUTES.RESERVATIONS]: 'Reservations Desk',
  [ADMIN_ROUTES.ROOMS]: 'Suite & Room Inventory',
  [ADMIN_ROUTES.GUESTS]: 'Guest Directory',
  [ADMIN_ROUTES.HOUSEKEEPING]: 'Housekeeping Operations',
  [ADMIN_ROUTES.STAFF]: 'Hospitality Staff Roster',
  [ADMIN_ROUTES.RESTAURANT]: 'Diwan Signature Dining',
  [ADMIN_ROUTES.PAYMENTS]: 'Folio & Ledger',
  [ADMIN_ROUTES.ANALYTICS]: 'Revenue & Demand Analytics',
  [ADMIN_ROUTES.REPORTS]: 'Executive Reports',
  [ADMIN_ROUTES.SETTINGS]: 'Property Settings',
};

export function AdminTopbar() {
  const { pathname } = useLocation();
  const { setAdminSidebarOpen } = useHotel();

  const currentTitle = ROUTE_TITLES[pathname] || 'Executive Console';

  return (
    <header className="sticky top-0 z-30 flex h-18 items-center justify-between gap-4 border-b border-[#E3D5CE] bg-[#F8F3EA]/95 px-6 backdrop-blur-md lg:px-10">
      <div className="flex items-center gap-4 min-w-0">
        <button
          type="button"
          onClick={() => setAdminSidebarOpen(true)}
          aria-label="Open admin sidebar"
          className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#E3D5CE] bg-[#E9DDE0]/60 text-[#29232A] lg:hidden cursor-pointer"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-[#877B80] truncate">
            <span>Operations</span>
            <span aria-hidden="true">/</span>
            <span className="text-[#29232A] font-medium truncate">
              {currentTitle}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <Button to={PUBLIC_ROUTES.BOOKING} variant="primary" size="sm" icon={Plus} iconPosition="left">
          New Reservation
        </Button>
      </div>
    </header>
  );
}

export default AdminTopbar;
