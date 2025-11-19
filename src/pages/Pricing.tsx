import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Sparkles, Infinity } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { paymentService } from '@/services/paymentService';
import { PurchaseTypeModal } from '@/components/PurchaseTypeModal';
import { api } from '@/services/api';
import { theme, getScale } from '@/styles/theme';
import { useAuth } from '@/hooks/useAuth';

export default function Pricing() {
  const [loading, setLoading] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { isAuthenticated } = useAuth();

  // Fetch user stats to check premium status
  const { data: stats } = useQuery({
    queryKey: ['stats'],
    queryFn: () => api.getStats(),
    retry: false, // Don't retry if user is not authenticated
  });

  const handleBuyClick = () => {
    // Always show modal to ask if it's for them or a gift
    // This allows authenticated users to also buy gifts
    setShowTypeModal(true);
  };

  const handlePurchase = async (data: { isGift: boolean; email?: string }) => {
    setLoading(true);
    try {
      const { checkout_url } = await paymentService.createCheckout({
        title: 'Repitis - Acceso de por Vida',
        quantity: 1,
        unit_price: 30000,
        description: data.isGift
          ? 'Regalo de acceso completo y permanente a Repitis'
          : 'Acceso completo y permanente a Repitis',
        payer_email: data.email, // Pass email for gift purchases
      });

      window.location.href = checkout_url;
    } catch (error) {
      console.error('Failed to create checkout:', error);
      alert('Error creando el pago. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    'Todos los niveles desbloqueados',
    'Más de 380 tarjetas interactivas',
    'Sistema de repetición inteligente',
    'Sin anuncios ni sorpresas',
  ];

  return (
    <div className={theme.gradientClasses.background + ' min-h-screen'}>
      {/* Navigation */}
      <nav className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link to={isAuthenticated ? "/review" : "/"}>
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
            {isAuthenticated ? (
              <Link to="/review">
                <motion.button
                  whileHover={{ scale: getScale(shouldReduceMotion) }}
                  whileTap={{ scale: getScale(shouldReduceMotion, 0.95) }}
                  className="px-6 py-2 text-violet-700 font-semibold hover:text-violet-900 transition-colors"
                >
                  Ir a Repasar
                </motion.button>
              </Link>
            ) : (
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: getScale(shouldReduceMotion) }}
                  whileTap={{ scale: getScale(shouldReduceMotion, 0.95) }}
                  className="px-6 py-2 text-violet-700 font-semibold hover:text-violet-900 transition-colors"
                >
                  Iniciar Sesión
                </motion.button>
              </Link>
            )}
          </motion.div>
        </div>
      </nav>

      {/* Pricing Content */}
      <div className="relative z-10 container mx-auto px-4 py-4 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3 md:mb-4">
            <span className={theme.gradientClasses.text}>Invierte en su Futuro</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600">
            Un solo pago. Aprendizaje para toda la vida.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Lifetime Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-3xl shadow-2xl border-2 border-violet-400"
          >
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-6 md:p-8">
              {/* Left column - Price and CTA */}
              <div className="flex flex-col justify-center">
                {/* Lifetime badge - only on mobile */}
                <div className="md:hidden flex justify-center mb-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-yellow-400 rounded-full shadow-lg">
                    <Sparkles className="w-4 h-4 text-yellow-900" />
                    <span className="text-sm font-bold text-yellow-900">Pago Único</span>
                  </div>
                </div>

                <div className="text-center md:text-left">
                  <div className="hidden md:flex items-center gap-3 mb-4">
                    <Infinity className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">Acceso de por Vida</h2>
                  <div className="flex items-baseline justify-center md:justify-start gap-2 mb-2">
                    <span className="text-5xl md:text-6xl font-black text-white">$30,000</span>
                    <span className="text-violet-100 text-xl">COP</span>
                  </div>
                  <p className="text-violet-100 mb-4 md:mb-6 text-sm md:text-base">IVA incluido · Sin suscripciones</p>

                  <motion.button
                    whileHover={{ scale: getScale(shouldReduceMotion) }}
                    whileTap={{ scale: getScale(shouldReduceMotion, 0.95) }}
                    onClick={handleBuyClick}
                    disabled={loading}
                    className="w-full px-6 md:px-8 py-3 md:py-4 bg-white text-violet-600 text-lg md:text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Procesando...' : 'Comprar Ahora'}
                  </motion.button>
                </div>
              </div>

              {/* Right column - Features */}
              <div className="flex items-center">
                <ul className="space-y-3 w-full">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                      <span className="text-white text-sm md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 md:mt-8 text-center text-slate-500"
        >
          <p className="font-medium text-sm md:text-base">
            Pago seguro procesado por MercadoPago
          </p>
        </motion.div>
      </div>

      {/* Purchase Type Modal */}
      <PurchaseTypeModal
        isOpen={showTypeModal}
        onClose={() => setShowTypeModal(false)}
        onSelectType={handlePurchase}
        isPremium={stats?.is_premium ?? false}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
}
