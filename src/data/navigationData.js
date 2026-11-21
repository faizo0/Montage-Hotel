import { ADMIN_ROUTES, PUBLIC_ROUTES } from '@/routes/routePaths';

export const PUBLIC_NAV_LINKS = [
  { label: 'HOME', to: PUBLIC_ROUTES.HOME },
  { label: 'ABOUT', to: PUBLIC_ROUTES.ABOUT },
  { label: 'ROOMS & SUITES', to: PUBLIC_ROUTES.ROOMS },
  { label: 'DINING', to: PUBLIC_ROUTES.DINING },
  { label: 'EXPERIENCES', to: PUBLIC_ROUTES.EXPERIENCES },
  { label: 'GALLERY', to: PUBLIC_ROUTES.GALLERY },
  { label: 'CONTACT', to: PUBLIC_ROUTES.CONTACT },
];

export const FOOTER_DIRECTORIES = [
  {
    heading: 'The Hotel',
    links: [
      { label: 'Home', to: PUBLIC_ROUTES.HOME },
      { label: 'About & Craftsmanship', to: PUBLIC_ROUTES.ABOUT },
      { label: 'Rooms & Suites', to: PUBLIC_ROUTES.ROOMS },
      { label: 'Architectural Gallery', to: PUBLIC_ROUTES.GALLERY },
      { label: 'Seasonal Offers', to: PUBLIC_ROUTES.OFFERS },
    ],
  },
  {
    heading: 'Hospitality',
    links: [
      { label: 'Fine Dining', to: PUBLIC_ROUTES.DINING },
      { label: 'Spa & Wellness', to: PUBLIC_ROUTES.SPA },
      { label: 'Exclusive Experiences', to: PUBLIC_ROUTES.EXPERIENCES },
      { label: 'Weddings & Events', to: PUBLIC_ROUTES.EVENTS },
      { label: 'Concierge & Contact', to: PUBLIC_ROUTES.CONTACT },
    ],
  },
  {
    heading: 'Reservations & Portal',
    links: [
      { label: 'Book Your Stay', to: PUBLIC_ROUTES.BOOKING },
      { label: 'Guest Portal', to: PUBLIC_ROUTES.GUEST_PORTAL },
      { label: 'Member Sign In', to: PUBLIC_ROUTES.LOGIN },
      { label: 'Management Console', to: ADMIN_ROUTES.DASHBOARD },
    ],
  },
];

export const ADMIN_NAV_GROUPS = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', to: ADMIN_ROUTES.DASHBOARD, icon: 'LayoutDashboard' },
      { label: 'Analytics', to: ADMIN_ROUTES.ANALYTICS, icon: 'Compass' },
      { label: 'Reports', to: ADMIN_ROUTES.REPORTS, icon: 'FileText' },
    ],
  },
  {
    label: 'Hospitality',
    items: [
      { label: 'Reservations', to: ADMIN_ROUTES.RESERVATIONS, icon: 'Calendar' },
      { label: 'Room Management', to: ADMIN_ROUTES.ROOMS, icon: 'BedDouble' },
      { label: 'Guests', to: ADMIN_ROUTES.GUESTS, icon: 'Users' },
      { label: 'Housekeeping', to: ADMIN_ROUTES.HOUSEKEEPING, icon: 'Sparkles' },
      { label: 'Restaurant', to: ADMIN_ROUTES.RESTAURANT, icon: 'Utensils' },
    ],
  },
  {
    label: 'Administration',
    items: [
      { label: 'Staff', to: ADMIN_ROUTES.STAFF, icon: 'ShieldCheck' },
      { label: 'Payments', to: ADMIN_ROUTES.PAYMENTS, icon: 'CreditCard' },
      { label: 'Settings', to: ADMIN_ROUTES.SETTINGS, icon: 'Settings' },
    ],
  },
];
