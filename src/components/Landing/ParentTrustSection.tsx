import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Award, Users, TrendingUp, CheckCircle } from 'lucide-react';
import { theme } from '@/styles/theme';
import { TrustCard } from './TrustCard';

/**
 * ParentTrustSection Component
 *
 * Displays trust indicators to reassure parents about the app's quality.
 * Features a gradient background with glass morphism cards.
 *
 * Highlights:
 * - Science-based methodology (FSRS)
 * - Educator-designed content
 * - Privacy and safety
 * - Proven results
 */
export function ParentTrustSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const trustIndicators = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Basado en Ciencia',
      description: 'Utiliza FSRS, el algoritmo de repetición espaciada más avanzado',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Diseñado por Educadores',
      description: 'Creado con expertos en desarrollo infantil y lectoescritura',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Seguro y Privado',
      description: 'Sin anuncios, sin compras dentro de la app, datos protegidos',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Resultados Comprobados',
      description: 'Mejora la lectura en semanas con práctica diaria',
    },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="max-w-6xl mx-auto"
    >
      <div className={theme.gradientClasses.cardTrust + ' rounded-3xl p-12 md:p-16 shadow-2xl'}>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6" style={{ color: theme.colors.text.primary }}>
          La confianza de las familias
        </h2>
        <p className="text-xl md:text-2xl text-center mb-16 max-w-3xl mx-auto leading-relaxed" style={{ color: theme.colors.text.secondary }}>
          Más que una app, es una herramienta educativa respaldada por ciencia y diseñada con amor
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {trustIndicators.map((indicator, index) => (
            <TrustCard key={index} {...indicator} delay={index * 0.1} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="inline-flex items-center gap-3 bg-white backdrop-blur-sm rounded-full px-8 py-4 border border-violet-200 shadow-lg"
            style={{ color: theme.colors.brand.violet }}
          >
            <CheckCircle className="w-6 h-6" />
            <span className="text-lg font-semibold">Prueba gratis, sin riesgo, sin tarjeta de crédito</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
