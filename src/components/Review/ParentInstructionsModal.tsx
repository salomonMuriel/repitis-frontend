import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface ParentInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ParentInstructionsModal({ isOpen, onClose }: ParentInstructionsModalProps) {
  if (!isOpen) return null;

  const instructions = [
    {
      emoji: '👂',
      text: 'Pregúntale cómo se lee antes de voltear. Solo voltea después de que responda o diga que no sabe.',
    },
    {
      emoji: '✅',
      text: 'No le des la respuesta. Equivocarse está bien - la tarjeta aparecerá de nuevo pronto.',
    },
    {
      emoji: '💯',
      text: 'Sé honesto al calificar. Si necesitó ayuda o se equivocó, marca "No la sabía".',
    },
    {
      emoji: '📅',
      text: 'Sesiones cortas (10-15 tarjetas) todos los días funcionan mejor que sesiones largas.',
    },
    {
      emoji: '🎉',
      text: 'Celebra el esfuerzo, no solo los aciertos. "¡Muy bien por intentarlo!" vale más que "¡Correcto!"',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white/95 backdrop-blur-xl border-2 border-white/60 shadow-2xl shadow-purple-200/40 rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-purple-900">
              Guía del Acompañante 👨‍👩‍👧‍👦
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Cerrar"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Instructions */}
        <div className="space-y-3 mb-6">
          {instructions.map((instruction, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-3 items-center"
            >
              <div className="text-2xl flex-shrink-0">{instruction.emoji}</div>
              <p className="text-gray-700">{instruction.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xl py-5 rounded-2xl shadow-xl shadow-purple-300/50 hover:shadow-2xl hover:shadow-purple-400/60 transition-all"
        >
          ¡Entendido! Empecemos 🚀
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
