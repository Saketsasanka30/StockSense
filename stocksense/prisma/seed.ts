import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding StockSense database with production-grade enterprise data...');

  // 1. Create Business
  const business = await prisma.business.create({
    data: {
      name: 'StockSense Enterprises Pvt Ltd',
      type: 'Warehouse',
      gstin: '29AABCU9603R1ZM',
      currency: 'INR',
    },
  });

  // 2. Create Users
  const passwordHash = await bcrypt.hash('Admin@123', 10);
  const adminUser = await prisma.user.create({
    data: {
      businessId: business.id,
      email: 'saket@stocksense.io',
      fullName: 'Saket Chippe',
      passwordHash: passwordHash,
      role: 'ADMIN',
      isActive: true,
    },
  });

  // 3. Create Warehouses
  const whIndiranagar = await prisma.warehouse.create({
    data: {
      businessId: business.id,
      code: 'BLR-IND-01',
      name: 'Bengaluru Store A (Indiranagar)',
      city: 'Bengaluru',
      state: 'Karnataka',
      address: '100 Feet Rd, HAL 2nd Stage, Indiranagar, Bengaluru, 560038',
      managerName: 'Kavita Rao',
      capacityPallets: 1400,
      usedPallets: 1240, // 88%
    },
  });

  const whPeenya = await prisma.warehouse.create({
    data: {
      businessId: business.id,
      code: 'BLR-CEN-01',
      name: 'Central Logistics C (Peenya)',
      city: 'Bengaluru',
      state: 'Karnataka',
      address: 'Plot 42, 3rd Phase, Peenya Industrial Area, Bengaluru, 560058',
      managerName: 'Ramesh Patel',
      capacityPallets: 20000,
      usedPallets: 18400, // 92%
    },
  });

  const whKoramangala = await prisma.warehouse.create({
    data: {
      businessId: business.id,
      code: 'BLR-KOR-02',
      name: 'Store B (Koramangala)',
      city: 'Bengaluru',
      state: 'Karnataka',
      address: '80 Feet Rd, 4th Block, Koramangala, Bengaluru, 560034',
      managerName: 'Deepak Verma',
      capacityPallets: 1400,
      usedPallets: 890, // 64%
    },
  });

  // 4. Create Categories
  const catElectronics = await prisma.category.create({
    data: { businessId: business.id, name: 'Consumer Electronics' },
  });
  const catOffice = await prisma.category.create({
    data: { businessId: business.id, name: 'Office Supplies' },
  });
  const catSmartHome = await prisma.category.create({
    data: { businessId: business.id, name: 'Smart Home & Security' },
  });
  const catHardware = await prisma.category.create({
    data: { businessId: business.id, name: 'Industrial Hardware' },
  });
  const catPackaging = await prisma.category.create({
    data: { businessId: business.id, name: 'Packaging & Logistics' },
  });

  // 5. Create Suppliers
  const supPaper = await prisma.supplier.create({
    data: {
      businessId: business.id,
      name: 'PaperCorp India Pvt Ltd',
      code: 'SUP-PAP-01',
      email: 'orders@papercorp.in',
      phone: '+91 80 2345 6789',
      address: 'Rajajinagar Industrial Estate, Bengaluru',
      leadTimeDays: 1,
      onTimeRate: 99.2,
      defectRate: 0.1,
    },
  });

  const supApex = await prisma.supplier.create({
    data: {
      businessId: business.id,
      name: 'Apex Connect Ltd',
      code: 'SUP-APX-02',
      email: 'sales@apexconnect.com',
      phone: '+91 80 4123 9876',
      address: 'Electronic City Phase 1, Bengaluru',
      leadTimeDays: 3,
      onTimeRate: 96.8,
      defectRate: 0.4,
    },
  });

  const supVision = await prisma.supplier.create({
    data: {
      businessId: business.id,
      name: 'VisionTech Sensors',
      code: 'SUP-VIS-03',
      email: 'distribution@visiontech.io',
      phone: '+91 80 6789 1234',
      address: 'Whitefield Tech Zone, Bengaluru',
      leadTimeDays: 5,
      onTimeRate: 97.5,
      defectRate: 0.3,
    },
  });

  // 6. Create Key Strategic Products
  const p1 = await prisma.product.create({
    data: {
      businessId: business.id,
      categoryId: catOffice.id,
      sku: 'SKU-0012-A4',
      barcode: '8901234567890',
      name: 'Printer Paper A4 (500 Sheets)',
      description: '75 GSM multipurpose white copy paper for high-speed laser printing',
      unit: 'ream',
      costPrice: 120.0,
      sellingPrice: 195.0,
      reorderPoint: 80,
      safetyStock: 30,
      dailyDemandRate: 18.0,
      leadTimeDays: 2,
    },
  });

  const p2 = await prisma.product.create({
    data: {
      businessId: business.id,
      categoryId: catElectronics.id,
      sku: 'SKU-5541-USB',
      barcode: '8909876543210',
      name: 'Braided USB-C Cable 1.5m',
      description: '100W PD nylon braided high-speed sync cable with zinc alloy casing',
      unit: 'piece',
      costPrice: 185.0,
      sellingPrice: 350.0,
      reorderPoint: 50,
      safetyStock: 25,
      dailyDemandRate: 24.0,
      leadTimeDays: 3,
    },
  });

  const p3 = await prisma.product.create({
    data: {
      businessId: business.id,
      categoryId: catSmartHome.id,
      sku: 'SKU-9921-CAM',
      barcode: '8904567891234',
      name: 'Smart Security Cam 2K Pro',
      description: '360 degree pan-tilt indoor Wi-Fi camera with dual-band and night vision',
      unit: 'unit',
      costPrice: 2800.0,
      sellingPrice: 4200.0,
      reorderPoint: 20,
      safetyStock: 10,
      dailyDemandRate: 4.5,
      leadTimeDays: 5,
      trackSerial: true,
    },
  });

  const p4 = await prisma.product.create({
    data: {
      businessId: business.id,
      categoryId: catElectronics.id,
      sku: 'SKU-3180-MON',
      barcode: '8906543219876',
      name: 'Vintage LED Monitor 21" IPS',
      description: 'FHD 60Hz office monitor with VGA and HDMI inputs',
      unit: 'unit',
      costPrice: 2235.0,
      sellingPrice: 3999.0,
      reorderPoint: 10,
      safetyStock: 5,
      dailyDemandRate: 0.1,
      leadTimeDays: 7,
    },
  });

  // Seed remaining catalog items to exceed 100 products
  console.log('Generating 100+ catalog SKUs...');
  for (let i = 5; i <= 105; i++) {
    const categories = [catElectronics, catOffice, catSmartHome, catHardware, catPackaging];
    const cat = categories[i % categories.length];
    const sku = `SKU-${1000 + i}-${cat.name.substring(0, 3).toUpperCase()}`;
    await prisma.product.create({
      data: {
        businessId: business.id,
        categoryId: cat.id,
        sku: sku,
        name: `${cat.name} Commercial Item #${i}`,
        unit: 'unit',
        costPrice: 50 + (i * 15) % 800,
        sellingPrice: 100 + (i * 25) % 1500,
        reorderPoint: 20 + (i % 30),
        safetyStock: 10,
        dailyDemandRate: 2 + (i % 8),
      },
    });
  }

  // 7. Seed Inventories
  await prisma.inventory.create({
    data: {
      productId: p1.id,
      warehouseId: whIndiranagar.id,
      quantity: 42, // Critical Low
      available: 42,
      reserved: 0,
      status: 'CRITICAL',
    },
  });

  await prisma.inventory.create({
    data: {
      productId: p2.id,
      warehouseId: whIndiranagar.id,
      quantity: 184, // Surge incoming
      available: 184,
      reserved: 0,
      status: 'HEALTHY',
    },
  });

  await prisma.inventory.create({
    data: {
      productId: p3.id,
      warehouseId: whIndiranagar.id,
      quantity: 12, // Deficit
      available: 12,
      reserved: 0,
      status: 'LOW_STOCK',
    },
  });

  await prisma.inventory.create({
    data: {
      productId: p3.id,
      warehouseId: whPeenya.id,
      quantity: 147, // Surplus
      available: 147,
      reserved: 0,
      status: 'OVERSTOCK',
    },
  });

  await prisma.inventory.create({
    data: {
      productId: p4.id,
      warehouseId: whPeenya.id,
      quantity: 34, // Dead stock (93 days)
      available: 34,
      reserved: 0,
      status: 'DEAD_STOCK',
    },
  });

  // 8. Seed Recommendations (AI Command Center)
  await prisma.recommendation.create({
    data: {
      businessId: business.id,
      type: 'STOCKOUT',
      title: 'Critical Stockout Risk (Printer Paper A4)',
      problem: 'Current stock (42 units) at Indiranagar Store A will deplete in 48 hours under average daily demand of 18 units.',
      evidence: 'Daily burn rate: 18 units/day. Lead time from PaperCorp India: 24 hours.',
      impact: 'Estimated ₹28,000 order halt and customer fulfillment disruption if stockout occurs.',
      recommendedAction: 'Place immediate expedited purchase order for 120 units at ₹14,400.',
      confidence: 0.98,
    },
  });

  await prisma.recommendation.create({
    data: {
      businessId: business.id,
      type: 'SURGE',
      title: 'Demand Spike Anticipated (Braided USB-C Cable)',
      problem: 'Local tech festival and seasonal promotion will accelerate consumption by +30% over standard run-rate.',
      evidence: 'Historical 184 units on hand vs 240 units forecasted surge demand.',
      impact: 'Risk of 56 backordered units and lost high-margin accessory revenue.',
      recommendedAction: 'Issue fast restock for 100 units from Apex Connect Ltd.',
      confidence: 0.94,
    },
  });

  await prisma.recommendation.create({
    data: {
      businessId: business.id,
      type: 'IMBALANCE',
      title: 'Inter-Store Inventory Imbalance (Smart Security Cam 2K Pro)',
      problem: 'Store A has 12 units (stockout in 3 days) while Central Logistics C has 147 units (2.8 months inventory).',
      evidence: 'Central C stock buffer exceeds threshold while Store A is in red deficit.',
      impact: 'Executing intra-city transfer saves ₹3,200 emergency factory air-cargo surcharge.',
      recommendedAction: 'Transfer 30 units from Central Logistics C (Peenya) to Store A (Indiranagar).',
      confidence: 0.96,
    },
  });

  await prisma.recommendation.create({
    data: {
      businessId: business.id,
      type: 'DEAD_STOCK',
      title: 'Dead Stock Clearance Opportunity (Vintage LED Monitor 21")',
      problem: '34 units have experienced 0 movement for 93 days at Peenya Central warehouse.',
      evidence: 'Last transaction recorded: June 15. Capital locked: ₹76,000.',
      impact: 'High risk of holding-cost erosion and Q4 tech obsolescence.',
      recommendedAction: 'Apply 25% B2B bundle liquidation promo or initiate distributor RMA credit.',
      confidence: 0.91,
    },
  });

  console.log('StockSense seed completed successfully! 100+ SKUs, 3 Hubs, AI Directives primed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
