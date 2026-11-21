import { HOTEL_IMAGES } from '@/assets/images';
import { PUBLIC_ROUTES } from '@/routes/routePaths';

export const EXPERIENCES_DATA = [
  {
    id: 'fine-dining',
    title: 'Fine Dining',
    subtitle: 'Diwan Signature Dining',
    category: 'Pakistani Culinary Heritage',
    schedule: 'Lunch & Dinner',
    location: 'Arched Courtyard Wing',
    image: HOTEL_IMAGES.fineDining,
    summary:
      'Elevated Pakistani and international cuisine served beneath carved stone arches with artisanal brass tableware and warm hospitality.',
    ctaLabel: 'Explore Dining',
    route: PUBLIC_ROUTES.DINING,
  },
  {
    id: 'spa-wellness',
    title: 'Spa & Wellness',
    subtitle: 'The Marble Hammam & Sanctuary',
    category: 'Restorative Wellness',
    schedule: 'Daily Sanctuary Hours',
    location: 'Jaali Colonnade Level',
    image: HOTEL_IMAGES.spaWellness,
    summary:
      'Dappled sunlight through carved jaali screens illuminates tranquil thermal waters, organic botanical rituals, and private relaxation suites.',
    ctaLabel: 'Explore Spa',
    route: PUBLIC_ROUTES.SPA,
  },
  {
    id: 'swimming-pool',
    title: 'Swimming Pool',
    subtitle: 'Travertine Infinity Pavilion',
    category: 'Outdoor Retreat',
    schedule: 'Morning to Dusk',
    location: 'Terraced Gardens',
    image: HOTEL_IMAGES.swimmingPool,
    summary:
      'An expansive sunlit stone deck bordered by shaded Mughal-inspired pavilions, manicured palms, and serene mountain-framed waters.',
    ctaLabel: 'Explore Experiences',
    route: PUBLIC_ROUTES.EXPERIENCES,
  },
  {
    id: 'events-celebrations',
    title: 'Events & Celebrations',
    subtitle: 'The Grand Celebration Pavilion',
    category: 'Weddings & Banquets',
    schedule: 'Private Reservations',
    location: 'Garden Ballroom Wing',
    image: HOTEL_IMAGES.eventsWedding,
    summary:
      'Soaring arched halls tailored for grand Pakistani weddings, formal banquets, and cultural celebrations adorned with fresh jasmine and roses.',
    ctaLabel: 'Explore Events',
    route: PUBLIC_ROUTES.EVENTS,
  },
];

/**
 * Step 6 — Eight Curated Luxury Experiences & Activities (Illustrative Demo Data).
 * Authentic Pakistan-inspired cultural, culinary, family, romantic, leisure,
 * garden, celebration, and local discovery offerings.
 */
