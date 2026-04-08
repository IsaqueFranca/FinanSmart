import React, { useState } from 'react';
import { Transaction, User } from '@/types';
import { formatCurrency, formatDateShort } from '@/lib/format';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, CheckCircle2, Loader2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ReportsProps {
  transactions: Transaction[];
  user: User;
}

export function Reports({ transactions, user }: ReportsProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const generatePDF = () => {
    setIsGenerating(true);
    
    // Simulate generation delay
    setTimeout(() => {
      const doc = new jsPDF();
      
      // Header
      doc.setFontSize(20);
      doc.text('FinanSmart - Relatório Financeiro', 14, 22);
      
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(`Usuário: ${user.name}`, 14, 30);
      doc.text(`Data de Emissão: ${new Date().toLocaleDateString('pt-BR')}`, 14, 36);
      
      // Summary
      const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
      const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
      const balance = totalIncome - totalExpense;
      
      doc.setFontSize(14);
      doc.setTextColor(0);
      doc.text('Resumo Financeiro', 14, 50);
      
      autoTable(doc, {
        startY: 55,
        head: [['Descrição', 'Valor']],
        body: [
          ['Total de Receitas', formatCurrency(totalIncome)],
          ['Total de Despesas', formatCurrency(totalExpense)],
          ['Saldo Final', formatCurrency(balance)],
        ],
        theme: 'striped',
        headStyles: { fillColor: [139, 92, 246] }
      });
      
      // Transactions Table
      doc.text('Detalhamento de Transações', 14, (doc as any).lastAutoTable.finalY + 15);
      
      autoTable(doc, {
        startY: (doc as any).lastAutoTable.finalY + 20,
        head: [['Data', 'Descrição', 'Categoria', 'Tipo', 'Valor']],
        body: transactions.map(t => [
          formatDateShort(t.date),
          t.description,
          t.category,
          t.type === 'income' ? 'Receita' : 'Despesa',
          formatCurrency(t.amount)
        ]),
        theme: 'grid',
        headStyles: { fillColor: [139, 92, 246] }
      });
      
      // Save the PDF
      doc.save(`FinanSmart_Relatorio_${new Date().getTime()}.pdf`);
      
      setIsGenerating(false);
      setIsDone(true);
      setTimeout(() => setIsDone(false), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-24">
      <h1 className="text-2xl font-bold">Relatórios</h1>

      <Card className="bg-card border-none">
        <CardHeader>
          <CardTitle className="text-base">Exportar Dados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Período</label>
              <Select defaultValue="this-month">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="this-month">Este Mês</SelectItem>
                  <SelectItem value="last-month">Mês Passado</SelectItem>
                  <SelectItem value="last-3-months">Últimos 3 Meses</SelectItem>
                  <SelectItem value="this-year">Este Ano</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Formato</label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start gap-2 border-primary/20 bg-primary/5">
                  <FileText size={16} className="text-primary" />
                  PDF
                </Button>
                <Button variant="ghost" className="justify-start gap-2 opacity-50 cursor-not-allowed" disabled>
                  <FileText size={16} />
                  Excel (em breve)
                </Button>
              </div>
            </div>
          </div>

          <Button 
            className="w-full gap-2 h-12 text-base font-semibold" 
            onClick={generatePDF}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Gerando PDF...
              </>
            ) : isDone ? (
              <>
                <CheckCircle2 size={20} />
                Relatório Gerado!
              </>
            ) : (
              <>
                <Download size={20} />
                Gerar Relatório PDF
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground px-1 uppercase tracking-wider">Histórico de Relatórios</h2>
        <div className="space-y-2">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-card rounded-xl border border-border/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <FileText size={18} className="text-muted-foreground" />
                </div>
                <div>
                  <div className="text-sm font-medium">Relatório Mensal - Março 2026</div>
                  <div className="text-[10px] text-muted-foreground">Gerado em 01/04/2026</div>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Download size={16} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
