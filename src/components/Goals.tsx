import React from 'react';
import { Goal } from '@/types';
import { formatCurrency } from '@/lib/format';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Plus, Target, Calendar, Edit2, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { GoalDialog } from './GoalDialog';
import { useState } from 'react';

interface GoalsProps {
  goals: Goal[];
  onAddGoal: (goal: Omit<Goal, 'id'>) => void;
  onEditGoal: (id: string, goal: Partial<Goal>) => void;
  onDeleteGoal: (id: string) => void;
}

export function Goals({ goals, onAddGoal, onEditGoal, onDeleteGoal }: GoalsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  const handleEdit = (goal: Goal) => {
    setEditingGoal(goal);
    setIsDialogOpen(true);
  };

  const handleAddClick = () => {
    setEditingGoal(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6 pb-24">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Metas</h1>
        <Button onClick={handleAddClick} size="sm" className="rounded-full gap-2">
          <Plus size={18} />
          Nova Meta
        </Button>
      </div>

      <div className="space-y-4">
        {goals.map((goal, index) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          
          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-card border-none group">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <Target size={20} />
                      </div>
                      <CardTitle className="text-base">{goal.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-sm font-bold">{progress.toFixed(0)}%</div>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(goal)}>
                          <Edit2 size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => onDeleteGoal(goal.id)}>
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{formatCurrency(goal.currentAmount)}</span>
                    <span>{formatCurrency(goal.targetAmount)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground bg-muted/50 w-fit px-2 py-1 rounded-md">
                    <Calendar size={12} />
                    <span>Prazo: {new Date(goal.deadline).toLocaleDateString('pt-BR')}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Card className="bg-primary/5 border-dashed border-primary/20">
        <CardContent className="p-8 flex flex-col items-center text-center space-y-3">
          <div className="p-3 bg-primary/10 rounded-full text-primary">
            <Target size={32} />
          </div>
          <div>
            <h3 className="font-bold">Crie uma nova meta</h3>
            <p className="text-sm text-muted-foreground">
              Defina um objetivo e nós te ajudaremos a chegar lá com economia inteligente.
            </p>
          </div>
          <Button variant="outline" className="mt-2" onClick={handleAddClick}>Começar agora</Button>
        </CardContent>
      </Card>

      <GoalDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        onAdd={onAddGoal}
        editingGoal={editingGoal}
        onEdit={onEditGoal}
      />
    </div>
  );
}
