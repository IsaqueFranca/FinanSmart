import React from 'react';
import { User } from '@/types';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { Settings, Shield, Bell, HelpCircle, LogOut, ChevronRight, CreditCard, User as UserIcon } from 'lucide-react';

interface ProfileProps {
  user: User;
}

export function Profile({ user }: ProfileProps) {
  const menuItems = [
    { icon: UserIcon, label: 'Dados Pessoais', color: 'text-blue-500' },
    { icon: CreditCard, label: 'Minhas Contas', color: 'text-green-500' },
    { icon: Bell, label: 'Notificações', color: 'text-amber-500' },
    { icon: Shield, label: 'Segurança', color: 'text-purple-500' },
    { icon: Settings, label: 'Configurações', color: 'text-gray-500' },
    { icon: HelpCircle, label: 'Ajuda & Suporte', color: 'text-blue-400' },
  ];

  return (
    <div className="space-y-6 pb-24">
      <h1 className="text-2xl font-bold">Perfil</h1>

      <div className="flex flex-col items-center py-4 space-y-3">
        <div className="relative">
          <Avatar className="w-24 h-24 border-4 border-primary/20">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 p-1.5 bg-primary rounded-full border-2 border-background text-primary-foreground">
            <Settings size={14} />
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <Card className="bg-card border-none overflow-hidden">
        <CardContent className="p-0">
          {menuItems.map((item, index) => (
            <React.Fragment key={item.label}>
              <button className="w-full flex items-center justify-between p-4 hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-muted ${item.color}`}>
                    <item.icon size={20} />
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <ChevronRight size={18} className="text-muted-foreground" />
              </button>
              {index < menuItems.length - 1 && <Separator className="bg-border/50" />}
            </React.Fragment>
          ))}
        </CardContent>
      </Card>

      <Button variant="ghost" className="w-full text-red-500 hover:text-red-600 hover:bg-red-500/10 gap-2 h-12">
        <LogOut size={20} />
        Sair da Conta
      </Button>

      <div className="text-center">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">FinanSmart v1.0.0</p>
      </div>
    </div>
  );
}
