import { HOTEL_IMAGES } from '@/assets/images';
import { formatCurrency } from '@/utils/formatters';

/**
 * Editable Demo Package Price Configuration (PKR only).
 * Leave numeric rates as null to display "Request a Quote" instead of fabricated prices.
 * Set a numeric PKR amount (e.g. 250000) whenever exact demo pricing is configured.
 */
export const EVENT_PACKAGE_RATES_CONFIG = {
  currency: 'PKR',
  silverPackagePKR: null,
  goldPackagePKR: null,
  signaturePackagePKR: null,
};

export function formatEventPackageRate(numericRate) {
  if (typeof numericRate === 'number' && Number.isFinite(numericRate) && numericRate > 0) {
    return `${formatCurrency(numericRate, 'PKR')} (Demo Rate)`;
  }
  return 'Request a Quote';
}

export const EVENT_CATEGORIES = [
  {
    id: 'pakistani-wedding-events',
    number: '01',
    title: 'Pakistani Wedding Events',
    filterGroup: 'Weddings & Ceremonies',
    setting: 'Multi-Venue Estate Buyout · Nikah & Heritage Ceremonies',
    recommendedVenueId: 'grand-ballroom',
    recommendedPackageId: 'signature-package',
    image: HOTEL_IMAGES.eventsWedding,
    alt: 'Grand Pakistani wedding pavilion adorned with carved arches, cream florals, and brass chandeliers',
    summary:
      'Complete multi-day Pakistani wedding curation uniting sunlit Nikah pavilions, private bridal suites, and heritage hospitality for travelling families.',
    highlights: [
      'Dedicated multi-day wedding concierge and family hospitality suite',
      'Custom architectural floral mandaps, floral walkways, and brass candlelit arches',
      'Coordinated traditional Pakistani dastarkhwan and plated banquet service',
    ],
  },
  {
    id: 'mehndi-celebrations',
    number: '02',
    title: 'Mehndi Celebrations',
    filterGroup: 'Weddings & Ceremonies',
    setting: 'Sandstone Courtyard · Twilight Amphitheater',
    recommendedVenueId: 'outdoor-event-space',
    recommendedPackageId: 'gold-package',
    image: HOTEL_IMAGES.eventMehndiCourtyard,
    alt: 'Pakistani Mehndi courtyard illuminated with amber brass bells, marigold garlands, crimson roses, and carved wooden jhoola swing',
    summary:
      'Vibrant twilight Mehndi evenings framed by carved sandstone arches, hand-strung marigold and motia garlands, artisanal jhoolas, and acoustic dholki lounges.',
    highlights: [
      'Handcrafted walnut jhoola seating dressed with jasmine, marigold, and rose blossoms',
      'Artisanal street-food live chaat, tandoor kebab, and cardamom chai stations',
      'Warm brass lanterns and low takht lounge seating with handloom bolsters',
    ],
  },
  {
    id: 'baraat-walima',
    number: '03',
    title: 'Baraat & Walima',
    filterGroup: 'Weddings & Ceremonies',
    setting: 'Grand Ballroom · Royal Procession Forecourt',
    recommendedVenueId: 'grand-ballroom',
    recommendedPackageId: 'signature-package',
    image: HOTEL_IMAGES.eventGrandBallroom,
    alt: 'Soaring Pakistani hotel ballroom prepared for a royal Baraat and Walima reception with burgundy velvet drapery and crystal chandeliers',
    summary:
      'Monumental Baraat arrivals across the limestone porte-cochere followed by formal Walima receptions beneath crystal chandeliers and burgundy velvet stage drapery.',
    highlights: [
      'Formal Baraat welcome procession with rosewater & motia petal reception',
      'Grand stage framing in warm limestone arches, burgundy velvet, and ivory florals',
      'Multi-course slow-braised Pakistani royal banquet & artisanal mithai dessert gallery',
    ],
  },
  {
    id: 'engagement-ceremonies',
    number: '04',
    title: 'Engagement Ceremonies',
    filterGroup: 'Weddings & Ceremonies',
    setting: 'Luxury Banquet Hall · Marble Salon',
    recommendedVenueId: 'luxury-banquet-hall',
    recommendedPackageId: 'gold-package',
    image: HOTEL_IMAGES.expRomantic,
    alt: 'Candlelit courtyard engagement ceremony setting with champagne gold table linens and rose petals',
    summary:
      'Intimate Mangni and ring ceremonies styled with bespoke floral backdrops, champagne gold tableware, and curated afternoon high tea or dinner banquets.',
    highlights: [
      'Refined centerpiece tablescape with carved brass candleholders and blush roses',
      'Curated Kashmiri kahwa, saffron pastries, and artisanal savory platters',
      'Accommodates intimate 40-guest salons to 180-guest formal engagements',
    ],
  },
  {
    id: 'birthday-celebrations',
    number: '05',
    title: 'Birthday Celebrations',
    filterGroup: 'Social & Family',
    setting: 'Private Celebration Hall · Terrace Lounge',
    recommendedVenueId: 'private-celebration-hall',
    recommendedPackageId: 'silver-package',
    image: HOTEL_IMAGES.diningDesserts,
    alt: 'Bespoke Pakistani hotel pastry table and candlelit celebration dining salon',
    summary:
      'Milestone birthday dinners, surprise rooftop soirees, and family dessert receptions paired with custom patisserie creations from our pastry atelier.',
    highlights: [
      'Bespoke multi-tiered celebratory cake and artisanal confection display',
      'Flexible acoustic music setup, custom floral palette, and ambient candlelighting',
      'Custom children’s lounge or private family dining menu curation',
    ],
  },
  {
    id: 'corporate-events',
    number: '06',
    title: 'Corporate Events',
    filterGroup: 'Corporate & Diplomatic',
    setting: 'Luxury Banquet Hall · Executive Boardrooms',
    recommendedVenueId: 'luxury-banquet-hall',
    recommendedPackageId: 'silver-package',
    image: HOTEL_IMAGES.eventBanquetHall,
    alt: 'Walnut-paneled Pakistani luxury hotel banquet hall styled with executive boardroom tables and banquet round seating',
    summary:
      'Diplomatic luncheons, leadership summits, annual galas, and executive product showcases delivered with discreet security and refined Pakistani hospitality.',
    highlights: [
      'Integrated 4K projection, dual acoustic zoning, and podium lighting control',
      'Executive walnut boardroom seating or formal gala round tables',
      'Curated Pakistani & Continental working luncheons and artisanal tea breaks',
    ],
  },
  {
    id: 'private-parties',
    number: '07',
    title: 'Private Parties',
    filterGroup: 'Social & Family',
    setting: 'Outdoor Event Space · Candlelit Courtyard',
    recommendedVenueId: 'private-celebration-hall',
    recommendedPackageId: 'gold-package',
    image: HOTEL_IMAGES.expCultural,
    alt: 'Private evening lounge salon with acoustic strings and candlelit courtyard atmosphere',
    summary:
      'Private anniversary evenings, qawwali & acoustic sitar nights, and invitation-only suppers tailored to hosts seeking discretion and bespoke service.',
    highlights: [
      'Private entrance access and dedicated butler brigade throughout the evening',
      'Curated acoustic rabab, sitar, or classical ensemble staging options',
      'Bespoke zero-proof botanical elixirs and signature mocktail bar curation',
    ],
  },
  {
    id: 'family-gatherings',
    number: '08',
    title: 'Family Gatherings',
    filterGroup: 'Social & Family',
    setting: 'Private Celebration Hall · Sunlit Dastarkhwan',
    recommendedVenueId: 'private-celebration-hall',
    recommendedPackageId: 'silver-package',
    image: HOTEL_IMAGES.diningFamily,
    alt: 'Multi-generational family dining table served in a warm limestone architectural salon',
    summary:
      'Eid dawats, golden anniversary luncheons, and multi-generational family reunions centered around generous shared-platter dining and unhurried comfort.',
    highlights: [
      'Abundant traditional dum pukht, seekh platters, and seasonal desserts shared family-style',
      'Step-free salon access and private prayer & elder lounge facilities nearby',
      'Warm attentive pacing designed for unhurried conversation across generations',
    ],
  },
];

