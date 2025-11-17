import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, Lock, Sparkles, Trophy, TrendingUp, Target, BookOpen, Flame, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header';
import { TrialBanner } from '../components/TrialBanner';
import { ActivationModal } from '../components/ActivationModal';
import { api } from '../services/api';
import { theme, getScale, getAnimation } from '@/styles/theme';

/**
 * Levels Page - Premium Design
 *
 * Displays all learning levels with progress tracking.
 * Features glass morphism cards, smooth animations, and premium gradients.
 */
export default function Levels() {
  const shouldReduceMotion = useReducedMotion();
  const [showActivationModal, setShowActivationModal] = useState(false);
  const queryClient = useQueryClient();

  const { data: levels, isLoading } = useQuery({
    queryKey: ['levels'],
    queryFn: () => api.getLevels(),
  });

  const { data: stats } = useQuery({
    queryKey: ['stats'],
    queryFn: () => api.getStats(),
  });

  // Calculate overall progress
  const overallProgress = levels
    ? Math.round(
        levels.reduce((sum, level) => sum + level.progress_percentage, 0) / levels.length
      )
    : 0;

  const totalCards = stats?.level_progress.reduce((sum, lp) => sum + lp.total_cards, 0) || 0;
  const masteredCards = stats?.level_progress.reduce((sum, lp) => sum + lp.mastered_cards, 0) || 0;

  if (isLoading) {
    return (
      <div className={theme.gradientClasses.background + ' min-h-screen'}>
        <Header />
        <div className="flex items-center justify-center h-96">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-12 h-12 text-violet-600" />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={theme.gradientClasses.background + ' min-h-screen'}>
      <Header />

      <div className="container mx-auto px-4 py-10 md:py-16">
        {/* Hero Section */}
        <motion.div
          variants={theme.animationVariants.title}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gradient-to-r from-violet-100 to-pink-100 rounded-full border-2 border-violet-200 shadow-lg"
          >
            <Trophy className="w-6 h-6 text-violet-600" />
            <span className="text-base md:text-lg font-bold text-violet-700">
              Tu Progreso de Aprendizaje
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-6">
            <span className={theme.gradientClasses.text}>Niveles de Lectura</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Domina 10 niveles progresivos desde vocales hasta patrones complejos
          </p>
        </motion.div>

        {/* Trial Banner */}
        <div className="max-w-5xl mx-auto">
          {stats && (
            <TrialBanner
              trialDaysRemaining={stats.trial_days_remaining ?? 7}
              isPremium={stats.is_premium ?? false}
              compact={false}
              onActivateClick={() => setShowActivationModal(true)}
            />
          )}
        </div>

        {/* Activation Modal */}
        <ActivationModal
          isOpen={showActivationModal}
          onClose={() => setShowActivationModal(false)}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ['stats'] });
          }}
        />

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 max-w-5xl mx-auto"
          variants={theme.animationVariants.container}
          initial="hidden"
          animate="visible"
        >
          <StatCard
            icon={<Target size={32} />}
            value={totalCards}
            label="Total Tarjetas"
            delay={0.2}
            gradient="from-blue-500 to-cyan-500"
            shouldReduceMotion={shouldReduceMotion}
          />
          <StatCard
            icon={<BookOpen size={32} />}
            value={masteredCards}
            label="Dominadas"
            delay={0.3}
            gradient="from-green-500 to-emerald-500"
            shouldReduceMotion={shouldReduceMotion}
          />
          <StatCard
            icon={<Flame size={32} />}
            value={stats?.current_streak || 0}
            label="Racha Actual"
            delay={0.4}
            gradient="from-orange-500 to-rose-500"
            shouldReduceMotion={shouldReduceMotion}
          />
          <StatCard
            icon={<Calendar size={32} />}
            value={stats?.today_reviews || 0}
            label="Hoy"
            delay={0.5}
            gradient="from-purple-500 to-pink-500"
            shouldReduceMotion={shouldReduceMotion}
          />
        </motion.div>

        {/* Levels Grid */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={getAnimation(shouldReduceMotion, theme.animationVariants.container)}
            initial="hidden"
            animate="visible"
            className="grid gap-6 md:gap-8"
          >
            {levels?.map((level, index) => (
              <LevelCard key={level.id} level={level} index={index} />
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        {overallProgress < 100 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 text-center"
          >
            <Link to="/repasar">
              <motion.button
                whileHover={{
                  scale: getScale(shouldReduceMotion, 1.05),
                  boxShadow: getScale(shouldReduceMotion) === 1
                    ? undefined
                    : '0 25px 50px -12px rgba(139, 92, 246, 0.5), 0 0 60px rgba(236, 72, 153, 0.3)'
                }}
                whileTap={{ scale: getScale(shouldReduceMotion, 0.95) }}
                className="px-12 py-6 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white text-xl md:text-2xl font-black rounded-2xl shadow-2xl hover:shadow-violet-500/50 transition-all duration-300"
              >
                <span className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6" />
                  Continuar Aprendiendo
                  <Sparkles className="w-6 h-6" />
                </span>
              </motion.button>
            </Link>
          </motion.div>
        )}
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
 * Level Card Component
 * Premium glass morphism card for each level with progress tracking
 */
function LevelCard({
  level,
  index,
}: {
  level: {
    id: number;
    name: string;
    description: string;
    mastery_threshold: number;
    is_unlocked: boolean;
    progress_percentage: number;
  };
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const isLocked = !level.is_unlocked;
  const isComplete = level.progress_percentage >= 100;

  // Level-specific gradient colors
  const levelGradients = [
    'from-violet-500 to-purple-500',
    'from-purple-500 to-fuchsia-500',
    'from-fuchsia-500 to-pink-500',
    'from-pink-500 to-rose-500',
    'from-rose-500 to-orange-500',
    'from-orange-500 to-amber-500',
    'from-amber-500 to-yellow-500',
    'from-yellow-500 to-lime-500',
    'from-lime-500 to-green-500',
    'from-green-500 to-emerald-500',
  ];

  const gradient = levelGradients[level.id - 1] || levelGradients[0];

  return (
    <motion.div
      variants={getAnimation(shouldReduceMotion, theme.animationVariants.featureCard)}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={
        !isLocked
          ? {
              scale: getScale(shouldReduceMotion, 1.02),
              y: getScale(shouldReduceMotion, 1) === 1 ? 0 : -6,
            }
          : undefined
      }
      className={
        theme.glassClasses.card +
        ' p-8 md:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 ' +
        (isLocked ? 'opacity-60' : '')
      }
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Left Section: Icon, Title, Description */}
        <div className="flex-1">
          <div className="flex items-start gap-5 mb-6">
            {/* Level Number Badge */}
            <motion.div
              whileHover={{ rotate: getScale(shouldReduceMotion, 360) }}
              transition={{ duration: 0.6 }}
              className={`flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-xl`}
            >
              <span className="text-3xl font-black text-white">{level.id}</span>
            </motion.div>

            <div className="flex-1">
              {/* Title and Status Icon */}
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl md:text-3xl font-black text-slate-800">{level.name}</h2>
                {isComplete ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                  >
                    <CheckCircle2 className="text-green-500 w-7 h-7" />
                  </motion.div>
                ) : isLocked ? (
                  <Lock className="text-slate-400 w-6 h-6" />
                ) : (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="text-violet-500 w-6 h-6" />
                  </motion.div>
                )}
              </div>

              {/* Description */}
              <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                {level.description}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm font-bold mb-2">
              <span className="text-slate-700">Progreso</span>
              <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                {level.progress_percentage.toFixed(0)}%
              </span>
            </div>
            <div className="relative w-full h-4 bg-slate-200 rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${level.progress_percentage}%` }}
                transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
                className={`absolute top-0 left-0 h-full bg-gradient-to-r ${gradient} rounded-full shadow-lg`}
              >
                {/* Animated shine effect */}
                <motion.div
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  style={{ width: '50%' }}
                />
              </motion.div>
            </div>
          </div>

          {/* Status Text */}
          <div className="flex items-center gap-2">
            {isComplete && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 text-sm font-bold rounded-full shadow-md"
              >
                <Trophy className="w-4 h-4" />
                Nivel Completado
              </motion.span>
            )}
            {!isComplete && !isLocked && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${gradient} text-white text-sm font-bold rounded-full shadow-md`}
              >
                <TrendingUp className="w-4 h-4" />
                En Progreso
              </motion.span>
            )}
            {isLocked && (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-600 text-sm font-bold rounded-full shadow-md">
                <Lock className="w-4 h-4" />
                Bloqueado
              </span>
            )}
          </div>
        </div>

        {/* Right Section: CTA Button (if unlocked and not complete) */}
        {!isLocked && !isComplete && (
          <div className="md:flex-shrink-0">
            <Link to="/repasar">
              <motion.button
                whileHover={{
                  scale: getScale(shouldReduceMotion, 1.05),
                  boxShadow: getScale(shouldReduceMotion) === 1
                    ? undefined
                    : '0 20px 40px -12px rgba(0, 0, 0, 0.3), 0 0 40px rgba(139, 92, 246, 0.4)'
                }}
                whileTap={{ scale: getScale(shouldReduceMotion, 0.95) }}
                className={`w-full md:w-auto px-10 py-5 bg-gradient-to-r ${gradient} text-white text-lg font-black rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300`}
              >
                Practicar
              </motion.button>
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}
