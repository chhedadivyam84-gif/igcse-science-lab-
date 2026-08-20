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
  { href: '/papers', label: 'Predicted papers', icon: 'ClipboardList', description: 'The questions that come up most, and a full paper', requiresAuth: true },
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

/**
 * Presentation only, keyed by subject slug.
 *
 * The subjects themselves come from the curriculum seed — this map supplies
 * nothing but colour and an icon. Keeping the list of subjects here as well is
 * what previously left Biology, Maths and ICT invisible on the homepage while
 * they were live everywhere else, so it deliberately holds no names or codes.
 */
export const SUBJECT_STYLES: Record<
  string,
  { accentClass: string; borderClass: string; bgClass: string; gradient: string; icon: string }
> = {
  physics: {
    accentClass: 'text-physics',
    borderClass: 'border-physics/30',
    bgClass: 'bg-physics/10',
    gradient: 'from-physics/25 via-physics/5 to-transparent',
    icon: 'Zap',
  },
  chemistry: {
    accentClass: 'text-chemistry',
    borderClass: 'border-chemistry/30',
    bgClass: 'bg-chemistry/10',
    gradient: 'from-chemistry/25 via-chemistry/5 to-transparent',
    icon: 'Atom',
  },
  biology: {
    accentClass: 'text-biology',
    borderClass: 'border-biology/30',
    bgClass: 'bg-biology/10',
    gradient: 'from-biology/25 via-biology/5 to-transparent',
    icon: 'Leaf',
  },
  maths: {
    accentClass: 'text-maths',
    borderClass: 'border-maths/30',
    bgClass: 'bg-maths/10',
    gradient: 'from-maths/25 via-maths/5 to-transparent',
    icon: 'Sigma',
  },
  'add-maths': {
    accentClass: 'text-add-maths',
    borderClass: 'border-add-maths/30',
    bgClass: 'bg-add-maths/10',
    gradient: 'from-add-maths/25 via-add-maths/5 to-transparent',
    icon: 'Infinity',
  },
  'intl-maths': {
    accentClass: 'text-intl-maths',
    borderClass: 'border-intl-maths/30',
    bgClass: 'bg-intl-maths/10',
    gradient: 'from-intl-maths/25 via-intl-maths/5 to-transparent',
    icon: 'Globe',
  },
  ict: {
    accentClass: 'text-ict',
    borderClass: 'border-ict/30',
    bgClass: 'bg-ict/10',
    gradient: 'from-ict/25 via-ict/5 to-transparent',
    icon: 'MonitorSmartphone',
  },
};

/** Falls back to the accent colour so a new subject is never invisible. */
export const DEFAULT_SUBJECT_STYLE = {
  accentClass: 'text-accent',
  borderClass: 'border-accent/30',
  bgClass: 'bg-accent/10',
  gradient: 'from-accent/25 via-accent/5 to-transparent',
  icon: 'BookOpen',
};
