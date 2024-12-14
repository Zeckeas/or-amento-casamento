import { Category, Vendor, Appointment, InspirationImage } from '@/types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Vestido e Traje',
    budget: 15000,
    spent: 5000,
    items: [
      {
        id: '1',
        name: 'Vestido de Noiva',
        price: 5000,
        status: 'partial',
        dueDate: '2024-05-15',
      },
    ],
  },
  {
    id: '2',
    name: 'Local e Decoração',
    budget: 20000,
    spent: 10000,
    items: [
      {
        id: '2',
        name: 'Aluguel do Espaço',
        price: 10000,
        status: 'paid',
        dueDate: '2024-04-01',
      },
    ],
  },
];

export const vendors: Vendor[] = [
  {
    id: '1',
    name: 'Estúdio de Fotografia Luz & Arte',
    service: 'Fotografia',
    price: 5000,
    rating: 4.8,
    contact: '(11) 99999-9999',
    notes: 'Pacote inclui álbum digital e impresso',
  },
];

export const appointments: Appointment[] = [
  {
    id: '1',
    title: 'Reunião com Fotógrafo',
    date: '2024-03-15',
    type: 'meeting',
    vendorId: '1',
  },
  {
    id: '2',
    title: 'Prova do Vestido',
    date: '2024-03-20',
    type: 'trial',
  },
];

export const inspirationImages: InspirationImage[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
    category: 'Decoração',
    description: 'Decoração minimalista em tons pastéis',
    tags: ['minimalista', 'tons pastéis', 'flores'],
  },
];