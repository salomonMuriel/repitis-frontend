import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Gift, X, Mail, ArrowLeft } from 'lucide-react';
import { theme, getScale } from '@/styles/theme';

interface PurchaseData {
  isGift: boolean;
  email?: string;
}

interface PurchaseTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectType: (data: PurchaseData) => void;
  isPremium?: boolean; // If true, user already has premium - only show gift option
}

/**
 * PurchaseTypeModal Component
 *
 * Two-step modal for unauthenticated purchases:
 * 1. Ask if it's for them or a gift
 * 2. If gift, collect email for activation code
 */
export function PurchaseTypeModal({ isOpen, onClose, onSelectType, isPremium = false }: PurchaseTypeModalProps) {
  const [step, setStep] = useState<'type' | 'email'>('type');
  const [selectedType, setSelectedType] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleTypeSelect = (isGift: boolean) => {
    setSelectedType(isGift);

    if (isGift) {
      // If gift, always collect email for activation code delivery
      setStep('email');
    } else {
      // If for themselves, proceed directly (no email needed)
      onSelectType({ isGift: false });
      handleClose();
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Por favor ingresa un email válido');
      return;
    }

    // Submit with email
    onSelectType({ isGift: selectedType, email });
    handleClose();
  };

  const handleClose = () => {
    setStep('type');
    setSelectedType(false);
    setEmail('');
    setEmailError('');
    onClose();
  };

  const handleBack = () => {
    setStep('type');
    setEmail('');
    setEmailError('');
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
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Back button (only on email step) */}
              {step === 'email' && (
                <button
                  onClick={handleBack}
                  className="absolute top-6 left-6 text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="text-sm font-medium">Atrás</span>
                </button>
              )}

              <AnimatePresence mode="wait">
                {step === 'type' ? (
                  <motion.div
                    key="type-step"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Type Selection */}
                    <div className="text-center mb-8">
                      <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-3">
                        <span className={theme.gradientClasses.text}>
                          {isPremium ? '¡Compra un Regalo!' : '¿Para quién es?'}
                        </span>
                      </h2>
                      <p className="text-slate-600">
                        {isPremium
                          ? 'Ya tienes acceso premium. Puedes comprar un código de regalo para compartir.'
                          : 'Esto nos ayuda a mostrarte el mensaje correcto'
                        }
                      </p>
                    </div>

                    <div className={`grid ${isPremium ? 'grid-cols-1 max-w-md mx-auto' : 'md:grid-cols-2'} gap-6`}>
                      {/* For Me / My Kids - Only show if NOT premium */}
                      {!isPremium && (
                        <motion.button
                          whileHover={{ scale: getScale(false), y: -4 }}
                          whileTap={{ scale: getScale(false, 0.95) }}
                          onClick={() => handleTypeSelect(false)}
                          className="relative bg-violet-50 rounded-2xl p-6 border-2 border-violet-200 hover:border-violet-400 transition-all text-left group"
                        >
                          <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-violet-200 transition-colors">
                              <User className="w-8 h-8 text-violet-600" />
                            </div>

                            <h3 className="text-xl font-bold text-slate-800 mb-2">
                              Para Mí / Mis Hij@s
                            </h3>

                            <p className="text-sm text-slate-600">
                              Recibirás un código de activación para usar de inmediato
                            </p>
                          </div>
                        </motion.button>
                      )}

                      {/* As a Gift - Always show */}
                      <motion.button
                        whileHover={{ scale: getScale(false), y: -4 }}
                        whileTap={{ scale: getScale(false, 0.95) }}
                        onClick={() => handleTypeSelect(true)}
                        className="relative bg-pink-50 rounded-2xl p-6 border-2 border-pink-200 hover:border-pink-400 transition-all text-left group"
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-pink-200 transition-colors">
                            <Gift className="w-8 h-8 text-pink-600" />
                          </div>

                          <h3 className="text-xl font-bold text-slate-800 mb-2">
                            {isPremium ? 'Comprar un Regalo' : 'Como Regalo'}
                          </h3>

                          <p className="text-sm text-slate-600">
                            Recibirás un código de activación para compartir
                          </p>
                        </div>
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="email-step"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Email Collection */}
                    <div className="text-center mb-8">
                      <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
                          <Mail className="w-10 h-10 text-white" />
                        </div>
                      </div>

                      <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-3">
                        <span className={theme.gradientClasses.text}>¿A qué email enviamos el código?</span>
                      </h2>
                      <p className="text-slate-600">
                        El código de activación se enviará a esta dirección
                      </p>
                    </div>

                    <form onSubmit={handleEmailSubmit} className="space-y-6">
                      {/* Email Input */}
                      <div>
                        <label htmlFor="gift-email" className="block text-sm font-bold text-slate-700 mb-2">
                          Email
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <Mail size={20} className="text-slate-400" />
                          </div>
                          <input
                            id="gift-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`
                              w-full pl-12 pr-4 py-4
                              bg-slate-50 border-2 rounded-xl
                              text-slate-800 placeholder-slate-400
                              font-medium
                              transition-all duration-300
                              focus:outline-none focus:bg-white
                              ${emailError
                                ? 'border-red-500 focus:border-red-500'
                                : 'border-slate-200 focus:border-pink-500'
                              }
                            `}
                            placeholder="tu@email.com"
                            required
                          />
                        </div>
                        {emailError && (
                          <p className="mt-2 text-sm text-red-600 font-medium">{emailError}</p>
                        )}
                      </div>

                      {/* Info Box */}
                      <div className="bg-pink-50 border-2 border-pink-200 rounded-xl p-4">
                        <p className="text-sm text-pink-800 font-medium">
                          <Gift className="w-4 h-4 inline mr-2" />
                          Recibirás el código de activación en este email inmediatamente después del pago
                        </p>
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        whileHover={{ scale: getScale(false, 1.02) }}
                        whileTap={{ scale: getScale(false, 0.98) }}
                        className="w-full px-8 py-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                      >
                        Continuar al Pago
                      </motion.button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
