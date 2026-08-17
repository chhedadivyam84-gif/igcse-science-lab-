import {
  AlertTriangle,
  BookOpen,
  Calculator,
  CalendarCheck,
  Camera,
  FlaskConical,
  Grid3x3,
  LayoutDashboard,
  Layers,
  Lightbulb,
  Mic,
  Network,
  NotebookPen,
  PenLine,
  PlayCircle,
  Shapes,
  Sigma,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';

/** Explicit map rather than dynamic lookup, so icons are tree-shaken properly. */
export const NAV_ICONS: Record<string, LucideIcon> = {
  AlertTriangle,
  BookOpen,
  Calculator,
  CalendarCheck,
  Camera,
  FlaskConical,
  Grid3x3,
  LayoutDashboard,
  Layers,
  Lightbulb,
  Mic,
  Network,
  NotebookPen,
  PenLine,
  PlayCircle,
  Shapes,
  Sigma,
  Sparkles,
  TrendingUp,
};

export function NavIcon({ name, className }: { name: string; className?: string }) {
  const Icon = NAV_ICONS[name] ?? Sparkles;
  return <Icon className={className} aria-hidden="true" />;
}
