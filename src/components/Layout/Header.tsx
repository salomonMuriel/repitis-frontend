import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LogOut, Home, BookOpen, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/dashboard">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <span className="text-4xl">📚</span>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                Repitis
              </span>
            </motion.div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/dashboard" icon={<Home size={20} />} text="Inicio" />
            <NavLink to="/review" icon={<BookOpen size={20} />} text="Repasar" />
            <NavLink to="/levels" icon={<BarChart3 size={20} />} text="Niveles" />
          </nav>

          <div className="flex items-center space-x-4">
            {user && (
              <>
                <span className="text-gray-700 font-semibold hidden sm:block">
                  {user.user_metadata?.name || user.email}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => signOut()}
                  className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-xl shadow-lg transition-all"
                >
                  <LogOut size={20} />
                  <span className="hidden sm:inline">Salir</span>
                </motion.button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex md:hidden justify-around mt-4 pt-4 border-t border-gray-200">
          <MobileNavLink to="/dashboard" icon={<Home size={24} />} text="Inicio" />
          <MobileNavLink to="/review" icon={<BookOpen size={24} />} text="Repasar" />
          <MobileNavLink to="/levels" icon={<BarChart3 size={24} />} text="Niveles" />
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) {
  return (
    <Link to={to}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition-colors font-semibold"
      >
        {icon}
        <span>{text}</span>
      </motion.div>
    </Link>
  );
}

function MobileNavLink({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) {
  return (
    <Link to={to}>
      <motion.div
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center space-y-1 text-gray-700 hover:text-blue-500 transition-colors"
      >
        {icon}
        <span className="text-xs font-semibold">{text}</span>
      </motion.div>
    </Link>
  );
}
