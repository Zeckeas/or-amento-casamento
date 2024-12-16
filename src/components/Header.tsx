import React, { useState } from 'react';
import { Heart } from 'lucide-react';

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: 'Orçamento', href: '#budget' },
  { label: 'Fornecedores', href: '#vendors' },
  { label: 'Cronograma', href: '#schedule' },
  { label: 'Galeria', href: '#gallery' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Função para alternar o estado do menu
  const toggleMenu = () => setMenuOpen(!menuOpen);
  // Função para fechar o menu
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-pink-500" />
            <h1 className="ml-2 text-2xl font-semibold text-gray-900">
              Orçamento de Casamento
            </h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
                aria-label={`Navegar para ${item.label}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={toggleMenu}
            aria-label="Abrir menu de navegação"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${menuOpen ? 'block' : 'hidden'} absolute w-full bg-white shadow-md mt-16 transition-all duration-300 ease-in-out`}
      >
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="block text-gray-600 hover:text-gray-900 px-4 py-2 text-base font-medium"
            onClick={closeMenu} // Fechar o menu ao clicar no link
            aria-label={`Navegar para ${item.label}`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </header>
  );
}
