import React from 'react';
import { KpiMetrics } from '../components/KpiMetrics';
import { AiCommandCenter } from '../components/AiCommandCenter';
import { WarehouseUtilization } from '../components/WarehouseUtilization';
import { KpiOverview, AiDirective, WarehouseTelemetry } from '../types/inventory';
import { RefreshCw, MapPin } from 'lucide-react';

interface DashboardProps {
  kpi: KpiOverview;
  directives: AiDirective[];
  warehouses: WarehouseTelemetry[];
  onExecuteDirective: (id: string) => void;
  onRefreshTelemetry: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  kpi,
  directives,
  warehouses,
  onExecuteDirective,
  onRefreshTelemetry,
}) => {
  return (
    <div className="space-y-6 pb-12">
      {/* Top Greeting and Sync Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Good morning, Saket</h1>
          <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 font-medium">
            <span>Wednesday, Sep 16, 2026</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              Live Sync Active
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span>Bengaluru Central Cluster (3 Hubs)</span>
          </div>

          <button
            onClick={onRefreshTelemetry}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
            <span>Refresh Sync</span>
          </button>
        </div>
      </div>

      {/* Network KPI Cards */}
      <KpiMetrics kpi={kpi} />

      {/* AI Command Center Directives */}
      <AiCommandCenter directives={directives} onExecute={onExecuteDirective} />

      {/* Hub Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WarehouseUtilization warehouses={warehouses} />
        </div>

        {/* Quick Activity Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">Quick Stock Auditing</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Launch barcode / QR scanning or use StockVision camera AI to verify pallet physical counts.
            </p>

            <div className="mt-4 space-y-2.5">
              <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-lg text-xs">
                <span className="font-bold text-blue-900 block">Next Scheduled Count</span>
                <span className="text-slate-600">Aisle R03 (Smart Home) • Today, 4:00 PM</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <span className="font-bold text-slate-800 block">Recent Adjustment</span>
                <span className="text-slate-600">-2 units (Damaged in transit, PO-1047)</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2">
            <button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-lg text-xs font-bold transition">
              Perform Count
            </button>
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-xs font-bold transition">
              Vision Scan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
