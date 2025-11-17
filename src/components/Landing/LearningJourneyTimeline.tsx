import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { theme } from '@/styles/theme';
import { TimelineStep } from './TimelineStep';

/**
 * LearningJourneyTimeline Component
 *
 * Displays the 10 progressive learning levels in a vertical timeline format.
 * Shows the educational progression from vowels to complex diphthongs.
 *
 * Features:
 * - Vertical timeline with gradient line
 * - Alternating left/right step positioning (desktop)
 * - Scroll-triggered animations for each step
 */
export function LearningJourneyTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const levels = [
    { number: 1, title: 'Vocales', description: 'A, E, I, O, U' },
    { number: 2, title: 'Sílabas Fáciles', description: 'ma, pa, sa, la...' },
    { number: 3, title: 'Todas las Sílabas', description: 'ta, da, fa, ba...' },
    { number: 4, title: 'Palabras de 2 Sílabas', description: 'casa, mesa, gato...' },
    { number: 5, title: 'Sílabas Cerradas', description: 'sol, pan, mar...' },
    { number: 6, title: 'Nombres Propios', description: 'Ana, México, Pedro...' },
    { number: 7, title: 'Dígrafos', description: 'ch, ll, rr' },
    { number: 8, title: 'Grupos Consonánticos', description: 'pla, bra, tra, gro...' },
    { number: 9, title: 'Palabras de 3+ Sílabas', description: 'elefante, mariposa...' },
    { number: 10, title: 'Diptongos Avanzados', description: 'ciudad, ratón, rey...' },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="max-w-6xl mx-auto"
    >
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
        <span className="text-slate-800">De sus primeras letras</span>
        <br />
        <span className={theme.gradientClasses.text}>a leer con confianza</span>
      </h2>
      <p className="text-xl md:text-2xl text-slate-600 text-center mb-16 max-w-3xl mx-auto leading-relaxed">
        Serás testigo de cada logro en su camino hacia la lectura
      </p>

      <div className="relative">
        {/* Timeline line */}
        <div className={'hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 ' + theme.gradientClasses.timeline + ' transform -translate-x-1/2'} />

        <div className="space-y-8">
          {levels.map((level, index) => (
            <TimelineStep key={index} {...level} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
