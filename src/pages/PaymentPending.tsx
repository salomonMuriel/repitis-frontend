import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, Mail } from 'lucide-react';
import { supabase } from '@/services/supabase';
import { theme, getScale } from '@/styles/theme';

export default function PaymentPending() {
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
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center"
          >
            <Clock className="w-16 h-16 text-yellow-600" />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-black text-slate-800 mb-4"
        >
          Pago Pendiente
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 mb-8"
        >
          <p className="text-lg text-slate-600">
            Tu pago está siendo procesado.
          </p>
          <p className="text-slate-600">
            Recibirás un correo de confirmación cuando se complete.
          </p>
          <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-700 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-yellow-700 font-medium">
                Esto puede tomar unos minutos. No te preocupes, te notificaremos cuando esté listo.
              </p>
            </div>
          </div>

          {!isAuthenticated && (
            <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-700 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-700">
                  Una vez confirmado, recibirás tu código de regalo por correo electrónico.
                </p>
              </div>
            </div>
          )}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: getScale(false) }}
          whileTap={{ scale: getScale(false, 0.95) }}
          onClick={() => navigate('/')}
          className="w-full px-8 py-4 bg-slate-100 text-slate-700 text-lg font-semibold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al Inicio
        </motion.button>
      </motion.div>
    </div>
  );
}
