/**
 * Experience stories - editorial blocks, no timeline.
 * Facts only: sourced from existing portfolio data (Orion 30% migration,
 * Tennis Australia, NMBU TA 40+ students, Agela AS trainee role).
 */

export const experienceIntro = {
  eyebrow: { en: 'Real World Experience', no: 'Praktisk erfaring' },
  title: { en: 'Experience', no: 'Erfaring' },
  subtitle: {
    en: 'How engineering skills became working systems in production environments.',
    no: 'Hvordan ingeniørferdigheter ble til fungerende systemer i produksjonsmiljøer.',
  },
};

export const experienceStories = [
  {
    id: 'agela',
    number: '01',
    current: true,
    featured: false,
    role: { en: 'Software Engineer — Trainee', no: 'Software Engineer — Trainee' },
    company: 'Agela AS',
    date: { en: '2026 — Present', no: '2026 — nå' },
    context: {
      en: 'Building production software with a focus on AI and data-driven systems.',
      no: 'Bygger produksjonsprogramvare med fokus på AI og datadrevne systemer.',
    },
    impactMetric: null,
    contributions: [],
    technologies: ['Python', 'AI', 'Data', 'Software Engineering'],
  },
  {
    id: 'orion',
    number: '02',
    current: false,
    featured: true,
    role: { en: 'Software Engineer', no: 'Software Engineer' },
    company: 'Orion Innovation',
    date: { en: '2020 — 2024', no: '2020 — 2024' },
    context: {
      en: 'Three years building backend services and APIs with clean engineering practices across production systems.',
      no: 'Tre år med utvikling av backendservices og API-er med gode ingeniørpraksiser i produksjonssystemer.',
    },
    impactMetric: {
      value: '30%',
      label: {
        en: 'Cost reduction from migrating a large-scale sports application.',
        no: 'Kostnadsreduksjon fra migrering av en storskala sportsapplikasjon.',
      },
    },
    contributions: [
      {
        en: 'Developed backend services and APIs for production environments.',
        no: 'Utviklet backendservices og API-er for produksjonsmiljøer.',
      },
      {
        en: 'Migrated a large-scale sports application, reducing costs by 30%.',
        no: 'Migrerte en storskala sportsapplikasjon og reduserte kostnadene med 30 %.',
      },
      {
        en: 'Contributed to the Tennis Australia system architecture.',
        no: 'Bidro til systemarkitekturen for Tennis Australia.',
      },
    ],
    technologies: ['Python', 'Flask', 'Microservices', 'Azure'],
  },
  {
    id: 'nmbu-ta',
    number: '03',
    current: false,
    featured: false,
    role: { en: 'Teaching Assistant — DBMS', no: 'Undervisningsassistent — DBMS' },
    company: 'NMBU',
    date: { en: 'Sep 2025 — Dec 2025', no: 'sep. 2025 — des. 2025' },
    context: {
      en: 'Taught database management systems to data science students alongside my own Master\u2019s studies.',
      no: 'Underviste i databasehåndteringssystemer til datavitenskapsstudenter ved siden av egne masterstudier.',
    },
    impactMetric: {
      value: '40+',
      label: {
        en: 'Students mentored in SQL optimization and database design.',
        no: 'Studenter veiledet i SQL-optimalisering og databasedesign.',
      },
    },
    contributions: [
      {
        en: 'Mentored students in SQL optimization, database design, and system thinking.',
        no: 'Veiledet studenter i SQL-optimalisering, databasedesign og systemtenkning.',
      },
      {
        en: 'Designed exercises simulating production-level data challenges.',
        no: 'Designet øvelser som simulerte produksjonsnære datautfordringer.',
      },
    ],
    technologies: ['SQL', 'PostgreSQL', 'Database Design', 'Mentoring'],
  },
];

export const educationEntries = [
  {
    degree: { en: "Master's in Data Science", no: 'Master i datavitenskap' },
    school: 'Norwegian University of Life Sciences (NMBU)',
    date: { en: '2024 — 2026', no: '2024 — 2026' },
    note: { en: 'Graduated June 2026.', no: 'Fullført juni 2026.' },
    coursework: {
      en: ['Python Programming', 'Data-to-Decision', 'SQL for Data Handling'],
      no: ['Python-programmering', 'Data-to-Decision', 'SQL for datahåndtering'],
    },
    technologies: ['Python', 'SQL', 'Data Analytics', 'Machine Learning'],
  },
  {
    degree: { en: 'B.Tech Computer Science & Engineering', no: 'B.Tech informatikk' },
    school: 'Karpagam College of Engineering',
    date: { en: '2016 — 2020', no: '2016 — 2020' },
    note: null,
    coursework: {
      en: ['Software Engineering', 'Web Development', 'System Design'],
      no: ['Programvareteknikk', 'Webutvikling', 'Systemdesign'],
    },
    technologies: ['Software Engineering', 'Web Dev', 'System Design'],
  },
];

export const educationLabel = { en: 'Education', no: 'Utdanning' };
