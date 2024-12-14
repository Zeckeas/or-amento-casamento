import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

export function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Indicador de carregamento enquanto o estado de autenticação está sendo determinado
  }

  if (!user) {
    return <Navigate to="/login" />; // Redireciona para o login se o usuário não estiver autenticado
  }

  // Verifica se é uma rota de administrador
  if (adminOnly && !user.email?.endsWith('@admin.com')) {
    return <Navigate to="/" />; // Redireciona para a página inicial se o usuário não for admin
  }

  return <>{children}</>;
}
