import React, { useState } from 'react';
import { 
  Building2, 
  Settings, 
  TrendingUp, 
  DollarSign, 
  Wallet, 
  TrendingDown,
  Activity,
  Scale,
  AlertCircle,
  Percent,
  Sparkles,
  Pencil,
  Save,
  RotateCcw
} from 'lucide-react';
import { MetricCard } from './MetricCard';
import { RatioCard } from './RatioCard';
import { FinancialContext, FinancialDataState } from '../types';
import { generateFinancialInsights } from '../services/geminiService';

interface DashboardProps {
  data: FinancialDataState;
  onUpdate: (key: keyof FinancialDataState, value: string | number) => void;
  onReset: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ data, onUpdate, onReset }) => {
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Derived Values
  const netIncome = data.revenue - data.expenses;
  const profitMargin = data.revenue !== 0 ? (netIncome / data.revenue) * 100 : 0;
  
  // Dynamic Trends
  const netIncomeTrend = netIncome > 50000 ? "+12%" : "-5%";
  const expensesTrend = data.expenses > 250000 ? "+5%" : "-2%";

  // Formatters
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  
  const formatPercent = (val: number) => `${val.toFixed(1)}%`;

  const handleGenerateInsights = async () => {
    setLoading(true);
    setInsight(null);
    
    const context: FinancialContext = {
      companyName: data.companyName,
      reportingDate: data.reportDate,
      currency: 'USD',
      metrics: [
        { title: 'Net Income', value: formatCurrency(netIncome), trend: netIncomeTrend },
        { title: 'Total Revenue', value: formatCurrency(data.revenue), trend: '0%' },
        { title: 'Total Expenses', value: formatCurrency(data.expenses), trend: expensesTrend },
        { title: 'Total Assets', value: formatCurrency(data.assets), trend: '0%' },
      ],
      ratios: [
        { title: 'Current Ratio', value: data.currentRatio.toFixed(2), target: '> 1.5' },
        { title: 'Profit Margin', value: formatPercent(profitMargin), target: '> 10%' },
        { title: 'Debt to Equity', value: data.debtToEquity.toFixed(2), target: '< 2.0' },
      ]
    };
    
    const result = await generateFinancialInsights(context);
    setInsight(result);
    setLoading(false);
  };

  const handleReset = () => {
    onReset();
    setInsight(null);
    setIsEditing(false);
  };

  return (
    <div className="flex-1 p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <Building2 className="text-slate-700" size={28} />
            {isEditing ? (
              <input 
                value={data.companyName}
                onChange={(e) => onUpdate('companyName', e.target.value)}
                className="text-3xl font-bold text-slate-900 bg-white border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            ) : (
              <h1 className="text-3xl font-bold text-slate-900">{data.companyName}</h1>
            )}
          </div>
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <span>Financial Dashboard •</span>
            {isEditing ? (
              <input 
                value={data.reportDate}
                onChange={(e) => onUpdate('reportDate', e.target.value)}
                className="bg-white border border-gray-300 rounded px-2 py-0.5 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
              />
            ) : (
              <span>{data.reportDate}</span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 items-end">
             {/* Edit Mode Toggle */}
             <button 
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all shadow-sm border ${
                isEditing 
                  ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700' 
                  : 'bg-white text-slate-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {isEditing ? <Save size={16} /> : <Pencil size={16} />}
              {isEditing ? 'Save Changes' : 'Edit Data'}
            </button>

            {isEditing && (
              <button 
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all shadow-sm border bg-white text-slate-700 border-gray-200 hover:text-red-600 hover:bg-red-50"
                title="Reset to defaults"
              >
                <RotateCcw size={16} />
              </button>
            )}

            <div className="flex flex-col">
              <label className="text-xs font-bold text-gray-400 uppercase mb-1">Currency</label>
              <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 flex items-center justify-between min-w-[100px] shadow-sm h-[42px]">
                <span className="font-bold text-slate-700">USD</span>
                <Settings size={14} className="text-gray-400" />
              </div>
            </div>
        </div>
      </div>

      {/* AI Insight Section */}
      <div className="mb-8">
         <button 
           onClick={handleGenerateInsights}
           disabled={loading}
           className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-5 py-2.5 rounded-lg hover:shadow-lg transition-all text-sm font-semibold disabled:opacity-70 disabled:cursor-not-allowed group"
         >
           <Sparkles size={16} className={loading ? "animate-spin" : "group-hover:scale-110 transition-transform"} />
           {loading ? 'Analyzing Financials...' : 'Generate AI Insights'}
         </button>
         
         {insight && (
           <div className="mt-4 p-5 bg-white border-l-4 border-violet-500 rounded-r-xl shadow-sm text-slate-700 text-sm leading-relaxed animate-in fade-in slide-in-from-top-2">
             <div className="flex items-start gap-3">
               <div className="p-2 bg-violet-100 rounded-lg shrink-0">
                  <Sparkles className="text-violet-600" size={20} />
               </div>
               <div className="prose prose-sm max-w-none">
                 <p className="whitespace-pre-wrap">{insight}</p>
               </div>
             </div>
           </div>
         )}
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <MetricCard 
          title="Net Income"
          value={netIncome}
          trend={netIncomeTrend}
          subtext={`${netIncomeTrend} vs last month`}
          icon={<TrendingUp size={24} />}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-500"
          date={data.reportDate.split(' ')[0] + ' ' + data.reportDate.split(' ')[1]}
          isCalculated={true}
          isEditing={isEditing}
        />
        <MetricCard 
          title="Total Revenue"
          value={data.revenue}
          onValueChange={(val) => onUpdate('revenue', val)}
          trend="0%"
          subtext="Based on invoiced sales"
          icon={<DollarSign size={24} />}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-500"
          date={data.reportDate.split(' ')[0] + ' ' + data.reportDate.split(' ')[1]}
          isEditing={isEditing}
        />
        <MetricCard 
          title="Total Assets"
          value={data.assets}
          onValueChange={(val) => onUpdate('assets', val)}
          trend="0%"
          subtext="Current & Non-Current"
          icon={<Wallet size={24} />}
          iconBgColor="bg-indigo-50"
          iconColor="text-indigo-500"
          date={data.reportDate.split(' ')[0] + ' ' + data.reportDate.split(' ')[1]}
          isEditing={isEditing}
        />
        <MetricCard 
          title="Total Expenses"
          value={data.expenses}
          onValueChange={(val) => onUpdate('expenses', val)}
          trend={expensesTrend}
          subtext="Operating costs"
          icon={<TrendingDown size={24} />}
          iconBgColor="bg-red-50"
          iconColor="text-red-500"
          date={data.reportDate.split(' ')[0] + ' ' + data.reportDate.split(' ')[1]}
          isEditing={isEditing}
        />
      </div>

      {/* Ratios Section Title */}
      <div className="flex items-center gap-2 mb-6">
        <Activity className="text-indigo-600" size={24} />
        <h2 className="text-xl font-bold text-slate-800">Key Financial Ratios</h2>
      </div>

      {/* Ratios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <RatioCard 
          title="CURRENT RATIO"
          value={data.currentRatio}
          onValueChange={(val) => onUpdate('currentRatio', val)}
          description="Measures ability to pay short-term obligations with short-term assets."
          target="Target: > 1.5"
          icon={<Scale size={20} />}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-500"
          isEditing={isEditing}
        />
        <RatioCard 
          title="QUICK RATIO"
          value={data.quickRatio}
          onValueChange={(val) => onUpdate('quickRatio', val)}
          description="Acid-test. Similar to Current Ratio but excludes inventory."
          target="Target: > 1.0"
          icon={<AlertCircle size={20} />}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-500"
          isEditing={isEditing}
        />
        <RatioCard 
          title="DEBT-TO-EQUITY"
          value={data.debtToEquity}
          onValueChange={(val) => onUpdate('debtToEquity', val)}
          description="Indicates the relative proportion of shareholder's equity and debt used to finance assets."
          target="Target: < 2.0"
          icon={<Activity size={20} />}
          iconBgColor="bg-orange-50"
          iconColor="text-orange-500"
          isEditing={isEditing}
        />
        <RatioCard 
          title="PROFIT MARGIN"
          value={profitMargin}
          isCalculated={true}
          isPercentage={true}
          description="Represents the percentage of sales that has turned into profits."
          target="Target: > 10%"
          icon={<Percent size={20} />}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-500"
          isEditing={isEditing}
        />
      </div>
    </div>
  );
};
