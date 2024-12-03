import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { ProtectedRoute } from '../components/ProtectedRoute';
import ScrollToTop from '../components/ScrollToTop';
import Layout from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

// Lazy loading
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));
const Contato = lazy(() => import('../pages/Contato'));
const Sobre = lazy(() => import('../pages/Sobre'));
const Roteiro = lazy(() => import('../pages/Roteiro'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Profile = lazy(() => import('../pages/Profile'));

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
);

export function AppRoutes() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contato" element={<SuspenseWrapper><Contato /></SuspenseWrapper>} />
          <Route path="sobre" element={<SuspenseWrapper><Sobre /></SuspenseWrapper>} />
          <Route path="roteiro" element={<SuspenseWrapper><Roteiro /></SuspenseWrapper>} />
          
          {/* Rotas de Autenticação */}
          <Route path="login" element={<SuspenseWrapper><Login /></SuspenseWrapper>} />
          <Route path="signup" element={<SuspenseWrapper><Signup /></SuspenseWrapper>} />

          {/* Rotas Protegidas */}
          <Route path="dashboard" element={
            <ProtectedRoute>
              <SuspenseWrapper>
                <Dashboard />
              </SuspenseWrapper>
            </ProtectedRoute>
          } />

          <Route path="profile" element={
            <ProtectedRoute>
              <SuspenseWrapper>
                <Profile />
              </SuspenseWrapper>
            </ProtectedRoute>
          } />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}