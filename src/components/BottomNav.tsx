import React from 'react';
import { LayoutDashboard, ArrowLeftRight, Target, FileText, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  { id: 'dashboard', label: 'Início', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transações', icon: ArrowLeftRight },
  { id: 'goals', label: 'Metas', icon: Target },
  { id: 'reports', label: 'Relatórios', icon: FileText },
  { id: 'profile', label: 'Perfil', icon: User },
];

export function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 pb-safe pt-2 flex justify-around items-center z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-200",
              isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className={cn("w-6 h-6", isActive && "fill-primary/20")} />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
