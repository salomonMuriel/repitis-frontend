import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { paymentService } from '@/services/paymentService';
import { theme, getScale } from '@/styles/theme';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState<string>('loading');
  const [paymentVerified, setPaymentVerified] = useState(false);

  useEffect(() => {
    const paymentId = searchParams.get('payment_id');
    const status = searchParams.get('status');

    if (status === 'approved' && paymentId) {
      // Verify payment status with backend
      paymentService
        .getPaymentStatus(paymentId)
        .then((data) => {
          setPaymentStatus(data.status);
          setPaymentVerified(true);
        })
        .catch(() => {
          setPaymentStatus('error');
          setPaymentVerified(false);
        });
    } else {
      setPaymentStatus('approved');
      setPaymentVerified(true);
    }
  }, [searchParams]);

  const handleContinue = () => {
    navigate('/repasar');
  };

  if (paymentStatus === 'loading') {
    return (
      <div className={theme.gradientClasses.background + ' min-h-screen flex items-center justify-center'}>
        <div className="text-center">
          <div className="text-2xl text-slate-600">Verificando pago...</div>
        </div>
      </div>
    );
  }

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
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-black text-slate-800 mb-4"
        >
          ¡Pago Exitoso!
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 mb-8"
        >
          <p className="text-lg text-slate-600">
            Gracias por suscribirte a Repitis Premium.
          </p>
          <p className="text-slate-600">
            Ahora tienes acceso completo y permanente a todas las funciones premium.
          </p>
          {paymentVerified && (
            <div className="mt-6 p-4 bg-violet-50 rounded-xl border border-violet-200">
              <p className="text-sm text-violet-700 font-medium">
                ✓ Tu cuenta ha sido actualizada
              </p>
            </div>
          )}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: getScale(false) }}
          whileTap={{ scale: getScale(false, 0.95) }}
          onClick={handleContinue}
          className="w-full px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
        >
          Comenzar a Aprender
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
}
