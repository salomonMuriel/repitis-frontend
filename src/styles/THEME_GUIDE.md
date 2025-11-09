# Repitis Theme Guide

Simplified design system for Repitis. See `theme.ts` for all available values.

## Quick Start

```tsx
import { theme, gradientClasses, glassClasses, cn } from '@/styles/theme';
```

## Brand Identity

Core gradient: **violet → fuchsia → pink** (`#7c3aed` → `#c026d3` → `#db2777`)

```tsx
// Primary buttons and CTAs
<button className={gradientClasses.primary}>Start Learning</button>

// Gradient text
<h1 className={gradientClasses.text}>Aprende a leer</h1>

// Background gradient
<div className={gradientClasses.background}>...</div>
```

## Colors

See `theme.colors` for all values:

```tsx
// Text colors
className="text-slate-900"      // Primary text
className="text-slate-600"      // Secondary text
className="text-white"          // Inverse text

// Backgrounds
className="bg-slate-50"         // Light background
className="bg-white"            // White cards
className="bg-slate-800"        // Dark sections

// Accents (for features/levels)
className="bg-violet-500"       // Violet
className="bg-blue-500"         // Blue
className="bg-green-500"        // Green
// ...see theme.colors.accent for all

// Semantic
className="text-green-500"      // Success
className="text-red-500"        // Error
```

## Glass Morphism

```tsx
<div className={cn(
  glassClasses.card,
  'p-8 rounded-3xl shadow-lg'
)}>
  Premium glass card
</div>
```

## Animations

Use Framer Motion variants from `theme.animationVariants`:

```tsx
import { motion } from 'framer-motion';

// Fade up
<motion.div
  variants={theme.animationVariants.fadeUp}
  initial="hidden"
  animate="visible"
>

// Scale in
<motion.div variants={theme.animationVariants.scaleIn}>

// Staggered children
<motion.div variants={theme.animationVariants.container}>
  {items.map(item => (
    <motion.div variants={theme.animationVariants.fadeUp} />
  ))}
</motion.div>
```

## Accessibility

Always respect reduced motion:

```tsx
import { useReducedMotion } from 'framer-motion';
import { getScale, getAnimation } from '@/styles/theme';

const shouldReduceMotion = useReducedMotion();

<motion.div whileHover={{ scale: getScale(shouldReduceMotion, 1.05) }}>
```

## Typography

Fonts configured in `index.css`:
- **Headings**: ABeeZee
- **Body**: Lexend

```tsx
// Font sizes
className="text-base"    // 16px - Body
className="text-xl"      // 20px - Large body
className="text-2xl"     // 24px - Subheadings
className="text-4xl"     // 36px - Section titles
className="text-6xl"     // 60px - Hero headings

// Weights
className="font-medium"  // 500
className="font-bold"    // 700 - Buttons
className="font-black"   // 900 - Hero text
```

## Common Patterns

### Primary Button
```tsx
<button className={cn(
  gradientClasses.primary,
  'px-10 py-5 text-white font-bold rounded-2xl shadow-lg',
  'hover:shadow-xl transition-shadow'
)}>
  Click Me
</button>
```

### Glass Card
```tsx
<div className={cn(
  glassClasses.card,
  'p-8 rounded-3xl shadow-lg'
)}>
  <h3 className="text-2xl font-bold text-slate-800">Title</h3>
  <p className="text-slate-600">Description</p>
</div>
```

### Icon Container
```tsx
<div className="w-12 h-12 rounded-xl bg-violet-500 flex items-center justify-center shadow-lg">
  <Icon className="w-6 h-6 text-white" />
</div>
```

### Section Layout
```tsx
<section className="container mx-auto px-4 py-20">
  <div className="max-w-6xl mx-auto">
    {/* Content */}
  </div>
</section>
```

## Best Practices

1. **Use Tailwind classes directly** for most styling
2. **Import theme values** only when needed for dynamic styles
3. **Use `cn()` utility** to combine class names
4. **Respect reduced motion** with `getScale()` and `getAnimation()`
5. **Maintain WCAG AA contrast** for all text
6. **Use generous spacing** (px-10 py-5 for buttons, space-y-6 for sections)
7. **Add focus states** for keyboard navigation

## Spacing

Use Tailwind's default scale (4px increments):
```tsx
className="p-4"      // 16px padding
className="gap-6"    // 24px gap
className="space-y-8" // 32px vertical spacing
```

Common values in `theme.spacing`: xs, sm, md, lg, xl, 2xl

## Border Radius

```tsx
className="rounded-xl"   // 12px - Icons
className="rounded-2xl"  // 16px - Buttons, small cards
className="rounded-3xl"  // 24px - Large cards
className="rounded-full" // Circles
```

## Resources

- See `theme.ts` for all values
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
