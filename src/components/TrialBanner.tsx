import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Clock, Gift } from 'lucide-react';
import { theme, getScale } from '@/styles/theme';

interface TrialBannerProps {
  trialDaysRemaining: number;
  isPremium: boolean;
  compact?: boolean;
  onActivateClick?: () => void;
}

/**
 * TrialBanner Component
 *
 * Shows remaining trial days and CTA to upgrade for non-premium users.
 * Hidden for premium users.
 */
export function TrialBanner({ trialDaysRemaining, isPremium, compact = false, onActivateClick }: TrialBannerProps) {
  // Don't show if user is premium
  if (isPremium) return null;

  // Don't show if trial is expired
  if (trialDaysRemaining <= 0) return null;

  const isLastDay = trialDaysRemaining === 1;
  const isUrgent = trialDaysRemaining <= 2;

  if (compact) {
    // Compact version for Review page (minimal space) - Dual CTAs
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <div className={`
          px-4 py-3 rounded-2xl shadow-lg border-2
          ${isUrgent
            ? 'bg-gradient-to-r from-orange-500 to-rose-500 border-orange-400/50'
            : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 border-violet-400/50'
          }
        `}>
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-bold">
                {isLastDay ? '¡Último día de prueba!' : `${trialDaysRemaining} días de prueba`}
              </span>
            </div>
          </div>

          {/* Dual CTA Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Link to="/comprar" className="flex-1">
              <motion.button
                whileHover={{ scale: getScale(false, 1.02) }}
                whileTap={{ scale: getScale(false, 0.98) }}
                className="w-full px-3 py-2 bg-white text-violet-600 text-xs font-bold rounded-lg shadow hover:shadow-md transition-all"
              >
                <span className="flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Comprar
                </span>
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: getScale(false, 1.02) }}
              whileTap={{ scale: getScale(false, 0.98) }}
              onClick={onActivateClick}
              className="w-full px-3 py-2 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-lg border border-white/40 hover:bg-white/30 transition-all"
            >
              <span className="flex items-center justify-center gap-1">
                <Gift className="w-3 h-3" />
                Tengo Código
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Full version for Levels page
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full mb-8"
    >
      <div className={`
        ${theme.glassClasses.card}
        p-6 md:p-8 rounded-3xl shadow-2xl border-2
        ${isUrgent
          ? 'bg-gradient-to-br from-orange-50/80 to-rose-50/80 border-orange-300/60'
          : 'bg-gradient-to-br from-violet-50/80 to-pink-50/80 border-violet-300/60'
        }
      `}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left: Message */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className={`
                p-3 rounded-2xl shadow-lg
                ${isUrgent
                  ? 'bg-gradient-to-br from-orange-500 to-rose-500'
                  : 'bg-gradient-to-br from-violet-600 to-fuchsia-600'
                }
              `}>
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-800">
                {isLastDay
                  ? '¡Último Día de Prueba!'
                  : `${trialDaysRemaining} ${trialDaysRemaining === 1 ? 'Día' : 'Días'} de Prueba`
                }
              </h3>
            </div>
            <p className="text-slate-700 text-base md:text-lg leading-relaxed">
              {isLastDay
                ? 'Desbloquea acceso completo hoy y continúa el viaje de aprendizaje sin interrupciones.'
                : 'Desbloquea todos los niveles con acceso de por vida. Un solo pago, aprendizaje para siempre.'
              }
            </p>
          </div>

          {/* Right: Dual CTAs */}
          <div className="md:flex-shrink-0 flex flex-col sm:flex-row gap-3">
            <Link to="/comprar">
              <motion.button
                whileHover={{
                  scale: getScale(false, 1.05),
                  boxShadow: '0 20px 40px -12px rgba(139, 92, 246, 0.5)'
                }}
                whileTap={{ scale: getScale(false, 0.95) }}
                className={`
                  w-full sm:w-auto px-8 py-4 rounded-2xl text-white text-lg font-black shadow-xl hover:shadow-2xl transition-all
                  ${isUrgent
                    ? 'bg-gradient-to-r from-orange-500 to-rose-500'
                    : 'bg-gradient-to-r from-violet-600 to-fuchsia-600'
                  }
                `}
              >
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Comprar
                  <span className="text-sm font-normal">$30,000</span>
                </span>
              </motion.button>
            </Link>

            <motion.button
              whileHover={{
                scale: getScale(false, 1.05),
              }}
              whileTap={{ scale: getScale(false, 0.95) }}
              onClick={onActivateClick}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-violet-700 bg-white text-lg font-black shadow-lg hover:shadow-xl border-2 border-violet-200 hover:border-violet-400 transition-all"
            >
              <span className="flex items-center justify-center gap-2">
                <Gift className="w-5 h-5" />
                Tengo Código
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
