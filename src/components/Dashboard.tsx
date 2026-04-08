import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Transaction, User, Insight } from '@/types';
import { formatCurrency } from '@/lib/format';
import { TrendingUp, TrendingDown, Wallet, AlertCircle, Lightbulb, CheckCircle2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'motion/react';

interface DashboardProps {
  transactions: Transaction[];
  user: User;
  insights: Insight[];
}

const COLORS = ['#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#ec4899', '#64748b'];

export function Dashboard({ transactions, user, insights }: DashboardProps) {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);
    
  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);
    
  const balance = totalIncome - totalExpense;

  const expensesByCategory = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc: any[], t) => {
      const existing = acc.find((item) => item.name === t.category);
      if (existing) {
        existing.value += t.amount;
      } else {
        acc.push({ name: t.category, value: t.amount });
      }
      return acc;
    }, []);

  return (
    <div className="space-y-6 pb-24">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Olá, {user.name.split(' ')[0]}!</h1>
          <p className="text-muted-foreground text-sm">Bem-vindo ao seu FinanSmart</p>
        </div>
        <div className="text-right">
          <Badge variant="outline" className="mb-1 border-primary/20 text-primary">
            {user.classification}
          </Badge>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Saúde:</span>
            <span className="text-sm font-bold text-primary">{user.healthScore}/100</span>
          </div>
        </div>
      </header>

      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="bg-primary text-primary-foreground overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Wallet size={120} />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-80">Saldo Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">{formatCurrency(balance)}</div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1 text-sm bg-white/10 px-2 py-1 rounded-lg">
                <TrendingUp size={14} className="text-green-300" />
                <span>{formatCurrency(totalIncome)}</span>
              </div>
              <div className="flex items-center gap-1 text-sm bg-white/10 px-2 py-1 rounded-lg">
                <TrendingDown size={14} className="text-red-300" />
                <span>{formatCurrency(totalExpense)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Insights Section */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold px-1">Insights de IA</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {insights.map((insight) => (
            <Card key={insight.id} className="min-w-[280px] flex-shrink-0 border-l-4 border-l-primary">
              <CardContent className="p-4 flex gap-3">
                <div className="mt-1">
                  {insight.type === 'warning' && <AlertCircle className="text-amber-500 w-5 h-5" />}
                  {insight.type === 'suggestion' && <Lightbulb className="text-blue-500 w-5 h-5" />}
                  {insight.type === 'success' && <CheckCircle2 className="text-green-500 w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{insight.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {insight.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Gastos por Categoria</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expensesByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {expensesByCategory.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value: number) => formatCurrency(value)}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-2">
              {expensesByCategory.map((entry: any, index: number) => (
                <div key={entry.name} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-[10px] text-muted-foreground">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Saúde Financeira</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="relative w-32 h-32 flex items-center justify-center mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-muted/20"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={364.4}
                  strokeDashoffset={364.4 - (364.4 * user.healthScore) / 100}
                  className="text-primary transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-bold">{user.healthScore}</span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Score</span>
              </div>
            </div>
            <p className="text-sm text-center text-muted-foreground px-4">
              Seu score está excelente! Você economizou 15% a mais que no mês passado.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
