/**
 * Repitis Design System - Simplified
 * Core brand identity: violet → fuchsia → pink gradient
 */

// Colors
export const colors = {
  // Brand gradient colors
  brand: {
    violet: '#7c3aed',    // violet-600
    fuchsia: '#c026d3',   // fuchsia-600
    pink: '#db2777',      // pink-600
  },

  // Text colors
  text: {
    primary: '#0f172a',   // slate-900 - main body text
    secondary: '#475569', // slate-600 - muted text
    muted: '#94a3b8',     // slate-400 - disabled/placeholder
    inverse: '#ffffff',   // white - text on dark backgrounds
  },

  // Background colors
  bg: {
    light: '#f8fafc',     // slate-50 - main background
    white: '#ffffff',     // white - cards, modals
    dark: '#1e293b',      // slate-800 - dark sections
    darker: '#0f172a',    // slate-900 - footer, dark mode
  },

  // Accent colors for features/levels
  accent: {
    violet: '#8b5cf6',    // violet-500
    blue: '#3b82f6',      // blue-500
    cyan: '#06b6d4',      // cyan-500
    green: '#22c55e',     // green-500
    yellow: '#facc15',    // yellow-400
    orange: '#fb923c',    // orange-400
    pink: '#ec4899',      // pink-500
    rose: '#f43f5e',      // rose-500
  },

  // Semantic colors
  semantic: {
    success: '#22c55e',   // green-500
    error: '#ef4444',     // red-500
    warning: '#f59e0b',   // amber-500
    info: '#3b82f6',      // blue-500
  },
} as const;

// Fonts
export const fonts = {
  heading: 'var(--font-abee-zee)',
  body: 'var(--font-lexend)',
} as const;

// Spacing (common values, use Tailwind classes for most)
export const spacing = {
  xs: '0.5rem',   // 8px
  sm: '1rem',     // 16px
  md: '1.5rem',   // 24px
  lg: '2rem',     // 32px
  xl: '3rem',     // 48px
  '2xl': '4rem',  // 64px

  // Section spacing for consistent layout
  section: 'py-8 md:py-12', // Vertical padding for page sections
} as const;

// Brand gradient (use Tailwind classes directly in components)
export const gradientClasses = {
  primary: 'bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600',
  text: 'bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent',
  background: 'bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50',
  hover: 'bg-gradient-to-r from-violet-700 via-fuchsia-700 to-pink-700',
  timeline: 'bg-gradient-to-b from-violet-600 via-fuchsia-600 to-pink-600',
  cardTrust: 'bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50',
  cardDemo: 'bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30',
} as const;

// Glass morphism effect (use Tailwind classes directly)
export const glassClasses = {
  card: 'bg-white/70 backdrop-blur-xl border border-white/20',
} as const;

// Common transitions
export const transitions = {
  fast: 'transition-all duration-150 ease-in-out',
  normal: 'transition-all duration-300 ease-in-out',
  slow: 'transition-all duration-500 ease-in-out',
} as const;

// Animation variants for Framer Motion
export const animationVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  title: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  },
  magneticButton: {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  },
  featureCard: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  floatingLetter: {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
  },
  container: {
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  },
};

// Utility to combine class names
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

// For reduced motion accessibility
export function getScale(shouldReduceMotion: boolean | null, scaleValue: number = 1.05): number {
  return shouldReduceMotion ? 1 : scaleValue;
}

export function getAnimation<T>(shouldReduceMotion: boolean | null, animation: T): T | Record<string, never> {
  return shouldReduceMotion ? {} : animation;
}

// Combined theme export
export const theme = {
  colors,
  fonts,
  spacing,
  gradientClasses,
  glassClasses,
  transitions,
  animationVariants,
} as const;

export default theme;
