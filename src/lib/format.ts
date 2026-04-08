import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatDate = (dateString: string) => {
  return format(new Date(dateString), "dd 'de' MMMM", { locale: ptBR });
};

export const formatDateShort = (dateString: string) => {
  return format(new Date(dateString), 'dd/MM/yyyy');
};
