import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Eye, Mic, Volume2, Star } from 'lucide-react';
import { theme, getAnimation } from '@/styles/theme';

type AnimationState = 'seeing' | 'thinking' | 'flipped' | 'rating';

/**
 * InteractiveDemoPreview Component
 *
 * Shows an auto-animated preview of how the app works with a self-playing card demo.
 * Loops through: child sees card → thinks → card flips with audio → rates with emojis
 *
 * Features:
 * - Auto-animated state machine (no user interaction)
 * - Matches actual Review component styling
 * - Glass morphism card styling
 * - Animated emojis for child actions
 * - Continuous loop (~2.5s cycle)
 */
export function InteractiveDemoPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const shouldReduceMotion = useReducedMotion();
  const [animationState, setAnimationState] = useState<AnimationState>('seeing');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const words = ['Aa', 'i', 'le', 'caso', 'fácil', 'pan', 'avión'];

  // Auto-animation state machine
  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;

    const timers: NodeJS.Timeout[] = [];

    // State transitions with timing
    const scheduleTransition = (delay: number, nextState: AnimationState, callback?: () => void) => {
      const timer = setTimeout(() => {
        setAnimationState(nextState);
        callback?.();
      }, delay);
      timers.push(timer);
    };

    // Animation sequence (loops continuously)
    const runSequence = (isFirstRun = false) => {
      // Cycle to next word at the start of each full cycle (but not on first run)
      if (!isFirstRun) {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }

      // 1. Child sees card (0-5000ms)
      setAnimationState('seeing');
      setSelectedRating(null);

      // 2. Child thinks/tries to read (5000-10000ms)
      scheduleTransition(5000, 'thinking');

      // 3. Card flips + audio plays (10000-15000ms)
      scheduleTransition(10000, 'flipped');

      // 4. Child rates (15000-20000ms)
      scheduleTransition(15000, 'rating', () => {
        // Auto-select rating emoji after brief pause
        setTimeout(() => setSelectedRating(4), 500); // Select happy face
      });

      // 5. Loop back to start (20000ms)
      const loopTimer = setTimeout(() => {
        runSequence();
      }, 20000);
      timers.push(loopTimer);
    };

    runSequence(true);

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [isInView, shouldReduceMotion]);

  const isFlipped = animationState === 'flipped' || animationState === 'rating';
  const currentWord = words[currentWordIndex];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="max-w-5xl mx-auto"
    >
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
        <span className={theme.gradientClasses.text}>Cómo funciona</span>
      </h2>
      <p className="text-xl md:text-2xl text-slate-600 text-center mb-16 max-w-3xl mx-auto leading-relaxed">
        Cuatro pasos simples para aprender a leer de forma efectiva
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
              {/* Mobile: Show only current step */}
              <div className="md:hidden">
                <AnimatePresence mode="wait">
                  {animationState === 'seeing' && (
                    <motion.div
                      key="seeing"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-violet-50/80 border-2 border-violet-300/50 shadow-lg"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-violet-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                        <Eye className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-slate-700 text-sm leading-snug">
                        Se ve una letra o palabra en pantalla y se prepara para leerla.
                      </p>
                    </motion.div>
                  )}

                  {animationState === 'thinking' && (
                    <motion.div
                      key="thinking"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-green-50/80 border-2 border-green-300/50 shadow-lg"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
                        <Mic className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-slate-700 text-sm leading-snug">
                        Se intenta leer la tarjeta en voz alta antes de voltearla.
                      </p>
                    </motion.div>
                  )}

                  {animationState === 'flipped' && (
                    <motion.div
                      key="flipped"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/80 border-2 border-blue-300/50 shadow-lg"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                        <Volume2 className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-slate-700 text-sm leading-snug">
                        Voltea la tarjeta para revelar la respuesta. El audio se reproduce automáticamente.
                      </p>
                    </motion.div>
                  )}

                  {animationState === 'rating' && (
                    <motion.div
                      key="rating"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/80 border-2 border-amber-300/50 shadow-lg"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                        <Star className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-slate-700 text-sm leading-snug">
                        Calificas qué tan bien lo hizo. Repitis usa esto para optimizar el aprendizaje.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Desktop: Show all steps with highlighting */}
              <div className="hidden md:block space-y-3">
                {/* Step 1 - Ve la tarjeta */}
                <motion.div
                  animate={{
                    scale: animationState === 'seeing' ? 1.03 : 1,
                    x: animationState === 'seeing' ? 6 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                    animationState === 'seeing'
                      ? 'bg-violet-50/80 border-2 border-violet-300/50 shadow-lg'
                      : 'border-2 border-transparent'
                  }`}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-violet-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-slate-700 text-sm leading-snug">
                    Se ve una letra o palabra en pantalla y se prepara para leerla.
                  </p>
                </motion.div>

                {/* Step 2 - Intenta leerla */}
                <motion.div
                  animate={{
                    scale: animationState === 'thinking' ? 1.03 : 1,
                    x: animationState === 'thinking' ? 6 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                    animationState === 'thinking'
                      ? 'bg-green-50/80 border-2 border-green-300/50 shadow-lg'
                      : 'border-2 border-transparent'
                  }`}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
                    <Mic className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-slate-700 text-sm leading-snug">
                    Se intenta leer la tarjeta en voz alta antes de voltearla.
                  </p>
                </motion.div>

                {/* Step 3 - Voltea y escucha */}
                <motion.div
                  animate={{
                    scale: animationState === 'flipped' ? 1.03 : 1,
                    x: animationState === 'flipped' ? 6 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                    animationState === 'flipped'
                      ? 'bg-blue-50/80 border-2 border-blue-300/50 shadow-lg'
                      : 'border-2 border-transparent'
                  }`}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                    <Volume2 className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-slate-700 text-sm leading-snug">
                    Voltea la tarjeta para revelar la respuesta. El audio se reproduce automáticamente.
                  </p>
                </motion.div>

                {/* Step 4 - Califica el resultado */}
                <motion.div
                  animate={{
                    scale: animationState === 'rating' ? 1.03 : 1,
                    x: animationState === 'rating' ? 6 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                    animationState === 'rating'
                      ? 'bg-amber-50/80 border-2 border-amber-300/50 shadow-lg'
                      : 'border-2 border-transparent'
                  }`}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-slate-700 text-sm leading-snug">
                    Calificas qué tan bien lo hizo. Repitis usa esto para optimizar el aprendizaje.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Auto-animated card demo */}
            <div className="order-1 md:order-2 relative">
              <div style={{ perspective: '1000px' }} className="relative">
                {/* Animated Card with flip */}
                <motion.div
                  animate={{
                    rotateY: isFlipped ? 180 : 0,
                  }}
                  initial={false}
                  transition={{ duration: 0.4, type: 'spring', stiffness: 300, damping: 30 }}
                  className="relative h-80 md:h-96"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Card Front - visible when not flipped */}
                  <div
                    className={`absolute inset-0 rounded-3xl border-2 border-white/60 shadow-2xl bg-white/90 backdrop-blur-lg shadow-purple-200/40`}
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="relative flex flex-col items-center justify-center h-full p-8">
                      {/* Animated emojis inside card front */}
                      <AnimatePresence mode="wait">
                        {/* Eye emoji - seeing state */}
                        {animationState === 'seeing' && (
                          <motion.div
                            key="eye"
                            initial={{ scale: 0, y: -20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0, y: 20, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            className="absolute top-8 left-1/2 -translate-x-1/2 text-5xl md:text-6xl pointer-events-none"
                          >
                            👀
                          </motion.div>
                        )}

                        {/* Thinking emoji - thinking state */}
                        {animationState === 'thinking' && (
                          <motion.div
                            key="thinking"
                            initial={{ scale: 0, y: -20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0, y: 20, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            className="absolute top-8 left-1/2 -translate-x-1/2 text-5xl md:text-6xl pointer-events-none"
                          >
                            🤔
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Current word - matching Review component font */}
                      <motion.div
                        key={currentWord}
                        className="font-bold text-gray-800 select-none leading-none"
                        style={{
                          fontFamily: 'var(--font-lexend)',
                          fontSize: 'clamp(6rem, 20vw, 10rem)'
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={animationState === 'thinking' ? {
                          opacity: 1,
                          scale: [1, 1.05, 1],
                        } : {
                          opacity: 1,
                          scale: 1,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                      >
                        {currentWord}
                      </motion.div>
                    </div>
                  </div>

                  {/* Card Back - visible when flipped */}
                  <div
                    className={`absolute inset-0 rounded-3xl border-2 border-white/60 shadow-2xl bg-white/95 backdrop-blur-lg shadow-pink-200/40`}
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <div className="relative flex flex-col items-center justify-center h-full p-8">
                      {/* Ear + Sound emoji inside card back - flipped state only */}
                      <AnimatePresence>
                        {animationState === 'flipped' && (
                          <>
                            <motion.div
                              key="ear"
                              initial={{ scale: 0, x: -20, opacity: 0 }}
                              animate={{ scale: 1, x: 0, opacity: 1 }}
                              exit={{ scale: 0, x: -20, opacity: 0 }}
                              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                              className="absolute left-8 top-1/2 -translate-y-1/2 text-4xl md:text-5xl pointer-events-none"
                            >
                              👂
                            </motion.div>
                            <motion.div
                              key="sound"
                              initial={{ scale: 0, x: 20, opacity: 0 }}
                              animate={{ scale: 1, x: 0, opacity: 1 }}
                              exit={{ scale: 0, x: 20, opacity: 0 }}
                              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                              className="absolute right-8 top-1/2 -translate-y-1/2 text-4xl md:text-5xl pointer-events-none"
                            >
                              🔊
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>

                      {/* Rating face emojis - rating state */}
                      <AnimatePresence>
                        {animationState === 'rating' && (
                          <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 pointer-events-none"
                          >
                            {[
                              { emoji: '😫', rating: 1 },
                              { emoji: '😕', rating: 2 },
                              { emoji: '😊', rating: 3 },
                              { emoji: '😄', rating: 4 },
                            ].map(({ emoji, rating }) => (
                              <motion.div
                                key={rating}
                                className="text-3xl md:text-4xl"
                                animate={{
                                  scale: selectedRating === rating ? 1.3 : 1,
                                  y: selectedRating === rating ? -5 : 0,
                                }}
                                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                              >
                                {emoji}
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Audio button when flipped */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="mb-6"
                      >
                        <div className="px-6 py-2.5 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200/50 flex items-center gap-2 border-2 border-blue-400/50">
                          <Volume2 size={20} />
                          <span className="text-base font-semibold">Escuchar</span>
                        </div>
                      </motion.div>

                      {/* Current word - matching Review component font */}
                      <div
                        className="font-bold text-gray-800 select-none leading-none"
                        style={{
                          fontFamily: 'var(--font-lexend)',
                          fontSize: 'clamp(6rem, 20vw, 10rem)'
                        }}
                      >
                        {currentWord}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
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
