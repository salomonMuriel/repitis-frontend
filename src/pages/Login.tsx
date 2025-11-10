import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { LogIn, ArrowLeft, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { theme, getScale } from '@/styles/theme';
import { FloatingLettersBackground } from '@/components/Landing';

/**
 * Login Page - Premium Design
 *
 * Features:
 * - Floating letters background matching Landing page
 * - Glass morphism card with backdrop blur
 * - Premium input fields with smooth focus transitions
 * - Enhanced animations and micro-interactions
 * - Beautiful error states with icon and animation
 * - Gradient button with hover shimmer effect
 * - Reduced motion support for accessibility
 */
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signIn(email, password);
      navigate('/repasar');
    } catch (err: any) {
      // Check for email not confirmed error
      if (err.message?.includes('Email not confirmed')) {
        setError('Tu email aún no ha sido confirmado. Por favor revisa tu correo y haz clic en el enlace de confirmación.');
      } else {
        setError(err.message || 'Error al iniciar sesión');
      }
    }
  };

  return (
    <div className={theme.gradientClasses.background + ' min-h-screen overflow-hidden'}>
      {/* Floating Letters Background */}
      <FloatingLettersBackground />

      {/* Back to Home Link */}
      <nav className="relative z-10 container mx-auto px-4 py-6">
        <Link to="/">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: getScale(shouldReduceMotion), x: -4 }}
            whileTap={{ scale: getScale(shouldReduceMotion, 0.95) }}
            className="flex items-center gap-2 text-violet-700 font-semibold hover:text-violet-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver al inicio</span>
          </motion.button>
        </Link>
      </nav>

      {/* Login Card */}
      <div className="relative z-10 flex items-center justify-center px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full max-w-md"
        >
          {/* Glass Morphism Card */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 md:p-10">
            {/* Icon and Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center mb-8"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className={'inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl shadow-lg ' + theme.gradientClasses.primary}
              >
                <LogIn className="text-white" size={36} />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-black mb-3">
                <span className={theme.gradientClasses.text}>Bienvenido</span>
              </h1>
              <p className="text-lg text-slate-600">
                Continúa tu aventura de lectura
              </p>
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                  Email
                </label>
                <motion.div
                  animate={{
                    scale: focusedField === 'email' ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <Mail
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                      focusedField === 'email' ? 'text-violet-600' : 'text-slate-400'
                    }`}
                  />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none font-medium ${
                      focusedField === 'email'
                        ? 'border-violet-400 shadow-lg shadow-violet-100 bg-white'
                        : 'border-slate-200 bg-white/50'
                    }`}
                    placeholder="tu@email.com"
                    required
                  />
                </motion.div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                  Contraseña
                </label>
                <motion.div
                  animate={{
                    scale: focusedField === 'password' ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <Lock
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                      focusedField === 'password' ? 'text-violet-600' : 'text-slate-400'
                    }`}
                  />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none font-medium ${
                      focusedField === 'password'
                        ? 'border-violet-400 shadow-lg shadow-violet-100 bg-white'
                        : 'border-slate-200 bg-white/50'
                    }`}
                    placeholder="••••••••"
                    required
                  />
                </motion.div>
              </div>

              {/* Error Message */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-3 bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-medium leading-relaxed">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: getScale(shouldReduceMotion, 1.02) } : {}}
                whileTap={!loading ? { scale: getScale(shouldReduceMotion, 0.98) } : {}}
                className={`relative w-full py-4 rounded-xl text-white text-lg font-bold shadow-lg overflow-hidden transition-all duration-300 ${
                  loading
                    ? 'bg-gradient-to-r from-slate-400 via-slate-500 to-slate-400 cursor-not-allowed'
                    : theme.gradientClasses.primary + ' hover:shadow-xl hover:shadow-violet-200'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Iniciando sesión...</span>
                  </span>
                ) : (
                  <>
                    <span className="relative z-10">Iniciar Sesión</span>
                    <motion.div
                      className={'absolute inset-0 ' + theme.gradientClasses.hover + ' opacity-0 hover:opacity-100 transition-opacity duration-300'}
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  </>
                )}
              </motion.button>
            </motion.form>

            {/* Register Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 text-center"
            >
              <p className="text-slate-600">
                ¿No tienes cuenta?{' '}
                <Link
                  to="/register"
                  className={'font-bold transition-all duration-200 hover:underline ' + theme.gradientClasses.text}
                >
                  Regístrate aquí
                </Link>
              </p>
            </motion.div>
          </div>

          {/* Trust Indicator */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center text-sm text-slate-500 font-medium"
          >
            Seguro y protegido · Tu privacidad es importante
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
