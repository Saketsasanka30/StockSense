# StockSense (Major Project)
### Intelligent Inventory Management & Business Operations Platform
> **Tagline:** Know your stock. Predict what's next.

---

## 1. Project Overview & Problem Statement
Traditional inventory software only answers: *"What do I have?"*  
**StockSense** answers:
1. **What is going wrong?** (Critical stockouts, bottleneck warehouses, dead capital)
2. **What is likely to happen?** (Upcoming promotional surges, seasonal run-rate accelerations)
3. **What should I do next?** (Place expedited POs, execute intra-city truck transfers)
4. **Why should I do it?** (Quantified financial savings, emergency air-freight elimination, holding-cost protection)

Developed as a commercial-grade, multi-echelon inventory intelligence platform tailored for Indian logistics networks (e.g. Bengaluru Hub cluster: Indiranagar Store A, Central Logistics C Peenya, Store B Koramangala).

---

## 2. Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Mobile Application** | Kotlin, Jetpack Compose, Material Design 3, Coroutines, Flow |
| **Web Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Recharts, Lucide Icons |
| **Backend API** | Node.js, Express, TypeScript, Zod, JWT Session Auth |
| **Database & ORM** | PostgreSQL 16, Prisma ORM (38 entities, fully relational) |
| **AI & Machine Learning** | Gemini 3.5 AI Copilot, Holt-Winters SES Time-Series, YOLOv8 StockVision |
| **Containerization** | Docker, Multi-stage Builds, Docker Compose |

---

## 3. Database Architecture & ER Model
The database is fully normalized and includes:
- **Core Entities**: `Business`, `User`, `Role`, `Permission`, `AuditLog`
- **Catalog & Storage**: `Category`, `Product`, `ItemVariant`, `CompositeItem`, `Warehouse`, `Bin`, `Inventory`, `InventoryMovement`
- **Traceability**: `Batch` (expiry tracking), `SerialNumber` (warranty tracking)
- **Fulfillment**: `Customer`, `SalesOrder`, `SalesOrderItem`, `Invoice`, `Package`, `Shipment`, `Return`
- **Procurement**: `Supplier`, `PurchaseOrder`, `PurchaseOrderItem`, `PurchaseReceive`
- **Logistics**: `Transfer`, `TransferItem` (intra-city multi-hub balancing)
- **AI Intelligence**: `Forecast`, `ForecastMetric`, `Recommendation`, `Alert`, `Notification`

---

## 4. Key Modules Implemented

1. **AI Inventory Command Center**:
   - 4 Live Directives:
     - **Critical Stockout Risk** (*Printer Paper A4*): 42 units left, burn rate 18/day, <48h stockout, PO trigger with PaperCorp.
     - **Demand Spike Anticipated** (*Braided USB-C Cable*): +30% Tech Fest promotion surge, buffer restock of 100 units.
     - **Inter-Store Imbalance** (*Smart Security Cam 2K Pro*): Central Logistics C surplus (147 units) vs Store A deficit (12 units); 30-unit transfer saves ₹3,200 air-cargo premium.
     - **Dead Stock Liquidation** (*Vintage LED Monitor 21"*): 93 days dormant, ₹76,000 trapped capital, 25% B2B discount recommendation.
2. **AI StockVision™ Shelf Scanner**:
   - Computer-vision camera viewfinder with barcode laser alignment.
   - Physical count estimation and real-time database variance reconciliation.
3. **Multi-Echelon Demand Forecasting**:
   - Single Exponential Smoothing (SES) with residual standard error calculation.
   - 95% Confidence interval upper/lower bounds across 7, 14, 30, and 90-day horizons.
4. **Interactive AI Chatbot (Gemini 3.5)**:
   - Voice and text conversation thread with supply chain reasoning.
   - Instant 1-tap action executions directly from AI responses.

---

## 5. Demo Credentials

| Role | Email | Password | Access Scope |
| :--- | :--- | :--- | :--- |
| **Warehouse Lead / Admin** | `saket@stocksense.io` | `Admin@123` | Full Operations & AI Directives |
| **Floor Supervisor** | `kavita@stocksense.io` | `Staff@123` | Stock Auditing & Picklists |

---

## 6. Local Setup Instructions

### Web & Backend Application:
```bash
cd stocksense
npm install
npm run dev        # Starts Vite dev server on http://localhost:5173
npm run server     # Starts Express API on http://localhost:4000
```

### Database Migration & Seed:
```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed    # Populates 100+ items, 3 hubs, 10 suppliers, active directives
```

### Docker Deployment:
```bash
docker-compose up --build
```
The application will be live at `http://localhost:4000`.

---

## 7. Known Limitations & Future Scope
- **Current Limitation**: StockVision uses simulated inference in the web frontend; production deployments connect to a FastAPI backend hosting a GPU-accelerated YOLOv8 model.
- **Future Scope**: Direct ERP integration connectors with SAP S/4HANA and Tally Prime for automated e-Way bill and GST reconciliation.
