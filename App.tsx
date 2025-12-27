import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { TrialBalance } from './components/TrialBalance';
import { BankReconciliation } from './components/BankReconciliation';
import { IncomeStatement } from './components/IncomeStatement';
import { BalanceSheet } from './components/BalanceSheet';
import { CashFlow } from './components/CashFlow';
import { FinancialDataState, ViewState } from './types';
import { CheckCircle2, XCircle } from 'lucide-react';

const INITIAL_DATA: FinancialDataState = {
  companyName: 'Acme Corp.',
  reportDate: 'March 2024',
  revenue: 300000,
  expenses: 245000,
  assets: 232000,
  currentRatio: 1.66,
  quickRatio: 1.48,
  debtToEquity: 1.52
};

function App() {
  const [financialData, setFinancialData] = useState<FinancialDataState>(INITIAL_DATA);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  // Derived state for passing to components
  const netIncome = financialData.revenue - financialData.expenses;

  const updateData = (key: keyof FinancialDataState, value: string | number) => {
    setFinancialData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleReset = () => {
    setFinancialData(INITIAL_DATA);
    showNotification('success', 'Dashboard reset to default values');
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleImportData = (file: File) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (!text) return;

      try {
        const lines = text.split('\n');
        const newData = { ...financialData };
        let parsedCount = 0;

        lines.forEach(line => {
          // Supports CSV format: Key,Value
          const parts = line.split(',');
          if (parts.length < 2) return;
          
          const key = parts[0].trim().toLowerCase().replace(/[^a-z]/g, ''); // normalize key
          const valueStr = parts[1].trim();
          const valueNum = parseFloat(valueStr);

          // Mapping simple keys to state keys
          switch(key) {
            case 'revenue': newData.revenue = valueNum; parsedCount++; break;
            case 'expenses': newData.expenses = valueNum; parsedCount++; break;
            case 'assets': newData.assets = valueNum; parsedCount++; break;
            case 'currentratio': newData.currentRatio = valueNum; parsedCount++; break;
            case 'quickratio': newData.quickRatio = valueNum; parsedCount++; break;
            case 'debttoequity': newData.debtToEquity = valueNum; parsedCount++; break;
            case 'companyname': newData.companyName = valueStr; parsedCount++; break;
            case 'reportdate': newData.reportDate = valueStr; parsedCount++; break;
          }
        });

        if (parsedCount > 0) {
          setFinancialData(newData);
          showNotification('success', `Successfully imported ${parsedCount} data points.`);
        } else {
          showNotification('error', 'No valid financial data found in CSV.');
        }

      } catch (err) {
        console.error(err);
        showNotification('error', 'Failed to parse the file. Please ensure it is a valid CSV.');
      }
    };

    reader.onerror = () => {
      showNotification('error', 'Error reading file.');
    };

    reader.readAsText(file);
  };

  const renderContent = () => {
    switch(currentView) {
      case 'dashboard':
        return (
          <Dashboard 
            data={financialData} 
            onUpdate={updateData} 
            onReset={handleReset}
          />
        );
      case 'trial-balance':
        return <TrialBalance />;
      case 'bank-reconciliation':
        return <BankReconciliation />;
      case 'income-statement':
        return <IncomeStatement revenue={financialData.revenue} expenses={financialData.expenses} />;
      case 'balance-sheet':
        return <BalanceSheet totalAssets={financialData.assets} debtToEquityRatio={financialData.debtToEquity} />;
      case 'cash-flow':
        return <CashFlow netIncome={netIncome} />;
      default:
        return (
          <Dashboard 
            data={financialData} 
            onUpdate={updateData} 
            onReset={handleReset}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      <Sidebar 
        onImportData={handleImportData} 
        currentView={currentView}
        onNavigate={setCurrentView}
      />
      <div className="pl-64 flex-1 w-full">
        {renderContent()}
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg border animate-in slide-in-from-right-5 fade-in duration-300 ${
          notification.type === 'success' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {notification.type === 'success' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}
    </div>
  );
}

export default App;
