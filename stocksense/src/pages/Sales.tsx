import React from 'react';
import { ShoppingCart, Plus, ArrowUpRight } from 'lucide-react';

export const Sales: React.FC = () => {
  const salesOrders = [
    { id: 'SO-8491', customer: 'TechHub Retailers', items: 'Braided USB-C Cable (40x)', amount: '₹14,000', status: 'Reserved', warehouse: 'Indiranagar Store A' },
    { id: 'SO-8490', customer: 'Nexus Enterprise', items: 'Printer Paper A4 (10x), Toner (2x)', amount: '₹8,600', status: 'Shipped', warehouse: 'Whitefield Hub' },
    { id: 'SO-8489', customer: 'Apex Infotech', items: 'Smart Security Cam 2K Pro (5x)', amount: '₹21,000', status: 'Delivered', warehouse: 'Koramangala Store B' },
    { id: 'SO-8488', customer: 'Urban Living Co.', items: 'Desk Organizers (30x)', amount: '₹12,500', status: 'Confirmed', warehouse: 'Central Logistics C' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Sales Orders & Fulfillment</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Full order lifecycle tracking: Draft → Confirmed → Reserved → Picked → Shipped → Delivered.
          </p>
        </div>

        <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm transition">
          <Plus className="w-4 h-4" />
          <span>New Sales Order</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Order #</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Items Summary</th>
                <th className="py-3 px-4">Warehouse</th>
                <th className="py-3 px-4 text-right">Total Amount</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
              {salesOrders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-4 font-bold text-blue-600">{o.id}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{o.customer}</td>
                  <td className="py-3 px-4 text-slate-600">{o.items}</td>
                  <td className="py-3 px-4 text-slate-500">{o.warehouse}</td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900">{o.amount}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        o.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-700'
                          : o.status === 'Shipped'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
