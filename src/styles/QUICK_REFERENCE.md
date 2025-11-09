# Repitis Theme Quick Reference

A one-page cheat sheet for the most commonly used theme tokens and patterns.

## Import Statement

```typescript
import {
  theme,
  gradientClasses,
  glassMorphismClasses,
  cn,
  getScale,
  getAnimation
} from '@/styles/theme';
import { useReducedMotion } from 'framer-motion';
```

## Most Used Gradient Classes

```tsx
// Brand gradient (violet → fuchsia → pink)
className={gradientClasses.brand.primary}

// Brand gradient text
className={gradientClasses.brand.text}

// Background gradient
className={gradientClasses.brand.background}

// Light gradient for badges
className={gradientClasses.brand.light}

// Hover state (lighter version)
className={gradientClasses.brand.hover}
```

## Feature Gradients

```tsx
// Icon containers and variety
gradientClasses.feature.violet   // Violet → Purple
gradientClasses.feature.blue     // Blue → Cyan
gradientClasses.feature.pink     // Pink → Rose
gradientClasses.feature.green    // Green → Emerald
gradientClasses.feature.yellow   // Yellow → Orange
```

## Glass Morphism

```tsx
// Standard glass card
className={glassMorphismClasses.card}
// = bg-white/70 backdrop-blur-xl border border-white/20

// Light overlay
className={glassMorphismClasses.overlay}
// = bg-white/50 backdrop-blur-sm

// Subtle effect
className={glassMorphismClasses.subtle}
// = bg-white/10 backdrop-blur-sm border border-white/20
```

## Common Button Patterns

### Primary Button
```tsx
<motion.button
  whileHover={{ scale: getScale(shouldReduceMotion, 1.05) }}
  whileTap={{ scale: getScale(shouldReduceMotion, 0.95) }}
  className={cn(
    gradientClasses.brand.primary,
    'px-10 py-5 text-white text-xl font-bold rounded-2xl shadow-lg',
    'transition-shadow duration-300 hover:shadow-2xl'
  )}
>
  Button Text
</motion.button>
```

### Secondary Button
```tsx
<motion.button
  whileHover={{ scale: getScale(shouldReduceMotion, 1.05) }}
  whileTap={{ scale: getScale(shouldReduceMotion, 0.95) }}
  className="px-10 py-5 bg-white text-violet-700 text-xl font-bold rounded-2xl shadow-lg border-2 border-violet-200 hover:border-violet-400 transition-colors"
>
  Button Text
</motion.button>
```

### Text Button
```tsx
<motion.button
  whileHover={{ scale: getScale(shouldReduceMotion, 1.05) }}
  whileTap={{ scale: getScale(shouldReduceMotion, 0.95) }}
  className="px-6 py-2 text-violet-700 font-semibold hover:text-violet-900 transition-colors"
>
  Button Text
</motion.button>
```

## Common Card Patterns

### Glass Card
```tsx
<motion.div
  variants={theme.animationVariants.featureCard}
  whileHover="hover"
  className={cn(
    glassMorphismClasses.card,
    'p-8 rounded-3xl shadow-lg'
  )}
>
  {/* Card content */}
</motion.div>
```

### Floating Card
```tsx
<motion.div
  animate={getAnimation(shouldReduceMotion, {
    y: [0, -10, 0],
  })}
  transition={{
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut',
  }}
  className={cn(
    glassMorphismClasses.card,
    'p-12 rounded-3xl shadow-2xl'
  )}
>
  {/* Card content */}
</motion.div>
```

## Animation Variants

```tsx
// Feature card with stagger
<motion.div variants={theme.animationVariants.container}>
  {items.map((item, i) => (
    <motion.div key={i} variants={theme.animationVariants.featureCard}>
      {item}
    </motion.div>
  ))}
</motion.div>

// Fade up
<motion.div variants={theme.animationVariants.fadeUp}>

// Scale in
<motion.div variants={theme.animationVariants.scaleIn}>

// Title
<motion.div variants={theme.animationVariants.title}>

// Magnetic button
<motion.button variants={theme.animationVariants.magneticButton}>
```

## Icon Container

