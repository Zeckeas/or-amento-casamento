import { useAuth } from '../../hooks/useAuth';
import { LogOut } from 'lucide-react';

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white shadow-sm lg:pl-64">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <h2 className="text-lg font-medium text-gray-900">
            Bem-vindo(a), {user?.email}
          </h2>
        </div>
        <button
          onClick={signOut}
          className="flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </button>
      </div>
    </header>
  );
}