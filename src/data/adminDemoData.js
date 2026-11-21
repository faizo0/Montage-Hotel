export const ADMIN_KPI_METRICS = [
  {
    id: 'occupancy',
    label: 'Suite Occupancy',
    value: '89.4%',
    delta: '+4.2% vs prior 30 days',
    context: 'Demo operational index',
  },
  {
    id: 'adr',
    label: 'Daily Stay Rate',
    value: 'PKR 5,000',
    delta: 'Weekly Pkg PKR 20,000',
    context: 'Monthly Pkg PKR 40,000',
  },
  {
    id: 'revpar',
    label: 'Weekly Stay Package',
    value: 'PKR 20,000',
    delta: '7 Nights Package Rate',
    context: 'Across all suite categories',
  },
  {
    id: 'arrivals',
    label: 'Today Arrivals',
    value: '18',
    delta: 'Concierge escorts assigned',
    context: 'All suites inspected',
  },
];

export const REVENUE_SERIES_DATA = [
  { month: 'Jun', rooms: 212000, dining: 88000, spa: 44000, occupancy: 84 },
  { month: 'Jul', rooms: 248000, dining: 94000, spa: 52000, occupancy: 91 },
  { month: 'Aug', rooms: 265000, dining: 102000, spa: 59000, occupancy: 94 },
  { month: 'Sep', rooms: 236000, dining: 91000, spa: 48000, occupancy: 88 },
  { month: 'Oct', rooms: 221000, dining: 86000, spa: 45000, occupancy: 85 },
  { month: 'Nov', rooms: 242000, dining: 96000, spa: 54000, occupancy: 89 },
];

export const RECENT_RESERVATIONS = [
  {
    code: 'TM-94821',
    guest: 'Zainab & Tariq Mahmood',
    suite: 'Presidential Suite',
    checkIn: '2026-11-21',
    nights: 7,
    total: 20000,
    status: 'Checked In',
  },
  {
    code: 'TM-94824',
    guest: 'Salman Qureshi',
    suite: 'Executive Suite',
    checkIn: '2026-11-21',
    nights: 1,
    total: 5000,
    status: 'Arriving',
  },
  {
    code: 'TM-94829',
    guest: 'Dr. Ayesha Siddiqui',
    suite: 'Deluxe Room',
    checkIn: '2026-11-22',
    nights: 30,
    total: 40000,
    status: 'Confirmed',
  },
  {
    code: 'TM-94833',
    guest: 'Hamza & Sana Farooq',
    suite: 'Executive Suite',
    checkIn: '2026-11-23',
    nights: 2,
    total: 10000,
    status: 'Confirmed',
  },
  {
    code: 'TM-94837',
    guest: 'Kamran & Nadia Raza',
    suite: 'Deluxe Room',
    checkIn: '2026-11-24',
    nights: 7,
    total: 20000,
    status: 'Pre-Arrival',
  },
];
