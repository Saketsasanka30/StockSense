import React from 'react';
import { Layers, Plus } from 'lucide-react';

export const Purchases: React.FC = () => {
  const purchaseOrders = [
    { id: 'PO-1049', supplier: 'PaperCorp India Pvt Ltd', items: 'Printer Paper A4 (120 units)', amount: '₹14,400', status: 'Dispatched', expected: 'Tomorrow 10:00 AM' },
    { id: 'PO-1048', supplier: 'Apex Connect Ltd', items: 'Braided USB-C Cable (100 units)', amount: '₹18,500', status: 'Confirmed', expected: 'In 3 Days' },
    { id: 'PO-1047', supplier: 'VisionTech Sensors', items: 'Smart Security Cam 2K Pro (50 units)', amount: '₹1,40,000', status: 'Received', expected: 'Delivered Sep 14' },
    { id: 'PO-1046', supplier: 'Omni Supplies', items: 'Thermal Receipt Rolls (200x)', amount: '₹9,800', status: 'Received', expected: 'Delivered Sep 12' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Procurement & Purchase Orders</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Vendor lead times, replenishment requisitions, and partial receiving workflows.
          </p>
        </div>

        <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm transition">
          <Plus className="w-4 h-4" />
          <span>Create Purchase Order</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">PO #</th>
                <th className="py-3 px-4">Supplier</th>
                <th className="py-3 px-4">Requisition Items</th>
                <th className="py-3 px-4">Expected Delivery</th>
                <th className="py-3 px-4 text-right">Cost Total</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
              {purchaseOrders.map((po) => (
                <tr key={po.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-4 font-bold text-blue-600">{po.id}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{po.supplier}</td>
                  <td className="py-3 px-4 text-slate-600">{po.items}</td>
                  <td className="py-3 px-4 text-slate-500">{po.expected}</td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900">{po.amount}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        po.status === 'Received' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {po.status}
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
