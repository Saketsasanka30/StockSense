import React from 'react';
import { Building2, ArrowUpRight } from 'lucide-react';
import { WarehouseTelemetry } from '../types/inventory';

interface WarehouseUtilizationProps {
  warehouses: WarehouseTelemetry[];
}

export const WarehouseUtilization: React.FC<WarehouseUtilizationProps> = ({ warehouses }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">Hub Telemetry & Utilization</h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Real-time pallet capacity and regional distribution load.</p>
        </div>
        <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
          <span>Manage Hubs</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-4">
        {warehouses.map((wh) => (
          <div key={wh.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200/70">
            <div className="flex items-center justify-between mb-1.5">
              <div>
                <span className="text-sm font-bold text-slate-900">{wh.name}</span>
                <span className="text-xs text-slate-400 font-mono ml-2">{wh.code}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800">{wh.percent}%</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    wh.percent >= 90
                      ? 'bg-red-100 text-red-700'
                      : wh.percent >= 80
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {wh.status}
                </span>
              </div>
            </div>

            {/* Capacity Progress bar */}
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  wh.percent >= 90 ? 'bg-red-500' : wh.percent >= 80 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${wh.percent}%` }}
              ></div>
            </div>

            <div className="flex justify-between text-[11px] text-slate-500 mt-1.5">
              <span>{wh.used.toLocaleString()} pallets occupied</span>
              <span>{wh.capacity.toLocaleString()} total capacity</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
