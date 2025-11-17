import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Sparkles, Infinity } from 'lucide-react';
import { paymentService } from '@/services/paymentService';
import { supabase } from '@/services/supabase';
import { PurchaseTypeModal } from '@/components/PurchaseTypeModal';
import { theme, getScale } from '@/styles/theme';

export default function Pricing() {
  const [loading, setLoading] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Check if user is authenticated
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });
  }, []);

  const handleBuyClick = () => {
    // If user is authenticated, proceed directly
    // If not authenticated, show modal to ask purchase type
    if (isAuthenticated) {
      handlePurchase(false); // Not a gift for authenticated users
    } else {
      setShowTypeModal(true);
    }
  };

  const handlePurchase = async (isGift: boolean) => {
    setLoading(true);
    try {
      const { checkout_url } = await paymentService.createCheckout({
        title: 'Repitis - Acceso de por Vida',
        quantity: 1,
        unit_price: 30000,
        description: isGift
          ? 'Regalo de acceso completo y permanente a Repitis'
          : 'Acceso completo y permanente a Repitis',
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
    'Acceso de por vida',
    'Todos los niveles desbloqueados',
    'Más de 380 tarjetas interactivas',
    'Audio profesional para cada tarjeta',
    'Seguimiento de progreso detallado',
    'Sistema de repetición inteligente',
    'Sin anuncios',
    'Actualizaciones futuras incluidas',
  ];

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

      {/* Pricing Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
            <span className={theme.gradientClasses.text}>Acceso de por Vida</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Una sola compra. Acceso ilimitado para siempre.
          </p>
        </motion.div>

        <div className="max-w-lg mx-auto">
          {/* Lifetime Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-3xl shadow-2xl p-8 border-2 border-violet-400"
          >
            {/* Lifetime badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-2 px-4 py-2 bg-yellow-400 rounded-full shadow-lg">
                <Sparkles className="w-4 h-4 text-yellow-900" />
                <span className="text-sm font-bold text-yellow-900">Pago Único</span>
              </div>
            </div>

            <div className="mb-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Infinity className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Acceso de por Vida</h2>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-6xl font-black text-white">$30,000</span>
                <span className="text-violet-100">COP</span>
              </div>
              <p className="text-violet-100 mt-2">IVA incluido</p>
            </div>

            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-white">{feature}</span>
                </li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: getScale(shouldReduceMotion) }}
              whileTap={{ scale: getScale(shouldReduceMotion, 0.95) }}
              onClick={handleBuyClick}
              disabled={loading}
              className="w-full px-8 py-4 bg-white text-violet-600 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Procesando...' : 'Comprar Ahora'}
            </motion.button>
          </motion.div>
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center text-slate-500"
        >
          <p className="font-medium">
            Pago seguro procesado por MercadoPago
          </p>
        </motion.div>
      </div>

      {/* Purchase Type Modal */}
      <PurchaseTypeModal
        isOpen={showTypeModal}
        onClose={() => setShowTypeModal(false)}
        onSelectType={handlePurchase}
      />
    </div>
  );
}
