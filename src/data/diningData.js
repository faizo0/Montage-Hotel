import { HOTEL_IMAGES } from '@/assets/images';

/**
 * Step 4 — Illustrative Pakistani & International Culinary Demo Data
 * for The Montage Signature Hotel Dining & Restaurants experience.
 */
export const DINING_EXPERIENCES = [
  {
    id: 'pakistani-fine-dining',
    title: 'Pakistani Fine Dining',
    venue: 'Diwan Heritage Salon',
    serviceHours: 'Dinner · 7:00 PM – 11:30 PM (Demo Hours)',
    summary:
      'Slow-simmered heritage recipes from Lahore, Multan, and Peshawar elevated with saffron infusions, clay-hearth breads, and table-side copper handi service beneath carved limestone arches.',
    highlights: ['Copper Handi Presentation', 'Wood-Fired Tandoori Breads', 'Candlelit Arched Salon'],
    image: HOTEL_IMAGES.diningFeast,
    alt: 'Pakistani Fine Dining Copper Handi Mutton Kunna and Saffron Rice under Arches',
  },
  {
    id: 'international-cuisine',
    title: 'International Cuisine',
    venue: 'The Courtyard Conservatory',
    serviceHours: 'Lunch & Dinner · 12:30 PM – 11:00 PM (Demo Hours)',
    summary:
      'Contemporary seasonal seafood, prime wood-grilled cuts, and crisp botanical plates crafted with artisanal technique and warm Pakistani hospitality.',
    highlights: ['Seared Coastal Catch', 'Prime Charcoal Cuts', 'Garden Herb Reductions'],
    image: HOTEL_IMAGES.diningInternational,
    alt: 'International Fine Dining Seared Wild Sea Bass in Luxury Hotel Dining Room',
  },
  {
    id: 'traditional-breakfast',
    title: 'Traditional Breakfast',
    venue: 'Jaali Courtyard Terrace',
    serviceHours: 'Morning · 6:30 AM – 10:45 AM (Demo Hours)',
    summary:
      'Unhurried morning hospitality featuring crisp hand-layered laccha parathas, heirloom herb omelettes, wildflower honey, pistachio cream, and freshly brewed spiced chai in dappled sunlight.',
    highlights: ['Flaky Artisanal Parathas', 'Courtyard Morning Light', 'Orchard Figs & Honeycomb'],
    image: HOTEL_IMAGES.diningBreakfast,
    alt: 'Traditional Pakistani Luxury Breakfast with Laccha Paratha and Fine Bone China',
  },
  {
    id: 'signature-desserts',
    title: 'Signature Desserts',
    venue: 'Saffron & Rose Patisserie',
    serviceHours: 'All Day · 11:00 AM – 11:30 PM (Demo Hours)',
    summary:
      'Delicate saffron-steeped shahi tukray crowned with crushed pistachios, aromatic rose petals, and warm spiced orchard figs plated on hand-painted ivory porcelain.',
    highlights: ['Saffron & Cardamom Cream', 'Gilded Shahi Tukray', 'Rosewater Confections'],
    image: HOTEL_IMAGES.diningDesserts,
    alt: 'Pakistani Signature Saffron Shahi Tukray and Poached Figs on Ivory Porcelain',
  },
  {
    id: 'tea-coffee-experience',
    title: 'Elegant Tea & Coffee Experience',
    venue: 'The Samovar & Jaali Lounge',
    serviceHours: 'Afternoon & Evening · 3:00 PM – 10:30 PM (Demo Hours)',
    summary:
      'Engraved brass pots pouring velvety pink Kashmiri chai and cardamom-scented Peshawari kahwa alongside single-origin espresso, warm walnut baklava, and stuffed dates.',
    highlights: ['Pink Kashmiri Chai', 'Spiced Peshawari Kahwa', 'Artisanal Baklava & Dates'],
    image: HOTEL_IMAGES.diningChai,
    alt: 'Engraved Brass Pots Pouring Kashmiri Chai and Kahwa in Carved Timber Lounge',
  },
];

