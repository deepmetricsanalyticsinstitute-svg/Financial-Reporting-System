import React, { useRef } from 'react';
import { 
  LayoutGrid, 
  ArrowRightLeft, 
  FileText, 
  Landmark, 
  FileBarChart, 
  PieChart, 
  TrendingUp, 
  Scale,
  Pencil
} from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  onImportData: (file: File) => void;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onImportData, currentView, onNavigate }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportData(file);
    }
    // Reset value to allow uploading the same file again if needed
    if (e.target) e.target.value = '';
  };

  return (
    <div className="w-64 bg-slate-900 text-slate-300 h-screen flex flex-col fixed left-0 top-0 z-50 border-r border-slate-800">
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept=".csv,.txt" 
        className="hidden" 
      />

      {/* Brand */}
      <div className="p-6 flex items-center space-x-3 mb-4">
        <div className="bg-emerald-500 p-2 rounded-lg text-white">
          <Scale size={20} />
        </div>
        <div>
          <h1 className="text-white font-bold leading-tight">FINANCIAL</h1>
          <h1 className="text-white font-bold leading-tight">REPORTING</h1>
          <h1 className="text-white font-bold leading-tight">SYSTEM</h1>
        </div>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 px-4 space-y-1">
        <NavItem 
          icon={<LayoutGrid size={20} />} 
          label="Dashboard" 
          active={currentView === 'dashboard'} 
          onClick={() => onNavigate('dashboard')} 
        />
        <NavItem 
          icon={<ArrowRightLeft size={20} />} 
          label="Import Data" 
          onClick={handleImportClick}
        />
        <NavItem 
          icon={<FileText size={20} />} 
          label="Trial Balance" 
          active={currentView === 'trial-balance'}
          onClick={() => onNavigate('trial-balance')}
        />
        <NavItem 
          icon={<Landmark size={20} />} 
          label="Bank Reconciliation" 
          active={currentView === 'bank-reconciliation'}
          onClick={() => onNavigate('bank-reconciliation')}
        />
        
        <div className="pt-6 pb-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Reports
        </div>
        <NavItem 
          icon={<FileBarChart size={20} />} 
          label="Income Statement" 
          active={currentView === 'income-statement'}
          onClick={() => onNavigate('income-statement')}
        />
        <NavItem 
          icon={<PieChart size={20} />} 
          label="Balance Sheet" 
          active={currentView === 'balance-sheet'}
          onClick={() => onNavigate('balance-sheet')}
        />
        <NavItem 
          icon={<TrendingUp size={20} />} 
          label="Cash Flow" 
          active={currentView === 'cash-flow'}
          onClick={() => onNavigate('cash-flow')}
        />
      </nav>

      {/* Bottom Entity Card */}
      <div className="p-4">
        <div className="bg-slate-800 rounded-lg p-4 relative group cursor-pointer hover:bg-slate-700 transition-colors">
          <div className="absolute -left-2 bottom-4 bg-emerald-600 rounded-full p-1.5 border-4 border-slate-900">
             <Pencil size={12} className="text-white" />
          </div>
          <p className="text-xs text-slate-500 font-semibold mb-1 uppercase">Current Entity</p>
          <p className="text-white font-bold text-sm">Acme Corp.</p>
          <p className="text-emerald-500 text-xs">March 2024</p>
        </div>
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => {
  return (
    <a 
      href="#" 
      onClick={(e) => {
        e.preventDefault();
        if(onClick) onClick(e);
      }}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
        active 
          ? 'bg-slate-800 text-white' 
          : 'hover:bg-slate-800 hover:text-white'
      }`}
    >
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </a>
  );
};
