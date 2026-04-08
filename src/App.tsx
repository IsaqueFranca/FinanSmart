/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard.tsx';
import { Transactions } from './components/Transactions.tsx';
import { Goals } from './components/Goals.tsx';
import { Reports } from './components/Reports.tsx';
import { Profile } from './components/Profile.tsx';
import { BottomNav } from './components/BottomNav.tsx';
import { mockTransactions, mockUser, mockGoals, mockInsights } from './data/mockData';
import { Transaction, Goal } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [reportHistory, setReportHistory] = useState([
    { id: 'r1', title: 'Relatório Mensal - Março 2026', date: '01/04/2026' },
    { id: 'r2', title: 'Relatório Mensal - Fevereiro 2026', date: '01/03/2026' },
  ]);
  
  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTransactions([transaction, ...transactions]);
  };

  const handleEditTransaction = (id: string, updated: Partial<Transaction>) => {
    setTransactions(transactions.map(t => t.id === id ? { ...t, ...updated } : t));
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const handleAddGoal = (newGoal: Omit<Goal, 'id'>) => {
    const goal: Goal = {
      ...newGoal,
      id: Math.random().toString(36).substr(2, 9),
    };
    setGoals([...goals, goal]);
  };

  const handleEditGoal = (id: string, updated: Partial<Goal>) => {
    setGoals(goals.map(g => g.id === id ? { ...g, ...updated } : g));
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const handleDeleteReport = (id: string) => {
    setReportHistory(reportHistory.filter(r => r.id !== id));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard transactions={transactions} user={mockUser} insights={mockInsights} />;
      case 'transactions':
        return (
          <Transactions 
            transactions={transactions} 
            onAddTransaction={handleAddTransaction}
            onEditTransaction={handleEditTransaction}
            onDeleteTransaction={handleDeleteTransaction}
          />
        );
      case 'goals':
        return (
          <Goals 
            goals={goals} 
            onAddGoal={handleAddGoal}
            onEditGoal={handleEditGoal}
            onDeleteGoal={handleDeleteGoal}
          />
        );
      case 'reports':
        return (
          <Reports 
            transactions={transactions} 
            user={mockUser} 
            reportHistory={reportHistory}
            onDeleteReport={handleDeleteReport}
          />
        );
      case 'profile':
        return <Profile user={mockUser} />;
      default:
        return <Dashboard transactions={transactions} user={mockUser} insights={mockInsights} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <div className="max-w-md mx-auto px-4 pt-8 pb-20 min-h-screen relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

