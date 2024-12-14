import React from 'react';
import { BudgetSummary } from './components/Dashboard/BudgetSummary';
import { UpcomingEvents } from './components/Dashboard/UpcomingEvents';
import { BudgetChart } from './components/Dashboard/BudgetChart';

// Mock data
const budgetData = {
  totalBudget: 100000,
  spentAmount: 45000,
  remainingAmount: 55000,
};

const upcomingEvents = [
  {
    id: 1,
    title: 'Reunião com Fotógrafo',
    date: '2024-03-25',
    type: 'meeting',
  },
  {
    id: 2,
    title: 'Pagamento Buffet (2ª parcela)',
    date: '2024-03-30',
    type: 'payment',
    amount: 5000,
  },
  {
    id: 3,
    title: 'Prova do Vestido',
    date: '2024-04-05',
    type: 'appointment',
  },
];

const categories = [
  { name: 'Vestido e Traje', spent: 15000, color: '#8b5cf6' },
  { name: 'Local e Decoração', spent: 35000, color: '#ec4899' },
  { name: 'Buffet e Bebidas', spent: 25000, color: '#14b8a6' },
  { name: 'Música', spent: 8000, color: '#f59e0b' },
  { name: 'Fotografia', spent: 12000, color: '#6366f1' },
];

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard do Casamento</h1>
          <p className="mt-2 text-gray-600">Acompanhe seu orçamento e planejamento</p>
        </header>

        <BudgetSummary {...budgetData} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BudgetChart 
            categories={categories}
            totalBudget={budgetData.totalBudget}
          />
          <UpcomingEvents events={upcomingEvents} />
        </div>
      </div>
    </div>
  );
}

export default App;