export const EVENT_VENUES = [
  {
    id: 'grand-ballroom',
    name: 'Grand Ballroom',
    tagline: 'Monumental Carved Limestone & Chandelier Pavilion',
    idealFor: 'Baraat, Walima Receptions & Royal Wedding Galas',
    capacityRange: '250 – 650 Guests (Illustrative)',
    areaSqFt: '11,400 sq ft · Column-Free',
    seatingModes: [
      { label: 'Banquet Rounds', value: 'Up to 500' },
      { label: 'Theatre Seating', value: 'Up to 650' },
      { label: 'Stage & Lounge', value: '420 Guests' },
    ],
    image: HOTEL_IMAGES.eventGrandBallroom,
    alt: 'Grand Ballroom at The Montage Signature Hotel styled for a luxury Baraat and Walima banquet',
    gallery: [
      {
        src: HOTEL_IMAGES.eventGrandBallroom,
        caption: 'Grand Ballroom full banquet layout with crystal chandeliers and burgundy stage drapery',
      },
      {
        src: HOTEL_IMAGES.eventsWedding,
        caption: 'Daytime floral mandap and sunlit sandstone reception framing',
      },
      {
        src: HOTEL_IMAGES.lobbyHero,
        caption: 'Private pre-function marble foyer for Barat welcome & guest arrival',
      },
    ],
    description:
      'Our flagship celebration hall unites soaring 26-foot carved limestone arches, hand-cut Mughal jaali screens, bespoke crystal chandeliers, and a dedicated private bridal preparation wing.',
    amenities: [
      'Direct private bridal suite and family holding salon entrance',
      'Acoustic ceiling baffling with architectural champagne pin-spot rigging',
      'Pre-function travertine promenade for formal reception welcome',
    ],
  },
  {
    id: 'luxury-banquet-hall',
    name: 'Luxury Banquet Hall',
    tagline: 'Walnut Paneling & Champagne Brass Salon',
    idealFor: 'Corporate Summits, Engagement Ceremonies & Diplomatic Banquets',
    capacityRange: '80 – 260 Guests (Illustrative)',
    areaSqFt: '5,200 sq ft · Divisible Salon',
    seatingModes: [
      { label: 'Formal Banquet', value: '180 Guests' },
      { label: 'Executive Summit', value: '220 Guests' },
      { label: 'Reception Flow', value: '260 Guests' },
    ],
    image: HOTEL_IMAGES.eventBanquetHall,
    alt: 'Luxury Banquet Hall featuring walnut geometric wood paneling, brass sconces, and burgundy velvet seating',
    gallery: [
      {
        src: HOTEL_IMAGES.eventBanquetHall,
        caption: 'Dual banquet and executive conference styling inside Luxury Banquet Hall',
      },
      {
        src: HOTEL_IMAGES.fineDining,
        caption: 'Fine Pakistani dinner table styling for diplomatic & engagement banquets',
      },
      {
        src: HOTEL_IMAGES.diningChai,
        caption: 'Artisanal Kashmiri kahwa and patisserie lounge interval service',
      },
    ],
    description:
      'Anchored by Pakistani walnut joinery with brass geometric inlay and soaring stone pilasters, this refined banquet hall transitions seamlessly between formal Mangni dinners and executive conferences.',
    amenities: [
      'Divisible acoustic walnut partitions for dual plenary or breakout sessions',
      'Concealed 4K dual projection screens and warm dimmed cove lighting',
      'Dedicated foyer espresso, kahwa, and executive refreshment gallery',
    ],
  },
  {
    id: 'outdoor-event-space',
    name: 'Outdoor Event Space',
    tagline: 'Sandstone Colonnade & Reflection Basin Terrace',
    idealFor: 'Mehndi Nights, Sunset Nikah & Starlit Garden Receptions',
    capacityRange: '120 – 400 Guests (Illustrative)',
    areaSqFt: '9,800 sq ft · Open-Air Terrace',
    seatingModes: [
      { label: 'Mehndi Takht Lounge', value: '300 Guests' },
      { label: 'Open Banquet', value: '350 Guests' },
      { label: 'Cocktail Reception', value: '400 Guests' },
    ],
    image: HOTEL_IMAGES.eventOutdoorLawn,
    alt: 'Outdoor sandstone colonnade terrace with brass lanterns, floral urns, and mirror reflection basin at sunset',
    gallery: [
      {
        src: HOTEL_IMAGES.eventOutdoorLawn,
        caption: 'Sunset colonnade overlooking the tranquil reflection basin',
      },
      {
        src: HOTEL_IMAGES.eventMehndiCourtyard,
        caption: 'Twilight Mehndi setup with marigold garlands, brass bells, and carved jhoola',
      },
      {
        src: HOTEL_IMAGES.expGardenOutdoor,
        caption: 'Daylight Nikah promenade along carved travertine arches',
      },
    ],
    description:
      'Framed by carved sandstone arches around a quiet travertine reflection basin, our open-air terrace captures golden Pakistani twilight for floral Mehndis, sunlit Nikahs, and moonlit suppers.',
    amenities: [
      'Complimentary weather-contingency transition plan to covered pavilion',
      'Architectural warm amber lantern and jasmine-arch rigging infrastructure',
      'Dedicated live tandoor, chaat, and qehwa culinary pavilion stations',
    ],
  },
  {
    id: 'private-celebration-hall',
    name: 'Private Celebration Hall',
    tagline: 'Intimate Residence Salon for Discreet Gatherings',
    idealFor: 'Family Gatherings, Birthday Dinners & Private Parties',
    capacityRange: '24 – 90 Guests (Illustrative)',
    areaSqFt: '2,400 sq ft · Private Wing',
    seatingModes: [
      { label: 'Long Imperial Table', value: '42 Guests' },
      { label: 'Intimate Rounds', value: '70 Guests' },
      { label: 'Salon Cocktail', value: '90 Guests' },
    ],
    image: HOTEL_IMAGES.diningPrivate,
    alt: 'Intimate candlelit private celebration dining room with carved wooden screen and champagne gold accents',
    gallery: [
      {
        src: HOTEL_IMAGES.diningPrivate,
        caption: 'Private Celebration Hall styled for intimate family dinners and birthdays',
      },
      {
        src: HOTEL_IMAGES.diningFamily,
        caption: 'Sunlit multi-generational dastarkhwan dining arrangement',
      },
      {
        src: HOTEL_IMAGES.expRomantic,
        caption: 'Private courtyard candlelit setup for milestone anniversaries',
      },
    ],
    description:
      'Designed like the dining hall of an aristocratic Pakistani residence, complete with carved privacy jaali, dedicated butler pantry, and direct courtyard terrace doors for unhurried family evenings.',
    amenities: [
      'Discreet private arrival corridor separated from main hotel lobby',
      'Customizable lighting scenes from sunlit luncheon to intimate candlelight',
      'Dedicated chef-carved tasting or traditional shared dastarkhwan service',
    ],
  },
];

