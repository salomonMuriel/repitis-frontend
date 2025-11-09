import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, Target, TrendingUp, Flame, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import Header from '../components/Layout/Header';
import { api } from '../services/api';
import { theme, getScale } from '@/styles/theme';
import { FloatingLettersBackground } from '@/components/Landing';

/**
 * Dashboard Page
 *
 * Main dashboard for authenticated users showing their learning progress,
 * statistics, and quick access to review sessions.
 *
 * Features:
 * - Premium glass morphism cards
 * - Smooth animations and micro-interactions
 * - Brand gradient consistency
 * - Floating letters background
 * - Responsive grid layout
 */
export default function Dashboard() {
  const shouldReduceMotion = useReducedMotion();
  const { data: stats, isLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: () => api.getStats(),
  });

  if (isLoading) {
    return (
      <div className={theme.gradientClasses.background + ' min-h-screen'}>
        <FloatingLettersBackground />
        <Header />
        <div className="relative z-10 flex items-center justify-center h-96">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="inline-block mb-4"
            >
              <Sparkles className="w-12 h-12 text-violet-600" />
            </motion.div>
            <p className="text-2xl font-bold text-slate-700">Cargando...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  const totalCards = stats?.level_progress.reduce((sum, lp) => sum + lp.total_cards, 0) || 0;
  const masteredCards = stats?.level_progress.reduce((sum, lp) => sum + lp.mastered_cards, 0) || 0;

  return (
    <div className={theme.gradientClasses.background + ' min-h-screen'}>
      <FloatingLettersBackground />
      <Header />

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-16"
        >
          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <span className={theme.gradientClasses.text}>¡Hola!</span>
          </motion.h1>
          <motion.p
            className="text-2xl md:text-3xl lg:text-4xl text-slate-600 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            ¿Listo para aprender hoy?
          </motion.p>
        </motion.div>

        {/* Quick Action Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-10 md:mb-16"
        >
          <Link to="/review">
            <motion.div
              whileHover={{
                scale: getScale(shouldReduceMotion, 1.02),
                y: getScale(shouldReduceMotion, -8),
              }}
              whileTap={{ scale: getScale(shouldReduceMotion, 0.98) }}
              className={theme.gradientClasses.primary + ' rounded-3xl shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(139,92,246,0.5)] p-8 md:p-12 text-white cursor-pointer relative overflow-hidden group transition-shadow duration-300'}
            >
              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-violet-700 via-fuchsia-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <motion.h2
                    className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    ¡Comienza a Repasar!
                  </motion.h2>
                  <div className="flex flex-col md:flex-row items-center gap-3 text-xl md:text-2xl opacity-95">
                    <span className="font-bold">Nivel {stats?.current_level || 1}</span>
                    <span className="hidden md:inline">•</span>
                    <span className="font-medium">{stats?.today_reviews || 0} reseñas hoy</span>
                  </div>
                </div>
                <motion.div
                  className="text-7xl md:text-8xl"
                  animate={{
                    scale: shouldReduceMotion ? 1 : [1, 1.1, 1],
                    rotate: shouldReduceMotion ? 0 : [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  📚
                </motion.div>
              </div>

              {/* Animated arrow */}
              <motion.div
                className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={shouldReduceMotion ? {} : {
                  x: [0, 8, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <ArrowRight className="w-10 h-10" />
              </motion.div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-16"
          variants={theme.animationVariants.container}
          initial="hidden"
          animate="visible"
        >
          <StatCard
            icon={<Target size={32} />}
            value={totalCards}
            label="Total Tarjetas"
            delay={0.4}
            gradient="from-blue-500 to-cyan-500"
            shouldReduceMotion={shouldReduceMotion}
          />
          <StatCard
            icon={<BookOpen size={32} />}
            value={masteredCards}
            label="Dominadas"
            delay={0.5}
            gradient="from-green-500 to-emerald-500"
            shouldReduceMotion={shouldReduceMotion}
          />
          <StatCard
            icon={<Flame size={32} />}
            value={stats?.current_streak || 0}
            label="Racha Actual"
            delay={0.6}
            gradient="from-orange-500 to-rose-500"
            shouldReduceMotion={shouldReduceMotion}
          />
          <StatCard
            icon={<Calendar size={32} />}
            value={stats?.today_reviews || 0}
            label="Hoy"
            delay={0.7}
            gradient="from-purple-500 to-pink-500"
            shouldReduceMotion={shouldReduceMotion}
          />
        </motion.div>

        {/* Progress Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className={theme.glassClasses.card + ' rounded-3xl shadow-2xl p-8 md:p-12'}
        >
          <div className="flex items-center gap-4 mb-10">
            <motion.div
              className="p-4 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl text-white shadow-xl"
              whileHover={{
                scale: getScale(shouldReduceMotion, 1.1),
                rotate: getScale(shouldReduceMotion, 5)
              }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
            >
              <TrendingUp className="w-8 h-8" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-800 tracking-tight">
              Tu Progreso por Nivel
            </h2>
          </div>

          <div className="space-y-6">
            {stats?.level_progress.slice(0, 3).map((level, index) => (
              <ProgressItem
                key={level.level_id}
                label={level.level_name}
                value={level.mastered_cards}
                total={level.total_cards}
                index={index}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/levels">
              <motion.button
                whileHover={{
                  scale: getScale(shouldReduceMotion, 1.05),
                  y: getScale(shouldReduceMotion, -4)
                }}
                whileTap={{ scale: getScale(shouldReduceMotion, 0.95) }}
                className="px-10 py-5 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white text-lg md:text-xl font-black rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-violet-500/30 transition-all duration-300"
              >
                Ver Todos los Niveles
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * StatCard Component
 *
 * Glass morphism card displaying a statistic with icon, value, and label.
 * Features hover elevation and smooth animations.
 */
function StatCard({
  icon,
  value,
  label,
  delay,
  gradient,
  shouldReduceMotion,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  delay: number;
  gradient: string;
  shouldReduceMotion: boolean | null;
}) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{
        scale: getScale(shouldReduceMotion, 1.05),
        y: getScale(shouldReduceMotion, -8),
        transition: { duration: 0.2 }
      }}
      className={theme.glassClasses.card + ' rounded-3xl p-6 md:p-8 text-center shadow-xl hover:shadow-2xl transition-shadow duration-300'}
    >
      <motion.div
        className={`inline-flex p-4 bg-gradient-to-br ${gradient} rounded-2xl text-white shadow-lg mb-5`}
        whileHover={{
          rotate: getScale(shouldReduceMotion, 10),
          scale: getScale(shouldReduceMotion, 1.15)
        }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
      >
        {icon}
      </motion.div>
      <motion.div
        className="text-5xl md:text-6xl font-black text-slate-800 mb-3"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: delay + 0.2, duration: 0.5, type: 'spring' }}
      >
        {value}
      </motion.div>
      <div className="text-sm md:text-base font-bold text-slate-600">{label}</div>
    </motion.div>
  );
}

/**
 * ProgressItem Component
 *
 * Displays progress for a single level with animated gradient progress bar.
 */
function ProgressItem({
  label,
  value,
  total,
  index,
}: {
  label: string;
  value: number;
  total: number;
  index: number;
  shouldReduceMotion?: boolean | null;
}) {
  const shouldReduceMotion = useReducedMotion();
  const percentage = total > 0 ? (value / total) * 100 : 0;

  // Gradient colors cycle through brand colors
  const gradients = [
    'from-violet-500 via-fuchsia-500 to-pink-500',
    'from-blue-500 via-violet-500 to-purple-500',
    'from-fuchsia-500 via-pink-500 to-rose-500',
  ];
  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-4">
        <span className="font-black text-xl md:text-2xl text-slate-800">{label}</span>
        <span className="text-slate-600 font-bold text-lg">
          {value} / {total}
        </span>
      </div>
      <div className="w-full bg-slate-200/60 rounded-full h-4 overflow-hidden backdrop-blur-sm shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: 1.2,
            delay: 1 + index * 0.1,
            ease: 'easeOut'
          }}
          className={`bg-gradient-to-r ${gradient} h-4 rounded-full relative shadow-lg`}
        >
          {/* Shine effect - enhanced */}
          {!shouldReduceMotion && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{
                x: ['-100%', '200%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: 'linear'
              }}
            />
          )}
        </motion.div>
      </div>
      {percentage === 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 + index * 0.1, type: 'spring', stiffness: 300 }}
          className="mt-3 text-green-600 font-black text-base flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          ¡Completado!
        </motion.div>
      )}
    </motion.div>
  );
}
