import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, Music, Brain } from 'lucide-react';
import { theme, getAnimation } from '@/styles/theme';

/**
 * InteractiveDemoPreview Component
 *
 * Shows a preview of how the app works with an animated card demo.
 * Highlights three key features: interactive cards, professional audio, and smart repetition.
 *
 * Features:
 * - Glass morphism card styling
 * - Floating animation effects
 * - Decorative gradient blobs
 * - Responsive two-column layout
 */
export function InteractiveDemoPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="max-w-5xl mx-auto"
    >
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
        <span className={theme.gradientClasses.text}>Mira cómo funciona</span>
      </h2>
      <p className="text-xl md:text-2xl text-slate-600 text-center mb-16 max-w-3xl mx-auto leading-relaxed">
        Cada tarjeta incluye audio profesional y repetición inteligente para un aprendizaje efectivo
      </p>

      <div className="relative">
        {/* Glass morphism card container */}
        <motion.div
          animate={getAnimation(shouldReduceMotion, { y: [0, -10, 0] })}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={
            theme.glassClasses.card + ' rounded-3xl shadow-2xl p-8 md:p-12'
          }
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-violet-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Tarjetas Interactivas</h3>
                    <p className="text-slate-600">
                      Desde vocales simples hasta palabras complejas, adaptadas a cada nivel
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Audio Profesional</h3>
                    <p className="text-slate-600">
                      Pronunciación clara y natural con tecnología de voz avanzada
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Repetición Inteligente</h3>
                    <p className="text-slate-600">
                      Algoritmo FSRS para optimizar el aprendizaje y la retención
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <motion.div
                whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
                className={theme.gradientClasses.cardDemo + ' rounded-2xl p-12 shadow-2xl'}
              >
                <div className="bg-white rounded-xl p-8 text-center">
                  <div className="text-8xl mb-6">A</div>
                  <motion.button
                    whileHover={{ scale: shouldReduceMotion ? 1 : 1.1 }}
                    whileTap={{ scale: shouldReduceMotion ? 1 : 0.9 }}
                    className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg mx-auto"
                  >
                    <Music className="w-8 h-8 text-white" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          animate={getAnimation(shouldReduceMotion, { rotate: [0, 360] })}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full blur-3xl opacity-30"
        />
        <motion.div
          animate={getAnimation(shouldReduceMotion, { rotate: [360, 0] })}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-3xl opacity-30"
        />
      </div>
    </motion.div>
  );
}
