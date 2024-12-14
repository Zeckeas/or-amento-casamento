import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type BudgetChartProps = {
  totalBudget: number;
  spent: number;
};

export function BudgetChart({ totalBudget, spent }: BudgetChartProps) {
  const remaining = totalBudget - spent;
  
  const data = {
    labels: ['Gasto', 'Restante'],
    datasets: [
      {
        data: [spent, remaining],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Pie data={data} />
    </div>
  );
}