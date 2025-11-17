import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { useAuthStore } from './store/authStore';
import Login from './pages/Login';
import Register from './pages/Register';
import Review from './pages/Review';
import Levels from './pages/Levels';
import Landing from './pages/Landing';
import PurchaseType from './pages/PurchaseType';
import Pricing from './pages/Pricing';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailure from './pages/PaymentFailure';
import PaymentPending from './pages/PaymentPending';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function App() {
  const setQueryClient = useAuthStore((state) => state.setQueryClient);

  // Connect QueryClient to auth store on mount
  useEffect(() => {
    setQueryClient(queryClient);
  }, [setQueryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/repasar"
            element={
              <ProtectedRoute>
                <Review />
              </ProtectedRoute>
            }
          />
          <Route
            path="/progreso"
            element={
              <ProtectedRoute>
                <Levels />
              </ProtectedRoute>
            }
          />
          {/* Payment routes */}
          <Route path="/comprar" element={<PurchaseType />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/failure" element={<PaymentFailure />} />
          <Route path="/payment/pending" element={<PaymentPending />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
