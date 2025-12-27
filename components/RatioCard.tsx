import React from 'react';

interface RatioCardProps {
  title: string;
  value: string | number;
  description: string;
  target: string;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
  isEditing?: boolean;
  onValueChange?: (value: number) => void;
  isPercentage?: boolean;
  isCalculated?: boolean;
}

export const RatioCard: React.FC<RatioCardProps> = ({
  title,
  value,
  description,
  target,
  icon,
  iconBgColor,
  iconColor,
  isEditing,
  onValueChange,
  isPercentage,
  isCalculated
}) => {
  const formatValue = (val: string | number) => {
    if (typeof val !== 'number') return val;
    return isPercentage ? `${val.toFixed(1)}%` : val.toFixed(2);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow relative overflow-hidden">
       {isCalculated && isEditing && (
        <div className="absolute top-0 right-0 bg-gray-100 text-gray-500 text-[10px] px-2 py-1 rounded-bl-lg font-bold uppercase z-10">
          Auto-Calculated
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-500 font-bold text-xs uppercase tracking-wider">{title}</h3>
        <div className={`p-2 rounded-lg ${iconBgColor} ${iconColor}`}>
          {icon}
        </div>
      </div>
      
      {isEditing && !isCalculated && onValueChange ? (
         <div className="mb-3">
            <input
              type="number"
              step={isPercentage ? "0.1" : "0.01"}
              value={value}
              onChange={(e) => onValueChange(parseFloat(e.target.value) || 0)}
              className="text-4xl font-bold text-slate-900 w-full bg-slate-50 border-b-2 border-slate-200 focus:border-indigo-500 focus:outline-none px-1 rounded-t"
            />
          </div>
      ) : (
        <p className="text-4xl font-bold text-slate-900 mb-3">{formatValue(value)}</p>
      )}
      
      <p className="text-xs text-gray-500 mb-6 leading-relaxed flex-1">
        {description}
      </p>
      
      <div>
        <span className="inline-block bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded">
          {target}
        </span>
      </div>
    </div>
  );
};
