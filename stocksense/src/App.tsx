import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Inventory } from './pages/Inventory';
import { Sales } from './pages/Sales';
import { Purchases } from './pages/Purchases';
import { Transfers } from './pages/Transfers';
import { Forecast } from './pages/Forecast';
import { StockVision } from './pages/StockVision';
import { Alerts } from './pages/Alerts';
import { Product, AiDirective, WarehouseTelemetry, KpiOverview } from './types/inventory';
import { X, Check } from 'lucide-react';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [currentHub, setCurrentHub] = useState('Bengaluru Hub');
  const [showAddStockModal, setShowAddStockModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [kpi, setKpi] = useState<KpiOverview>({
    totalInventoryValue: 4284500,
    currency: 'INR',
    activeCatalogSkus: 2481,
    lowStockSkus: 38,
    overstockSkus: 21,
    deadStockSkus: 63,
    healthScore: 86,
  });

  const [warehouses, setWarehouses] = useState<WarehouseTelemetry[]>([
    { id: 'wh-1', name: 'Bengaluru Store A (Indiranagar)', code: 'BLR-IND-01', capacity: 1400, used: 1240, percent: 88, status: 'Near Cap' },
    { id: 'wh-2', name: 'Central Logistics C (Peenya)', code: 'BLR-CEN-01', capacity: 20000, used: 18400, percent: 92, status: 'High' },
    { id: 'wh-3', name: 'Store B (Koramangala)', code: 'BLR-KOR-02', capacity: 1400, used: 890, percent: 64, status: 'Optimal' },
  ]);

  const [directives, setDirectives] = useState<AiDirective[]>([
    {
      id: 'crit_stockout_paper',
      type: 'STOCKOUT',
      title: 'Critical Stockout Risk',
      item: 'Printer Paper A4 (500 Sheets)',
      sku: 'SKU-0012-A4',
      warehouse: 'Indiranagar Store A',
      burnRate: '18 units/day',
      remaining: 42,
      stockoutEta: '<48h',
      recommendation: 'Reorder 120 units from PaperCorp India (24h lead time). Prevents order fulfillment freeze.',
      cost: '₹14,400',
      confidence: 0.98,
      isCompleted: false,
    },
    {
      id: 'spike_usbc_cable',
      type: 'SURGE',
      title: 'Demand Spike Anticipated',
      item: 'Braided USB-C Cable 1.5m',
      sku: 'SKU-5541-USB',
      warehouse: 'Indiranagar Store A',
      burnRate: '24 units/day',
      remaining: 184,
      surgeDemand: 240,
      recommendation: 'Upcoming local Tech Fest surge. Fast restock 100 units from Apex Connect Ltd.',
      confidence: 0.94,
      isCompleted: false,
    },
    {
      id: 'imbalance_cam_pro',
      type: 'IMBALANCE',
      title: 'Inter-Store Inventory Imbalance',
      item: 'Smart Security Cam 2K Pro',
      sku: 'SKU-9921-CAM',
      deficitWarehouse: 'Store A (Indiranagar) - 12 units',
      surplusWarehouse: 'Central Logistics C - 147 units',
      savings: '₹3,200',
      recommendation: 'Shift 30 units from Central Hub C to Store A. Eliminates factory air-cargo surcharge.',
      confidence: 0.96,
      isCompleted: false,
    },
    {
      id: 'dead_monitor',
      type: 'DEAD_STOCK',
      title: 'Dead Stock Liquidation Opportunity',
      item: 'Vintage LED Monitor 21"',
      sku: 'SKU-3180-MON',
      warehouse: 'Central Logistics C',
      dormantDays: 93,
      remaining: 34,
      trappedCapital: '₹76,000',
      recommendation: '25% B2B bundle discount on wholesale portal, or submit distributor RMA credit.',
      confidence: 0.91,
      isCompleted: false,
    },
  ]);

  const [products, setProducts] = useState<Product[]>([
    { id: 'p1', sku: 'SKU-0012-A4', name: 'Printer Paper A4 (500 Sheets)', category: 'Office Supplies', stock: 42, minLevel: 80, price: 195, cost: 120, warehouse: 'Indiranagar Store A', status: 'Critical' },
    { id: 'p2', sku: 'SKU-5541-USB', name: 'Braided USB-C Cable 1.5m', category: 'Consumer Electronics', stock: 184, minLevel: 50, price: 350, cost: 185, warehouse: 'Indiranagar Store A', status: 'Healthy' },
    { id: 'p3', sku: 'SKU-9921-CAM', name: 'Smart Security Cam 2K Pro', category: 'Smart Home', stock: 12, minLevel: 20, price: 4200, cost: 2800, warehouse: 'Indiranagar Store A', status: 'Low Stock' },
    { id: 'p4', sku: 'SKU-3180-MON', name: 'Vintage LED Monitor 21"', category: 'Consumer Electronics', stock: 34, minLevel: 10, price: 3999, cost: 2235, warehouse: 'Central Logistics C', status: 'Dead Stock' },
    { id: 'p5', sku: 'SKU-1082-TNR', name: 'High-Yield Black Toner 85A', category: 'Office Supplies', stock: 68, minLevel: 30, price: 1450, cost: 890, warehouse: 'Store B (Koramangala)', status: 'Healthy' },
    { id: 'p6', sku: 'SKU-7731-MOU', name: 'Ergonomic Wireless Mouse', category: 'Consumer Electronics', stock: 142, minLevel: 40, price: 899, cost: 480, warehouse: 'Indiranagar Store A', status: 'Healthy' },
  ]);

  // Add stock state form
  const [newSku, setNewSku] = useState('');
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('Consumer Electronics');
  const [newStock, setNewStock] = useState('50');
  const [newPrice, setNewPrice] = useState('499');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExecuteDirective = (id: string) => {
    setDirectives((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isCompleted: true } : d))
    );
    showToast('Directive executed: Operation dispatched to logistics pipeline.');
  };

  const handleAddStockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newItem: Product = {
      id: `p-${Date.now()}`,
      sku: newSku.trim() || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newName.trim(),
      category: newCategory,
      stock: parseInt(newStock) || 0,
      minLevel: 25,
      price: parseFloat(newPrice) || 0,
      cost: (parseFloat(newPrice) || 0) * 0.6,
      warehouse: 'Indiranagar Store A',
      status: 'Healthy',
    };

    setProducts([newItem, ...products]);
    setShowAddStockModal(false);
    setNewName('');
    setNewSku('');
    showToast(`Added ${newItem.name} (${newItem.stock} units) to catalog.`);
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <Sidebar currentTab={currentTab} onSelectTab={(tab) => setCurrentTab(tab)} />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          currentHub={currentHub}
          onHubChange={(hub) => setCurrentHub(hub)}
          onQuickAdd={() => setShowAddStockModal(true)}
        />

        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
          {currentTab === 'dashboard' && (
            <Dashboard
              kpi={kpi}
              directives={directives}
              warehouses={warehouses}
              onExecuteDirective={handleExecuteDirective}
              onRefreshTelemetry={() => showToast('Regional telemetry nodes synchronized (0.4s latency).')}
            />
          )}

          {currentTab === 'inventory' && (
            <Inventory products={products} onAddProduct={() => setShowAddStockModal(true)} />
          )}

          {currentTab === 'sales' && <Sales />}
          {currentTab === 'purchases' && <Purchases />}
          {currentTab === 'transfers' && <Transfers />}
          {currentTab === 'forecast' && <Forecast />}
          {currentTab === 'stockvision' && <StockVision />}
          {currentTab === 'alerts' && <Alerts />}
          {currentTab === 'warehouses' && (
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h1 className="text-xl font-bold mb-4">Multi-Hub Regional Warehouses</h1>
              <p className="text-xs text-slate-500 mb-6">Manage pallet capacity, rack layout, and staff assignments.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {warehouses.map((w) => (
                  <div key={w.id} className="p-4 border border-slate-200 rounded-lg">
                    <div className="font-bold text-slate-900">{w.name}</div>
                    <div className="text-xs font-mono text-slate-400 mt-0.5">{w.code}</div>
                    <div className="mt-3 text-sm font-semibold">{w.used} / {w.capacity} pallets</div>
                    <div className="text-xs text-slate-500 mt-1">Utilization: {w.percent}% ({w.status})</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {currentTab === 'settings' && (
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h1 className="text-xl font-bold mb-2">Platform Settings & Integrations</h1>
              <p className="text-xs text-slate-500 mb-6">Configure GSTIN, currency, webhooks, and Gemini AI thresholds.</p>
              <div className="space-y-4 max-w-md text-sm">
                <div>
                  <label className="block font-semibold text-slate-700 text-xs mb-1">Company GSTIN</label>
                  <input type="text" readOnly value="29AABCU9603R1ZM" className="w-full p-2 border rounded bg-slate-50 font-mono text-xs" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 text-xs mb-1">Base Currency</label>
                  <input type="text" readOnly value="INR (₹)" className="w-full p-2 border rounded bg-slate-50 text-xs" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 text-xs mb-1">AI Recommendation Confidence Threshold</label>
                  <input type="text" readOnly value="90% minimum confidence" className="w-full p-2 border rounded bg-slate-50 text-xs" />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Stock Modal */}
      {showAddStockModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">Add New Inventory Item</h2>
              <button onClick={() => setShowAddStockModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStockSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wireless Ergonomic Keyboard"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">SKU (Optional)</label>
                  <input
                    type="text"
                    placeholder="Auto-generated"
                    value={newSku}
                    onChange={(e) => setNewSku(e.target.value)}
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  >
                    <option value="Consumer Electronics">Consumer Electronics</option>
                    <option value="Office Supplies">Office Supplies</option>
                    <option value="Smart Home">Smart Home</option>
                    <option value="Industrial Hardware">Industrial Hardware</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Initial Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    min="1"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-slate-100 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddStockModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-sm"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-bottom-3 z-50">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default App;
