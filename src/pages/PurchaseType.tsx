import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { User, Gift } from 'lucide-react';
import { supabase } from '@/services/supabase';
import { theme, getScale } from '@/styles/theme';

/**
 * PurchaseType Page
 *
 * Asks unauthenticated users if they're buying for themselves or as a gift.
 * This helps us show the appropriate success message and track purchase intent.
 */
export default function PurchaseType() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // Authenticated users go directly to pricing
        navigate('/pricing', { replace: true });
      } else {
        setIsAuthenticated(false);
      }
    });
  }, [navigate]);

  const handlePurchaseType = (isGift: boolean) => {
    // Store purchase intent in sessionStorage
    sessionStorage.setItem('purchaseIsGift', isGift.toString());
    navigate('/pricing');
  };

  if (isAuthenticated === null) {
    return (
      <div className={theme.gradientClasses.background + ' min-h-screen flex items-center justify-center'}>
        <div className="text-2xl text-slate-600">Cargando...</div>
      </div>
    );
  }

  return (
    <div className={theme.gradientClasses.background + ' min-h-screen'}>
      {/* Navigation */}
      <nav className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link to="/">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className={'text-3xl font-black ' + theme.gradientClasses.text}
            >
              Repitis
            </motion.div>
          </Link>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/login">
              <motion.button
                whileHover={{ scale: getScale(shouldReduceMotion) }}
                whileTap={{ scale: getScale(shouldReduceMotion, 0.95) }}
                className="px-6 py-2 text-violet-700 font-semibold hover:text-violet-900 transition-colors"
              >
                Iniciar Sesión
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
            <span className={theme.gradientClasses.text}>¿Para quién es?</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Ayúdanos a personalizar tu experiencia
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* For Me / My Kids */}
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: getScale(shouldReduceMotion), y: -8 }}
            whileTap={{ scale: getScale(shouldReduceMotion, 0.95) }}
            onClick={() => handlePurchaseType(false)}
            className="relative bg-white rounded-3xl shadow-xl p-8 border-2 border-violet-100 hover:border-violet-300 transition-all text-left group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-violet-200 transition-colors">
                <User className="w-10 h-10 text-violet-600" />
              </div>

              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                Para Mí / Mis Hijos
              </h2>

              <p className="text-slate-600 mb-6">
                Compra acceso para ti o tus hijos. Recibirás un código de activación para usar de inmediato.
              </p>

              <div className="mt-auto pt-4">
                <div className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-xl group-hover:shadow-lg transition-shadow">
                  Continuar
                </div>
              </div>
            </div>
          </motion.button>

          {/* As a Gift */}
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: getScale(shouldReduceMotion), y: -8 }}
            whileTap={{ scale: getScale(shouldReduceMotion, 0.95) }}
            onClick={() => handlePurchaseType(true)}
            className="relative bg-gradient-to-br from-pink-50 to-violet-50 rounded-3xl shadow-xl p-8 border-2 border-pink-200 hover:border-pink-300 transition-all text-left group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-pink-200 transition-colors">
                <Gift className="w-10 h-10 text-pink-600" />
              </div>

              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                Como Regalo
              </h2>

              <p className="text-slate-600 mb-6">
                Regala Repitis a alguien especial. Recibirás un código de activación para compartir.
              </p>

              <div className="mt-auto pt-4">
                <div className="px-6 py-3 bg-gradient-to-r from-pink-600 to-violet-600 text-white font-bold rounded-xl group-hover:shadow-lg transition-shadow">
                  Continuar
                </div>
              </div>
            </div>
          </motion.button>
        </div>

        {/* Info note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center text-slate-500"
        >
          <p className="font-medium">
            En ambos casos, recibirás un código de activación instantáneo
          </p>
        </motion.div>
      </div>
    </div>
  );
}