export const EVENT_PACKAGES = [
  {
    id: 'silver-package',
    name: 'Silver Package',
    tierLabel: 'Essential Celebration Tier',
    numericRatePKR: EVENT_PACKAGE_RATES_CONFIG.silverPackagePKR,
    recommendedFor: 'Birthday Celebrations, Family Gatherings & Daytime Corporate Summits',
    featured: false,
    summary:
      'Thoughtfully composed five-star hospitality foundation covering venue styling, signature Pakistani luncheon or dinner service, and attentive event captain coordination.',
    inclusions: [
      '6-hour private access to Private Celebration Hall or Luxury Banquet Hall',
      'Classic cream-linen & burgundy runner tablescape with warm floral centerpieces',
      'Curated 3-course Pakistani banquet menu or corporate working lunch buffet',
      'Welcome rose-cardamom sherbet, Kashmiri kahwa, and artisanal tea interval service',
      'Standard warm architectural uplighting and podium acoustic audio support',
    ],
  },
  {
    id: 'gold-package',
    name: 'Gold Package',
    tierLabel: 'Signature Hospitality Tier',
    numericRatePKR: EVENT_PACKAGE_RATES_CONFIG.goldPackagePKR,
    recommendedFor: 'Mehndi Celebrations, Engagement Ceremonies & Private Parties',
    featured: true,
    summary:
      'Elevated ceremonial presentation combining bespoke seasonal floral architecture, live specialty culinary stations, dedicated guest arrival stewardship, and private hospitality rooms.',
    inclusions: [
      'Full evening exclusivity across Luxury Banquet Hall or Outdoor Event Space',
      'Custom fresh jasmine, rose, or marigold floral backdrop & stage lounge seating',
      'Expanded 5-course royal Pakistani & Continental dining + 2 live chef stations',
      'Dedicated family hospitality suite with butler refresh service throughout',
      'Architectural pin-spot chandelier & courtyard brass lantern illumination design',
    ],
  },
  {
    id: 'signature-package',
    name: 'Signature Package',
    tierLabel: 'Royal Estate Curation',
    numericRatePKR: EVENT_PACKAGE_RATES_CONFIG.signaturePackagePKR,
    recommendedFor: 'Pakistani Wedding Events, Baraat & Walima Receptions',
    featured: false,
    summary:
      'Complete palace-hotel orchestration crafted by our Lead Wedding Director—integrating Grand Ballroom architecture, royal dastarkhwan banquets, and overnight bridal sanctuary stays.',
    inclusions: [
      'Full-day & evening Grand Ballroom plus Marble Welcome Foyer exclusivity',
      'Bespoke sculptural floral pavilion, burgundy velvet drapery & candelabra styling',
      '7-course royal feast featuring slow-cooked dum specialties & custom mithai gallery',
      'Overnight complimentary Presidential or Premium Suite stay preparation (Demo)',
      'Dedicated Wedding Director, VIP arrival valet protocol & private tasting preview',
    ],
  },
];
