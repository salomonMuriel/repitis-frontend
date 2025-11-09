import { useState, useRef, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Sparkles } from 'lucide-react';

interface CardDisplayProps {
  content: string;
  audioUrl?: string | null;
  onAudioPlay: () => void;
  onClick?: () => void;
  className?: string;
  showAudio?: boolean;
  isNew?: boolean;
}

export default function CardDisplay({
  content,
  audioUrl,
  onAudioPlay,
  onClick,
  className = '',
  showAudio = false,
  isNew = false,
}: CardDisplayProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    // Calculate mouse position relative to card center (-1 to 1)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Apply rotation with max 12 degrees
    const maxRotation = 12;
    setRotateY(x * maxRotation);
    setRotateX(-y * maxRotation);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      className={`relative ${className}`}
      style={{ perspective: '1000px', containerType: 'inline-size' }}
    >
      <motion.div
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
        className={`relative h-full w-full rounded-3xl cursor-pointer border-2 border-white/60 ${
          showAudio
            ? 'bg-white/95 backdrop-blur-lg shadow-2xl shadow-pink-200/40'
            : 'bg-white/90 backdrop-blur-lg shadow-2xl shadow-purple-200/40'
        }`}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Nueva Badge */}
        {isNew && (
          <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.2
              }}
              className="bg-gradient-to-br from-green-500 to-green-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-xl shadow-lg shadow-green-300/50 flex items-center gap-1.5 border-2 border-green-400/50"
            >
              <Sparkles size={14} className="md:w-4 md:h-4" />
              <span className="text-xs md:text-sm font-bold">Nueva</span>
            </motion.div>
          </div>
        )}

        {/* Card Content */}
        <div className="flex flex-col items-center h-full p-4 md:p-6 overflow-hidden">
          {/* Audio Button - Only show when flipped */}
          {audioUrl && showAudio && (
            <div className="flex-shrink-0 mb-4 md:mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onAudioPlay();
                }}
                className="px-4 py-2 md:px-6 md:py-2.5 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl md:rounded-2xl shadow-lg shadow-blue-200/50 hover:shadow-xl hover:shadow-blue-300/60 transition-all flex items-center gap-2 border-2 border-blue-400/50"
                aria-label="Play audio"
              >
                <Volume2 size={20} className="md:w-6 md:h-6" />
                <span className="text-sm md:text-base font-semibold">Escuchar</span>
              </motion.button>
            </div>
          )}

          {/* Main Content - Letter/Word */}
          <div className="flex-1 flex items-center justify-center w-full min-h-0">
            <div
              className="font-bold text-gray-800 select-none leading-none px-4 whitespace-nowrap"
              style={{
                fontFamily: 'var(--font-lexend)',
                fontSize: 'clamp(4rem, 35cqw, 20rem)'
              }}
            >
              {content}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