export const CURATED_EXPERIENCES = [
  {
    id: 'pakistani-cultural-experiences',
    title: 'Pakistani Cultural Experiences',
    subtitle: 'Calligraphy, Brass Craft & Acoustic Evening',
    category: 'Pakistani Cultural Heritage',
    filterGroup: 'Culture & Heritage',
    demoDuration: '2.5 Hours (Demo Duration)',
    location: 'Jaali Courtyard Sanctuary',
    image: HOTEL_IMAGES.expCultural,
    alt: 'Master Pakistani Calligrapher and Acoustic String Musicians Under Lit Courtyard Arches',
    description:
      'Engage with master calligraphy artisans and acoustic sitar performers beneath lantern-lit limestone arches, celebrating centuries of regional poetic and artisanal craft.',
    overview:
      'Set beside warm travertine columns as evening light softens across the courtyard, guests are welcomed into an intimate cultural salon featuring live classical instrumental music, traditional brassware craftsmanship, and hand-inked Urdu calligraphy keepsakes. Presented as an illustrative demo experience.',
    highlights: [
      'Private calligraphy demonstration by resident artisans',
      'Live acoustic classical stringed melodies at twilight',
      'Curated Kashmiri kahwa and traditional dates service',
      'Personalized hand-lettered parchment keepsake (Demo)',
    ],
    itinerary: [
      {
        stepTime: '05:30 PM',
        stepTitle: 'Courtyard Welcome & Spiced Kahwa',
        detail: 'Arrival in the carved walnut gallery with warm saffron-cardamom tea service.',
      },
      {
        stepTime: '06:00 PM',
        stepTitle: 'Classical Calligraphy Workshop',
        detail: 'Guided exploration of Nastaliq reed-pen strokes with handcrafted ink.',
      },
      {
        stepTime: '07:00 PM',
        stepTitle: 'Twilight Acoustic Soiree',
        detail: 'Live acoustic ragas beneath illuminated stone arches.',
      },
    ],
    gallery: [
      {
        src: HOTEL_IMAGES.expCultural,
        alt: 'Master Artisan Demonstrating Calligraphy in Lit Courtyard',
        caption: 'Calligraphy Salon & Acoustic Instruments',
      },
      {
        src: HOTEL_IMAGES.lobbyHero,
        alt: 'Grand Carved Stone Colonnade Arrival',
        caption: 'Limestone Colonnade Reception',
      },
      {
        src: HOTEL_IMAGES.diningChai,
        alt: 'Traditional Kashmiri Chai & Baklava Refreshments',
        caption: 'Artisanal Chai & Baklava Pairing',
      },
    ],
    relatedIds: ['curated-local-discoveries', 'private-dining-experience'],
  },
  {
    id: 'luxury-leisure-experiences',
    title: 'Luxury Leisure Experiences',
    subtitle: 'Travertine Pool Cabanas & Afternoon Repose',
    category: 'Luxury Leisure',
    filterGroup: 'Outdoors & Leisure',
    demoDuration: 'Half-Day Retreat (Demo)',
    location: 'Travertine Infinity Pavilion',
    image: HOTEL_IMAGES.swimmingPool,
    alt: 'Sunlit Travertine Infinity Swimming Pool Framed by Arched Stone Pavilions',
    description:
      'An unhurried rhythm of shaded poolside cabanas, warm mineral swims, and chilled botanical refreshments curated for complete architectural calm.',
    overview:
      'Designed around still reflective waters bordered by carved sandstone arches and courtyard palms, our leisure program pairs unhurried poolside sanctuary access with afternoon patisserie and attentive butler service. Presented as an illustrative demo experience.',
    highlights: [
      'Reserved shaded linen poolside cabana',
      'Chilled rose-mint and citrus cordial service',
      'Warm ivory cotton robe and towel service',
      'Optional transition to thermal spa relaxation lounge',
    ],
    itinerary: [
      {
        stepTime: '11:00 AM',
        stepTitle: 'Cabana Arrival & Refreshments',
        detail: 'Cool botanical towels and seasonal orchard fruit platter poolside.',
      },
      {
        stepTime: '12:30 PM',
        stepTitle: 'Infinity Pool & Sunlit Terrace Rest',
        detail: 'Unhurried swimming and reading beneath arched colonnades.',
      },
      {
        stepTime: '03:30 PM',
        stepTitle: 'Afternoon Tea & Confections',
        detail: 'Freshly brewed Assam or Kashmiri chai served beside the water.',
      },
    ],
    gallery: [
      {
        src: HOTEL_IMAGES.swimmingPool,
        alt: 'Sunlit Travertine Swimming Pool & Courtyard Arches',
        caption: 'Travertine Pool Pavilion',
      },
      {
        src: HOTEL_IMAGES.spaLounge,
        alt: 'Quiet Jaali Relaxation Lounge with Ivory Daybeds',
        caption: 'Sunlit Jaali Lounging Sanctuary',
      },
      {
        src: HOTEL_IMAGES.spaWellness,
        alt: 'Adjacent Marble Thermal Sanctuary',
        caption: 'Marble Thermal Waters',
      },
    ],
    relatedIds: ['garden-outdoor-experiences', 'romantic-occasion-setups'],
  },
  {
    id: 'private-dining-experience',
    title: 'Private Dining',
    subtitle: 'Candlelit Arched Alcove Supper',
    category: 'Private Culinary',
    filterGroup: 'Culinary & Romance',
    demoDuration: '3 Hours (Demo Duration)',
    location: 'Private Arched Dining Salon',
    image: HOTEL_IMAGES.diningPrivate,
    alt: 'Candlelit Private Dining Room Dressed in Cream Linen & Royal Burgundy Blooms',
    description:
      'Intimate multi-course tasting evenings hosted inside sculptural marble salons illuminated by glowing brass lanterns and dedicated culinary hosts.',
    overview:
      'Ideal for private diplomatic dinners, milestone anniversaries, or intimate family suppers, guests dine exclusively within our candlelit carved archways with customized Pakistani or international tasting menus. Presented as an illustrative demo experience.',
    highlights: [
      'Exclusive private marble salon reservation',
      'Custom-printed seasonal tasting menu',
      'Dedicated table-side butler and chef consultation',
      'Royal burgundy floral and lantern table styling',
    ],
    itinerary: [
      {
        stepTime: '07:30 PM',
        stepTitle: 'Candlelit Salon Reception',
        detail: 'Welcome sparkling saffron infusion in the private dining ante-room.',
      },
      {
        stepTime: '08:00 PM',
        stepTitle: 'Multi-Course Culinary Service',
        detail: 'Four curated courses blending slow-cooked Pakistani classics and refined plates.',
      },
      {
        stepTime: '09:45 PM',
        stepTitle: 'Gilded Dessert & Digestive Chai',
        detail: 'Saffron shahi tukray served beside artisanal kahwa.',
      },
    ],
    gallery: [
      {
        src: HOTEL_IMAGES.diningPrivate,
        alt: 'Private Dining Salon with Carved Stone Arches & Lanterns',
        caption: 'Private Arched Dining Room',
      },
      {
        src: HOTEL_IMAGES.diningFeast,
        alt: 'Copper Handi Culinary Presentation',
        caption: 'Heritage Copper Service',
      },
      {
        src: HOTEL_IMAGES.diningDesserts,
        alt: 'Gilded Saffron Shahi Tukray Dessert Course',
        caption: 'Artisanal Saffron Dessert',
      },
    ],
    relatedIds: ['romantic-occasion-setups', 'family-experiences'],
  },
  {
    id: 'family-experiences',
    title: 'Family Experiences',
    subtitle: 'Courtyard Fountain Family Supper',
    category: 'Family Gatherings',
    filterGroup: 'Family & Celebrations',
    demoDuration: 'Evening Gathering (Demo)',
    location: 'Fountain Courtyard',
    image: HOTEL_IMAGES.diningFamily,
    alt: 'Multi-Generational Family Seated Around Carved Walnut Courtyard Table at Dusk',
    description:
      'Generous round courtyard tables beside glowing stone fountains crafted for joyful multi-generational dinners, storytelling, and warm Pakistani hospitality.',
    overview:
      'Created around the warmth of Pakistani family traditions, families enjoy spacious private tables beneath sunlit and lantern-lit colonnades with shared platters, child-friendly hospitality, and gentle courtyard strolling paths. Presented as an illustrative demo experience.',
    highlights: [
      'Spacious round carved walnut courtyard table',
      'Shared family-style Pakistani banquet presentation',
      'Attentive host hospitality tailored for children & elders',
      'Evening stroll beside illuminated lotus fountains',
    ],
    itinerary: [
      {
        stepTime: '06:30 PM',
        stepTitle: 'Fountain Courtyard Gathering',
        detail: 'Refreshing almond sherbet and warm walnut snacks as dusk settles.',
      },
      {
        stepTime: '07:15 PM',
        stepTitle: 'Shared Family Banquet',
        detail: 'Fresh tandoori breads, tender grilled specialties, and mild spiced favorites.',
      },
      {
        stepTime: '08:45 PM',
        stepTitle: 'Dessert & Courtyard Stroll',
        detail: 'Pistachio kulfi and warm sweets beside lantern reflections.',
      },
    ],
    gallery: [
      {
        src: HOTEL_IMAGES.diningFamily,
        alt: 'Family Enjoying Evening Meal in Fountain Courtyard',
        caption: 'Multi-Generational Courtyard Table',
      },
      {
        src: HOTEL_IMAGES.courtyardPortrait,
        alt: 'Carved Courtyard Promenade for Evening Walks',
        caption: 'Lantern-Lit Arched Walkways',
      },
      {
        src: HOTEL_IMAGES.diningBreakfast,
        alt: 'Morning Family Courtyard Dining',
        caption: 'Morning Courtyard Gathering',
      },
    ],
    relatedIds: ['special-celebrations', 'private-dining-experience'],
  },
  {
    id: 'special-celebrations',
    title: 'Special Celebrations',
    subtitle: 'Grand Celebration Pavilion Events',
    category: 'Weddings & Milestones',
    filterGroup: 'Family & Celebrations',
    demoDuration: 'Custom Schedule (Demo)',
    location: 'The Celebration Pavilion',
    image: HOTEL_IMAGES.eventsWedding,
    alt: 'Grand Celebration Pavilion Adorned with Floral Stone Arches & Warm Lighting',
    description:
      'Architectural reception pavilions dressed with jasmine, roses, and soft amber chandeliers for distinguished weddings, milestone anniversaries, and formal banquets.',
    overview:
      'Our bespoke event planners design intimate Mehndi courtyard setups, sunlit Nikah ceremonies, and candlelit formal banquets uniting sculptural limestone heritage with five-star culinary orchestration. Presented as an illustrative demo experience.',
    highlights: [
      'Architectural pavilion & manicured lawn configurations',
      'Custom floral framing in ivory, blush & burgundy tones',
      'Dedicated event concierge & culinary tasting planning',
      'Acoustic lighting design honoring stone craftsmanship',
    ],
    itinerary: [
      {
        stepTime: 'Daytime / Dusk',
        stepTitle: 'Pavilion Arrival & Floral Archway',
        detail: 'Guests greeted beneath scented floral arches with rosewater spritzers.',
      },
      {
        stepTime: 'Evening',
        stepTitle: 'Ceremonial Seating & Formal Banquet',
        detail: 'Choreographed multi-course banquet service for milestone gatherings.',
      },
      {
        stepTime: 'Late Evening',
        stepTitle: 'Kahwa Salon & Sweet Table',
        detail: 'Traditional Pakistani mithai & ceremonial kahwa farewell.',
      },
    ],
    gallery: [
      {
        src: HOTEL_IMAGES.eventsWedding,
        alt: 'Celebration Pavilion Dressed for Grand Evening Banquet',
        caption: 'The Celebration Pavilion',
      },
      {
        src: HOTEL_IMAGES.heroExterior,
        alt: 'Grand Exterior Palace Arrival at Dusk',
        caption: 'Arrival Courtyard & Reflection Basin',
      },
      {
        src: HOTEL_IMAGES.diningPrivate,
        alt: 'Intimate Private Celebration Table Setting',
        caption: 'Milestone Dining Salon',
      },
    ],
    relatedIds: ['family-experiences', 'romantic-occasion-setups'],
  },
  {
    id: 'romantic-occasion-setups',
    title: 'Romantic Occasion Setups',
    subtitle: 'Rose-Petal Reflection Pool Pavilion',
    category: 'Romantic Evenings',
    filterGroup: 'Culinary & Romance',
    demoDuration: 'Evening Experience (Demo)',
    location: 'Reflection Basin Gazebo',
    image: HOTEL_IMAGES.expRomantic,
    alt: 'Candlelit Table for Two Surrounded by Rose Petals Beside Reflection Pool at Dusk',
    description:
      'A private pavilion poised beside mirror-calm water, adorned with floating lanterns, scattered damask rose petals, and five-course twilight dining for two.',
    overview:
      'Tailored for proposals, anniversaries, and unhurried honeymoons, couples dine privately beneath carved limestone arches mirrored across tranquil evening waters with discreet personalized service. Presented as an illustrative demo experience.',
    highlights: [
      'Private water-side marble pavilion dressed with fresh roses',
      'Soft flickering hurricane tapers & floral canopy',
      'Tailored five-course romantic tasting supper',
      'Private photographer or acoustic sitar option (Demo)',
    ],
    itinerary: [
      {
        stepTime: '06:45 PM',
        stepTitle: 'Twilight Lantern Arrival',
        detail: 'Escort along petal-lined marble colonnade to the reserved basin pavilion.',
      },
      {
        stepTime: '07:15 PM',
        stepTitle: 'Bespoke Five-Course Supper',
        detail: 'Artisanal courses paced gently beneath the evening sky.',
      },
      {
        stepTime: '09:00 PM',
        stepTitle: 'Rosewater Sweets & Starlight Tea',
        detail: 'Hand-plated desserts accompanied by floral herbal infusions.',
      },
    ],
    gallery: [
      {
        src: HOTEL_IMAGES.expRomantic,
        alt: 'Candlelit Romantic Pavilion Beside Reflection Pool',
        caption: 'Reflection Pool Pavilion for Two',
      },
      {
        src: HOTEL_IMAGES.spaPrivateSuite,
        alt: 'Adjacent Private Spa Hydro-Bath Sanctuary',
        caption: 'Private Couples Hydro-Bath Suite',
      },
      {
        src: HOTEL_IMAGES.presidentialSuite,
        alt: 'Vaulted Presidential Suite Terrace',
        caption: 'Evening Suite Sanctuary',
      },
    ],
    relatedIds: ['private-dining-experience', 'special-celebrations'],
  },
  {
    id: 'garden-outdoor-experiences',
    title: 'Garden & Outdoor Experiences',
    subtitle: 'Cypress Promenade & Foothill Sunrise Walk',
    category: 'Gardens & Outdoors',
    filterGroup: 'Outdoors & Leisure',
    demoDuration: '90 mins (Demo Duration)',
    location: 'Cypress Fountain Promenade',
    image: HOTEL_IMAGES.expGardenOutdoor,
    alt: 'Sunlit Travertine Garden Promenade with Cypress Trees, Fountain & Distant Hills',
    description:
      'Peaceful morning walks past symmetrical lotus fountains, climbing bougainvillea, and sculpted sandstone arcades framing misty northern foothill vistas.',
    overview:
      'Begin the morning amidst cool stone colonnades and manicured botanical gardens perfumed by jasmine and rose bushes, concluding with warm flaky breakfast service on the sunlit terrace. Presented as an illustrative demo experience.',
    highlights: [
      'Guided morning architectural & botanical garden stroll',
      'Symmetrical sandstone lotus fountains & reflection channels',
      'Panoramic morning views of distant northern ridges',
      'Optional courtyard breakfast basket finish (Demo)',
    ],
    itinerary: [
      {
        stepTime: '07:00 AM',
        stepTitle: 'Colonnade Morning Assembly',
        detail: 'Chilled citrus water and light cashmere wraps provided for cool mornings.',
      },
      {
        stepTime: '07:20 AM',
        stepTitle: 'Fountain & Botanical Promenade',
        detail: 'Unhurried circuit through jasmine trellises and cypress avenues.',
      },
      {
        stepTime: '08:15 AM',
        stepTitle: 'Courtyard Breakfast Terrace',
        detail: 'Traditional flaky paratha, figs, and spiced chai in morning light.',
      },
    ],
    gallery: [
      {
        src: HOTEL_IMAGES.expGardenOutdoor,
        alt: 'Cypress Garden Promenade Facing Misty Foothills',
        caption: 'Cypress & Lotus Fountain Promenade',
      },
      {
        src: HOTEL_IMAGES.courtyardPortrait,
        alt: 'Shaded Carved Stone Colonnade Walkway',
        caption: 'Arched Stone Colonnade',
      },
      {
        src: HOTEL_IMAGES.diningBreakfast,
        alt: 'Sunlit Courtyard Breakfast Setting',
        caption: 'Morning Terrace Breakfast',
      },
    ],
    relatedIds: ['luxury-leisure-experiences', 'curated-local-discoveries'],
  },
  {
    id: 'curated-local-discoveries',
    title: 'Curated Local Discoveries',
    subtitle: 'Chauffeur Heritage Architecture & Artisan Drives',
    category: 'Local Discoveries',
    filterGroup: 'Culture & Heritage',
    demoDuration: 'Half-Day Excursion (Demo)',
    location: 'Concierge Departure Courtyard',
    image: HOTEL_IMAGES.heroExterior,
    alt: 'Grand Pakistani Palace Hotel Arrival Courtyard with Reflection Pool & Cypresses',
    description:
      'Thoughtfully paced half-day concierge excursions connecting regional limestone heritage sites, hill viewpoints, and artisanal textile ateliers in chauffeured comfort.',
    overview:
      'Our concierge curates private regional outings tailored around natural light, quiet heritage appreciation, and authentic Pakistani craft studios, departing directly from the grand reflection courtyard. Presented as an illustrative demo itinerary.',
    highlights: [
      'Private chauffeur departure from the grand hotel portico',
      'Curated architectural & foothill viewpoint pacing',
      'Introductory visits to master handloom & woodwork studios (Demo)',
      'In-car chilled refreshments & shaded return hospitality',
    ],
    itinerary: [
      {
        stepTime: '09:30 AM',
        stepTitle: 'Grand Courtyard Chauffeur Departure',
        detail: 'Personalized briefing with destination notes and chilled botanical towels.',
      },
      {
        stepTime: '10:30 AM',
        stepTitle: 'Heritage Artisans & Scenic Overlook',
        detail: 'Curated cultural walk and unhurried photography pause.',
      },
      {
        stepTime: '01:00 PM',
        stepTitle: 'Return to The Montage',
        detail: 'Welcome refreshment and quiet poolside or dining repose.',
      },
    ],
    gallery: [
      {
        src: HOTEL_IMAGES.heroExterior,
        alt: 'The Montage Grand Exterior Departure Courtyard',
        caption: 'Grand Arrival Portico',
      },
      {
        src: HOTEL_IMAGES.expGardenOutdoor,
        alt: 'Northern Foothill Horizon & Garden Pavilion',
        caption: 'Scenic Foothill Approach',
      },
      {
        src: HOTEL_IMAGES.expCultural,
        alt: 'Artisanal Craftsmanship & Cultural Engagement',
        caption: 'Regional Craft Heritage',
      },
    ],
    relatedIds: ['pakistani-cultural-experiences', 'garden-outdoor-experiences'],
  },
];

export default EXPERIENCES_DATA;
