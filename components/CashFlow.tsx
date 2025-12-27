import React from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';

interface CashFlowProps {
  netIncome: number;
}

export const CashFlow: React.FC<CashFlowProps> = ({ netIncome }) => {
  // Mock adjustments for cash flow
  const depreciation = 15000;
  const increaseAR = -8500; // Negative means cash outflow (asset increased)
  const decreaseInventory = 4200; // Positive means cash inflow (asset decreased)
  const increaseAP = 3100;

  const netCashOperating = netIncome + depreciation + increaseAR + decreaseInventory + increaseAP;

  const capex = -25000;
  const netCashInvesting = capex;

  const debtRepayment = -5000;
  const dividends = -12000;
  const netCashFinancing = debtRepayment + dividends;

  const netChangeInCash = netCashOperating + netCashInvesting + netCashFinancing;
  const beginningCash = 45000;
  const endingCash = beginningCash + netChangeInCash;

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="flex-1 p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
          <TrendingUp size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Statement of Cash Flows</h1>
          <p className="text-slate-500 text-sm">Indirect Method • Period Ending March 31, 2024</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-emerald-100">
             <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">Operating Cash Flow</h3>
             <p className="text-2xl font-bold text-emerald-600">{formatCurrency(netCashOperating)}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-red-100">
             <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">Investing Cash Flow</h3>
             <p className="text-2xl font-bold text-slate-700">{formatCurrency(netCashInvesting)}</p>
          </div>
           <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100">
             <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">Net Change in Cash</h3>
             <p className={`text-2xl font-bold ${netChangeInCash >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                {netChangeInCash > 0 ? '+' : ''}{formatCurrency(netChangeInCash)}
             </p>
          </div>
      </div>

      <div className="max-w-3xl bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-end border-b-2 border-slate-100 pb-4 mb-6">
                <span className="font-bold text-lg text-slate-800">Cash Flow Details</span>
                <span className="text-sm text-slate-500">USD</span>
            </div>

            <div className="space-y-8">
                {/* Operating */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="bg-emerald-100 text-emerald-700 font-bold text-xs px-2 py-1 rounded">CFO</div>
                        <h4 className="font-bold text-slate-700">Cash Flows from Operating Activities</h4>
                    </div>
                    <div className="space-y-3 pl-4 border-l-2 border-slate-100 ml-2">
                         <div className="flex justify-between text-sm">
                            <span className="font-semibold text-slate-900">Net Income</span>
                            <span className="font-mono font-bold">{formatCurrency(netIncome)}</span>
                         </div>
                         <div className="flex justify-between text-sm text-slate-600">
                            <span>Adjustments for Depreciation</span>
                            <span className="font-mono">{formatCurrency(depreciation)}</span>
                         </div>
                         <div className="flex justify-between text-sm text-slate-600">
                            <span>(Increase) in Accounts Receivable</span>
                            <span className="font-mono">{formatCurrency(increaseAR)}</span>
                         </div>
                         <div className="flex justify-between text-sm text-slate-600">
                            <span>Decrease in Inventory</span>
                            <span className="font-mono">{formatCurrency(decreaseInventory)}</span>
                         </div>
                         <div className="flex justify-between text-sm text-slate-600">
                            <span>Increase in Accounts Payable</span>
                            <span className="font-mono">{formatCurrency(increaseAP)}</span>
                         </div>
                         <div className="flex justify-between text-sm font-bold border-t border-gray-200 pt-2 mt-2">
                             <span className="text-slate-800">Net Cash Provided by Operating</span>
                             <span className="font-mono text-emerald-600">{formatCurrency(netCashOperating)}</span>
                         </div>
                    </div>
                </div>

                {/* Investing */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="bg-blue-100 text-blue-700 font-bold text-xs px-2 py-1 rounded">CFI</div>
                        <h4 className="font-bold text-slate-700">Cash Flows from Investing Activities</h4>
                    </div>
                    <div className="space-y-3 pl-4 border-l-2 border-slate-100 ml-2">
                         <div className="flex justify-between text-sm text-slate-600">
                            <span>Purchase of Property & Equipment</span>
                            <span className="font-mono">{formatCurrency(capex)}</span>
                         </div>
                         <div className="flex justify-between text-sm font-bold border-t border-gray-200 pt-2 mt-2">
                             <span className="text-slate-800">Net Cash Used in Investing</span>
                             <span className="font-mono text-slate-900">{formatCurrency(netCashInvesting)}</span>
                         </div>
                    </div>
                </div>

                {/* Financing */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="bg-purple-100 text-purple-700 font-bold text-xs px-2 py-1 rounded">CFF</div>
                        <h4 className="font-bold text-slate-700">Cash Flows from Financing Activities</h4>
                    </div>
                    <div className="space-y-3 pl-4 border-l-2 border-slate-100 ml-2">
                         <div className="flex justify-between text-sm text-slate-600">
                            <span>Repayment of Long-Term Debt</span>
                            <span className="font-mono">{formatCurrency(debtRepayment)}</span>
                         </div>
                         <div className="flex justify-between text-sm text-slate-600">
                            <span>Dividends Paid</span>
                            <span className="font-mono">{formatCurrency(dividends)}</span>
                         </div>
                         <div className="flex justify-between text-sm font-bold border-t border-gray-200 pt-2 mt-2">
                             <span className="text-slate-800">Net Cash Used in Financing</span>
                             <span className="font-mono text-slate-900">{formatCurrency(netCashFinancing)}</span>
                         </div>
                    </div>
                </div>

                {/* Summary */}
                <div className="bg-slate-50 p-4 rounded-lg mt-6">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-600">Net Increase (Decrease) in Cash</span>
                        <span className="font-mono font-bold">{formatCurrency(netChangeInCash)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-600">Cash at Beginning of Period</span>
                        <span className="font-mono">{formatCurrency(beginningCash)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t-2 border-slate-200 pt-2 mt-2">
                        <span className="text-slate-900">Cash at End of Period</span>
                        <span className="font-mono text-emerald-600">{formatCurrency(endingCash)}</span>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};
