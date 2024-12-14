import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Tags, 
  Users, 
  DollarSign, 
  Calendar as CalendarIcon,
  Image,
  Settings
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Categorias', href: '/categories', icon: Tags },
  { name: 'Fornecedores', href: '/vendors', icon: Users },
  { name: 'Orçamento', href: '/budget', icon: DollarSign },
  { name: 'Calendário', href: '/calendar', icon: CalendarIcon },
  { name: 'Galeria', href: '/gallery', icon: Image },
  { name: 'Admin', href: '/admin', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
        <div className="flex items-center h-16 flex-shrink-0 px-4 bg-purple-600">
          <h1 className="text-xl font-bold text-white">Wedding Planner</h1>
        </div>
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md
                    ${isActive 
                      ? 'bg-purple-50 text-purple-600' 
                      : 'text-gray-600 hover:bg-gray-50'}
                  `}
                >
                  <item.icon
                    className={`
                      mr-3 flex-shrink-0 h-5 w-5
                      ${isActive ? 'text-purple-600' : 'text-gray-400'}
                    `}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}