import type { Skill, Stack } from '../types';

export const skillsHeading = 'Skills';

export const stacksLabel = 'Proficient stacks';
export const toolboxLabel = 'Full toolbox';

/** The stacks you're strongest in, shown as cards above the skill rows. */
export const stacks: Stack[] = [
  {
    name: 'MERN',
    full: 'MongoDB · Express · React · Node.js',
    tech: ['MongoDB', 'Express', 'React', 'Node.js'],
    usedIn: 'LaunchKit',
  },
  {
    name: 'Django + React',
    full: 'Django · React · PostgreSQL',
    tech: ['Django', 'React', 'PostgreSQL'],
    usedIn: 'PlantScope',
  },
  {
    name: 'React Native + Django',
    full: 'React Native · Django · PostgreSQL',
    tech: ['React Native', 'Django', 'PostgreSQL'],
    usedIn: 'PlantScope mobile',
  },
];

// Icons are looked up by name in techIcons.ts — add an entry there when you add a new skill.
export const skills: Skill[] = [
  {
    category: 'Frontend',
    items: [
      'React.js',
      'React Native',
      'Svelte',
      'Tauri',
      'TypeScript',
      'Tailwind CSS',
      'HTML5',
      'CSS3',
      'Bootstrap',
      'Leaflet',
    ],
    familiar: ['Vue'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'Django'],
    familiar: ['Laravel'],
  },
  { category: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB'] },
  {
    category: 'Deployment',
    items: ['Vercel', 'Render', 'Supabase', 'Firebase', 'GoDaddy', 'Hostinger'],
  },
  {
    category: 'Languages',
    items: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'Java', 'C++', 'PHP'],
  },
  { category: 'Tools', items: ['Git', 'GitHub', 'Docker', 'VS Code'] },
  { category: 'AI Tools', items: ['Claude', 'ChatGPT', 'Qwen'] },
  { category: 'Currently Learning', items: ['AWS'] },
];

/** The scrolling logo strip under the hero. */
export const marqueeTech: string[] = [
  'React.js',
  'TypeScript',
  'JavaScript (ES6+)',
  'HTML5',
  'CSS3',
  'Node.js',
  'Django',
  'PHP',
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'Tailwind CSS',
  'Python',
  'Leaflet',
  'Express.js',
  'Git',
  'VS Code',
  'Claude',
  'ChatGPT',
  'Qwen',
];
