import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Gift, Copy, Share2 } from 'lucide-react';
import { paymentService, type PaymentStatus } from '@/services/paymentService';
import { supabase } from '@/services/supabase';
import { theme, getScale } from '@/styles/theme';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState<string>('loading');
  const [paymentData, setPaymentData] = useState<PaymentStatus | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const paymentId = searchParams.get('payment_id');
    const status = searchParams.get('status');

    if (status === 'approved' && paymentId) {
      // Verify payment status with backend
      paymentService
        .getPaymentStatus(paymentId)
        .then((data) => {
          setPaymentStatus(data.status);
          setPaymentData(data);
        })
        .catch(() => {
          setPaymentStatus('error');
          setPaymentData(null);
        });
    } else {
      setPaymentStatus('approved');
    }
  }, [searchParams]);

  const handleCopyCode = async () => {
    if (paymentData?.gift_code) {
      await navigator.clipboard.writeText(paymentData.gift_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    const giftCode = paymentData?.gift_code;
    if (!giftCode) return;

    const shareText = `🎁 ¡Te han regalado Repitis!\n\nAcceso completo de por vida a Repitis, la app que enseña a leer en español.\n\nTu código de regalo: ${giftCode}\n\nDescarga la app y activa tu regalo: https://www.repitis.com`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: '🎁 Regalo de Repitis',
          text: shareText,
        });
      } catch (err) {
        // User cancelled or share failed, fallback to copy
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } else {
      // Fallback to copy
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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

  const isGiftPurchase = !isAuthenticated || paymentData?.is_gift;
  const hasGiftCode = !!paymentData?.gift_code;

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
          <div className={`w-24 h-24 ${isGiftPurchase ? 'bg-pink-100' : 'bg-green-100'} rounded-full flex items-center justify-center`}>
            {isGiftPurchase ? (
              <Gift className="w-16 h-16 text-pink-600" />
            ) : (
              <CheckCircle className="w-16 h-16 text-green-600" />
            )}
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-black text-slate-800 mb-4"
        >
          {isGiftPurchase ? '¡Regalo Comprado!' : '¡Pago Exitoso!'}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 mb-8"
        >
          {isGiftPurchase ? (
            <>
              <p className="text-lg text-slate-600">
                Gracias por regalar Repitis.
              </p>
              <p className="text-slate-600">
                {hasGiftCode
                  ? 'Comparte este código con la persona especial a quien le regalas acceso completo de por vida.'
                  : 'Tu código de regalo será enviado a tu correo en unos momentos.'}
              </p>

              {hasGiftCode && (
                <div className="mt-6 p-6 bg-gradient-to-br from-violet-50 to-pink-50 rounded-2xl border-2 border-violet-200">
                  <p className="text-sm text-violet-700 font-medium mb-3">Código de Regalo</p>
                  <div className="bg-white px-4 py-3 rounded-xl border border-violet-200 mb-4">
                    <code className="text-2xl font-bold text-violet-600 tracking-wider">
                      {paymentData.gift_code}
                    </code>
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: getScale(false) }}
                      whileTap={{ scale: getScale(false, 0.95) }}
                      onClick={handleCopyCode}
                      className="flex-1 px-4 py-3 bg-white text-violet-600 font-semibold rounded-xl border-2 border-violet-200 hover:bg-violet-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      {copied ? '¡Copiado!' : 'Copiar'}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: getScale(false) }}
                      whileTap={{ scale: getScale(false, 0.95) }}
                      onClick={handleShare}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      Compartir
                    </motion.button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <p className="text-lg text-slate-600">
                ¡Bienvenido a Repitis!
              </p>
              <p className="text-slate-600">
                Ahora tienes acceso completo y permanente a todas las funciones.
              </p>
              {paymentData && (
                <div className="mt-6 p-4 bg-violet-50 rounded-xl border border-violet-200">
                  <p className="text-sm text-violet-700 font-medium">
                    ✓ Tu cuenta ha sido actualizada
                  </p>
                </div>
              )}
            </>
          )}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: getScale(false) }}
          whileTap={{ scale: getScale(false, 0.95) }}
          onClick={() => navigate(isGiftPurchase ? '/' : '/repasar')}
          className="w-full px-8 py-4 bg-slate-100 text-slate-700 text-lg font-semibold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
        >
          {isGiftPurchase ? 'Volver al Inicio' : 'Comenzar a Aprender'}
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
}
