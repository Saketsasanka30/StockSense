import React, { useState } from 'react';
import { Sparkles, TrendingUp, Calendar, Zap, AlertCircle } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const Forecast: React.FC = () => {
  const [selectedHorizon, setSelectedHorizon] = useState('30d');

  const forecastData = [
    { day: 'Day 1', actual: 24, predicted: 24, upper: 26, lower: 22 },
    { day: 'Day 5', actual: 28, predicted: 27, upper: 31, lower: 23 },
    { day: 'Day 10', actual: 32, predicted: 31, upper: 36, lower: 26 },
    { day: 'Day 15', predicted: 36, upper: 43, lower: 29 },
    { day: 'Day 20', predicted: 42, upper: 51, lower: 33 }, // Tech Fest Spike
    { day: 'Day 25', predicted: 48, upper: 59, lower: 37 },
    { day: 'Day 30', predicted: 35, upper: 45, lower: 25 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">AI Demand Forecasting Engine</h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Holt-Winters Exponential Smoothing combined with neural seasonal decomposition.
          </p>
        </div>

        {/* Horizon selector */}
        <div className="flex items-center gap-1.5 bg-white border border-slate-200 p-1 rounded-lg shadow-sm">
          {['7d', '14d', '30d', '90d'].map((h) => (
            <button
              key={h}
              onClick={() => setSelectedHorizon(h)}
              className={`px-3 py-1 rounded text-xs font-bold transition ${
                selectedHorizon === h ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      {/* Model Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block">Forecast Model</span>
          <span className="text-sm font-bold text-slate-900 mt-1 block">SES + Seasonal Additive</span>
          <span className="text-[11px] text-purple-600 font-medium">94.2% Confidence</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block">Mean Absolute Error (MAE)</span>
          <span className="text-lg font-bold text-slate-900 mt-1 block">1.82 units</span>
          <span className="text-[11px] text-emerald-600 font-medium">Low Variance</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block">Root Mean Square (RMSE)</span>
          <span className="text-lg font-bold text-slate-900 mt-1 block">2.41</span>
          <span className="text-[11px] text-slate-400 font-medium">Optimal convergence</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block">Demand Surge Anomaly</span>
          <span className="text-lg font-bold text-purple-600 mt-1 block">+30% Tech Fest</span>
          <span className="text-[11px] text-slate-500 font-medium">Expected in 14 days</span>
        </div>
      </div>

      {/* Forecast Chart */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Projected Run-Rate & Uncertainty Boundary</h2>
            <p className="text-xs text-slate-500">Braided USB-C Cable (1.5m) • Indiranagar Store A</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <span className="text-slate-600">Historical / Baseline</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
              <span className="text-slate-600">AI Predicted</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-200"></span>
              <span className="text-slate-600">95% Confidence Interval</span>
            </div>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Area type="monotone" dataKey="upper" stroke="none" fill="#f3e8ff" />
              <Area type="monotone" dataKey="predicted" stroke="#9333ea" strokeWidth={2.5} fill="#faf5ff" />
              <Area type="monotone" dataKey="actual" stroke="#2563eb" strokeWidth={2.5} fill="none" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
