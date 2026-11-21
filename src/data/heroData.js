import { HOTEL_IMAGES } from '@/assets/images';

/**
 * Six distinct Pakistani five-star luxury hotel scenes for the fullscreen hero slideshow.
 */
export const HERO_SCENES = [
  {
    id: 'grand-exterior',
    indexLabel: '01',
    title: 'Grand Hotel Exterior',
    caption: 'Mughal-Inspired Limestone Facade & Reflection Courtyard',
    image: HOTEL_IMAGES.heroExterior,
    portraitImage: HOTEL_IMAGES.courtyardPortrait,
    videoSrc: null,
    durationSec: 6.0,
    motion: {
      scaleFrom: 1.02,
      scaleTo: 1.08,
      xFrom: -1.1,
      xTo: 1.1,
    },
  },
  {
    id: 'signature-lobby',
    indexLabel: '02',
    title: 'Signature Grand Lobby',
    caption: 'Carved Jaali Screens & Marble Colonnade',
    image: HOTEL_IMAGES.lobbyHero,
    portraitImage: HOTEL_IMAGES.courtyardPortrait,
    videoSrc: null,
    durationSec: 6.0,
    motion: {
      scaleFrom: 1.07,
      scaleTo: 1.01,
      xFrom: 1.1,
      xTo: -1.0,
    },
  },
  {
    id: 'presidential-bedroom',
    indexLabel: '03',
    title: 'Presidential Suite',
    caption: 'Handcrafted Woodwork & Arched Garden Sanctuary',
    image: HOTEL_IMAGES.presidentialSuite,
    portraitImage: HOTEL_IMAGES.executiveSuite,
    videoSrc: null,
    durationSec: 6.0,
    motion: {
      scaleFrom: 1.02,
      scaleTo: 1.08,
      xFrom: -1.0,
      xTo: 1.2,
    },
  },
  {
    id: 'fine-dining',
    indexLabel: '04',
    title: 'Fine Dining Restaurant',
    caption: 'Pakistani Culinary Heritage & Brass Craftsmanship',
    image: HOTEL_IMAGES.fineDining,
    portraitImage: HOTEL_IMAGES.fineDining,
    videoSrc: null,
    durationSec: 5.8,
    motion: {
      scaleFrom: 1.07,
      scaleTo: 1.01,
      xFrom: 1.0,
      xTo: -1.1,
    },
  },
  {
    id: 'swimming-pool',
    indexLabel: '05',
    title: 'Luxury Swimming Pool',
    caption: 'Travertine Infinity Deck & Shaded Pavilions',
    image: HOTEL_IMAGES.swimmingPool,
    portraitImage: HOTEL_IMAGES.swimmingPool,
    videoSrc: null,
    durationSec: 5.8,
    motion: {
      scaleFrom: 1.01,
      scaleTo: 1.08,
      xFrom: -1.1,
      xTo: 1.0,
    },
  },
  {
    id: 'spa-wellness',
    indexLabel: '06',
    title: 'Spa & Wellness Sanctuary',
    caption: 'Dappled Marble Colonnade & Mineral Pool',
    image: HOTEL_IMAGES.spaWellness,
    portraitImage: HOTEL_IMAGES.spaWellness,
    videoSrc: null,
    durationSec: 6.0,
    motion: {
      scaleFrom: 1.08,
      scaleTo: 1.02,
      xFrom: 1.0,
      xTo: -1.0,
    },
  },
];

export default HERO_SCENES;
