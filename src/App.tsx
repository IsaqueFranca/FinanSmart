/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { Transactions } from './components/Transactions';
import { Goals } from './components/Goals';
import { Reports } from './components/Reports';
import { Profile } from './components/Profile';
import { BottomNav } from './components/BottomNav';
import { mockTransactions, mockUser, mockGoals, mockInsights } from './data/mockData';
import { Transaction } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  
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

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard transactions={transactions} user={mockUser} insights={mockInsights} />;
      case 'transactions':
        return <Transactions transactions={transactions} onAddTransaction={handleAddTransaction} />;
      case 'goals':
        return <Goals goals={mockGoals} />;
      case 'reports':
        return <Reports transactions={transactions} user={mockUser} />;
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

