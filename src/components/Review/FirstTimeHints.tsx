import { motion, AnimatePresence } from 'framer-motion';
import { Volume2 } from 'lucide-react';

interface FirstTimeHintsProps {
  showVolume: boolean;
  showAskAndTap: boolean;
  showRating: boolean;
}

export default function FirstTimeHints({ showVolume, showAskAndTap, showRating }: FirstTimeHintsProps) {
  return (
    <>
      {/* Volume hint - top center inside card */}
      <AnimatePresence>
        {showVolume && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
          >
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white px-3 py-2 rounded-xl shadow-lg shadow-blue-300/50 border border-white/40">
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <Volume2 size={16} className="text-white" />
                </div>
                <p className="text-sm font-semibold">¡Sube el volumen! 🔊</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ask kid + Tap card hints - bottom left inside card */}
      <AnimatePresence>
        {showAskAndTap && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }}
            className="absolute bottom-4 left-4 z-40 pointer-events-none flex flex-col gap-2 max-w-[45%]"
          >
            {/* Ask kid hint */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white px-3 py-2 rounded-xl shadow-lg shadow-orange-300/50 border border-white/40">
              <p className="text-sm font-semibold">Pregúntale cómo se lee</p>
              <p className="text-xs text-white/90">(¡no le soples!)</p>
            </div>

            {/* Tap card hint */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white px-3 py-2 rounded-xl shadow-lg shadow-purple-300/50 border border-white/40">
              <p className="text-sm font-semibold">👆 Toca la tarjeta después</p>
              <p className="text-xs text-white/90">que responda o diga que no sabe</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rating hint - bottom right inside card */}
      <AnimatePresence>
        {showRating && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }}
            className="absolute bottom-4 right-4 z-40 pointer-events-none max-w-[60%]"
          >
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white px-3 py-2 rounded-xl shadow-lg shadow-pink-300/50 border border-white/40">
              <p className="text-sm font-semibold mb-1">Califica la dificultad:</p>
              <div className="text-xs text-white/95 space-y-0.5">
                <p>🤔 <span className="font-semibold">No la sabía:</span> Si se equivocó o no sabía</p>
                <p>😅 <span className="font-semibold">Difícil:</span> Si le tomó tiempo o dudó pero acertó</p>
                <p>😊 <span className="font-semibold">Bien:</span> Si la leyó después de unos segundos</p>
                <p>😄 <span className="font-semibold">Muy fácil:</span> Si fue instantáneo</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
