import React, { useState } from 'react';
import { Landmark, Check, AlertCircle } from 'lucide-react';
import { BankTransaction } from '../types';

const MOCK_BANK_TRANSACTIONS: BankTransaction[] = [
  { id: 'b1', date: '2024-03-01', description: 'Deposit - Client X', amount: 5000, status: 'matched', type: 'bank' },
  { id: 'b2', date: '2024-03-03', description: 'Withdrawal - Utility Co', amount: -250, status: 'matched', type: 'bank' },
  { id: 'b3', date: '2024-03-05', description: 'Service Fee', amount: -15, status: 'unmatched', type: 'bank' },
  { id: 'b4', date: '2024-03-10', description: 'Deposit - Client Y', amount: 1200, status: 'matched', type: 'bank' },
];

const MOCK_LEDGER_TRANSACTIONS: BankTransaction[] = [
  { id: 'l1', date: '2024-03-01', description: 'Payment Received - Invoice #101', amount: 5000, status: 'matched', type: 'ledger' },
  { id: 'l2', date: '2024-03-03', description: 'Utility Bill Payment', amount: -250, status: 'matched', type: 'ledger' },
  { id: 'l3', date: '2024-03-10', description: 'Payment Received - Invoice #102', amount: 1200, status: 'matched', type: 'ledger' },
  { id: 'l4', date: '2024-03-12', description: 'Office Supplies', amount: -85, status: 'unmatched', type: 'ledger' },
];

export const BankReconciliation: React.FC = () => {
  const [bankBalance] = useState(15435.00);
  const [ledgerBalance] = useState(15505.00);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="flex-1 p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
          <Landmark size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bank Reconciliation</h1>
          <p className="text-slate-500 text-sm">Chase Business Checking • Ending ****4455</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-slate-500 text-xs font-bold uppercase mb-1">Bank Statement Balance</p>
          <p className="text-2xl font-bold text-slate-800">{formatCurrency(bankBalance)}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
           <p className="text-slate-500 text-xs font-bold uppercase mb-1">Ledger Balance</p>
           <p className="text-2xl font-bold text-slate-800">{formatCurrency(ledgerBalance)}</p>
        </div>
        <div className={`p-6 rounded-xl border shadow-sm ${bankBalance === ledgerBalance ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
           <p className={`text-xs font-bold uppercase mb-1 ${bankBalance === ledgerBalance ? 'text-emerald-600' : 'text-amber-600'}`}>Difference</p>
           <p className={`text-2xl font-bold ${bankBalance === ledgerBalance ? 'text-emerald-700' : 'text-amber-700'}`}>
             {formatCurrency(Math.abs(bankBalance - ledgerBalance))}
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bank Side */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-100 bg-slate-50 rounded-t-xl">
             <h3 className="font-bold text-slate-700">Bank Statement Lines</h3>
          </div>
          <div className="flex-1 overflow-auto">
             <table className="w-full text-left text-sm">
                <thead className="text-xs text-slate-500 bg-white sticky top-0">
                  <tr>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Description</th>
                    <th className="px-4 py-3 font-medium text-right">Amount</th>
                    <th className="px-4 py-3 font-medium text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {MOCK_BANK_TRANSACTIONS.map(tx => (
                    <tr key={tx.id} className="hover:bg-slate-50">
                       <td className="px-4 py-3 text-slate-500">{tx.date}</td>
                       <td className="px-4 py-3 text-slate-700 font-medium">{tx.description}</td>
                       <td className={`px-4 py-3 text-right font-mono ${tx.amount < 0 ? 'text-slate-900' : 'text-emerald-600'}`}>
                         {tx.amount < 0 ? `(${Math.abs(tx.amount).toFixed(2)})` : tx.amount.toFixed(2)}
                       </td>
                       <td className="px-4 py-3 text-center">
                          {tx.status === 'matched' ? (
                            <Check size={16} className="text-emerald-500 mx-auto" />
                          ) : (
                            <AlertCircle size={16} className="text-amber-500 mx-auto" />
                          )}
                       </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        </div>

        {/* Ledger Side */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-100 bg-slate-50 rounded-t-xl">
             <h3 className="font-bold text-slate-700">General Ledger Lines</h3>
          </div>
          <div className="flex-1 overflow-auto">
             <table className="w-full text-left text-sm">
                <thead className="text-xs text-slate-500 bg-white sticky top-0">
                  <tr>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Description</th>
                    <th className="px-4 py-3 font-medium text-right">Amount</th>
                    <th className="px-4 py-3 font-medium text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {MOCK_LEDGER_TRANSACTIONS.map(tx => (
                    <tr key={tx.id} className="hover:bg-slate-50">
                       <td className="px-4 py-3 text-slate-500">{tx.date}</td>
                       <td className="px-4 py-3 text-slate-700 font-medium">{tx.description}</td>
                       <td className={`px-4 py-3 text-right font-mono ${tx.amount < 0 ? 'text-slate-900' : 'text-emerald-600'}`}>
                         {tx.amount < 0 ? `(${Math.abs(tx.amount).toFixed(2)})` : tx.amount.toFixed(2)}
                       </td>
                       <td className="px-4 py-3 text-center">
                          {tx.status === 'matched' ? (
                            <Check size={16} className="text-emerald-500 mx-auto" />
                          ) : (
                            <AlertCircle size={16} className="text-amber-500 mx-auto" />
                          )}
                       </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        </div>
      </div>
    </div>
  );
};
