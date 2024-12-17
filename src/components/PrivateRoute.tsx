import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../config/supabase'; // A configuração do supabase

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: userData, error } = await supabase.auth.getUser();
      if (error || !userData) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    };

    checkUser();
  }, []);

  if (isAuthenticated === null) {
    // Em caso de carregamento, você pode exibir um loading
    return <div>Carregando...</div>;
  }

  if (isAuthenticated === false) {
    // Se não estiver autenticado, redireciona para o login
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>; // Retorna o conteúdo da rota protegida
};
