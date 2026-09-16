import React, { useState } from 'react';
import { Search, Filter, Plus, ArrowUpDown, Download, Tag } from 'lucide-react';
import { Product } from '../types/inventory';

interface InventoryProps {
  products: Product[];
  onAddProduct: () => void;
}

export const Inventory: React.FC<InventoryProps> = ({ products, onAddProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Office Supplies', 'Consumer Electronics', 'Smart Home'];

  const filtered = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Inventory Catalog</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor real-time on-hand stock, reorder thresholds, and bin locations across all fulfillment hubs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-3.5 py-2 rounded-lg text-xs font-semibold shadow-sm transition">
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={onAddProduct}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Item</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by SKU, item title..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4">Item & SKU</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Warehouse Hub</th>
                <th className="py-3.5 px-4 text-right">Available Stock</th>
                <th className="py-3.5 px-4 text-right">Reorder Point</th>
                <th className="py-3.5 px-4 text-right">Selling Price</th>
                <th className="py-3.5 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{item.name}</div>
                    <div className="text-[11px] font-mono text-slate-400">{item.sku}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{item.warehouse}</td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900">
                    {item.stock.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-500">{item.minLevel}</td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900">₹{item.price}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === 'Critical'
                          ? 'bg-red-100 text-red-700'
                          : item.status === 'Low Stock'
                          ? 'bg-amber-100 text-amber-700'
                          : item.status === 'Dead Stock'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {item.status}
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
