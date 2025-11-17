import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Trophy, Sparkles, Clock } from 'lucide-react';
import { theme } from '@/styles/theme';
import { FeatureCard } from './FeatureCard';

/**
 * KeyFeaturesGrid Component
 *
 * Displays the main features of the app in a responsive grid.
 * Features include personalized learning, progressive levels, fun interface, and short sessions.
 *
 * Features:
 * - Staggered animation using container variants
 * - Responsive grid layout (1-4 columns)
 * - Icon variety with different gradient backgrounds
 */
export function KeyFeaturesGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: <Target className="w-12 h-12" />,
      title: 'Se Adapta a Tu Hij@',
      description: 'Cada niñ@ aprende a su ritmo. Repitis se ajusta automáticamente para mantenerlo motivado',
      gradient: 'from-violet-500 to-purple-600',
    },
    {
      icon: <Trophy className="w-12 h-12" />,
      title: 'Progreso Visible',
      description: 'Verás a tu hij@ avanzar desde sus primeras letras hasta leer palabras completas',
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      icon: <Sparkles className="w-12 h-12" />,
      title: 'Sin Distracciones',
      description: 'Diseñado para el aprendizaje genuino, no para adicción a pantallas',
      gradient: 'from-pink-500 to-rose-600',
    },
    {
      icon: <Clock className="w-12 h-12" />,
      title: 'Solo 10 Minutos',
      description: 'Tiempo perfecto para mantener su atención sin frustración',
      gradient: 'from-green-500 to-emerald-600',
    },
  ];

  return (
    <motion.div
      ref={ref}
      variants={theme.animationVariants.container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="max-w-7xl mx-auto"
    >
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
        <span className="text-slate-800">Diseñado para</span>
        <br />
        <span className={theme.gradientClasses.text}>el éxito de tu hij@</span>
      </h2>
      <p className="text-xl md:text-2xl text-slate-600 text-center mb-16 max-w-3xl mx-auto leading-relaxed">
        Cada detalle pensado para que disfruten aprender juntos
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </motion.div>
  );
}
