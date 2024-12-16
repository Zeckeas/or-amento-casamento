import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Calculator,
  Image,
  Users,
  Calendar,
  Settings,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Calculator, label: 'Orçamento', path: '/budget' },
  { icon: Image, label: 'Inspirações', path: '/inspiration' },
  { icon: Users, label: 'Fornecedores', path: '/suppliers' },
  { icon: Calendar, label: 'Cronograma', path: '/timeline' },
  { icon: Settings, label: 'Configurações', path: '/settings' },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-pink-600">Wedding Planner</h1>
      </div>
      <nav className="mt-6">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 ${
                isActive ? 'bg-pink-50 text-pink-600' : ''
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};