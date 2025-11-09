import { motion, useReducedMotion } from 'framer-motion';
import { theme } from '@/styles/theme';

/**
 * Props for the TrustCard component
 */
interface TrustCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

/**
 * TrustCard Component
 *
 * Displays a trust indicator with icon, title, and description.
 * Used within the ParentTrustSection to highlight key trust factors.
 *
 * @param icon - Lucide icon component
 * @param title - Trust indicator title
 * @param description - Trust indicator description
 * @param delay - Animation delay for staggered appearance
 */
export function TrustCard({ icon, title, description, delay }: TrustCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: shouldReduceMotion ? 1 : 1.03 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-violet-200 shadow-md"
    >
      <div className="flex items-start gap-4">
        <div
          className="flex-shrink-0 rounded-xl p-3"
          style={{ backgroundColor: theme.colors.brand.violet, color: 'white' }}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2" style={{ color: theme.colors.text.primary }}>
            {title}
          </h3>
          <p style={{ color: theme.colors.text.secondary }}>{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
