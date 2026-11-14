import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import type { NavItem, Profile } from '../types';

const email = 'sonkimarthem@gmail.com';
const github = 'https://github.com/KimArthemSon';
const linkedin = 'https://www.linkedin.com/in/kim-arthem-son-2a98533a6';

export const profile: Profile = {
  name: 'Kim Arthem Son',
  shortName: 'Kim Arthem',
  role: 'Full-Stack Developer',
  // Square image in public/. Set to undefined to show a plain placeholder circle.
  avatar: '/avatar.jpg',
  city: 'Ormoc City',
  timeZone: 'Asia/Manila',
  heroHeading: ["Hi, I'm Kim:", 'Full-Stack Developer'],
  heroIntro:
    'BSIT student building full-stack web and mobile applications, RESTful APIs, and GIS-based systems — from database design through to deployed interface.',
  availability: {
    short: 'Available',
    detail: 'Available for OJT internship · December 2026 · 600 hours',
  },
  resumeUrl: '/resume.pdf',
  socials: [
    { label: 'GitHub', href: github, icon: FiGithub },
    { label: 'LinkedIn', href: linkedin, icon: FiLinkedin },
    { label: 'Email', href: `mailto:${email}`, icon: FiMail },
  ],
  heroPrimaryCta: 'View Projects',
  contact: {
    heading: "Let's build something.",
    intro: 'Open to software development internships and collaboration.',
    email,
    links: [
      { label: 'GitHub', value: 'GitHub', href: github },
      { label: 'LinkedIn', value: 'LinkedIn', href: linkedin },
      { label: 'Phone', value: '09625452556', href: 'tel:+639625452556' },
      { label: 'Location', value: 'Ormoc City, Leyte, Philippines' },
    ],
    form: {
      nameLabel: 'Your name',
      namePlaceholder: 'Juan Dela Cruz',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'Internship opportunity',
      defaultSubject: 'Hello from your portfolio',
      messageLabel: 'Message',
      messagePlaceholder: "Hi Kim, I'd like to talk about…",
      submitLabel: 'Send via email app',
      gmailLabel: 'Open in Gmail',
      hint: 'This opens a pre-filled email. Nothing is sent until you press send.',
    },
  },
  footer: {
    credit: 'Built with React & Tailwind',
  },
};

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'awards', label: 'Awards' },
  { id: 'contact', label: 'Contact' },
];
