import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  trend: string;
  subtext: string;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
  date: string;
  isEditing?: boolean;
  onValueChange?: (value: number) => void;
  isCalculated?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  trend,
  subtext,
  icon,
  iconBgColor,
  iconColor,
  date,
  isEditing,
  onValueChange,
  isCalculated
}) => {
  const displayValue = typeof value === 'number' 
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
    : value;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow relative overflow-hidden">
      {isCalculated && isEditing && (
        <div className="absolute top-0 right-0 bg-gray-100 text-gray-500 text-[10px] px-2 py-1 rounded-bl-lg font-bold uppercase z-10">
          Auto-Calculated
        </div>
      )}
      
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg ${iconBgColor} ${iconColor}`}>
          {icon}
        </div>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{date}</span>
      </div>
      
      <div className="mt-auto">
        <h3 className="text-gray-500 font-medium text-sm mb-1">{title}</h3>
        
        {isEditing && !isCalculated && onValueChange ? (
          <div className="mb-2">
            <input
              type="number"
              value={value}
              onChange={(e) => onValueChange(parseFloat(e.target.value) || 0)}
              className="text-3xl font-bold text-slate-900 w-full bg-slate-50 border-b-2 border-slate-200 focus:border-indigo-500 focus:outline-none px-1 rounded-t"
              autoFocus
            />
          </div>
        ) : (
          <p className="text-3xl font-bold text-slate-900 mb-2">{displayValue}</p>
        )}

        <p className={`text-xs ${trend.includes('-') || title === "Total Expenses" ? 'text-gray-500' : 'text-emerald-600'} font-medium`}>
          {subtext}
        </p>
      </div>
    </div>
  );
};
