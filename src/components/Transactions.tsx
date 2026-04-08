import React, { useState } from 'react';
import { Transaction, TransactionType, CATEGORIES } from '@/types';
import { formatCurrency, formatDateShort } from '@/lib/format';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Search, Filter, ArrowUpCircle, ArrowDownCircle, Edit2, Trash2 } from 'lucide-react';
import { AddTransactionDialog } from './AddTransactionDialog';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface TransactionsProps {
  transactions: Transaction[];
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  onEditTransaction: (id: string, transaction: Partial<Transaction>) => void;
  onDeleteTransaction: (id: string) => void;
}

export function Transactions({ 
  transactions, 
  onAddTransaction,
  onEditTransaction,
  onDeleteTransaction 
}: TransactionsProps) {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | TransactionType>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const filteredTransactions = transactions
    .filter((t) => {
      const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase()) || 
                           t.category.toLowerCase().includes(search.toLowerCase());
      const matchesType = filterType === 'all' || t.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleEdit = (t: Transaction) => {
    setEditingTransaction(t);
    setIsDialogOpen(true);
  };

  const handleAddClick = () => {
    setEditingTransaction(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4 pb-24">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Transações</h1>
        <Button onClick={handleAddClick} size="sm" className="rounded-full gap-2">
          <Plus size={18} />
          Novo
        </Button>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Buscar..." 
            className="pl-9 bg-card border-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" className="bg-card border-none">
          <Filter size={18} />
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        <Badge 
          variant={filterType === 'all' ? 'default' : 'outline'}
          className="cursor-pointer px-4 py-1.5"
          onClick={() => setFilterType('all')}
        >
          Todos
        </Badge>
        <Badge 
          variant={filterType === 'income' ? 'default' : 'outline'}
          className="cursor-pointer px-4 py-1.5"
          onClick={() => setFilterType('income')}
        >
          Receitas
        </Badge>
        <Badge 
          variant={filterType === 'expense' ? 'default' : 'outline'}
          className="cursor-pointer px-4 py-1.5"
          onClick={() => setFilterType('expense')}
        >
          Despesas
        </Badge>
      </div>

      <ScrollArea className="h-[calc(100vh-280px)]">
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredTransactions.map((t) => (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="bg-card border-none hover:bg-accent/50 transition-colors group">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-2 rounded-full",
                        t.type === 'income' ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                      )}>
                        {t.type === 'income' ? <ArrowUpCircle size={24} /> : <ArrowDownCircle size={24} />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{t.description}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-muted-foreground">{t.category}</span>
                          <span className="text-[10px] text-muted-foreground/60">•</span>
                          <span className="text-[10px] text-muted-foreground/60">{formatDateShort(t.date)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "font-bold text-sm",
                        t.type === 'income' ? "text-green-500" : "text-foreground"
                      )}>
                        {t.type === 'income' ? '+' : '-'} {formatCurrency(t.amount)}
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(t)}>
                          <Edit2 size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => onDeleteTransaction(t.id)}>
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredTransactions.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              Nenhuma transação encontrada.
            </div>
          )}
        </div>
      </ScrollArea>

      <AddTransactionDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        onAdd={onAddTransaction}
        editingTransaction={editingTransaction}
        onEdit={onEditTransaction}
      />
    </div>
  );
}
