export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  date: string;
  description: string;
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'warning' | 'suggestion' | 'success';
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
  healthScore: number;
  classification: 'Controlado' | 'Moderado' | 'Desorganizado';
}

export const CATEGORIES = {
  income: ['Salário', 'Investimentos', 'Freelance', 'Outros'],
  expense: ['Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Saúde', 'Educação', 'Outros'],
};
