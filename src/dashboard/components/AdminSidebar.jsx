import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  ArrowLeft,
  BedDouble,
  Calendar,
  Compass,
  CreditCard,
  FileText,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
  Utensils,
  X,
} from 'lucide-react';
import { TMMonogram } from '@/assets/logo/TMMonogram';
import { ADMIN_NAV_GROUPS } from '@/data/navigationData';
import { PUBLIC_ROUTES } from '@/routes/routePaths';
import { useHotel } from '@/context/HotelContext';
import { cn } from '@/utils/cn';

const ICON_MAP = {
  LayoutDashboard,
  Compass,
  FileText,
  Calendar,
  BedDouble,
  Users,
  Sparkles,
  Utensils,
  ShieldCheck,
  CreditCard,
  Settings,
};

export function AdminSidebar() {
  const { adminSidebarOpen, setAdminSidebarOpen } = useHotel();

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between bg-[#F2EAE2] border-r border-[#E3D5CE]">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <Link
            to={PUBLIC_ROUTES.HOME}
            className="inline-flex items-center gap-3 whitespace-nowrap group"
          >
            <TMMonogram size={36} variant="gold" />
            <div>
              <span className="block font-editorial text-lg font-semibold tracking-[0.04em] uppercase leading-tight text-[#29232A] group-hover:text-[#702D43] transition-colors">
                The Montage
              </span>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-[#997A46] font-semibold">
                Management
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setAdminSidebarOpen(false)}
            aria-label="Close sidebar"
            className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#E3D5CE] bg-[#F8F3EA] text-[#29232A] lg:hidden cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Admin Navigation" className="mt-8 space-y-6">
          {ADMIN_NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80]">
                {group.label}
              </p>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const Icon = ICON_MAP[item.icon] || LayoutDashboard;
                  return (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        onClick={() => setAdminSidebarOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium transition-all duration-200 whitespace-nowrap',
                            isActive
                              ? 'bg-[#702D43] text-white shadow-[0_8px_18px_-10px_rgba(112,45,67,0.55)]'
                              : 'text-[#29232A]/85 hover:bg-[#E9DDE0] hover:text-[#702D43]'
                          )
                        }
                      >
                        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>{item.label}</span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-[#E3D5CE] p-6">
        <Link
          to={PUBLIC_ROUTES.HOME}
          className="inline-flex items-center gap-2 text-xs font-medium text-[#702D43] hover:text-[#572133] transition-colors whitespace-nowrap"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Public Hotel Website</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block lg:w-[264px] lg:shrink-0">
        <div className="sticky top-0 h-screen">{sidebarContent}</div>
      </aside>

      {/* Mobile Overlay Sidebar */}
      {adminSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            onClick={() => setAdminSidebarOpen(false)}
            className="fixed inset-0 bg-[#29232A]/30 backdrop-blur-[1px]"
          />
          <aside className="fixed left-0 top-0 h-full w-[264px]">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}

export default AdminSidebar;
