import type { Award } from '../types';

export const awardsHeading: [string, string] = ['Awards', '& Recognitions'];

export const awardsIntro =
  'Recognition from regional and national programming competitions, and from my college.';

// kind: 'win' (gold trophy) · 'honor' (star) · 'participant' (flag)
export const awards: Award[] = [
  {
    title: 'Champion',
    issuer: 'Eastern Visayas Coding Olympics (EVCO), PSITE',
    date: 'October 2024',
    kind: 'win',
  },
  {
    title: 'Most Outstanding Programmer',
    issuer: 'Western Leyte College',
    date: 'SY 2023–2024',
    kind: 'honor',
  },
  {
    title: 'Most Improved Programmer',
    issuer: 'Western Leyte College',
    date: 'SY 2024–2025',
    kind: 'honor',
  },
  {
    title: 'Participant',
    issuer: 'National Programming Challenge, CodeChum',
    date: 'November 2025',
    kind: 'participant',
  },
  {
    title: 'Participant',
    issuer: 'National Programming Challenge, CodeChum',
    date: 'October 2024',
    kind: 'participant',
  },
];
