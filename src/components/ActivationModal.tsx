import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, CheckCircle, AlertCircle } from 'lucide-react';
import { paymentService } from '@/services/paymentService';
import { theme, getScale } from '@/styles/theme';

interface ActivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

/**
 * ActivationModal Component
 *
 * Modal for logged-in users to enter and activate a gift code.
 * Shows validation, loading states, and success/error feedback.
 */
export function ActivationModal({ isOpen, onClose, onSuccess }: ActivationModalProps) {
  const [activationCode, setActivationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await paymentService.activateCode(activationCode.trim());
      setSuccess(true);

      // Call success callback and close modal after 2 seconds
      setTimeout(() => {
        onSuccess?.();
        handleClose();
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Código inválido o ya usado');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setActivationCode('');
    setError('');
    setSuccess(false);
    setLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
                  <Gift className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="text-center mb-6">
                <h2 className="text-3xl font-black text-slate-800 mb-2">
                  <span className={theme.gradientClasses.text}>Activar Código</span>
                </h2>
                <p className="text-slate-600">
                  Ingresa tu código de activación para desbloquear acceso premium
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Activation Code Input */}
                <div>
                  <label htmlFor="code" className="block text-sm font-bold text-slate-700 mb-2">
                    Código de Activación
                  </label>
                  <input
                    id="code"
                    type="text"
                    value={activationCode}
                    onChange={(e) => setActivationCode(e.target.value.toUpperCase())}
                    className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 font-mono font-semibold tracking-wider text-center text-lg focus:outline-none focus:border-pink-500 focus:bg-white transition-all"
                    placeholder="XXXX-XXXX-XXXX"
                    maxLength={14}
                    disabled={loading || success}
                    required
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-3"
                  >
                    <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-medium">{error}</p>
                  </motion.div>
                )}

                {/* Success Message */}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-start gap-3"
                  >
                    <CheckCircle size={20} className="flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-bold">¡Acceso premium activado!</p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading || success || !activationCode.trim()}
                  whileHover={loading || success ? {} : { scale: getScale(false, 1.02) }}
                  whileTap={loading || success ? {} : { scale: getScale(false, 0.98) }}
                  className={`
                    w-full px-6 py-4 rounded-xl text-white text-lg font-bold shadow-lg transition-all
                    ${loading || success || !activationCode.trim()
                      ? 'bg-slate-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-pink-600 to-rose-600 hover:shadow-xl'
                    }
                  `}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Activando...
                    </span>
                  ) : success ? (
                    '¡Activado!'
                  ) : (
                    'Activar Código'
                  )}
                </motion.button>

                {/* Cancel Button */}
                {!success && (
                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full px-6 py-3 text-slate-600 font-semibold hover:text-slate-800 transition-colors"
                  >
                    Cancelar
                  </button>
                )}
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
