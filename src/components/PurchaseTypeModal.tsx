import { motion, AnimatePresence } from 'framer-motion';
import { User, Gift, X } from 'lucide-react';
import { theme, getScale } from '@/styles/theme';

interface PurchaseTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectType: (isGift: boolean) => void;
}

/**
 * PurchaseTypeModal Component
 *
 * Modal that asks users if they're buying for themselves or as a gift.
 * Shown after clicking the purchase button for unauthenticated users.
 */
export function PurchaseTypeModal({ isOpen, onClose, onSelectType }: PurchaseTypeModalProps) {
  if (!isOpen) return null;

  const handleSelect = (isGift: boolean) => {
    onSelectType(isGift);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
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
                onClick={onClose}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Content */}
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-3">
                  <span className={theme.gradientClasses.text}>¿Para quién es?</span>
                </h2>
                <p className="text-slate-600">
                  Esto nos ayuda a mostrarte el mensaje correcto
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* For Me / My Kids */}
                <motion.button
                  whileHover={{ scale: getScale(false), y: -4 }}
                  whileTap={{ scale: getScale(false, 0.95) }}
                  onClick={() => handleSelect(false)}
                  className="relative bg-violet-50 rounded-2xl p-6 border-2 border-violet-200 hover:border-violet-400 transition-all text-left group"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-violet-200 transition-colors">
                      <User className="w-8 h-8 text-violet-600" />
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      Para Mí / Mis Hijos
                    </h3>

                    <p className="text-sm text-slate-600">
                      Recibirás un código de activación para usar de inmediato
                    </p>
                  </div>
                </motion.button>

                {/* As a Gift */}
                <motion.button
                  whileHover={{ scale: getScale(false), y: -4 }}
                  whileTap={{ scale: getScale(false, 0.95) }}
                  onClick={() => handleSelect(true)}
                  className="relative bg-pink-50 rounded-2xl p-6 border-2 border-pink-200 hover:border-pink-400 transition-all text-left group"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-pink-200 transition-colors">
                      <Gift className="w-8 h-8 text-pink-600" />
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      Como Regalo
                    </h3>

                    <p className="text-sm text-slate-600">
                      Recibirás un código de activación para compartir
                    </p>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
