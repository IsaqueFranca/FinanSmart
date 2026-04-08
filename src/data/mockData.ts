import { Transaction, Goal, User, Insight } from '../types';
import { subDays, format } from 'date-fns';

const today = new Date();

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    amount: 5000,
    category: 'Salário',
    date: format(subDays(today, 10), 'yyyy-MM-dd'),
    description: 'Salário Mensal',
  },
  {
    id: '2',
    type: 'expense',
    amount: 1200,
    category: 'Moradia',
    date: format(subDays(today, 8), 'yyyy-MM-dd'),
    description: 'Aluguel',
  },
  {
    id: '3',
    type: 'expense',
    amount: 150,
    category: 'Transporte',
    date: format(subDays(today, 7), 'yyyy-MM-dd'),
    description: 'Combustível',
  },
  {
    id: '4',
    type: 'expense',
    amount: 450,
    category: 'Alimentação',
    date: format(subDays(today, 6), 'yyyy-MM-dd'),
    description: 'Supermercado',
  },
  {
    id: '5',
    type: 'expense',
    amount: 200,
    category: 'Lazer',
    date: format(subDays(today, 5), 'yyyy-MM-dd'),
    description: 'Cinema e Jantar',
  },
  {
    id: '6',
    type: 'income',
    amount: 800,
    category: 'Freelance',
    date: format(subDays(today, 4), 'yyyy-MM-dd'),
    description: 'Projeto Web',
  },
  {
    id: '7',
    type: 'expense',
    amount: 300,
    category: 'Saúde',
    date: format(subDays(today, 3), 'yyyy-MM-dd'),
    description: 'Farmácia',
  },
  {
    id: '8',
    type: 'expense',
    amount: 100,
    category: 'Transporte',
    date: format(subDays(today, 2), 'yyyy-MM-dd'),
    description: 'Uber',
  },
  {
    id: '9',
    type: 'expense',
    amount: 600,
    category: 'Lazer',
    date: format(subDays(today, 1), 'yyyy-MM-dd'),
    description: 'Viagem Fim de Semana',
  },
  {
    id: '10',
    type: 'expense',
    amount: 250,
    category: 'Alimentação',
    date: format(today, 'yyyy-MM-dd'),
    description: 'Restaurante',
  },
];

export const mockGoals: Goal[] = [
  {
    id: 'g1',
    title: 'Reserva de Emergência',
    targetAmount: 10000,
    currentAmount: 4500,
    deadline: '2026-12-31',
  },
  {
    id: 'g2',
    title: 'Viagem para o Japão',
    targetAmount: 15000,
    currentAmount: 2000,
    deadline: '2027-06-30',
  },
];

export const mockUser: User = {
  name: 'Isaque Pereira',
  email: 'isaquebpereira50@gmail.com',
  healthScore: 82,
  classification: 'Controlado',
};

export const mockInsights: Insight[] = [
  {
    id: 'i1',
    title: 'Gastos com Lazer',
    description: 'Seus gastos com lazer aumentaram 30% este mês em comparação ao anterior.',
    type: 'warning',
  },
  {
    id: 'i2',
    title: 'Dica de Economia',
    description: 'Você poderia economizar R$ 150,00 por mês reduzindo pedidos de delivery.',
    type: 'suggestion',
  },
  {
    id: 'i3',
    title: 'Meta Próxima',
    description: 'Você está a apenas R$ 500,00 de atingir 50% da sua Reserva de Emergência!',
    type: 'success',
  },
];
