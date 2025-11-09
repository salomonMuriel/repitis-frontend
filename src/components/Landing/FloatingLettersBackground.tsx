import { motion, useReducedMotion } from 'framer-motion';

/**
 * FloatingLettersBackground Component
 *
 * Renders animated floating letters in the background of the landing page.
 * Creates a playful, educational atmosphere with subtle letter animations.
 *
 * Features:
 * - Respects reduced motion preferences
 * - Uses theme animation variants
 * - Strategically positioned letters using modulo math
 */
export function FloatingLettersBackground() {
  const shouldReduceMotion = useReducedMotion();
  const letters = ['A', 'B', 'C', 'M', 'P', 'S', 'L', 'T', 'R', 'E', 'O', 'I'];

  // Don't render if user prefers reduced motion
  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {letters.map((letter, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -20, 0],
          }}
          className="absolute text-8xl md:text-9xl font-black text-violet-200/20"
          style={{
            left: `${(index * 17 + 5) % 90}%`,
            top: `${(index * 23 + 10) % 80}%`,
          }}
          transition={{
            delay: index * 0.3,
            y: {
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.2,
            },
          }}
        >
          {letter}
        </motion.div>
      ))}
    </div>
  );
}
