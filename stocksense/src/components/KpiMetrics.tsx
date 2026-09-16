import React from 'react';
import { IndianRupee, Layers, AlertCircle, AlertOctagon, Archive, Activity } from 'lucide-react';
import { KpiOverview } from '../types/inventory';

interface KpiMetricsProps {
  kpi: KpiOverview;
}

export const KpiMetrics: React.FC<KpiMetricsProps> = ({ kpi }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
      {/* 1. Total Inventory Value */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Inventory Value</span>
          <IndianRupee className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <div className="text-2xl font-bold text-slate-900">₹42.8 L</div>
          <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <span>+4.2%</span>
            <span className="text-slate-400 font-normal">vs last month</span>
          </div>
        </div>
      </div>

      {/* 2. Active Catalog SKUs */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Catalog SKUs</span>
          <Layers className="w-4 h-4 text-slate-600" />
        </div>
        <div>
          <div className="text-2xl font-bold text-slate-900">{kpi.activeCatalogSkus.toLocaleString()}</div>
          <div className="text-xs text-slate-500 mt-1">Across 3 Hubs</div>
        </div>
      </div>

      {/* 3. Low Stock Alert */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Low Stock</span>
          <AlertCircle className="w-4 h-4 text-amber-500" />
        </div>
        <div>
          <div className="text-2xl font-bold text-amber-600">{kpi.lowStockSkus} SKUs</div>
          <div className="text-xs text-red-500 font-semibold mt-1">12 items &lt;48h stockout</div>
        </div>
      </div>

      {/* 4. Overstock */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Overstock</span>
          <AlertOctagon className="w-4 h-4 text-indigo-500" />
        </div>
        <div>
          <div className="text-2xl font-bold text-slate-900">{kpi.overstockSkus} SKUs</div>
          <div className="text-xs text-slate-500 mt-1">₹3.40 L tied capital</div>
        </div>
      </div>

      {/* 5. Dead Stock */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Dead Stock</span>
          <Archive className="w-4 h-4 text-purple-500" />
        </div>
        <div>
          <div className="text-2xl font-bold text-purple-600">{kpi.deadStockSkus} SKUs</div>
          <div className="text-xs text-slate-500 mt-1">&gt;90 days dormant</div>
        </div>
      </div>

      {/* 6. Health Score */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Health Score</span>
          <Activity className="w-4 h-4 text-emerald-500" />
        </div>
        <div>
          <div className="text-2xl font-bold text-emerald-600">{kpi.healthScore}%</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">Optimal tier</div>
        </div>
      </div>
    </div>
  );
};
