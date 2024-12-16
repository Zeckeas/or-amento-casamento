import { Category } from '../types/budget';

export function calculateTotalSpent(categories: Category[]): number {
  return categories.reduce((acc, cat) => acc + cat.amount, 0);
}

export function calculateRemaining(totalBudget: number, totalSpent: number): number {
  return totalBudget - totalSpent;
}

export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}