import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Transaction, TransactionType, CATEGORIES } from '@/types';
import { format } from 'date-fns';

interface AddTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (transaction: Omit<Transaction, 'id'>) => void;
}

export function AddTransactionDialog({ open, onOpenChange, onAdd }: AddTransactionDialogProps) {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category || !description) return;

    onAdd({
      type,
      amount: parseFloat(amount),
      category,
      description,
      date,
    });

    // Reset form
    setAmount('');
    setCategory('');
    setDescription('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card border-none">
        <DialogHeader>
          <DialogTitle>Nova Transação</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="flex gap-2 p-1 bg-muted rounded-lg">
            <Button
              type="button"
              variant={type === 'expense' ? 'default' : 'ghost'}
              className="flex-1 rounded-md"
              onClick={() => setType('expense')}
            >
              Despesa
            </Button>
            <Button
              type="button"
              variant={type === 'income' ? 'default' : 'ghost'}
              className="flex-1 rounded-md"
              onClick={() => setType('income')}
            >
              Receita
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Valor</label>
            <Input
              type="number"
              step="0.01"
              placeholder="R$ 0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg font-bold"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Descrição</label>
            <Input
              placeholder="Ex: Aluguel, Supermercado..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Categoria</label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES[type].map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Data</label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button type="submit" className="w-full">Salvar Transação</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
