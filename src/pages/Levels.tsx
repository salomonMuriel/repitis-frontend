import { useQuery } from '@tanstack/react-query';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, Lock, Sparkles, Trophy, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header';
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
  const { data: levels, isLoading } = useQuery({
    queryKey: ['levels'],
    queryFn: () => api.getLevels(),
  });

  // Calculate overall progress
  const overallProgress = levels
    ? Math.round(
        levels.reduce((sum, level) => sum + level.progress_percentage, 0) / levels.length
      )
    : 0;

  const unlockedCount = levels?.filter((l) => l.is_unlocked).length || 0;
  const totalLevels = levels?.length || 0;

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

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 max-w-5xl mx-auto"
        >
          <StatsCard
            icon={<TrendingUp className="w-6 h-6" />}
            label="Progreso General"
            value={`${overallProgress}%`}
            gradient="from-violet-500 to-purple-500"
          />
          <StatsCard
            icon={<CheckCircle2 className="w-6 h-6" />}
            label="Niveles Desbloqueados"
            value={`${unlockedCount}/${totalLevels}`}
            gradient="from-fuchsia-500 to-pink-500"
          />
          <StatsCard
            icon={<Sparkles className="w-6 h-6" />}
            label="Siguiente Nivel"
            value={unlockedCount < totalLevels ? `Nivel ${unlockedCount + 1}` : 'Completo'}
            gradient="from-pink-500 to-rose-500"
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
            <Link to="/dashboard">
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
 * Stats Card Component
 * Premium glass morphism card displaying key stats
 */
function StatsCard({
  icon,
  label,
  value,
  gradient,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  gradient: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={{
        scale: getScale(shouldReduceMotion, 1.02),
        y: getScale(shouldReduceMotion, 1) === 1 ? 0 : -6,
      }}
      className={
        theme.glassClasses.card +
        ' p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300'
      }
    >
      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${gradient} text-white mb-4 shadow-lg`}>
        {icon}
      </div>
      <div className="text-sm text-slate-600 font-semibold mb-2 uppercase tracking-wide">{label}</div>
      <div className="text-4xl font-black text-slate-800">{value}</div>
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
            <Link to="/dashboard">
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
