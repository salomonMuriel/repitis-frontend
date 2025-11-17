import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Zap, CheckCircle, ShoppingCart } from 'lucide-react';
import { theme, getAnimation, getScale } from '@/styles/theme';

/**
 * FinalCTA Component
 *
 * The final call-to-action section encouraging users to sign up.
 * Features prominent button with gradient background and decorative elements.
 *
 * Features:
 * - Glass morphism card with gradient blobs
 * - Animated rocket emoji
 * - Magnetic button effect
 * - Trust indicators below button
 */
export function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="max-w-5xl mx-auto text-center"
    >
      <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-12 md:p-16 shadow-2xl border border-white/20 overflow-hidden">
        {/* Decorative gradient blobs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-violet-400 to-fuchsia-400 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2" />

        <div className="relative z-10">
          <motion.div
            animate={getAnimation(shouldReduceMotion, { rotate: [0, 10, -10, 0] })}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-7xl mb-6"
          >
            🚀
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-slate-800">Comienza la aventura</span>
            <br />
            <span className={theme.gradientClasses.text}>de aprender a leer</span>
          </h2>

          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Únete a miles de familias que están transformando el aprendizaje en momentos de alegría
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link to="/register">
              <motion.button
                variants={theme.animationVariants.magneticButton}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                className="relative px-12 py-6 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white text-2xl font-bold rounded-2xl shadow-2xl overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Prueba Aquí
                  <Zap className="w-7 h-7" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={getAnimation(shouldReduceMotion, { x: ['-100%', '100%'] })}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </motion.button>
            </Link>

            <Link to="/comprar">
              <motion.button
                whileHover={{ scale: getScale(shouldReduceMotion) }}
                whileTap={{ scale: getScale(shouldReduceMotion, 0.95) }}
                className="px-12 py-6 bg-white text-violet-600 text-2xl font-bold rounded-2xl shadow-xl border-2 border-violet-200 hover:border-violet-400 hover:shadow-2xl transition-all flex items-center gap-3"
              >
                Comprar Acceso
                <ShoppingCart className="w-7 h-7" />
              </motion.button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Prueba gratis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Sin anuncios</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Acceso completo $30,000</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
