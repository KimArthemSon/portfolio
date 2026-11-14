import { FiDatabase, FiLock, FiMap, FiServer } from 'react-icons/fi';
import {
  SiBootstrap,
  SiClaude,
  SiCplusplus,
  SiCss,
  SiDjango,
  SiExpress,
  SiGit,
  SiGithub,
  SiGoogle,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiLeaflet,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiOpenjdk,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiQwen,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import { TbBrandOpenai } from 'react-icons/tb';
import { VscVscode } from 'react-icons/vsc';
import type { TechIcon } from '../types';

/**
 * Icon + brand color for every tech name used in skills.ts and projects.ts.
 * Names are matched exactly; a name with no entry just renders without an icon.
 * Leave `color` out for black/white logos so they follow the theme.
 */
export const techIcons: Record<string, TechIcon> = {
  // Frontend
  'React.js': { icon: SiReact, color: '#61DAFB' },
  React: { icon: SiReact, color: '#61DAFB' },
  'React 19': { icon: SiReact, color: '#61DAFB' },
  'React Native': { icon: SiReact, color: '#61DAFB' },
  TypeScript: { icon: SiTypescript, color: '#3178C6' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  HTML5: { icon: SiHtml5, color: '#E34F26' },
  CSS3: { icon: SiCss, color: '#1572B6' },
  Bootstrap: { icon: SiBootstrap, color: '#7952B3' },
  Leaflet: { icon: SiLeaflet, color: '#199900' },

  // Backend
  'Node.js': { icon: SiNodedotjs, color: '#5FA04E' },
  'Express.js': { icon: SiExpress },
  Express: { icon: SiExpress },
  Django: { icon: SiDjango, color: '#44B78B' },
  'RESTful APIs': { icon: FiServer },
  'Auth & Authorization': { icon: FiLock },
  JWT: { icon: SiJsonwebtokens },
  'Google OAuth 2.0': { icon: SiGoogle, color: '#4285F4' },

  // Databases
  PostgreSQL: { icon: SiPostgresql, color: '#4169E1' },
  PostGIS: { icon: SiPostgresql, color: '#4169E1' },
  MySQL: { icon: SiMysql, color: '#4479A1' },
  MongoDB: { icon: SiMongodb, color: '#47A248' },
  'Data Modeling': { icon: FiDatabase },

  // Languages
  'JavaScript (ES6+)': { icon: SiJavascript, color: '#F0C419' },
  JavaScript: { icon: SiJavascript, color: '#F0C419' },
  Python: { icon: SiPython, color: '#3776AB' },
  Java: { icon: SiOpenjdk, color: '#E76F00' },
  'C++': { icon: SiCplusplus, color: '#00599C' },
  PHP: { icon: SiPhp, color: '#777BB4' },

  // Tools
  Git: { icon: SiGit, color: '#F05032' },
  GitHub: { icon: SiGithub },
  'VS Code': { icon: VscVscode, color: '#007ACC' },
  'GIS & Geospatial Analysis': { icon: FiMap },

  // AI tools
  Qwen: { icon: SiQwen, color: '#615CED' },
  ChatGPT: { icon: TbBrandOpenai, color: '#10A37F' },
  Claude: { icon: SiClaude, color: '#D97757' },
};

export function getTechIcon(name: string): TechIcon | undefined {
  return techIcons[name];
}
