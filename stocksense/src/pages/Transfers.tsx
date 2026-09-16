import React from 'react';
import { Truck, Plus, CheckCircle, ArrowRight } from 'lucide-react';

export const Transfers: React.FC = () => {
  const transfers = [
    { id: 'TR-3941', item: 'Smart Security Cam 2K Pro', units: 30, from: 'Central Logistics C (Peenya)', to: 'Bengaluru Store A (Indiranagar)', savings: '₹3,200', status: 'In Transit (4h)', eta: 'Today, 3:30 PM' },
    { id: 'TR-3940', item: 'High-Yield Black Toner 85A', units: 25, from: 'Store B (Koramangala)', to: 'Central Logistics C', savings: '₹1,450', status: 'Completed', eta: 'Yesterday' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Inter-Hub Stock Transfers</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Optimize multi-echelon stock balancing, reduce inter-city logistics costs, and eliminate air-cargo surcharges.
          </p>
        </div>

        <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm transition">
          <Plus className="w-4 h-4" />
          <span>New Dispatch</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {transfers.map((tr) => (
          <div key={tr.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-blue-600">{tr.id}</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                Saved {tr.savings}
              </span>
            </div>

            <div className="mt-2 font-bold text-slate-900 text-sm">{tr.item}</div>
            <div className="text-xs text-slate-500 font-semibold">{tr.units} units</div>

            <div className="mt-4 p-3 bg-slate-50 rounded-lg flex items-center justify-between text-xs font-medium text-slate-700">
              <div className="max-w-[42%]">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Origin</span>
                <span className="truncate block font-semibold">{tr.from}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 mx-2" />
              <div className="max-w-[42%] text-right">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Destination</span>
                <span className="truncate block font-semibold">{tr.to}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
              <span>ETA: {tr.eta}</span>
              <span className="font-bold text-blue-700">{tr.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
