import React from 'react';
import { Sparkles, AlertTriangle, TrendingUp, ArrowRightLeft, Clock, CheckCircle } from 'lucide-react';
import { AiDirective } from '../types/inventory';

interface AiCommandCenterProps {
  directives: AiDirective[];
  onExecute: (id: string) => void;
}

export const AiCommandCenter: React.FC<AiCommandCenterProps> = ({ directives, onExecute }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-bold text-slate-900">AI Inventory Command Center</h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Active multi-echelon directives prioritized by financial impact and stockout risk.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
            {directives.filter((d) => !d.isCompleted).length} Actionable Directives
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {directives.map((dir) => {
          const isDone = dir.isCompleted;
          return (
            <div
              key={dir.id}
              className={`p-4 rounded-xl border transition ${
                isDone
                  ? 'bg-slate-50 border-slate-200 opacity-60'
                  : dir.type === 'STOCKOUT'
                  ? 'bg-red-50/40 border-red-200 hover:border-red-300'
                  : dir.type === 'SURGE'
                  ? 'bg-purple-50/40 border-purple-200 hover:border-purple-300'
                  : dir.type === 'IMBALANCE'
                  ? 'bg-blue-50/40 border-blue-200 hover:border-blue-300'
                  : 'bg-amber-50/40 border-amber-200 hover:border-amber-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {dir.type === 'STOCKOUT' && <AlertTriangle className="w-4 h-4 text-red-600" />}
                  {dir.type === 'SURGE' && <TrendingUp className="w-4 h-4 text-purple-600" />}
                  {dir.type === 'IMBALANCE' && <ArrowRightLeft className="w-4 h-4 text-blue-600" />}
                  {dir.type === 'DEAD_STOCK' && <Clock className="w-4 h-4 text-amber-600" />}
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                      dir.type === 'STOCKOUT'
                        ? 'text-red-700'
                        : dir.type === 'SURGE'
                        ? 'text-purple-700'
                        : dir.type === 'IMBALANCE'
                        ? 'text-blue-700'
                        : 'text-amber-700'
                    }`}
                  >
                    {dir.title}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">
                  Confidence: {Math.round(dir.confidence * 100)}%
                </span>
              </div>

              <div className="mt-2 font-bold text-slate-900 text-sm">{dir.item}</div>
              <div className="text-xs text-slate-500 font-mono mt-0.5">{dir.sku}</div>

              <p className="mt-2 text-xs text-slate-700 leading-relaxed">{dir.recommendation}</p>

              <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                <div>
                  {dir.cost && <span className="text-xs font-bold text-slate-900">{dir.cost}</span>}
                  {dir.savings && (
                    <span className="text-xs font-bold text-emerald-600">Saves {dir.savings}</span>
                  )}
                  {dir.trappedCapital && (
                    <span className="text-xs font-semibold text-slate-600">Trapped: {dir.trappedCapital}</span>
                  )}
                </div>

                {isDone ? (
                  <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Executed</span>
                  </div>
                ) : (
                  <button
                    onClick={() => onExecute(dir.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm transition ${
                      dir.type === 'STOCKOUT'
                        ? 'bg-red-600 hover:bg-red-700'
                        : dir.type === 'SURGE'
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : dir.type === 'IMBALANCE'
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-amber-600 hover:bg-amber-700'
                    }`}
                  >
                    {dir.type === 'STOCKOUT' && 'Review Order'}
                    {dir.type === 'SURGE' && 'Quick Restock'}
                    {dir.type === 'IMBALANCE' && 'Create Transfer'}
                    {dir.type === 'DEAD_STOCK' && 'Liquidation Plan'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
