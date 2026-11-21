import { HOTEL_IMAGES } from '@/assets/images';

/**
 * Editable Centralized Stay Package Rates (Pakistani Rupees — Demo Data).
 * 1. Daily Stay:   1 Night   — PKR 5,000
 * 2. Weekly Stay:  7 Nights  — Package Price PKR 20,000
 * 3. Monthly Stay: 30 Nights — Package Price PKR 40,000
 */
export const DAILY_STAY_PRICE = 5000;
export const WEEKLY_PACKAGE_PRICE = 20000;
export const MONTHLY_PACKAGE_PRICE = 40000;

export const STAY_PACKAGES = [
  {
    id: 'daily',
    name: 'Daily Stay',
    durationLabel: '1 Night',
    nights: 1,
    price: DAILY_STAY_PRICE,
    isPackage: false,
    rateTypeLabel: 'Daily Rate',
    shortRate: 'PKR 5,000',
    description: 'Flexible single-night residence stay billed at the daily demo rate.',
  },
  {
    id: 'weekly',
    name: 'Weekly Stay',
    durationLabel: '7 Nights',
    nights: 7,
    price: WEEKLY_PACKAGE_PRICE,
    isPackage: true,
    rateTypeLabel: 'Package Price',
    shortRate: 'PKR 20,000 Package',
    description: 'Preferential 7-night continuous residence package rate (not a nightly rate).',
  },
  {
    id: 'monthly',
    name: 'Monthly Stay',
    durationLabel: '30 Nights',
    nights: 30,
    price: MONTHLY_PACKAGE_PRICE,
    isPackage: true,
    rateTypeLabel: 'Package Price',
    shortRate: 'PKR 40,000 Package',
    description: 'Extended 30-night residential package rate (not a nightly rate).',
  },
];

export function getStayPackageById(id) {
  return STAY_PACKAGES.find((pkg) => pkg.id === id) || STAY_PACKAGES[0];
}

/**
 * Accurate stay pricing breakdown strictly derived from:
 * - Daily Stay (1 Night): PKR 5,000
 * - Weekly Stay Package (7 Nights): PKR 20,000
 * - Monthly Stay Package (30 Nights): PKR 40,000
 */
export function calculateStayPricing(nightsInput, roomsInput = 1) {
  const nights = Math.max(1, Math.round(Number(nightsInput) || 1));
  const rooms = Math.max(1, Math.round(Number(roomsInput) || 1));

  const months = Math.floor(nights / 30);
  const remAfterMonth = nights % 30;
  const weeks = Math.floor(remAfterMonth / 7);
  const dailyNights = remAfterMonth % 7;

  const perRoomTotal =
    months * MONTHLY_PACKAGE_PRICE +
    weeks * WEEKLY_PACKAGE_PRICE +
    dailyNights * DAILY_STAY_PRICE;

  const total = perRoomTotal * rooms;

  let planName = 'Daily Stay Rate';
  let isExactPackage = false;
  let rateLabel = 'PKR 5,000 / 1 Night';
  let breakdownLabel = `${nights} ${nights === 1 ? 'Night' : 'Nights'} × PKR 5,000`;

  if (nights === 1) {
    planName = 'Daily Stay (1 Night)';
    rateLabel = 'PKR 5,000 (1 Night)';
    breakdownLabel = '1 Night · Daily Stay Rate (PKR 5,000)';
  } else if (nights === 7) {
    planName = 'Weekly Stay Package (7 Nights)';
    isExactPackage = true;
    rateLabel = 'PKR 20,000 Package Price';
    breakdownLabel = 'Weekly Stay Package · 7 Nights (Package Price: PKR 20,000)';
  } else if (nights === 30) {
    planName = 'Monthly Stay Package (30 Nights)';
    isExactPackage = true;
    rateLabel = 'PKR 40,000 Package Price';
    breakdownLabel = 'Monthly Stay Package · 30 Nights (Package Price: PKR 40,000)';
  } else if (months > 0 || weeks > 0) {
    isExactPackage = true;
    const parts = [];
    if (months > 0) {
      parts.push(
        `${months} × Monthly Package (PKR ${(months * MONTHLY_PACKAGE_PRICE).toLocaleString('en-US')})`
      );
    }
    if (weeks > 0) {
      parts.push(
        `${weeks} × Weekly Package (PKR ${(weeks * WEEKLY_PACKAGE_PRICE).toLocaleString('en-US')})`
      );
    }
    if (dailyNights > 0) {
      parts.push(
        `${dailyNights} ${dailyNights === 1 ? 'Night' : 'Nights'} × PKR 5,000`
      );
    }
    planName = `${nights}-Night Stay Package Calculation`;
    rateLabel = 'Combined Package & Daily Rates';
    breakdownLabel = parts.join(' + ');
  }

  return {
    nights,
    rooms,
    months,
    weeks,
    dailyNights,
    perRoomTotal,
    total,
    planName,
    isExactPackage,
    rateLabel,
    breakdownLabel,
  };
}

