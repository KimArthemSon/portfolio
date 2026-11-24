import { FiDatabase, FiMonitor, FiServer, FiSmartphone } from 'react-icons/fi';
import type { ServicesContent } from '../types';

export const servicesContent: ServicesContent = {
  heading: ['Open to work.', "Here's what I bring."],

  lookingFor: {
    label: "What I'm looking for",
    cta: { label: "Let's talk", href: '#contact' },
    roles: [
      {
        title: 'OJT / Internship',
        detail: 'Starting December 2026 · 600 hours. Ready to learn fast and ship real work.',
        tag: 'Priority',
        highlight: true,
      },
      {
        title: 'Full-Stack Developer',
        detail: 'Web and mobile, front end to database. Happy to lean frontend or backend too.',
        tag: 'Interested',
      },
      {
        title: 'QA / Software Testing',
        detail: 'Also interested in quality assurance: testing features, finding bugs, and helping a team ship with confidence.',
      },
      {
        title: 'AI Engineering',
        detail: 'Currently learning to build apps on top of LLMs and AI APIs, and keen to grow into AI engineering work.',
        tag: 'Learning',
      },
    ],
  },

  offer: {
    label: 'What I can do for you',
    // `tags` are matched against techIcons.ts for their logos.
    services: [
      {
        title: 'Web App Development',
        description:
          'Responsive full-stack web apps in React and TypeScript, from first wireframe to a deployed, working product.',
        icon: FiMonitor,
        tags: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
      },
      {
        title: 'Mobile App Development',
        description:
          'Cross-platform apps in React Native that share logic and workflows with their web versions.',
        icon: FiSmartphone,
        tags: ['React Native', 'TypeScript'],
      },
      {
        title: 'APIs & Backend',
        description:
          'RESTful APIs in Django, Node.js and Express, or PHP, with authentication, role-based access, and secure file handling.',
        icon: FiServer,
        tags: ['Django', 'Node.js', 'Express', 'PHP', 'JWT'],
      },
      {
        title: 'Database Design',
        description:
          'Data models in PostgreSQL, MySQL, and MongoDB, designed around how the app is really used.',
        icon: FiDatabase,
        tags: ['PostgreSQL', 'MySQL', 'MongoDB'],
      },
    ],
  },
};
