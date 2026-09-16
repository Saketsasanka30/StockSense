import React from 'react';
import {
  LayoutDashboard,
  Boxes,
  Truck,
  TrendingUp,
  AlertTriangle,
  ScanLine,
  ShoppingCart,
  Building2,
  Settings,
  Sparkles,
  Layers,
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onSelectTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inventory', label: 'Inventory', icon: Boxes },
    { id: 'sales', label: 'Sales Orders', icon: ShoppingCart },
    { id: 'purchases', label: 'Purchasing', icon: Layers },
    { id: 'transfers', label: 'Transfers', icon: Truck },
    { id: 'forecast', label: 'AI Forecasting', icon: TrendingUp },
    { id: 'stockvision', label: 'StockVision AI', icon: ScanLine },
    { id: 'alerts', label: 'Alerts & Expiry', icon: AlertTriangle },
    { id: 'warehouses', label: 'Warehouses', icon: Building2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen sticky top-0">
      {/* Brand Header */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-lg tracking-wider">
          S
        </div>
        <div>
          <span className="font-extrabold text-white text-lg tracking-tight">StockSense</span>
          <span className="ml-1.5 text-[10px] bg-blue-500/20 text-blue-400 font-semibold px-1.5 py-0.5 rounded">PRO</span>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-3 mb-2">
          Enterprise Modules
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold shadow'
                  : 'hover:bg-slate-800 hover:text-white text-slate-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* AI Telemetry Badge */}
      <div className="p-4 border-t border-slate-800 m-3 bg-slate-800/60 rounded-xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-400">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>StockSense Intelligence</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
          Real-time anomaly detection and predictive restock models running.
        </p>
      </div>
    </aside>
  );
};
