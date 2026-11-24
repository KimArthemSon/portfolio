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
      'Marketplace MVP for developers, IT students, and hackathon teams to buy and sell device mockups, pitch deck templates, and demo video overlays.',
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
    tech: [
      'React 19',
      'TypeScript',
      'Node.js',
      'Express',
      'MongoDB',
      'Stripe',
      'Socket.IO',
      'JWT',
      'Google OAuth 2.0',
      'Multer',
      'GitHub Actions',
      'Vercel',
    ],
    highlights: [
      'Architected the platform on React 19, TypeScript, Node.js, and MongoDB with role-based buyer and seller dashboards, JWT + Google OAuth 2.0 authentication, and secure file uploads using Multer.',
      'Integrated Stripe payments in test mode with card tokenization and duplicate-charge protection, handling 8% tax, 10% platform fee splitting, and 7-day seller payout holds.',
      'Built real-time seller sales notifications with Socket.IO, and set up CI/CD with GitHub Actions to check every pull request and Vercel to deploy the frontend.',
    ],
    links: [
      { label: 'Live Demo', href: 'https://lunch-kit.vercel.app' },
      { label: 'GitHub', href: 'https://github.com/KimArthemSon/LunchKit' },
    ],
  },
  {
    id: 'footlocker-pos',
    name: 'FootLocker POS',
    subtitle: 'Point-of-Sale and Inventory System for Retail',
    meta: ['Academic Project', 'October 2025'],
    summary:
      'A point-of-sale and inventory system for a footwear and apparel store, with separate Manager and Cashier roles and a companion mobile login.',
    screenshots: [
      {
        src: '/projects/footlocker-pos.jpg',
        caption: 'Cashier POS',
        alt: 'FootLocker POS cashier screen: category sidebar, brand filter and search, product grid of sneakers with sizes and prices, and a cart with subtotal, discount, payment method, cash tendered, and change',
      },
      {
        src: '/projects/footlocker-login.jpg',
        caption: 'Log in',
        alt: 'FootLocker POS login page: username and password form beside a sneaker image, over a dark street-court background',
      },
    ],
    tech: ['PHP', 'MySQL', 'React Native', 'Expo', 'RESTful APIs'],
    highlights: [
      'Built a PHP and MySQL POS with separate Manager and Cashier logins and hashed passwords, so each role sees only its own tools.',
      'Developed product, brand, category, supplier, and account management with search, filters, and image uploads, covering 40+ products.',
      'Created a React Native (Expo) mobile login that uses the same backend through a REST API.',
    ],
    links: [
      { label: 'Live Demo', href: '#' },
      { label: 'GitHub', href: '#' },
    ],
  },
];
