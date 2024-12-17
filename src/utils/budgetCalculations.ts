import { BudgetCategory } from '../types/budget';

// Função para calcular o total gasto nas categorias, com verificação para valores válidos
export function calculateTotalSpent(categories: BudgetCategory[]): number {
  return categories.reduce((acc, cat) => {
    // Verifica se 'spent' é um número válido e se é positivo
    const amount = typeof cat.spent === 'number' && !isNaN(cat.spent) && cat.spent > 0 ? cat.spent : 0;
    return acc + amount;
  }, 0);
}

// Função para calcular o restante do orçamento, arredondando para 2 casas decimais
export function calculateRemaining(totalBudget: number, totalSpent: number): number {
  if (typeof totalBudget !== 'number' || typeof totalSpent !== 'number' || isNaN(totalBudget) || isNaN(totalSpent)) {
    return 0;
  }
  const remaining = totalBudget - totalSpent;
  return Math.round(remaining * 100) / 100; // Arredonda para 2 casas decimais
}

// Função para formatar o valor como moeda, com suporte para valores maiores e negativos
export function formatCurrency(value: number): string {
  if (typeof value !== 'number' || isNaN(value)) {
    return 'R$ 0,00';
  }
  
  // Formatação de moeda, considerando até 2 casas decimais
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
