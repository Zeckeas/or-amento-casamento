import React from 'react';
import { DashboardCard } from '../components/DashboardCard';
import { BudgetChart } from '../components/BudgetChart';
import { Wallet, CreditCard, PiggyBank } from 'lucide-react';
import { useBudgetStore } from '../store/budgetStore';

export const Dashboard: React.FC = () => {
  const { categories, totalBudget } = useBudgetStore();
  
  const totalSpent = categories.reduce((acc, cat) => acc + cat.spent, 0);
  const remaining = totalBudget - totalSpent;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Dashboard do Casamento
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          title="Orçamento Total"
          value={`R$ ${totalBudget.toLocaleString()}`}
          icon={<Wallet className="w-8 h-8" />}
        />
        <DashboardCard
          title="Total Gasto"
          value={`R$ ${totalSpent.toLocaleString()}`}
          icon={<CreditCard className="w-8 h-8" />}
        />
        <DashboardCard
          title="Saldo Restante"
          value={`R$ ${remaining.toLocaleString()}`}
          icon={<PiggyBank className="w-8 h-8" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Distribuição de Gastos</h2>
          <BudgetChart />
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Próximos Compromissos</h2>
          {/* To be implemented */}
          <p className="text-gray-500">Nenhum compromisso agendado</p>
        </div>
      </div>
    </div>
  );
};