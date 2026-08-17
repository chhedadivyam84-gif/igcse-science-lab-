/**
 * Navigation model. Kept in one place so the desktop bar, the mobile bar and
 * the command palette can never drift apart.
 */
export type NavItem = {
  href: string;
  label: string;
  /** lucide-react icon name, resolved in the nav components. */
  icon: string;
  description: string;
  /** Shown in the mobile bottom bar (space for five). */
  mobile?: boolean;
  requiresAuth?: boolean;
};

export const PRIMARY_NAV: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard', description: 'Your progress, plan and next step', mobile: true, requiresAuth: true },
  { href: '/learn', label: 'Learn', icon: 'BookOpen', description: 'The full syllabus, topic by topic', mobile: true },
  { href: '/tutor', label: 'Ask AI', icon: 'Sparkles', description: 'NOVA — your science tutor', mobile: true },
  { href: '/practice', label: 'Practice', icon: 'PenLine', description: 'Questions, quizzes and exam mode', mobile: true },
  { href: '/lab', label: 'Lab', icon: 'FlaskConical', description: 'Interactive simulations', mobile: true },
];

export const SECONDARY_NAV: NavItem[] = [
  { href: '/voice', label: 'Talk to NOVA', icon: 'Mic', description: 'Hands-free spoken tutoring', requiresAuth: true },
  { href: '/explain', label: 'Explain Anything', icon: 'Lightbulb', description: 'One question in, a full mini-lesson out' },
  { href: '/photo', label: 'Ask with a photo', icon: 'Camera', description: 'Upload your working and get the method', requiresAuth: true },
  { href: '/notes', label: 'Notes', icon: 'NotebookPen', description: 'Handwritten-style revision notes', requiresAuth: true },
  { href: '/diagrams', label: 'Diagrams', icon: 'Shapes', description: 'Labelled scientific diagrams' },
  { href: '/explainer', label: 'Explainers', icon: 'PlayCircle', description: 'Animated concept walkthroughs' },
  { href: '/flashcards', label: 'Flashcards', icon: 'Layers', description: 'Spaced repetition', requiresAuth: true },
  { href: '/periodic-table', label: 'Periodic table', icon: 'Grid3x3', description: 'Every element, with IGCSE notes' },
  { href: '/tools/mole', label: 'Mole calculator', icon: 'Calculator', description: 'Stoichiometry, step by step' },
  { href: '/tools/physics', label: 'Physics calculator', icon: 'Sigma', description: 'Equations with unit checking' },
  { href: '/map', label: 'Knowledge map', icon: 'Network', description: 'How the syllabus fits together' },
  { href: '/progress', label: 'Progress', icon: 'TrendingUp', description: 'Mastery across every topic', requiresAuth: true },
  { href: '/mistakes', label: 'My mistakes', icon: 'AlertTriangle', description: 'What you keep losing marks on', requiresAuth: true },
  { href: '/plan', label: 'Study plan', icon: 'CalendarCheck', description: 'What to do today', requiresAuth: true },
  { href: '/pricing', label: 'Pricing', icon: 'Sparkles', description: 'Free forever, or Pro for the AI features' },
];

export const ALL_NAV = [...PRIMARY_NAV, ...SECONDARY_NAV];

export const SUBJECTS = [
  {
    slug: 'physics' as const,
    code: '0625',
    name: 'Physics',
    tagline: 'Motion, energy, waves, electricity and the universe.',
    accentClass: 'text-physics',
    borderClass: 'border-physics/30',
    bgClass: 'bg-physics/10',
    gradient: 'from-physics/25 via-physics/5 to-transparent',
  },
  {
    slug: 'chemistry' as const,
    code: '0620',
    name: 'Chemistry',
    tagline: 'Particles, bonding, reactions and the chemistry of the world.',
    accentClass: 'text-chemistry',
    borderClass: 'border-chemistry/30',
    bgClass: 'bg-chemistry/10',
    gradient: 'from-chemistry/25 via-chemistry/5 to-transparent',
  },
];
