import { useState, useEffect, useOptimistic } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Home, BarChart3, LogOut, X } from 'lucide-react';
import CardDisplay from '../components/Card/CardDisplay';
import { api } from '../services/api';
import { useAudio } from '../hooks/useAudio';
import { useAuth } from '../hooks/useAuth';
import type { CardResponse, Rating } from '../types/card';

export default function Review() {
  const [currentCard, setCurrentCard] = useState<CardResponse | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const queryClient = useQueryClient();

  const { data: nextCardResponse, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['nextCard'],
    queryFn: () => api.getNextCard(),
  });

  const { data: todayStats } = useQuery({
    queryKey: ['todayStats'],
    queryFn: () => api.getTodayStats(),
  });

  const [optimisticStats, setOptimisticStats] = useOptimistic(
    todayStats,
    (state, newReview: { isNew: boolean }) => {
      if (!state) return state;
      return {
        ...state,
        total_reviews_today: state.total_reviews_today + 1,
        new_cards_today: state.new_cards_today + (newReview.isNew ? 1 : 0),
      };
    }
  );

  useEffect(() => {
    if (nextCardResponse) {
      if (nextCardResponse.card) {
        setCurrentCard(nextCardResponse.card);
        setSessionComplete(false);
      } else if (nextCardResponse.session_complete) {
        setCurrentCard(null);
        setSessionComplete(true);
      }
    }
  }, [nextCardResponse]);

  const reviewMutation = useMutation({
    mutationFn: ({ cardId, rating }: { cardId: string; rating: Rating; isNew: boolean }) =>
      api.reviewCard(cardId, rating),
    onMutate: async ({ isNew }) => {
      // Optimistically update the stats
      setOptimisticStats({ isNew });
    },
    onSuccess: async () => {
      setIsFlipped(false);
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['todayStats'] });
      // Fetch the next card
      await refetch();
    },
  });

  const { play } = useAudio(currentCard?.audio_url || null);

  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      play();
    }
  };

  const handleRating = (rating: Rating) => {
    if (!currentCard || !isFlipped) return;
    reviewMutation.mutate({ cardId: currentCard.id, rating, isNew: currentCard.is_new });
  };

  // Show skeleton during transitions
  const isTransitioning = reviewMutation.isPending || (isFetching && currentCard !== null);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl">Cargando tarjeta...</p>
      </div>
    );
  }

  if (sessionComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
        <FloatingMenu />
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-white/80 backdrop-blur-xl border-2 border-white/60 shadow-2xl shadow-purple-200/40 rounded-3xl p-8 md:p-12">
              <div className="text-8xl mb-6">🎉</div>
              <h1 className="text-5xl font-bold mb-4 text-purple-900">
                ¡Sesión Completa!
              </h1>
              <div className="flex flex-col gap-2 mb-4">
                <p className="text-2xl text-gray-700">
                  Nuevas hoy: <span className="text-green-600 font-bold">{optimisticStats?.new_cards_today ?? 0}</span>
                </p>
                <p className="text-2xl text-gray-700">
                  Total hoy: <span className="text-purple-600 font-bold">{optimisticStats?.total_reviews_today ?? 0}</span>
                </p>
              </div>
              <p className="text-xl mb-8 text-gray-600">
                ¡Excelente trabajo! 🌟
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary text-lg"
                  >
                    Volver al Inicio
                  </motion.button>
                </Link>
                <Link to="/levels">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-secondary text-lg"
                  >
                    Ver Progreso
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!currentCard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
        <FloatingMenu />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white/80 backdrop-blur-xl border-2 border-white/60 shadow-2xl shadow-purple-200/40 rounded-3xl p-8 md:p-12">
              <div className="text-8xl mb-6">📚</div>
              <h1 className="text-4xl font-bold mb-4 text-purple-900">
                No hay tarjetas para repasar
              </h1>
              <p className="text-xl mb-8 text-gray-600">
                ¡Vuelve más tarde para más práctica!
              </p>
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-lg"
                >
                  Volver al Inicio
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <FloatingMenu />
      <div className="container mx-auto px-4 h-full flex flex-col justify-center py-4 md:py-6">
        {/* Progress indicator */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full max-w-2xl mx-auto mb-3 md:mb-4 flex-shrink-0"
        >
          <div className="flex items-center justify-between gap-4 bg-white/70 backdrop-blur-md border border-white/50 shadow-lg shadow-purple-100/50 rounded-2xl px-4 py-3">
            <div className="flex items-center gap-3 md:gap-4 text-sm md:text-base font-semibold">
              <span>
                Nuevas hoy: <span className="text-green-600">{optimisticStats?.new_cards_today ?? 0}</span>
              </span>
              <span className="text-gray-300">|</span>
              <span>
                Total hoy: <span className="text-purple-600">{optimisticStats?.total_reviews_today ?? 0}</span>
              </span>
            </div>
            <span className="text-sm md:text-base text-purple-600 font-semibold whitespace-nowrap">Nivel {currentCard.level_id}</span>
          </div>
        </motion.div>

        {/* Card Display - fixed height */}
        <div className="w-full max-w-3xl mx-auto flex flex-col mb-3 md:mb-4 h-[60vh]">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="h-full flex flex-col"
          >
            <AnimatePresence mode="wait">
              {isTransitioning ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full"
                >
                  <CardSkeleton />
                </motion.div>
              ) : (
                <motion.div
                  key={currentCard.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  {!isFlipped ? (
                    <CardDisplay
                      content={currentCard.content}
                      audioUrl={currentCard.audio_url}
                      onAudioPlay={play}
                      onClick={handleFlip}
                      className="h-full"
                      isNew={currentCard.is_new}
                    />
                  ) : (
                    <motion.div
                      initial={{ rotateY: -180 }}
                      animate={{ rotateY: 0 }}
                      transition={{ duration: 0.4 }}
                      className="h-full"
                    >
                      <CardDisplay
                        content={currentCard.content}
                        audioUrl={currentCard.audio_url}
                        onAudioPlay={play}
                        className="h-full"
                        showAudio={true}
                        isNew={currentCard.is_new}
                      />
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Instruction text */}
          <div className="flex-shrink-0 mt-2 md:mt-3">
            {!isFlipped ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-base md:text-lg"
              >
                ¿Puedes leerla? Toca para voltear
              </motion.p>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-base md:text-lg"
              >
                ¿Qué tan difícil estuvo?
              </motion.p>
            )}
          </div>
        </div>

        {/* Rating Buttons */}
        <AnimatePresence>
          {isFlipped && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="w-full max-w-2xl mx-auto flex-shrink-0"
            >
              <div className="flex flex-col gap-2 md:gap-3">
                {/* "Didn't know it" button - prominent, alone on top */}
                <RatingButton
                  rating={1}
                  label="No la sabía"
                  color="red"
                  onClick={() => handleRating(1)}
                  disabled={reviewMutation.isPending}
                />
                {/* Difficulty ratings - 3 buttons in a row */}
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  <RatingButton
                    rating={2}
                    label="Estaba difícil"
                    color="orange"
                    onClick={() => handleRating(2)}
                    disabled={reviewMutation.isPending}
                  />
                  <RatingButton
                    rating={3}
                    label="Estuvo bien"
                    color="blue"
                    onClick={() => handleRating(3)}
                    disabled={reviewMutation.isPending}
                  />
                  <RatingButton
                    rating={4}
                    label="Muy fácil"
                    color="green"
                    onClick={() => handleRating(4)}
                    disabled={reviewMutation.isPending}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="bg-white/80 backdrop-blur-xl border-2 border-white/60 shadow-2xl shadow-purple-200/40 rounded-3xl overflow-hidden h-full flex flex-col animate-pulse">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-4">
          <div className="h-48 bg-gray-200 rounded-2xl"></div>
          <div className="h-8 bg-gray-200 rounded-lg w-3/4 mx-auto"></div>
          <div className="h-8 bg-gray-200 rounded-lg w-1/2 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}

function RatingButton({
  rating,
  label,
  color,
  onClick,
  disabled,
}: {
  rating: Rating;
  label: string;
  color: string;
  onClick: () => void;
  disabled: boolean;
}) {
  const colorClasses = {
    red: 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-2 border-red-400/50 shadow-lg shadow-red-200/50 hover:shadow-xl hover:shadow-red-300/60',
    orange: 'bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 border-2 border-orange-400/50 shadow-lg shadow-orange-200/50 hover:shadow-xl hover:shadow-orange-300/60',
    blue: 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-2 border-blue-400/50 shadow-lg shadow-blue-200/50 hover:shadow-xl hover:shadow-blue-300/60',
    green: 'bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border-2 border-green-400/50 shadow-lg shadow-green-200/50 hover:shadow-xl hover:shadow-green-300/60',
  }[color];

  const emoji = {
    1: '🤔',
    2: '😅',
    3: '😊',
    4: '😄',
  }[rating];

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`${colorClasses} text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl md:rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <div className="text-2xl md:text-3xl mb-0.5">{emoji}</div>
      <div className="text-xs md:text-sm">{label}</div>
    </motion.button>
  );
}

function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <>
      {/* Menu Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 bg-white/80 backdrop-blur-md border-2 border-purple-300/60 rounded-full p-3 shadow-xl shadow-purple-300/60 hover:shadow-2xl hover:shadow-purple-400/70 hover:border-purple-400/80 transition-all"
        aria-label="Menu"
      >
        {isOpen ? <X size={24} className="text-purple-700" /> : <Menu size={24} className="text-purple-700" />}
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 left-4 z-40 bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl shadow-xl shadow-purple-100/50 overflow-hidden"
          >
            <div className="py-2">
              <button
                onClick={() => {
                  navigate('/dashboard');
                  setIsOpen(false);
                }}
                className="w-full px-6 py-3 flex items-center gap-3 hover:bg-purple-50/50 transition-colors text-left"
              >
                <Home size={20} className="text-gray-700" />
                <span className="font-semibold text-gray-700">Inicio</span>
              </button>
              <button
                onClick={() => {
                  navigate('/levels');
                  setIsOpen(false);
                }}
                className="w-full px-6 py-3 flex items-center gap-3 hover:bg-purple-50/50 transition-colors text-left"
              >
                <BarChart3 size={20} className="text-gray-700" />
                <span className="font-semibold text-gray-700">Niveles</span>
              </button>
              <div className="border-t border-gray-200/50 my-2"></div>
              <button
                onClick={handleSignOut}
                className="w-full px-6 py-3 flex items-center gap-3 hover:bg-red-50/50 transition-colors text-left"
              >
                <LogOut size={20} className="text-red-500" />
                <span className="font-semibold text-red-500">Salir</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
