import React from 'react';
import { AlertTriangle, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const Alerts: React.FC = () => {
  const alerts = [
    { id: 'a1', priority: 'CRITICAL', title: 'Imminent Stockout (<48h)', message: 'Printer Paper A4 will breach safety threshold in 48 hours at Indiranagar Store A.', time: '12m ago' },
    { id: 'a2', priority: 'WARNING', title: 'Peenya Hub Capacity at 92%', message: 'Central Logistics C capacity is nearing threshold. Route incoming non-critical shipments to Koramangala Store B.', time: '1h ago' },
    { id: 'a3', priority: 'INFO', title: 'Batch Expiring in 14 Days', message: 'Batch BATCH-2026-99A (Toner Cartridges) has 14 units remaining before shelf-life expiry.', time: '3h ago' },
    { id: 'a4', priority: 'SUCCESS', title: 'Intra-City Transfer Received', message: 'Transfer TR-3940 successfully received and signed off by Koramangala floor supervisor.', time: 'Yesterday' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">System Alerts & Operational Audits</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Real-time incident detection, expiry monitoring, and supply chain telemetry logs.
        </p>
      </div>

      <div className="space-y-3">
        {alerts.map((al) => (
          <div
            key={al.id}
            className={`p-4 rounded-xl border bg-white shadow-sm flex items-start justify-between ${
              al.priority === 'CRITICAL'
                ? 'border-red-200'
                : al.priority === 'WARNING'
                ? 'border-amber-200'
                : al.priority === 'SUCCESS'
                ? 'border-emerald-200'
                : 'border-slate-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {al.priority === 'CRITICAL' && <AlertTriangle className="w-5 h-5 text-red-600" />}
                {al.priority === 'WARNING' && <Clock className="w-5 h-5 text-amber-600" />}
                {al.priority === 'SUCCESS' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                {al.priority === 'INFO' && <ShieldCheck className="w-5 h-5 text-blue-600" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">{al.title}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      al.priority === 'CRITICAL'
                        ? 'bg-red-100 text-red-700'
                        : al.priority === 'WARNING'
                        ? 'bg-amber-100 text-amber-700'
                        : al.priority === 'SUCCESS'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {al.priority}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{al.message}</p>
              </div>
            </div>

            <span className="text-[11px] text-slate-400 font-medium shrink-0 ml-4">{al.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
