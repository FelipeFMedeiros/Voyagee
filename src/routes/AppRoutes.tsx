// routes/AppRoutes.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
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

// Componente para rotas protegidas (será usado posteriormente)
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = false; // Aqui você implementará sua lógica de autenticação

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Componente para lazy loading
const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {children}
    </Suspense>
  );
};

export function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route 
            path="contato" 
            element={
              <SuspenseWrapper>
                <Contato />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="sobre" 
            element={
              <SuspenseWrapper>
                <Sobre />
              </SuspenseWrapper>
            } 
          />
          
          {/* Rotas de Autenticação */}
          <Route 
            path="login" 
            element={
              <SuspenseWrapper>
                <Login />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="signup" 
            element={
              <SuspenseWrapper>
                <Signup />
              </SuspenseWrapper>
            } 
          />

          {/* Exemplo de Rota Protegida (implementar depois) */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <SuspenseWrapper>
                  {/* Seu componente protegido aqui */}
                  <div>Protected Component</div>
                </SuspenseWrapper>
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}