import React from 'react';
import { PieChart } from 'lucide-react';

interface BalanceSheetProps {
  totalAssets: number;
  debtToEquityRatio: number;
}

export const BalanceSheet: React.FC<BalanceSheetProps> = ({ totalAssets, debtToEquityRatio }) => {
  // Calculate Liabilities and Equity based on the ratio
  // Assets = Liabilities + Equity
  // Liabilities = Equity * Ratio
  // Assets = (Equity * Ratio) + Equity = Equity * (1 + Ratio)
  // Equity = Assets / (1 + Ratio)
  
  const totalEquity = totalAssets / (1 + debtToEquityRatio);
  const totalLiabilities = totalAssets - totalEquity;

  // Mock breakdowns based on typical proportions
  const currentAssets = totalAssets * 0.45;
  const nonCurrentAssets = totalAssets * 0.55;

  const currentLiabilities = totalLiabilities * 0.35;
  const nonCurrentLiabilities = totalLiabilities * 0.65;

  const retainedEarnings = totalEquity * 0.85;
  const commonStock = totalEquity * 0.15;

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="flex-1 p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
          <PieChart size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Balance Sheet</h1>
          <p className="text-slate-500 text-sm">Statement of Financial Position • March 31, 2024</p>
        </div>
      </div>

      <div className="max-w-4xl bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8">
           <h2 className="text-center font-bold text-lg text-slate-900 mb-1">ACME CORP.</h2>
           <h3 className="text-center text-slate-500 text-sm mb-8 uppercase tracking-wide">Balance Sheet</h3>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             
             {/* Assets Column */}
             <div>
               <h4 className="text-sm font-bold text-slate-800 uppercase border-b-2 border-slate-800 pb-2 mb-4">Assets</h4>
               
               {/* Current Assets */}
               <div className="mb-6">
                 <h5 className="text-xs font-bold text-slate-500 uppercase mb-2">Current Assets</h5>
                 <div className="space-y-2">
                   <div className="flex justify-between text-sm">
                     <span className="text-slate-600">Cash & Equivalents</span>
                     <span className="font-mono">{formatCurrency(currentAssets * 0.4)}</span>
                   </div>
                   <div className="flex justify-between text-sm">
                     <span className="text-slate-600">Accounts Receivable</span>
                     <span className="font-mono">{formatCurrency(currentAssets * 0.35)}</span>
                   </div>
                   <div className="flex justify-between text-sm">
                     <span className="text-slate-600">Inventory</span>
                     <span className="font-mono">{formatCurrency(currentAssets * 0.25)}</span>
                   </div>
                   <div className="flex justify-between text-sm font-bold border-t border-gray-200 pt-1 mt-1">
                      <span className="text-slate-700">Total Current Assets</span>
                      <span className="font-mono">{formatCurrency(currentAssets)}</span>
                   </div>
                 </div>
               </div>

               {/* Non-Current Assets */}
               <div className="mb-6">
                 <h5 className="text-xs font-bold text-slate-500 uppercase mb-2">Non-Current Assets</h5>
                 <div className="space-y-2">
                   <div className="flex justify-between text-sm">
                     <span className="text-slate-600">Property, Plant & Equip</span>
                     <span className="font-mono">{formatCurrency(nonCurrentAssets * 0.8)}</span>
                   </div>
                   <div className="flex justify-between text-sm">
                     <span className="text-slate-600">Intangible Assets</span>
                     <span className="font-mono">{formatCurrency(nonCurrentAssets * 0.2)}</span>
                   </div>
                   <div className="flex justify-between text-sm font-bold border-t border-gray-200 pt-1 mt-1">
                      <span className="text-slate-700">Total Non-Current</span>
                      <span className="font-mono">{formatCurrency(nonCurrentAssets)}</span>
                   </div>
                 </div>
               </div>

               {/* Total Assets */}
               <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                 <span className="font-bold text-slate-900">Total Assets</span>
                 <span className="font-bold font-mono text-slate-900 text-lg">{formatCurrency(totalAssets)}</span>
               </div>
             </div>

             {/* Liabilities & Equity Column */}
             <div>
               <h4 className="text-sm font-bold text-slate-800 uppercase border-b-2 border-slate-800 pb-2 mb-4">Liabilities & Equity</h4>
               
               {/* Current Liabilities */}
               <div className="mb-6">
                 <h5 className="text-xs font-bold text-slate-500 uppercase mb-2">Current Liabilities</h5>
                 <div className="space-y-2">
                   <div className="flex justify-between text-sm">
                     <span className="text-slate-600">Accounts Payable</span>
                     <span className="font-mono">{formatCurrency(currentLiabilities * 0.6)}</span>
                   </div>
                   <div className="flex justify-between text-sm">
                     <span className="text-slate-600">Short-term Debt</span>
                     <span className="font-mono">{formatCurrency(currentLiabilities * 0.4)}</span>
                   </div>
                   <div className="flex justify-between text-sm font-bold border-t border-gray-200 pt-1 mt-1">
                      <span className="text-slate-700">Total Current Liab.</span>
                      <span className="font-mono">{formatCurrency(currentLiabilities)}</span>
                   </div>
                 </div>
               </div>

               {/* Long Term Liabilities */}
               <div className="mb-6">
                 <h5 className="text-xs font-bold text-slate-500 uppercase mb-2">Long-Term Liabilities</h5>
                 <div className="space-y-2">
                   <div className="flex justify-between text-sm">
                     <span className="text-slate-600">Long-term Debt</span>
                     <span className="font-mono">{formatCurrency(nonCurrentLiabilities)}</span>
                   </div>
                   <div className="flex justify-between text-sm font-bold border-t border-gray-200 pt-1 mt-1">
                      <span className="text-slate-700">Total Non-Current</span>
                      <span className="font-mono">{formatCurrency(nonCurrentLiabilities)}</span>
                   </div>
                 </div>
               </div>

               <div className="flex justify-between text-sm font-bold border-t border-gray-200 pt-2 pb-6">
                  <span className="text-slate-800">Total Liabilities</span>
                  <span className="font-mono">{formatCurrency(totalLiabilities)}</span>
               </div>

               {/* Equity */}
               <div className="mb-6">
                 <h5 className="text-xs font-bold text-slate-500 uppercase mb-2">Shareholder's Equity</h5>
                 <div className="space-y-2">
                   <div className="flex justify-between text-sm">
                     <span className="text-slate-600">Common Stock</span>
                     <span className="font-mono">{formatCurrency(commonStock)}</span>
                   </div>
                   <div className="flex justify-between text-sm">
                     <span className="text-slate-600">Retained Earnings</span>
                     <span className="font-mono">{formatCurrency(retainedEarnings)}</span>
                   </div>
                   <div className="flex justify-between text-sm font-bold border-t border-gray-200 pt-1 mt-1">
                      <span className="text-slate-700">Total Equity</span>
                      <span className="font-mono">{formatCurrency(totalEquity)}</span>
                   </div>
                 </div>
               </div>

               {/* Total Liabilities & Equity */}
               <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                 <span className="font-bold text-slate-900">Total Liab. & Equity</span>
                 <span className="font-bold font-mono text-slate-900 text-lg">{formatCurrency(totalLiabilities + totalEquity)}</span>
               </div>
             </div>

           </div>
        </div>
      </div>
    </div>
  );
};
