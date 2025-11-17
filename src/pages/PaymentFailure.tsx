import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { supabase } from '@/services/supabase';
import { theme, getScale } from '@/styles/theme';

export default function PaymentFailure() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });
  }, []);

  return (
    <div className={theme.gradientClasses.background + ' min-h-screen flex items-center justify-center px-4'}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
            <XCircle className="w-16 h-16 text-red-600" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-black text-slate-800 mb-4"
        >
          Pago Fallido
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 mb-8"
        >
          <p className="text-lg text-slate-600">
            No pudimos procesar tu pago.
          </p>
          <p className="text-slate-600">
            Por favor intenta de nuevo o contacta a soporte si el problema persiste.
          </p>
          {!isAuthenticated && (
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-700">
                💡 No te preocupes, no se realizó ningún cargo. Puedes intentar de nuevo cuando quieras.
              </p>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <motion.button
            whileHover={{ scale: getScale(false) }}
            whileTap={{ scale: getScale(false, 0.95) }}
            onClick={() => navigate('/pricing')}
            className="w-full px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Intentar de Nuevo
          </motion.button>

          <motion.button
            whileHover={{ scale: getScale(false) }}
            whileTap={{ scale: getScale(false, 0.95) }}
            onClick={() => navigate('/')}
            className="w-full px-8 py-4 bg-slate-100 text-slate-700 text-lg font-semibold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al Inicio
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
