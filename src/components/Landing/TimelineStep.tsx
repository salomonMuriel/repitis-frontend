import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

/**
 * Props for the TimelineStep component
 */
interface TimelineStepProps {
  number: number;
  title: string;
  description: string;
  index: number;
}

/**
 * TimelineStep Component
 *
 * Displays a single step in the learning journey timeline.
 * Alternates left/right positioning on larger screens for visual flow.
 *
 * @param number - Level number (1-10)
 * @param title - Level title
 * @param description - Level description (examples)
 * @param index - Array index for animation timing
 */
export function TimelineStep({ number, title, description, index }: TimelineStepProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const shouldReduceMotion = useReducedMotion();
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex items-center gap-8 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
    >
      <div className={`flex-1 ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
        <motion.div
          whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
          className="inline-block bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-2">{title}</h3>
          <p className="text-slate-600">{description}</p>
        </motion.div>
      </div>

      <div className="relative flex-shrink-0">
        <motion.div
          whileHover={{ scale: shouldReduceMotion ? 1 : 1.1, rotate: shouldReduceMotion ? 0 : 360 }}
          transition={{ duration: 0.4 }}
          className="w-16 h-16 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-black shadow-xl border-4 border-white"
        >
          {number}
        </motion.div>
      </div>

      <div className="flex-1 hidden lg:block" />
    </motion.div>
  );
}
