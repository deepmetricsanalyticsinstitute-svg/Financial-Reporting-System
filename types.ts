import { ReactNode } from 'react';

export type ViewState = 'dashboard' | 'import' | 'trial-balance' | 'bank-reconciliation' | 'income-statement' | 'balance-sheet' | 'cash-flow';

export interface MetricData {
  id: string;
  title: string;
  value: string | number;
  trend: string;
  trendDirection: 'up' | 'down' | 'neutral';
  subtext: string;
  icon: ReactNode;
  iconBgColor: string;
  iconColor: string;
  date: string;
  isCalculated?: boolean;
}

export interface RatioData {
  id: string;
  title: string;
  value: string | number;
  description: string;
  target: string;
  icon: ReactNode;
  iconBgColor: string;
  iconColor: string;
  status: 'good' | 'warning' | 'danger' | 'neutral';
}

export interface FinancialContext {
  companyName: string;
  reportingDate: string;
  currency: string;
  metrics: {
    title: string;
    value: string;
    trend?: string;
  }[];
  ratios: {
    title: string;
    value: string;
    target: string;
  }[];
}

export interface FinancialDataState {
  companyName: string;
  reportDate: string;
  revenue: number;
  expenses: number;
  assets: number;
  currentRatio: number;
  quickRatio: number;
  debtToEquity: number;
}

// --- New Types for Views ---

export interface TrialBalanceItem {
  id: string;
  accountName: string;
  debit: number;
  credit: number;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
}

export interface BankTransaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'matched' | 'unmatched';
  type: 'bank' | 'ledger';
}
