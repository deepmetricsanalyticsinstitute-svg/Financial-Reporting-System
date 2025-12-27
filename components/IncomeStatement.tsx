import React from 'react';
import { FileBarChart } from 'lucide-react';

interface IncomeStatementProps {
  revenue: number;
  expenses: number;
}

export const IncomeStatement: React.FC<IncomeStatementProps> = ({ revenue, expenses }) => {
  const grossProfit = revenue - 120000; // Mock COGS
  const operatingExpenses = expenses;
  const netIncome = revenue - expenses;

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="flex-1 p-8 bg-gray-50 min-h-screen">
       <div className="flex items-center space-x-3 mb-6">
        <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
          <FileBarChart size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Income Statement</h1>
          <p className="text-slate-500 text-sm">For the period ending March 31, 2024</p>
        </div>
      </div>

      <div className="max-w-3xl bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8">
          <h2 className="text-center font-bold text-lg text-slate-900 mb-1">ACME CORP.</h2>
          <h3 className="text-center text-slate-500 text-sm mb-8 uppercase tracking-wide">Statement of Income</h3>

          <div className="space-y-6">
            {/* Revenue Section */}
            <div>
              <h4 className="text-sm font-bold text-slate-700 uppercase mb-2">Revenue</h4>
              <div className="flex justify-between py-2 border-b border-dashed border-gray-200">
                <span className="text-slate-600 ml-4">Sales Revenue</span>
                <span className="font-mono text-slate-800">{formatCurrency(revenue)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-300 bg-gray-50/50">
                <span className="font-bold text-slate-800 ml-4">Total Revenue</span>
                <span className="font-bold font-mono text-slate-900">{formatCurrency(revenue)}</span>
              </div>
            </div>

            {/* COGS Section (Simplified) */}
            <div>
               <h4 className="text-sm font-bold text-slate-700 uppercase mb-2">Cost of Goods Sold</h4>
               <div className="flex justify-between py-2 border-b border-dashed border-gray-200">
                <span className="text-slate-600 ml-4">Cost of Goods Sold</span>
                <span className="font-mono text-slate-800">{formatCurrency(120000)}</span>
              </div>
            </div>

            {/* Gross Profit */}
             <div className="flex justify-between py-3 border-b-2 border-gray-800">
                <span className="font-bold text-slate-900 uppercase">Gross Profit</span>
                <span className="font-bold font-mono text-slate-900">{formatCurrency(revenue - 120000)}</span>
              </div>

            {/* Expenses Section */}
            <div>
              <h4 className="text-sm font-bold text-slate-700 uppercase mb-2">Operating Expenses</h4>
              <div className="flex justify-between py-2 border-b border-dashed border-gray-200">
                <span className="text-slate-600 ml-4">General & Administrative</span>
                <span className="font-mono text-slate-800">{formatCurrency(expenses * 0.6)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-dashed border-gray-200">
                <span className="text-slate-600 ml-4">Sales & Marketing</span>
                <span className="font-mono text-slate-800">{formatCurrency(expenses * 0.4)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-300 bg-gray-50/50">
                <span className="font-bold text-slate-800 ml-4">Total Expenses</span>
                <span className="font-bold font-mono text-slate-900">{formatCurrency(expenses)}</span>
              </div>
            </div>

            {/* Net Income */}
            <div className="mt-8">
              <div className="flex justify-between py-4 border-t-2 border-b-4 border-emerald-500 bg-emerald-50/30">
                <span className="font-bold text-lg text-emerald-900 uppercase">Net Income</span>
                <span className="font-bold text-lg font-mono text-emerald-700">{formatCurrency(netIncome)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
