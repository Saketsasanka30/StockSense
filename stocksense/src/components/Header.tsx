import React from 'react';
import { Search, Bell, Plus, ChevronDown, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentHub: string;
  onHubChange: (hub: string) => void;
  onQuickAdd: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentHub, onHubChange, onQuickAdd }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Hub Selector */}
        <div className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg cursor-pointer transition text-sm font-medium text-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{currentHub}</span>
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </div>

        {/* Global Search */}
        <div className="relative w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search SKUs, products, serials, orders..."
            className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Quick Action Button */}
        <button
          onClick={onQuickAdd}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg text-sm font-semibold transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Stock</span>
        </button>

        {/* AI Copilot Status */}
        <div className="flex items-center gap-1.5 bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-1 rounded-md text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>AI v2.4 Active</span>
        </div>

        {/* Notification Bell */}
        <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-xs">
            SC
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-bold text-slate-800 leading-tight">Saket Chippe</div>
            <div className="text-[11px] text-slate-500 leading-tight">Warehouse Lead</div>
          </div>
        </div>
      </div>
    </header>
  );
};
