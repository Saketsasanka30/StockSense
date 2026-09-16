import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// In-Memory Fast State Engine initialized with realistic Indian logistics data
let telemetry = {
  totalInventoryValue: 4284500, // ₹42.8 L
  currency: 'INR',
  activeCatalogSkus: 2481,
  lowStockSkus: 38,
  outOfStockSkus: 4,
  overstockSkus: 21,
  deadStockSkus: 63,
  healthScore: 86,
  warehouses: [
    { id: 'wh-1', name: 'Bengaluru Store A (Indiranagar)', code: 'BLR-IND-01', capacity: 1400, used: 1240, percent: 88, status: 'Near Cap' },
    { id: 'wh-2', name: 'Central Logistics C (Peenya)', code: 'BLR-CEN-01', capacity: 20000, used: 18400, percent: 92, status: 'High' },
    { id: 'wh-3', name: 'Store B (Koramangala)', code: 'BLR-KOR-02', capacity: 1400, used: 890, percent: 64, status: 'Optimal' },
  ],
};

let directives = [
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
];

let products = [
  { id: 'p1', sku: 'SKU-0012-A4', name: 'Printer Paper A4 (500 Sheets)', category: 'Office Supplies', stock: 42, minLevel: 80, price: 195, cost: 120, warehouse: 'Indiranagar Store A', status: 'Critical' },
  { id: 'p2', sku: 'SKU-5541-USB', name: 'Braided USB-C Cable 1.5m', category: 'Consumer Electronics', stock: 184, minLevel: 50, price: 350, cost: 185, warehouse: 'Indiranagar Store A', status: 'Healthy' },
  { id: 'p3', sku: 'SKU-9921-CAM', name: 'Smart Security Cam 2K Pro', category: 'Smart Home', stock: 12, minLevel: 20, price: 4200, cost: 2800, warehouse: 'Indiranagar Store A', status: 'Low Stock' },
  { id: 'p4', sku: 'SKU-3180-MON', name: 'Vintage LED Monitor 21"', category: 'Consumer Electronics', stock: 34, minLevel: 10, price: 3999, cost: 2235, warehouse: 'Central Logistics C', status: 'Dead Stock' },
  { id: 'p5', sku: 'SKU-1082-TNR', name: 'High-Yield Black Toner 85A', category: 'Office Supplies', stock: 68, minLevel: 30, price: 1450, cost: 890, warehouse: 'Store B (Koramangala)', status: 'Healthy' },
  { id: 'p6', sku: 'SKU-7731-MOU', name: 'Ergonomic Wireless Mouse', category: 'Consumer Electronics', stock: 142, minLevel: 40, price: 899, cost: 480, warehouse: 'Indiranagar Store A', status: 'Healthy' },
];

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy', version: '2.4.0', service: 'StockSense Enterprise API' });
});

// Authentication
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (email && password) {
    res.json({
      token: 'jwt-stocksense-session-demo-token-saket',
      user: {
        id: 'usr-saket-01',
        name: 'Saket Chippe',
        email: email,
        role: 'ADMIN',
        organization: 'StockSense Bengaluru Ops',
      },
    });
  } else {
    res.status(400).json({ error: 'Email and password required' });
  }
});

// Telemetry & KPI Overview
app.get('/api/telemetry', (req: Request, res: Response) => {
  res.json(telemetry);
});

// AI Directives & Recommendations
app.get('/api/recommendations', (req: Request, res: Response) => {
  res.json(directives);
});

app.post('/api/recommendations/:id/complete', (req: Request, res: Response) => {
  const { id } = req.params;
  directives = directives.map((d) => (d.id === id ? { ...d, isCompleted: true } : d));
  res.json({ success: true, message: `Directive ${id} completed` });
});

// Products & Inventory Catalog
app.get('/api/products', (req: Request, res: Response) => {
  const { category, search, warehouse } = req.query;
  let filtered = [...products];

  if (category && category !== 'All') {
    filtered = filtered.filter((p) => p.category === category);
  }
  if (search) {
    const q = String(search).toLowerCase();
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
  }
  if (warehouse && warehouse !== 'All Hubs') {
    filtered = filtered.filter((p) => p.warehouse.includes(String(warehouse)));
  }

  res.json({ total: filtered.length, items: filtered });
});

app.post('/api/products', (req: Request, res: Response) => {
  const newProduct = {
    id: `p-${Date.now()}`,
    sku: req.body.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
    name: req.body.name,
    category: req.body.category || 'General',
    stock: Number(req.body.stock) || 0,
    minLevel: Number(req.body.minLevel) || 20,
    price: Number(req.body.price) || 100,
    cost: Number(req.body.cost) || 60,
    warehouse: req.body.warehouse || 'Indiranagar Store A',
    status: 'Healthy',
  };
  products.unshift(newProduct);
  res.status(201).json(newProduct);
});

// AI StockVision Detection Endpoint
app.post('/api/stockvision', (req: Request, res: Response) => {
  // Simulates computer-vision item recognition and shelf counts
  res.json({
    detectedItems: [
      { sku: 'SKU-0012-A4', name: 'Printer Paper A4', shelfCount: 42, systemCount: 45, confidence: 0.96, discrepancy: -3 },
      { sku: 'SKU-5541-USB', name: 'Braided USB-C Cable', shelfCount: 184, systemCount: 184, confidence: 0.98, discrepancy: 0 },
    ],
    timestamp: new Date().toISOString(),
    status: 'VERIFICATION_REQUIRED',
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`StockSense Enterprise Server running on port ${PORT}`);
});