```tsx
<div className={cn(
  gradientClasses.feature.violet,
  'w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg'
)}>
  <Icon className="w-6 h-6" />
</div>
```

## Badge

```tsx
<div className={cn(
  gradientClasses.brand.light,
  'inline-block px-6 py-2 rounded-full border-2 border-violet-200'
)}>
  <span className="text-sm font-bold text-violet-700">
    Badge Text
  </span>
</div>
```

## Text Styles

### Hero Title
```tsx
<h1 className="text-6xl md:text-7xl font-black tracking-tight">
  <span className={gradientClasses.brand.text}>
    Main Title
  </span>
  <br />
  <span className="text-slate-800">Secondary Line</span>
</h1>
```

### Section Title
```tsx
<h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
  <span className={gradientClasses.brand.text}>
    Section Title
  </span>
</h2>
```

### Body Text
```tsx
<p className="text-xl text-slate-600 leading-relaxed">
  Body text with good readability
</p>
```

## Scroll-Triggered Animation

```tsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin: '-100px' });

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 60 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.8 }}
>
  {/* Content */}
</motion.div>
```

## Responsive Layout

```tsx
<section className="relative z-10 container mx-auto px-4 py-20 md:py-32">
  <div className="max-w-6xl mx-auto">
    {/* Content */}
  </div>
</section>
```

## Reduced Motion Pattern

```tsx
const shouldReduceMotion = useReducedMotion();

// For scale
whileHover={{ scale: getScale(shouldReduceMotion, 1.05) }}

// For animations
animate={getAnimation(shouldReduceMotion, { y: [0, -10, 0] })}

// For conditional rendering
{!shouldReduceMotion && <AnimatedElement />}
```

## Color Reference

### Brand Colors
- `violet-600`: #7c3aed
- `fuchsia-600`: #c026d3
- `pink-600`: #db2777

### Neutral Colors
- `slate-800`: #1e293b (primary text)
- `slate-600`: #475569 (secondary text)
- `slate-400`: #94a3b8 (tertiary text)
- `slate-200`: #e2e8f0 (borders)
- `slate-50`: #f8fafc (backgrounds)

## Border Radius Reference

- `rounded-xl`: 12px (icons)
- `rounded-2xl`: 16px (buttons, small cards)
- `rounded-3xl`: 24px (large cards)
- `rounded-full`: Perfect circle

## Shadow Reference

- `shadow-lg`: Default cards
- `shadow-xl`: Hover states
- `shadow-2xl`: Modals, premium sections

## Spacing Reference

- `p-4`: 16px
- `p-6`: 24px
- `p-8`: 32px
- `p-12`: 48px
- `gap-4`: 16px
- `gap-6`: 24px
- `gap-8`: 32px

## Common Utility Functions

```tsx
// Combine classes
cn('base-class', condition && 'conditional-class')

// Responsive scale
getScale(shouldReduceMotion, 1.05)

// Conditional animation
getAnimation(shouldReduceMotion, { y: [0, -10, 0] })
```

## Full Example: Feature Card

```tsx
import { motion, useReducedMotion } from 'framer-motion';
import { theme, gradientClasses, glassMorphismClasses, cn } from '@/styles/theme';
import { BookOpen } from 'lucide-react';

function FeatureCard() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={theme.animationVariants.featureCard}
      initial="hidden"
      animate="visible"
      whileHover={shouldReduceMotion ? {} : "hover"}
      className={cn(
        glassMorphismClasses.card,
        'p-8 rounded-3xl shadow-lg'
      )}
    >
      <div className={cn(
        gradientClasses.feature.violet,
        'inline-flex p-4 rounded-2xl text-white shadow-lg mb-6'
      )}>
        <BookOpen className="w-12 h-12" />
      </div>
      <h3 className="text-2xl font-bold text-slate-800 mb-4">
        Feature Title
      </h3>
      <p className="text-slate-600 leading-relaxed">
        Feature description with good readability and spacing
      </p>
    </motion.div>
  );
}
```

---

**Need more details?** See [THEME_GUIDE.md](./THEME_GUIDE.md) for comprehensive documentation.
