export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  stock: number;
  minLevel: number;
  price: number;
  cost: number;
  warehouse: string;
  status: 'Healthy' | 'Low Stock' | 'Critical' | 'Out of Stock' | 'Overstock' | 'Dead Stock';
}

export interface AiDirective {
  id: string;
  type: 'STOCKOUT' | 'SURGE' | 'IMBALANCE' | 'DEAD_STOCK';
  title: string;
  item: string;
  sku: string;
  warehouse?: string;
  deficitWarehouse?: string;
  surplusWarehouse?: string;
  burnRate?: string;
  remaining?: number;
  stockoutEta?: string;
  surgeDemand?: number;
  dormantDays?: number;
  trappedCapital?: string;
  savings?: string;
  recommendation: string;
  cost?: string;
  confidence: number;
  isCompleted: boolean;
}

export interface WarehouseTelemetry {
  id: string;
  name: string;
  code: string;
  capacity: number;
  used: number;
  percent: number;
  status: string;
}

export interface KpiOverview {
  totalInventoryValue: number;
  currency: string;
  activeCatalogSkus: number;
  lowStockSkus: number;
  overstockSkus: number;
  deadStockSkus: number;
  healthScore: number;
}
