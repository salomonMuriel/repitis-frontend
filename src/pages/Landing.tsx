import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { theme, getScale } from '@/styles/theme';
import {
  FloatingLettersBackground,
  InteractiveDemoPreview,
  KeyFeaturesGrid,
  LearningJourneyTimeline,
  ParentTrustSection,
  FinalCTA,
} from '@/components/Landing';
import repitisVideo from '@/assets/repitis_sq.mp4';

/**
 * Landing Page
 *
 * Main landing page for Repitis - Spanish reading app for children ages 2-7.
 * Presents the app's value proposition, features, learning journey, and trust indicators.
 *
 * Structure:
 * - Floating letters background
 * - Navigation bar
 * - Hero section with CTA
 * - Interactive demo preview
 * - Key features grid
 * - Learning journey timeline (10 levels)
 * - Parent trust section
 * - Final CTA
 * - Footer
 */
export default function Landing() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={theme.gradientClasses.background + ' min-h-screen overflow-hidden'}>
      {/* Floating Letters Background */}
      <FloatingLettersBackground />

      {/* Navigation */}
      <nav className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={'text-3xl font-black ' + theme.gradientClasses.text}
          >
            Repitis
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex gap-4"
          >
            <Link to="/login">
              <motion.button
                whileHover={{ scale: getScale(shouldReduceMotion) }}
                whileTap={{ scale: getScale(shouldReduceMotion, 0.95) }}
                className="px-6 py-2 text-violet-700 font-semibold hover:text-violet-900 transition-colors"
              >
                Iniciar Sesión
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 pt-2 pb-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Video - Left on desktop, after content on mobile */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center lg:justify-start order-2 lg:order-1"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full max-w-[280px] lg:max-w-[400px] rounded-3xl shadow-2xl"
              >
                <source src={repitisVideo} type="video/mp4" />
                Tu navegador no soporta el video.
              </video>
            </motion.div>

            {/* Content - Right on desktop, first on mobile */}
            <motion.div
              variants={theme.animationVariants.title}
              initial="hidden"
              animate="visible"
              className="order-1 lg:order-2 text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-violet-100 to-pink-100 rounded-full border-2 border-violet-200"
              >
                <span className="text-sm md:text-base font-bold text-violet-700">Edades 2-7 años</span>
              </motion.div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6">
                <span className={theme.gradientClasses.text}>Tu hij@ descubrirá</span>
                <br />
                <span className="text-slate-800">la magia de leer</span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-slate-600 mb-8">
                Repitis transforma el aprendizaje en momentos de alegría compartida. Más de 380 tarjetas
                interactivas diseñadas para que tu hij@ aprenda jugando.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link to="/register">
                  <motion.button
                    variants={theme.animationVariants.magneticButton}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    className="relative px-10 py-5 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white text-xl font-bold rounded-2xl shadow-lg overflow-hidden group"
                  >
                    <span className="relative z-10">Comenzar Ahora</span>
                    <motion.div
                      className={'absolute inset-0 ' + theme.gradientClasses.hover + ' opacity-0 group-hover:opacity-100 transition-opacity duration-300'}
                      animate={{
                        x: ['-100%', '100%'],
                      }}
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
                    className="px-10 py-5 bg-white text-violet-600 text-xl font-bold rounded-2xl shadow-lg border-2 border-violet-200 hover:border-violet-400 hover:shadow-xl transition-all"
                  >
                    Regalar Magia
                  </motion.button>
                </Link>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 text-slate-600 font-medium"
              >
                Prueba gratis 7 días · Acceso de por vida $30,000 · Sin suscripciones
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Preview */}
      <section className={'relative z-10 container mx-auto px-4 ' + theme.spacing.section}>
        <InteractiveDemoPreview />
      </section>

      {/* Key Features Grid */}
      <section className={'relative z-10 container mx-auto px-4 ' + theme.spacing.section}>
        <KeyFeaturesGrid />
      </section>

      {/* Learning Journey Timeline */}
      <section className={'relative z-10 container mx-auto px-4 ' + theme.spacing.section}>
        <LearningJourneyTimeline />
      </section>

      {/* Parent Trust Section */}
      <section className={'relative z-10 container mx-auto px-4 ' + theme.spacing.section}>
        <ParentTrustSection />
      </section>

      {/* Final CTA */}
      <section className={'relative z-10 container mx-auto px-4 ' + theme.spacing.section}>
        <FinalCTA />
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-slate-600 mb-4">
              Hecho con <Heart className="inline w-5 h-5 text-pink-500" /> para familias que aman aprender
            </p>
            <p className="text-sm text-slate-500">© 2025 Repitis. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
