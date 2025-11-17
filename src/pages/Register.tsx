import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { paymentService } from '@/services/paymentService';
import { UserPlus, Mail, Lock, User, ArrowRight, CheckCircle, AlertCircle, Gift } from 'lucide-react';
import { theme, getScale } from '@/styles/theme';

/**
 * Register Page
 *
 * Premium registration page with glass morphism effects, smooth animations,
 * and sophisticated form interactions. Matches the Landing page aesthetic.
 */
export default function Register() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [activationCode, setActivationCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [confirmationRequired, setConfirmationRequired] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [activating, setActivating] = useState(false);

  const { signUp, loading } = useAuth();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  // Auto-fill activation code from URL parameter
  useEffect(() => {
    const codeFromUrl = searchParams.get('code');
    if (codeFromUrl) {
      setActivationCode(codeFromUrl.toUpperCase());
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setConfirmationRequired(false);

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      await signUp(email, password, name);
      setSuccess(true);

      // If user provided an activation code, activate it
      if (activationCode.trim()) {
        setActivating(true);
        try {
          await paymentService.activateCode(activationCode.trim());
          // Code activated successfully, redirect to app
          setTimeout(() => navigate('/repasar'), 2000);
        } catch (activationError: any) {
          // Code activation failed, but account was created
          setError(`Cuenta creada, pero código inválido: ${activationError.message}`);
          setSuccess(false);
          setActivating(false);
          // Still redirect after a delay so they can use the app
          setTimeout(() => navigate('/repasar'), 3000);
        }
      } else {
        // No activation code, just redirect
        setTimeout(() => navigate('/repasar'), 2000);
      }
    } catch (err: any) {
      if (err.message === 'CONFIRMATION_REQUIRED') {
        setConfirmationRequired(true);
      } else {
        setError(err.message || 'Error al registrarse');
      }
    }
  };

  // Floating particles animation for background
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 10,
  }));

  return (
    <div className={theme.gradientClasses.background + ' min-h-screen relative overflow-hidden'}>
      {/* Animated Background Particles */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-gradient-to-br from-violet-400/20 to-pink-400/20"
              style={{
                width: particle.size,
                height: particle.size,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Navigation */}
      <nav className="relative z-10 container mx-auto px-4 py-6">
        <Link to="/">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: getScale(shouldReduceMotion, 1.05) }}
            className={'text-3xl font-black ' + theme.gradientClasses.text + ' cursor-pointer'}
          >
            Repitis
          </motion.div>
        </Link>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center px-4 pb-12 pt-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          {/* Glass Morphism Card */}
          <div className={theme.glassClasses.card + ' rounded-3xl shadow-2xl p-8 md:p-10'}>
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2
                }}
                className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 rounded-full mb-6 shadow-lg"
              >
                {/* Subtle pulse ring */}
                {!shouldReduceMotion && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                )}
                <UserPlus className="text-white relative z-10" size={36} strokeWidth={2.5} />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-black mb-3 text-slate-800"
              >
                Crear Cuenta
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-slate-600 text-lg"
              >
                Únete a la aventura de aprender a leer
              </motion.p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">
                  Nombre
                </label>
                <motion.div
                  className="relative"
                  animate={focusedField === 'name' ? { scale: 1.01 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <User
                      size={20}
                      className={`transition-colors duration-300 ${
                        focusedField === 'name'
                          ? 'text-violet-600'
                          : 'text-slate-400'
                      }`}
                    />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className={`
                      w-full pl-12 pr-4 py-4
                      bg-white/50 backdrop-blur-sm
                      border-2 rounded-xl
                      text-slate-800 placeholder-slate-400
                      font-medium
                      transition-all duration-300
                      focus:outline-none focus:bg-white
                      ${focusedField === 'name'
                        ? 'border-violet-500 shadow-lg shadow-violet-200'
                        : 'border-slate-200 hover:border-slate-300'
                      }
                    `}
                    placeholder="Tu nombre"
                    required
                  />
                </motion.div>
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">
                  Email
                </label>
                <motion.div
                  className="relative"
                  animate={focusedField === 'email' ? { scale: 1.01 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Mail
                      size={20}
                      className={`transition-colors duration-300 ${
                        focusedField === 'email'
                          ? 'text-violet-600'
                          : 'text-slate-400'
                      }`}
                    />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={`
                      w-full pl-12 pr-4 py-4
                      bg-white/50 backdrop-blur-sm
                      border-2 rounded-xl
                      text-slate-800 placeholder-slate-400
                      font-medium
                      transition-all duration-300
                      focus:outline-none focus:bg-white
                      ${focusedField === 'email'
                        ? 'border-violet-500 shadow-lg shadow-violet-200'
                        : 'border-slate-200 hover:border-slate-300'
                      }
                    `}
                    placeholder="tu@email.com"
                    required
                  />
                </motion.div>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label htmlFor="password" className="block text-sm font-bold text-slate-700 mb-2">
                  Contraseña
                </label>
                <motion.div
                  className="relative"
                  animate={focusedField === 'password' ? { scale: 1.01 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Lock
                      size={20}
                      className={`transition-colors duration-300 ${
                        focusedField === 'password'
                          ? 'text-violet-600'
                          : 'text-slate-400'
                      }`}
                    />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    className={`
                      w-full pl-12 pr-4 py-4
                      bg-white/50 backdrop-blur-sm
                      border-2 rounded-xl
                      text-slate-800 placeholder-slate-400
                      font-medium
                      transition-all duration-300
                      focus:outline-none focus:bg-white
                      ${focusedField === 'password'
                        ? 'border-violet-500 shadow-lg shadow-violet-200'
                        : 'border-slate-200 hover:border-slate-300'
                      }
                    `}
                    placeholder="Mínimo 6 caracteres"
                    required
                  />
                </motion.div>
              </motion.div>

              {/* Activation Code Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <label htmlFor="activationCode" className="block text-sm font-bold text-slate-700 mb-2">
                  Código de Activación{' '}
                  <span className="text-slate-400 font-normal">(opcional)</span>
                </label>
                <motion.div
                  className="relative"
                  animate={focusedField === 'activationCode' ? { scale: 1.01 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Gift
                      size={20}
                      className={`transition-colors duration-300 ${
                        focusedField === 'activationCode'
                          ? 'text-pink-600'
                          : 'text-slate-400'
                      }`}
                    />
                  </div>
                  <input
                    id="activationCode"
                    type="text"
                    value={activationCode}
                    onChange={(e) => setActivationCode(e.target.value.toUpperCase())}
                    onFocus={() => setFocusedField('activationCode')}
                    onBlur={() => setFocusedField(null)}
                    className={`
                      w-full pl-12 pr-4 py-4
                      bg-white/50 backdrop-blur-sm
                      border-2 rounded-xl
                      text-slate-800 placeholder-slate-400
                      font-mono font-semibold tracking-wider
                      transition-all duration-300
                      focus:outline-none focus:bg-white
                      ${focusedField === 'activationCode'
                        ? 'border-pink-500 shadow-lg shadow-pink-200'
                        : 'border-slate-200 hover:border-slate-300'
                      }
                    `}
                    placeholder="XXXX-XXXX-XXXX"
                    maxLength={14}
                  />
                </motion.div>
                <p className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
                  <Gift size={12} />
                  ¿Te regalaron Repitis? Ingresa tu código aquí
                </p>
              </motion.div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-4 rounded-xl flex items-start gap-3"
                >
                  <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">{error}</p>
                </motion.div>
              )}

              {/* Confirmation Required Message */}
              {confirmationRequired && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="bg-blue-50 border-2 border-blue-200 text-blue-700 px-4 py-4 rounded-xl flex items-start gap-3"
                >
                  <Mail size={20} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold mb-1">¡Cuenta creada!</p>
                    <p className="text-sm">
                      Por favor revisa tu email ({email}) para confirmar tu dirección y poder iniciar sesión.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Success Message */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="bg-green-50 border-2 border-green-200 text-green-700 px-4 py-4 rounded-xl flex items-start gap-3"
                >
                  <CheckCircle size={20} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold">
                      {activating ? '¡Activando acceso premium...' : '¡Cuenta creada!'}
                    </p>
                    {activationCode && !activating && (
                      <p className="text-sm mt-1">Acceso premium activado. Redirigiendo...</p>
                    )}
                    {!activationCode && (
                      <p className="text-sm mt-1">Redirigiendo...</p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={loading ? {} : { scale: getScale(shouldReduceMotion, 1.02) }}
                whileTap={loading ? {} : { scale: getScale(shouldReduceMotion, 0.98) }}
                className={`
                  relative w-full py-4 px-6
                  bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600
                  text-white text-lg font-bold rounded-xl
                  shadow-lg shadow-violet-300/50
                  transition-all duration-300
                  disabled:opacity-50 disabled:cursor-not-allowed
                  overflow-hidden group
                  ${!loading && 'hover:shadow-xl hover:shadow-violet-400/50'}
                `}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Creando cuenta...
                    </>
                  ) : (
                    <>
                      Crear Cuenta
                      <ArrowRight
                        size={20}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </span>
                {!loading && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-violet-700 via-fuchsia-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                )}
              </motion.button>
            </form>

            {/* Footer Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-8 space-y-4 text-center"
            >
              <p className="text-slate-600">
                ¿Ya tienes cuenta?{' '}
                <Link
                  to="/login"
                  className="text-violet-600 hover:text-violet-700 font-bold transition-colors duration-300 hover:underline"
                >
                  Inicia sesión aquí
                </Link>
              </p>

              <Link
                to="/"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors duration-300 font-medium"
              >
                <motion.span
                  whileHover={{ x: -4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  ←
                </motion.span>
                Volver al inicio
              </Link>
            </motion.div>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/40 backdrop-blur-sm rounded-full border border-white/60 shadow-sm">
              <CheckCircle size={16} className="text-violet-600 flex-shrink-0" />
              <p className="text-sm text-slate-600 font-semibold">
                No necesitas tarjeta de crédito · Comienza en 30 segundos
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
