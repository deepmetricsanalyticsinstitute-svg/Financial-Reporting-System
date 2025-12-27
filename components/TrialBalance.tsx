import React, { useMemo } from 'react';
import { FileText, ArrowDown, ArrowUp } from 'lucide-react';
import { TrialBalanceItem } from '../types';

// Mock data generator based on main financial state could be added here, 
// but we'll use static data for the specific view logic for now.
const MOCK_TB_DATA: TrialBalanceItem[] = [
  { id: '1', accountName: 'Cash', debit: 50000, credit: 0, type: 'asset' },
  { id: '2', accountName: 'Accounts Receivable', debit: 182000, credit: 0, type: 'asset' },
  { id: '3', accountName: 'Inventory', debit: 45000, credit: 0, type: 'asset' },
  { id: '4', accountName: 'Accounts Payable', debit: 0, credit: 40000, type: 'liability' },
  { id: '5', accountName: 'Notes Payable', debit: 0, credit: 80000, type: 'liability' },
  { id: '6', accountName: 'Common Stock', debit: 0, credit: 100000, type: 'equity' },
  { id: '7', accountName: 'Retained Earnings', debit: 0, credit: 57000, type: 'equity' },
  { id: '8', accountName: 'Sales Revenue', debit: 0, credit: 300000, type: 'revenue' },
  { id: '9', accountName: 'Cost of Goods Sold', debit: 120000, credit: 0, type: 'expense' },
  { id: '10', accountName: 'Salaries Expense', debit: 80000, credit: 0, type: 'expense' },
  { id: '11', accountName: 'Rent Expense', debit: 25000, credit: 0, type: 'expense' },
  { id: '12', accountName: 'Utilities Expense', debit: 5000, credit: 0, type: 'expense' },
  { id: '13', accountName: 'Marketing Expense', debit: 15000, credit: 0, type: 'expense' },
];

export const TrialBalance: React.FC = () => {
  const totals = useMemo(() => {
    return MOCK_TB_DATA.reduce((acc, item) => ({
      debit: acc.debit + item.debit,
      credit: acc.credit + item.credit
    }), { debit: 0, credit: 0 });
  }, []);

  const isBalanced = totals.debit === totals.credit;

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="flex-1 p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
          <FileText size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Trial Balance</h1>
          <p className="text-slate-500 text-sm">Unadjusted • March 31, 2024</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-gray-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
              <th className="px-6 py-4">Account Title</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4 text-right">Debit</th>
              <th className="px-6 py-4 text-right">Credit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {MOCK_TB_DATA.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-3 font-medium text-slate-700">{item.accountName}</td>
                <td className="px-6 py-3">
                  <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full 
                    ${item.type === 'asset' ? 'bg-emerald-50 text-emerald-600' : 
                      item.type === 'liability' ? 'bg-amber-50 text-amber-600' :
                      item.type === 'equity' ? 'bg-purple-50 text-purple-600' :
                      item.type === 'revenue' ? 'bg-blue-50 text-blue-600' :
                      'bg-rose-50 text-rose-600'}`}>
                    {item.type}
                  </span>
                </td>
                <td className="px-6 py-3 text-right font-mono text-slate-600">
                  {item.debit > 0 ? formatCurrency(item.debit) : '-'}
                </td>
                <td className="px-6 py-3 text-right font-mono text-slate-600">
                  {item.credit > 0 ? formatCurrency(item.credit) : '-'}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className={`font-bold border-t-2 ${isBalanced ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
            <tr>
              <td className="px-6 py-4 text-slate-800" colSpan={2}>
                TOTALS
                {isBalanced ? (
                   <span className="ml-3 inline-flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold uppercase">
                     Balanced
                   </span>
                ) : (
                  <span className="ml-3 inline-flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold uppercase">
                    Unbalanced
                  </span>
                )}
              </td>
              <td className="px-6 py-4 text-right text-slate-900">{formatCurrency(totals.debit)}</td>
              <td className="px-6 py-4 text-right text-slate-900">{formatCurrency(totals.credit)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