export const SIGNATURE_DISHES = [
  {
    id: 'shahi-mutton-kunna',
    name: 'Shahi Mutton Kunna & Saffron Basmati',
    category: 'Pakistani Fine Dining',
    description:
      'Twelve-hour slow-braised lamb shank simmered in toasted cumin and black cardamom gravy, served in hammered copper with fragrant aged basmati.',
    demoPrice: 4400,
    image: HOTEL_IMAGES.diningFeast,
    alt: 'Shahi Mutton Kunna in Hammered Copper Handi with Saffron Rice',
  },
  {
    id: 'seared-sea-bass',
    name: 'Crisp Wild Sea Bass & Saffron Fennel Jus',
    category: 'International Cuisine',
    description:
      'Line-caught sea bass roasted to golden crispness over velvety saffron fennel puree, baby heirloom carrots, and warm citrus reduction.',
    demoPrice: 4800,
    image: HOTEL_IMAGES.diningInternational,
    alt: 'Crisp Wild Sea Bass Fillet over Saffron Fennel Puree on Ivory Stoneware',
  },
  {
    id: 'courtyard-laccha-breakfast',
    name: 'Heritage Courtyard Paratha & Chai Service',
    category: 'Traditional Breakfast',
    description:
      'Crisp clarified-butter laccha paratha paired with garden-herb omelette, pistachio malai, raw honeycomb, figs, and steaming bone-china chai.',
    demoPrice: 2800,
    image: HOTEL_IMAGES.diningBreakfast,
    alt: 'Laccha Paratha Breakfast Spread with Pistachio Cream and Fresh Figs',
  },
  {
    id: 'saffron-shahi-tukray',
    name: 'Gilded Saffron Shahi Tukray & Poached Figs',
    category: 'Signature Desserts',
    description:
      'Brioche crisped in saffron-infused syrup beneath whipped cardamom rabri, crushed Iranian pistachios, damask rose petals, and star-anise poached figs.',
    demoPrice: 2400,
    image: HOTEL_IMAGES.diningDesserts,
    alt: 'Saffron Shahi Tukray with Crushed Pistachios and Rose Petals',
  },
  {
    id: 'kashmiri-chai-flight',
    name: 'Pink Kashmiri Chai & Walnut Baklava Service',
    category: 'Tea & Coffee',
    description:
      'Ceremonial pour of sea-salted almond Kashmiri chai and golden cardamom kahwa served beside warm honeyed walnut pastries and Medjool dates.',
    demoPrice: 2200,
    image: HOTEL_IMAGES.diningChai,
    alt: 'Brass Teapots Pouring Pink Kashmiri Chai and Cardamom Kahwa',
  },
  {
    id: 'diwan-evening-tasting',
    name: 'Diwan Grand Family Feast Experience',
    category: 'Pakistani Fine Dining',
    description:
      'Curated multi-course evening table showcase uniting smoky charcoal boti, hand-pounded seekh, garlic taftan, and saffron desserts for shared dining.',
    demoPrice: 6500,
    image: HOTEL_IMAGES.fineDining,
    alt: 'Diwan Evening Table Service Beneath Illuminated Limestone Arches',
  },
];

export const RESTAURANT_ATMOSPHERE = [
  {
    id: 'elegant-interiors',
    title: 'Elegant Restaurant Interiors',
    caption: 'Sculpted Limestone Arches & Jaali Work',
    description:
      'High vaulted ceilings, intricate stone filigree, and hand-rubbed walnut screens filter daylight by afternoon and warm candlelight by night.',
    image: HOTEL_IMAGES.fineDining,
  },
  {
    id: 'dining-tables',
    title: 'Beautiful Dining Tables',
    caption: 'Hand-Hammered Copper, Brass & Ivory Linen',
    description:
      'Every setting is dressed in tactile ivory linen, custom stoneware, brushed brass flatware, and delicate glass tapers.',
    image: HOTEL_IMAGES.diningFeast,
  },
  {
    id: 'evening-ambience',
    title: 'Warm Evening Ambience',
    caption: 'Lantern-Lit Colonnades & Acoustic Calm',
    description:
      'As dusk settles across the courtyard, brass lanterns and softly lit stone niches compose an unhurried, intimate evening mood.',
    image: HOTEL_IMAGES.diningChai,
  },
  {
    id: 'family-dining-atmosphere',
    title: 'Family Dining Atmosphere',
    caption: 'Joyful Courtyard Banquets & Generous Tables',
    description:
      'Thoughtfully spaced round walnut tables around sunlit courtyard fountains welcome multi-generational family dinners with warm table-side service.',
    image: HOTEL_IMAGES.diningFamily,
  },
  {
    id: 'private-dining-experience',
    title: 'Premium Private Dining Experience',
    caption: 'Intimate Salons for Gatherings of 6 to 18',
    description:
      'Dedicated private dining alcoves accommodate celebratory family banquets and diplomatic evenings with tailored multi-course menus and private service.',
    image: HOTEL_IMAGES.diningPrivate,
  },
];

export const DINING_VENUES = [
  'Diwan Heritage Salon (Pakistani Fine Dining)',
  'The Courtyard Conservatory (International Cuisine)',
  'Jaali Courtyard Terrace (Traditional Breakfast)',
  'The Samovar & Jaali Lounge (Tea, Coffee & Desserts)',
  'Private Family Dining Alcove',
];

export default DINING_EXPERIENCES;