/**
 * Homepage & Admin 3-tier preview collection (room categories preserved intact).
 */
export const ROOMS_DATA = [
  {
    id: 'deluxe-room',
    slug: 'deluxe-room',
    name: 'Deluxe Room',
    category: 'Signature Room',
    categoryGroup: 'Room',
    wing: 'Courtyard Garden Wing',
    sizeSqm: 56,
    maxGuests: 2,
    bedding: 'Handcrafted Walnut King Bed',
    view: 'Lush Courtyard & Fountain Gardens',
    ratePerNight: DAILY_STAY_PRICE,
    weeklyPackagePrice: WEEKLY_PACKAGE_PRICE,
    monthlyPackagePrice: MONTHLY_PACKAGE_PRICE,
    availableRooms: 6,
    availability: 'Available',
    image: HOTEL_IMAGES.deluxeRoom,
    summary:
      'Sunlit ivory plaster interiors featuring hand-carved walnut woodwork, subtle geometric inlay, and tall timber terrace doors opening onto peaceful courtyard greenery.',
    overview:
      'Positioned along the quiet Courtyard Garden Wing, the Deluxe Room pairs sunlit lime-plaster walls with carved Pakistani walnut joinery and hand-loomed textiles. Tall arched balcony doors invite morning light across cool travertine stone floors toward private garden terraces.',
    features: ['Carved Walnut Craftsmanship', 'Courtyard Balcony', 'Marble Rain Shower'],
    highlights: [
      'Private Courtyard Balcony',
      'Hand-Carved Geometric Woodwork',
      'Custom Marble Bath',
      'Evening Turndown Hospitality',
    ],
    gallery: [
      {
        src: HOTEL_IMAGES.deluxeRoom,
        alt: 'Deluxe Room King Sanctuary with Hand-Carved Walnut Interior',
        caption: 'Sunlit King Bedroom & Carved Timber Doors',
      },
      {
        src: HOTEL_IMAGES.courtyardPortrait,
        alt: 'Lush Courtyard Garden View from Deluxe Terrace',
        caption: 'Arched Stone Courtyard Promenade',
      },
      {
        src: HOTEL_IMAGES.spaWellness,
        alt: 'Travertine Marble Bath and Thermal Retreat Access',
        caption: 'Warm Travertine Marble Bath & Spa Sanctuary',
      },
      {
        src: HOTEL_IMAGES.fineDining,
        alt: 'In-Room & Courtyard Pakistani Culinary Service',
        caption: 'Private Artisanal Tea & Dining Hospitality',
      },
    ],
  },
  {
    id: 'executive-suite',
    slug: 'executive-suite',
    name: 'Executive Suite',
    category: 'Signature Suite',
    categoryGroup: 'Suite',
    wing: 'Heritage Arch Wing',
    sizeSqm: 98,
    maxGuests: 3,
    bedding: 'Bespoke Carved Canopy King',
    view: 'Mughal-Inspired Garden Colonnade',
    ratePerNight: DAILY_STAY_PRICE,
    weeklyPackagePrice: WEEKLY_PACKAGE_PRICE,
    monthlyPackagePrice: MONTHLY_PACKAGE_PRICE,
    availableRooms: 4,
    availability: 'Available',
    image: HOTEL_IMAGES.executiveSuite,
    summary:
      'Graceful Mughal-inspired arched alcoves paired with hand-knotted Pakistani carpets, royal burgundy velvet seating, and dedicated butler service.',
    overview:
      'Designed around rhythmic limestone arches and intimate lounge proportions, the Executive Suite offers an unhurried sanctuary for extended stays, complete with curated reading salons and direct access to garden colonnades.',
    features: ['Arched Alcove Salon', 'Hand-Knotted Carpet', 'Dedicated Butler Service'],
    highlights: [
      'Sculpted Arched Niches',
      'Private Dressing & Lounge Area',
      'Dedicated Butler Hospitality',
      'Spa Sanctuary Access',
    ],
    gallery: [
      {
        src: HOTEL_IMAGES.executiveSuite,
        alt: 'Executive Suite with Carved Alcoves and Royal Burgundy Accents',
        caption: 'Arched Alcove Residence & Walnut Lounge',
      },
      {
        src: HOTEL_IMAGES.premiumSuite,
        alt: 'Adjacent Living Salon Overlooking Reflective Pool',
        caption: 'Sculpted Limestone Living Salon',
      },
      {
        src: HOTEL_IMAGES.swimmingPool,
        alt: 'Courtyard Infinity Pool Beyond Garden Colonnade',
        caption: 'Travertine Reflection Pool Access',
      },
      {
        src: HOTEL_IMAGES.lobbyHero,
        alt: 'Private Heritage Wing Arrival Colonnade',
        caption: 'Heritage Wing Limestone Gallery',
      },
    ],
  },
  {
    id: 'presidential-suite',
    slug: 'presidential-suite',
    name: 'Presidential Suite',
    category: 'Flagship Residence',
    categoryGroup: 'Suite',
    wing: 'Royal Pavilion Wing',
    sizeSqm: 195,
    maxGuests: 5,
    bedding: 'Master King Residence',
    view: 'Terraced Gardens & Distant Hills',
    ratePerNight: DAILY_STAY_PRICE,
    weeklyPackagePrice: WEEKLY_PACKAGE_PRICE,
    monthlyPackagePrice: MONTHLY_PACKAGE_PRICE,
    availableRooms: 2,
    availability: 'Limited',
    image: HOTEL_IMAGES.presidentialSuite,
    summary:
      'An expansive private residence uniting vaulted ivory marble arches, a formal fireplace salon, artisanal Pakistani textiles, and a panoramic garden terrace.',
    overview:
      'Occupying the crown of the Royal Pavilion Wing, the Presidential Suite blends grand Mughal-inspired marble architecture with residential serenity. Separate living, dining, and dressing salons open onto a private panoramic terrace framed by cypress gardens.',
    features: ['Vaulted Marble Arches', 'Private Garden Terrace', 'Formal Dining Salon'],
    highlights: [
      'Panoramic Terraced Views',
      'Carved Marble Fireplace Salon',
      'Private Butler & Dining Pantry',
      'Chauffeur Arrival Service',
    ],
    gallery: [
      {
        src: HOTEL_IMAGES.presidentialSuite,
        alt: 'Presidential Suite Master Salon with Vaulted Marble Arches',
        caption: 'Master Bedroom & Vaulted Limestone Salon',
      },
      {
        src: HOTEL_IMAGES.heroExterior,
        alt: 'Royal Pavilion Wing Terrace & Courtyard Views',
        caption: 'Private Pavilion Terrace & Reflection Pool',
      },
      {
        src: HOTEL_IMAGES.fineDining,
        alt: 'Private Formal Dining Service in the Presidential Residence',
        caption: 'Formal Private Dining Salon Hospitality',
      },
      {
        src: HOTEL_IMAGES.spaWellness,
        alt: 'Private Hammam & Thermal Suite Privileges',
        caption: 'Marble Thermal Bath & Spa Sanctuary',
      },
    ],
  },
];

