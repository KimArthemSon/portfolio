import type { IconType } from 'react-icons';

export type Theme = 'light' | 'dark' | 'system';

export interface NavItem {
  id: string;
  label: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconType;
}

export interface ContactLink {
  label: string;
  value: string;
  /** Omit for plain text (e.g. a location). */
  href?: string;
}

export interface ContactForm {
  nameLabel: string;
  namePlaceholder: string;
  subjectLabel: string;
  subjectPlaceholder: string;
  defaultSubject: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
  gmailLabel: string;
  hint: string;
}

export interface Profile {
  name: string;
  shortName: string;
  role: string;
  /** Path under public/, e.g. '/avatar.jpg'. Leave undefined for the placeholder circle. */
  avatar?: string;
  /** Shown next to the live clock in the hero. */
  city: string;
  /** IANA time zone for the live clock, e.g. 'Asia/Manila'. */
  timeZone: string;
  heroHeading: [string, string];
  heroIntro: string;
  availability: {
    short: string;
    detail: string;
  };
  resumeUrl: string;
  socials: SocialLink[];
  /** Label of the main hero button that scrolls to Projects. */
  heroPrimaryCta: string;
  contact: {
    heading: string;
    intro: string;
    email: string;
    links: ContactLink[];
    form: ContactForm;
  };
  footer: {
    credit: string;
  };
}

export interface Service {
  title: string;
  description: string;
  icon: IconType;
  /** Tech names, matched against src/data/techIcons.ts for logos. */
  tags: string[];
}

export interface Role {
  title: string;
  detail: string;
  /** Small badge, e.g. "Priority". */
  tag?: string;
  /** Render as the dark, emphasized card. */
  highlight?: boolean;
}

export interface ServicesContent {
  heading: [string, string];
  lookingFor: {
    label: string;
    cta: { label: string; href: string };
    roles: Role[];
  };
  offer: {
    label: string;
    services: Service[];
  };
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectScreenshot {
  /** Path under public/, e.g. '/projects/plantscope-map.jpg'. */
  src: string;
  /** Short label shown on the frame and thumbnail, e.g. 'GIS map'. */
  caption: string;
  alt: string;
}

export interface Project {
  id: string;
  name: string;
  subtitle: string;
  meta: string[];
  summary: string;
  /** First one is the cover. The gallery cycles through them. */
  screenshots: ProjectScreenshot[];
  tech: string[];
  highlights: string[];
  links: ProjectLink[];
}

export interface Skill {
  category: string;
  /** Names are matched against src/data/techIcons.ts to get an icon. */
  items: string[];
}

export interface Stack {
  /** Short name, e.g. "MERN". */
  name: string;
  /** What it stands for, e.g. "MongoDB · Express · React · Node.js". */
  full: string;
  /** Tech names, matched against src/data/techIcons.ts for logos. */
  tech: string[];
  /** Where you've used it, shown as proof. */
  usedIn?: string;
}

export interface TechIcon {
  icon: IconType;
  /** Brand color. Omit to use the text color (for black/white logos). */
  color?: string;
}

export type AwardKind = 'win' | 'honor' | 'participant';

export interface Award {
  title: string;
  issuer: string;
  date: string;
  kind: AwardKind;
}
