import type { Project } from '../types';

export const projectsHeading = 'Projects';

export const projects: Project[] = [
  {
    id: 'plantscope',
    name: 'PlantScope',
    subtitle: 'GIS-Based Site Suitability Assessment & Reforestation Monitoring System',
    meta: ['Academic Capstone', 'Team of 3', 'November 2025 – Present'],
    summary:
      "Built for Ormoc City's reforestation program, used by field officers and city administrators.",
    screenshots: [
      {
        src: '/projects/plantscope-landing.jpg',
        caption: 'Landing page',
        alt: 'PlantScope landing page: GIS-enabled reforestation system for Ormoc City, with field officers in a forest',
      },
      {
        src: '/projects/plantscope-map.jpg',
        caption: 'GIS map',
        alt: 'PlantScope map view: satellite map of Ormoc City with reforestation site markers and analysis tools',
      },
    ],
    tech: ['React', 'TypeScript', 'React Native', 'Django', 'PostgreSQL', 'Leaflet', 'PostGIS'],
    highlights: [
      'Developed web and mobile clients in React TypeScript and React Native with Leaflet mapping, sharing a single assessment workflow across both platforms.',
      'Built Django RESTful APIs and a PostgreSQL database with geospatial extensions, supporting assessment of 15+ reforestation sites and monitoring of 5 tree grower organizations.',
      'Implemented geospatial analysis algorithms for site suitability scoring and resource optimization.',
    ],
    links: [
      { label: 'Live Demo', href: 'https://plantscope.org' },
      { label: 'GitHub', href: 'https://github.com/KimArthemSon/PlantScope' },
    ],
  },
  {
    id: 'launchkit',
    name: 'LaunchKit',
    subtitle: 'Multi-Vendor Digital Marketplace for Developer Assets',
    meta: ['Personal Project', 'October 2026'],
    summary:
      'Marketplace MVP where developers, IT students, and hackathon teams buy and sell device mockups, pitch deck templates, and demo video overlays.',
    screenshots: [
      {
        src: '/projects/launchkit-landing.jpg',
        caption: 'Landing page',
        alt: 'LaunchKit landing page: "Make your project look as good as it works" with featured mockup, video overlay, and pitch deck assets',
      },
      {
        src: '/projects/launchkit-home.jpg',
        caption: 'Buyer home',
        alt: 'LaunchKit buyer home with search, cart, downloads, and order activity',
      },
      {
        src: '/projects/launchkit-explore.jpg',
        caption: 'Explore',
        alt: 'LaunchKit explore page with category filters and trending asset cards',
      },
      {
        src: '/projects/launchkit-dashboard.jpg',
        caption: 'Seller dashboard',
        alt: 'LaunchKit seller dashboard showing earnings, sales, an earnings chart, and top products',
      },
    ],
    tech: ['React 19', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Google OAuth 2.0'],
    highlights: [
      'Architected role-based buyer and seller dashboards with JWT and Google OAuth 2.0 authentication.',
      'Engineered a sandbox payment simulation mimicking real gateway tokenization — 8% tax calculation, 10% platform fee splitting, and 7-day seller payout holding periods.',
      'Built a secure Multer-based upload pipeline with private product file storage, real-time earnings tracking, and product lifecycle management (Draft, Active, Archived).',
    ],
    links: [
      { label: 'Live Demo', href: 'https://lunch-kit.vercel.app' },
      { label: 'GitHub', href: 'https://github.com/KimArthemSon/LunchKit' },
    ],
  },
];
