import { Home, PieChart, Calendar, Image, Users, FileText, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Categorias', href: '/categories', icon: PieChart },
  { name: 'Cronograma', href: '/schedule', icon: Calendar },
  { name: 'Inspirações', href: '/inspiration', icon: Image },
  { name: 'Fornecedores', href: '/vendors', icon: Users },
  { name: 'Relatórios', href: '/reports', icon: FileText },
];

export function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Sidebar */}
      <div className={`flex flex-col bg-white border-b w-full md:static transition-transform ${isOpen ? 'transform-none' : 'transform -translate-y-full md:translate-y-0'}`}>
        <div className="flex h-16 shrink-0 items-center px-6">
          <h1 className="text-2xl font-bold text-gray-900">Wedding Planner</h1>
        </div>
        <nav className="flex flex-col">
          <ul role="list" className="flex flex-col gap-y-7 px-6 py-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6',
                      location.pathname === item.href
                        ? 'bg-gray-50 text-indigo-600'
                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                    )}
                  >
                    <Icon className="h-6 w-6 shrink-0" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 z-10 md:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-8 w-8 text-gray-700" />
      </button>

      {/* Content Area */}
      <div className="flex-1 pt-16 px-6">
        {/* Content goes here */}
      </div>
    </div>
  );
}
