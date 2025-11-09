import { motion, useReducedMotion } from 'framer-motion';
import { theme } from '@/styles/theme';

/**
 * Props for the FeatureCard component
 */
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

/**
 * FeatureCard Component
 *
 * Displays a feature with an icon, title, and description.
 * Uses glass morphism styling and subtle hover animations.
 *
 * @param icon - Lucide icon component to display
 * @param title - Feature title
 * @param description - Feature description text
 * @param gradient - Tailwind gradient class for icon background
 */
export function FeatureCard({ icon, title, description, gradient }: FeatureCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={theme.animationVariants.featureCard}
      whileHover={shouldReduceMotion ? {} : 'hover'}
      className={theme.glassClasses.card + ' rounded-3xl p-8 shadow-lg'}
    >
      <div className={`inline-flex p-4 bg-gradient-to-br ${gradient} rounded-2xl text-white shadow-lg mb-6`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-slate-800 mb-4">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}
