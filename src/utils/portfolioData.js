/**
 * ─────────────────────────────────────────────────────────────────────────────
 * PORTFOLIO DATA — Guru Events
 * ─────────────────────────────────────────────────────────────────────────────
 * Static fallback data matching the expected API response shape from
 * GET /api/portfolio. When the backend is ready, replace this with
 * the fetchPortfolio() call in GallerySection.jsx.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const portfolioData = [
  {
    id: 'p001',
    src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop',
    alt: 'Elegant Garden Wedding — Indore 2024',
    category: 'wedding',
    date: '2024-02-14',
    featured: true,
    span: 'tall', // layout hint: tall card
  },
  {
    id: 'p002',
    src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop',
    alt: 'Rose & Gold Table Setting — Kalani Nagar',
    category: 'wedding',
    date: '2024-04-20',
    featured: false,
    span: 'normal',
  },
  {
    id: 'p003',
    src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop',
    alt: 'Reception Hall Grand Reveal',
    category: 'wedding',
    date: '2024-07-08',
    featured: false,
    span: 'normal',
  },
  {
    id: 'p004',
    src: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1200&auto=format&fit=crop',
    alt: 'Sangeet Night Lighting Design',
    category: 'engagement',
    date: '2024-11-22',
    featured: true,
    span: 'wide', // layout hint: wide card
  },
  {
    id: 'p005',
    src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop',
    alt: 'Mandap Décor — Outdoor Ceremony',
    category: 'wedding',
    date: '2025-01-15',
    featured: false,
    span: 'normal',
  },
  {
    id: 'p006',
    src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop',
    alt: 'Floral Arch Installation',
    category: 'wedding',
    date: '2025-03-03',
    featured: false,
    span: 'normal',
  },
];

export const servicesList = [
  {
    id: 's001',
    title: 'Complete Wedding Planning',
    subtitle: 'Full Service',
    description:
      'From the initial concept design to the final send-off, we handle every intricate detail with flawless precision.',
    icon: 'rings',
    size: 'featured', // bento: 2×2
    imageSrc:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 's002',
    title: 'Venue Styling',
    subtitle: 'Design & Décor',
    description:
      'Bespoke floral arrangements, luxury lighting, and thematic designs that transform any space into a dreamland.',
    icon: 'sparkles',
    size: 'wide', // bento: 2×1
    imageSrc: null,
  },
  {
    id: 's003',
    title: 'Vendor Curation',
    subtitle: 'Elite Network',
    description: 'Access our curated network of top-tier caterers, photographers, and artists.',
    icon: 'people',
    size: 'small', // bento: 1×1
    imageSrc: null,
  },
  {
    id: 's004',
    title: 'Event Logistics',
    subtitle: 'Coordination',
    description: 'Seamless timeline management, vendor coordination, and day-of execution.',
    icon: 'calendar',
    size: 'small', // bento: 1×1
    imageSrc: null,
  },
];
