import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Goal } from '@/types';
import { format } from 'date-fns';

interface GoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (goal: Omit<Goal, 'id'>) => void;
  editingGoal?: Goal | null;
  onEdit?: (id: string, goal: Partial<Goal>) => void;
}

export function GoalDialog({ 
  open, 
  onOpenChange, 
  onAdd, 
  editingGoal,
  onEdit 
}: GoalDialogProps) {
  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [deadline, setDeadline] = useState(format(new Date(), 'yyyy-MM-dd'));

  useEffect(() => {
    if (editingGoal) {
      setTitle(editingGoal.title);
      setTargetAmount(editingGoal.targetAmount.toString());
      setCurrentAmount(editingGoal.currentAmount.toString());
      setDeadline(editingGoal.deadline);
    } else {
      setTitle('');
      setTargetAmount('');
      setCurrentAmount('0');
      setDeadline(format(new Date(), 'yyyy-MM-dd'));
    }
  }, [editingGoal, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !targetAmount) return;

    const goalData = {
      title,
      targetAmount: parseFloat(targetAmount),
      currentAmount: parseFloat(currentAmount || '0'),
      deadline,
    };

    if (editingGoal && onEdit) {
      onEdit(editingGoal.id, goalData);
    } else {
      onAdd(goalData);
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card border-none">
        <DialogHeader>
          <DialogTitle>{editingGoal ? 'Editar Meta' : 'Nova Meta'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Título da Meta</label>
            <Input
              placeholder="Ex: Reserva de Emergência, Carro Novo..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Valor Alvo</label>
              <Input
                type="number"
                step="0.01"
                placeholder="R$ 0,00"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Valor Atual</label>
              <Input
                type="number"
                step="0.01"
                placeholder="R$ 0,00"
                value={currentAmount}
                onChange={(e) => setCurrentAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Prazo</label>
            <Input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>

          <DialogFooter className="pt-4">
            <Button type="submit" className="w-full">Salvar Meta</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
