import { HOTEL_IMAGES } from '@/assets/images';

/**
 * Step 5 — Illustrative Spa & Wellness Demo Data
 * Showcases six distinct wellness pillars for The Montage Signature Hotel.
 * All facilities, durations, inclusions, and prices are illustrative demo data.
 */
export const WELLNESS_EXPERIENCES = [
  {
    id: 'signature-spa-treatments',
    title: 'Signature Spa Treatments',
    categoryGroup: 'Spa & Massage',
    subtitle: 'Royal Hammam & Damask Rose Ritual',
    wing: 'Marble Thermal Wing',
    demoDuration: '90 mins (Demo Duration)',
    demoPrice: 19500,
    description:
      'A restorative bathing and mineral clay ritual conducted on heated travertine marble beneath carved limestone arches, finishing with rosewater anointing oils.',
    overview:
      'Inspired by historic South Asian bathing architecture, our signature demo treatment pairs gentle mineral exfoliation with warmed botanical compresses, calming muscular tension while nourishing skin beneath dappled courtyard light.',
    highlights: [
      'Heated Travertine Exfoliation',
      'Damask Rose & Saffron Balm',
      'Herbal Steam Preparation',
      'Saffron Kahwa Post-Ritual Service',
    ],
    image: HOTEL_IMAGES.spaWellness,
    alt: 'The Marble Hammam Thermal Sanctuary Beneath Carved Limestone Arches',
  },
  {
    id: 'relaxation-massage-experiences',
    title: 'Relaxation & Massage Experiences',
    categoryGroup: 'Spa & Massage',
    subtitle: 'Warm Stone & Saffron Botanical Massage',
    wing: 'Quiet Treatment Chambers',
    demoDuration: '75 mins (Demo Duration)',
    demoPrice: 16500,
    description:
      'Unhurried full-body rhythmic massage blending warmed river stones, hand-pressed almond and saffron infusions, and bespoke pressure alignment.',
    overview:
      'Inside candlelit walnut-screened chambers, slow rhythmic strokes ease travel fatigue and restore quiet balance, framed by subtle rose aromatics and unhurried acoustic serenity.',
    highlights: [
      'Warm Botanical Infusion Oils',
      'Smooth Heated River Stones',
      'Neck, Shoulder & Foot Focus',
      'Private Post-Massage Repose',
    ],
    image: HOTEL_IMAGES.spaMassage,
    alt: 'Candlelit Pakistani Spa Treatment Suite with Carved Walnut Jaali Screens',
  },
  {
    id: 'luxury-pool-experience',
    title: 'Luxury Pool Experience',
    categoryGroup: 'Pool & Thermal',
    subtitle: 'Sunlit Travertine Infinity Pool',
    wing: 'Central Garden Colonnade',
    demoDuration: 'Full-Day Access (Demo)',
    demoPrice: 8500,
    description:
      'Long tranquil laps and shaded limestone colonnade lounging beside calm courtyard waters, framed by architectural arches and warm afternoon sun.',
    overview:
      'Temperature-tempered courtyard waters invite peaceful morning swims and unhurried poolside reading with chilled rose-mint refreshments and attentive cabana service.',
    highlights: [
      'Heated Travertine Infinity Basin',
      'Shaded Limestone Loungers',
      'Chilled Rose & Citrus Infusions',
      'Plush Ivory Towel Service',
    ],
    image: HOTEL_IMAGES.swimmingPool,
    alt: 'Sunlit Travertine Infinity Swimming Pool Framed by Arched Colonnades',
  },
  {
    id: 'sauna-steam-rooms',
    title: 'Sauna & Steam Rooms',
    categoryGroup: 'Pool & Thermal',
    subtitle: 'Cedarwood Sauna & Marble Steam Circuit',
    wing: 'Hydro-Thermal Gallery',
    demoDuration: '60 mins (Demo Duration)',
    demoPrice: 9500,
    description:
      'Alternating warmth between handcrafted aromatic cedarwood sauna cabins and eucalyptus-infused marble steam vaults with cool brass splash basins.',
    overview:
      'Designed as a gentle cleansing circuit prior to massage or afternoon rest, alternating radiant timber heat and soft herbal steam to encourage deep respiratory clarity.',
    highlights: [
      'Handcrafted Cedarwood Sauna',
      'Aromatic Limestone Steam Vault',
      'Cold Hammered Brass Refresh Basins',
      'Quiet Contrast Recovery',
    ],
    image: HOTEL_IMAGES.spaSteam,
    alt: 'Travertine Marble Steam Room and Aromatic Cedarwood Sauna Sanctuary',
  },
  {
    id: 'wellness-lounge',
    title: 'Wellness Lounge',
    categoryGroup: 'Lounge & Private Suites',
    subtitle: 'Jaali Daybed & Botanical Tea Salon',
    wing: 'Sunlit East Loggia',
    demoDuration: '90 mins (Demo Duration)',
    demoPrice: 6500,
    description:
      'Cushioned ivory daybeds tucked beside carved limestone latticework filtering morning light, accompanied by hammered brass pots of Kashmiri herbal infusions.',
    overview:
      'An unhurried sanctuary before or following treatments where guests linger over saffron kahwa, warm spiced dates, and quiet sunlit reading.',
    highlights: [
      'Ergonomic Ivory Linen Daybeds',
      'Carved Limestone Jaali Light Screens',
      'Seasonal Botanical Infusions',
      'Quiet Reading Alcove',
    ],
    image: HOTEL_IMAGES.spaLounge,
    alt: 'Serene Wellness Lounge with Ivory Daybeds and Carved Stone Jaali Screens',
  },
  {
    id: 'private-relaxation-suites',
    title: 'Private Relaxation Suites',
    categoryGroup: 'Lounge & Private Suites',
    subtitle: 'Vaulted Mughal Hydro-Bath Suite',
    wing: 'Royal Sanctuary Pavilion',
    demoDuration: '120 mins (Demo Duration)',
    demoPrice: 34000,
    description:
      'An exclusive sanctuary featuring a sunken carved travertine soaking bath scattered with rose petals beneath vaulted frescoed arches and garden views.',
    overview:
      'Reserved exclusively for solo stillness or couples, each private relaxation suite unites a warm floral soaking ritual, dual heated treatment beds, cashmere robes, and private tea service.',
    highlights: [
      'Sunken Carved Travertine Soaking Bath',
      'Dedicated Private Dressing Salon',
      'Duo Treatment & Hydro Experience',
      'Private Brass Tea & Fruit Pairing',
    ],
    image: HOTEL_IMAGES.spaPrivateSuite,
    alt: 'Private Relaxation Suite with Sunken Travertine Rose-Petal Bath Under Vaulted Arches',
  },
];

export default WELLNESS_EXPERIENCES;