/**
 * Step 3 — Full 4-Residence Rooms & Suites Collection (Illustrative Demo Data).
 * Showcases Deluxe Room, Executive Room, Premium Suite, and Presidential Suite.
 */
export const ROOMS_COLLECTION = [
  ROOMS_DATA[0],
  {
    id: 'executive-room',
    slug: 'executive-room',
    name: 'Executive Room',
    category: 'Signature Room',
    categoryGroup: 'Room',
    wing: 'Jaali Courtyard Wing',
    sizeSqm: 68,
    maxGuests: 3,
    bedding: 'Carved Walnut King & Daybed Lounge',
    view: 'Arched Courtyard & Palm Promenade',
    ratePerNight: DAILY_STAY_PRICE,
    weeklyPackagePrice: WEEKLY_PACKAGE_PRICE,
    monthlyPackagePrice: MONTHLY_PACKAGE_PRICE,
    availableRooms: 5,
    availability: 'Available',
    image: HOTEL_IMAGES.executiveRoom,
    summary:
      'Expansive warm-ivory chambers framed by intricate geometric jaali woodwork, champagne-brass reading lamps, and a shaded courtyard daybed alcove.',
    overview:
      'Crafted for discerning solo travelers and couples seeking elevated study and lounge proportions, the Executive Room features bespoke walnut jaali screens, royal burgundy cashmere accents, and sunlit folding doors opening onto serene palm-lined gardens.',
    features: ['Geometric Jaali Screens', 'Courtyard Daybed Alcove', 'Work & Study Salon'],
    highlights: [
      'Hand-Carved Walnut Jaali Partition',
      'Cushioned Courtyard Window Daybed',
      'Rain Shower & Soaking Stone Tub',
      'Complimentary Evening Kahwa Service',
    ],
    gallery: [
      {
        src: HOTEL_IMAGES.executiveRoom,
        alt: 'Executive Room with Walnut Jaali Headboard and Royal Burgundy Throw',
        caption: 'Carved Jaali Headboard & Sunlit Garden Doors',
      },
      {
        src: HOTEL_IMAGES.courtyardPortrait,
        alt: 'Lush Pakistani Courtyard Gardens Outside Executive Room',
        caption: 'Shaded Marble Colonnade Walkway',
      },
      {
        src: HOTEL_IMAGES.swimmingPool,
        alt: 'Travertine Courtyard Pool Steps from Executive Wing',
        caption: 'Morning Light Over Courtyard Pool',
      },
      {
        src: HOTEL_IMAGES.fineDining,
        alt: 'Evening Heritage Dining Privileges',
        caption: 'Diwan Signature Dining Salon',
      },
    ],
  },
  {
    id: 'premium-suite',
    slug: 'premium-suite',
    name: 'Premium Suite',
    category: 'Signature Suite',
    categoryGroup: 'Suite',
    wing: 'Heritage Arch Wing',
    sizeSqm: 124,
    maxGuests: 4,
    bedding: 'Bespoke Canopy King & Separate Living Salon',
    view: 'Reflection Pool & Sculpted Limestone Arches',
    ratePerNight: DAILY_STAY_PRICE,
    weeklyPackagePrice: WEEKLY_PACKAGE_PRICE,
    monthlyPackagePrice: MONTHLY_PACKAGE_PRICE,
    availableRooms: 3,
    availability: 'Available',
    image: HOTEL_IMAGES.premiumSuite,
    summary:
      'Dual-room suite architecture uniting a sunlit rose-beige living salon, scalloped Mughal limestone arches, and sweeping reflection pool views.',
    overview:
      'Separated from the sleeping sanctuary by an intricately carved scalloped limestone arch, the Premium Suite offers a private formal parlor dressed in hand-knotted Lahore carpets, brass lanterns, and soft rose-beige upholstery overlooking the central reflection pool.',
    features: ['Scalloped Limestone Arch', 'Separate Living Parlor', 'Dedicated Butler Service'],
    highlights: [
      'Independent Living & Entertaining Salon',
      'Hand-Knotted Heritage Silk Wool Rug',
      'Panoramic Reflection Pool Windows',
      'Dedicated 24-Hour Butler Service',
    ],
    gallery: [
      {
        src: HOTEL_IMAGES.premiumSuite,
        alt: 'Premium Suite Living Parlor with Scalloped Limestone Archways',
        caption: 'Formal Living Parlor & Scalloped Archway',
      },
      {
        src: HOTEL_IMAGES.executiveSuite,
        alt: 'Bedroom Sanctuary Beyond Carved Archways',
        caption: 'Master Sleeping Alcove & Walnut Joinery',
      },
      {
        src: HOTEL_IMAGES.spaWellness,
        alt: 'Private Spa Sanctuary Access Included with Premium Suite',
        caption: 'Thermal Spa & Travertine Bath',
      },
      {
        src: HOTEL_IMAGES.swimmingPool,
        alt: 'Reflection Pool Terrace View from Premium Suite',
        caption: 'Courtyard Reflection Pool Panorama',
      },
    ],
  },
  ROOMS_DATA[2],
];

/**
 * Combined lookup helper supporting both Rooms & Suites slugs and legacy homepage slugs.
 */
export function getRoomBySlug(slug) {
  const combined = [...ROOMS_COLLECTION, ...ROOMS_DATA];
  return combined.find((item) => item.slug === slug) || ROOMS_COLLECTION[0];
}

export default ROOMS_DATA;
