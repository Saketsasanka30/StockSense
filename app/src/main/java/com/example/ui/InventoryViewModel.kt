package com.example.ui

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.model.AiDirective
import com.example.model.CatalogItem
import com.example.model.CriticalStockoutStats
import com.example.model.DeadStockStats
import com.example.model.DirectiveType
import com.example.model.HubImbalanceStats
import com.example.model.NotificationAlert
import com.example.model.SpikeForecastStats
import com.example.model.StockMetric
import com.example.model.StockTransfer
import com.example.model.WarehouseUtilization
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

data class InventoryUiState(
    val selectedHub: String = "Bengaluru Hub",
    val selectedHubFilter: String = "All Locations",
    val isRefreshing: Boolean = false,
    val lastSyncTime: String = "Live Sync Active",
    val kpiMetrics: List<StockMetric> = defaultMetrics,
    val directives: List<AiDirective> = defaultDirectives,
    val warehouses: List<WarehouseUtilization> = defaultWarehouses,
    val catalog: List<CatalogItem> = defaultCatalog,
    val transfers: List<StockTransfer> = defaultTransfers,
    val notifications: List<NotificationAlert> = defaultNotifications,
    val activeTab: NavigationTab = NavigationTab.HOME,
    val isDrawerOpen: Boolean = false,
    val isHubSelectorOpen: Boolean = false,
    val isNotificationSheetOpen: Boolean = false,
    val activeDialog: ActiveDialog? = null,
    val userSearchQuery: String = "",
    val catalogFilter: CatalogFilter = CatalogFilter.ALL,
    val snackbarMessage: String? = null
)

enum class NavigationTab {
    HOME,
    INVENTORY,
    FORECAST,
    TRANSFERS,
    ALERTS,
    AI_CHAT,
    SALES_PURCHASES
}

enum class CatalogFilter {
    ALL,
    LOW_STOCK,
    OVERSTOCK,
    DEAD_STOCK
}

sealed interface ActiveDialog {
    data class ReviewOrder(val directive: AiDirective) : ActiveDialog
    data class QuickRestock(val directive: AiDirective) : ActiveDialog
    data class CreateTransfer(val directive: AiDirective) : ActiveDialog
    data class LiquidationPlan(val directive: AiDirective) : ActiveDialog
    object VisionScan : ActiveDialog
    object AddStock : ActiveDialog
    object ManageHubs : ActiveDialog
    object Search : ActiveDialog
}

class InventoryViewModel : ViewModel() {
    private val _uiState = MutableStateFlow(InventoryUiState())
    val uiState: StateFlow<InventoryUiState> = _uiState.asStateFlow()

    fun selectTab(tab: NavigationTab) {
        _uiState.update { it.copy(activeTab = tab) }
    }

    fun setDrawerOpen(open: Boolean) {
        _uiState.update { it.copy(isDrawerOpen = open) }
    }

    fun setHubSelectorOpen(open: Boolean) {
        _uiState.update { it.copy(isHubSelectorOpen = open) }
    }

    fun setNotificationSheetOpen(open: Boolean) {
        _uiState.update { it.copy(isNotificationSheetOpen = open) }
    }

    fun openDialog(dialog: ActiveDialog?) {
        _uiState.update { it.copy(activeDialog = dialog) }
    }

    fun dismissDialog() {
        _uiState.update { it.copy(activeDialog = null) }
    }

    fun setSearchQuery(query: String) {
        _uiState.update { it.copy(userSearchQuery = query) }
    }

    fun setCatalogFilter(filter: CatalogFilter) {
        _uiState.update { it.copy(catalogFilter = filter) }
    }

    fun selectHub(hubName: String, filterLabel: String) {
        _uiState.update {
            it.copy(
                selectedHub = hubName,
                selectedHubFilter = filterLabel,
                isHubSelectorOpen = false,
                snackbarMessage = "Switched scope to $hubName"
            )
        }
    }

    fun refreshTelemetry() {
        viewModelScope.launch {
            _uiState.update { it.copy(isRefreshing = true) }
            delay(900)
            _uiState.update {
                it.copy(
                    isRefreshing = false,
                    lastSyncTime = "Live Sync Active (Just now)",
                    snackbarMessage = "Telemetry and AI directives synced with 4 fulfillment nodes"
                )
            }
        }
    }

    fun dismissDirective(id: String) {
        _uiState.update { state ->
            val updated = state.directives.map {
                if (it.id == id) it.copy(isDismissed = true) else it
            }
            state.copy(
                directives = updated,
                snackbarMessage = "Directive dismissed"
            )
        }
    }

    fun completeOrder(directiveId: String, units: Int, supplier: String, cost: String) {
        _uiState.update { state ->
            val updatedDirectives = state.directives.map {
                if (it.id == directiveId) it.copy(isCompleted = true) else it
            }
            val newTransfer = StockTransfer(
                id = "TR-${System.currentTimeMillis() % 10000}",
                itemName = "Printer Paper A4",
                fromWarehouse = supplier,
                toWarehouse = "Store A (Indiranagar)",
                units = units,
                savings = "Expedited 24h",
                status = "Dispatched",
                eta = "Tomorrow, 10:00 AM"
            )
            state.copy(
                directives = updatedDirectives,
                transfers = listOf(newTransfer) + state.transfers,
                activeDialog = null,
                snackbarMessage = "Purchase order for $units units ($cost) sent to $supplier!"
            )
        }
    }

    fun executeQuickRestock(directiveId: String, units: Int) {
        _uiState.update { state ->
            val updatedDirectives = state.directives.map {
                if (it.id == directiveId) it.copy(isCompleted = true) else it
            }
            state.copy(
                directives = updatedDirectives,
                activeDialog = null,
                snackbarMessage = "Restock requisition for $units units placed successfully"
            )
        }
    }

    fun executeTransfer(directiveId: String, units: Int, from: String, to: String) {
        _uiState.update { state ->
            val updatedDirectives = state.directives.map {
                if (it.id == directiveId) it.copy(isCompleted = true) else it
            }
            val newTransfer = StockTransfer(
                id = "TR-${System.currentTimeMillis() % 10000}",
                itemName = "Smart Security Cam 2K Pro",
                fromWarehouse = from,
                toWarehouse = to,
                units = units,
                savings = "Saved ₹3,200",
                status = "In Transit (4h)",
                eta = "Today, 3:30 PM"
            )
            state.copy(
                directives = updatedDirectives,
                transfers = listOf(newTransfer) + state.transfers,
                activeDialog = null,
                snackbarMessage = "Intra-city dispatch created: $units units ($from → $to)"
            )
        }
    }

    fun applyLiquidationDiscount(directiveId: String, discountPercent: Int) {
        _uiState.update { state ->
            val updatedDirectives = state.directives.map {
                if (it.id == directiveId) it.copy(isCompleted = true) else it
            }
            state.copy(
                directives = updatedDirectives,
                activeDialog = null,
                snackbarMessage = "Applied $discountPercent% liquidation promo. B2B wholesale portal updated."
            )
        }
    }

    fun addNewStock(
        sku: String,
        name: String,
        category: String,
        quantity: Int,
        location: String,
        unitPrice: Double
    ) {
        val newItem = CatalogItem(
            id = "SKU-${System.currentTimeMillis() % 10000}",
            sku = sku.ifBlank { "SKU-${(1000..9999).random()}" },
            name = name,
            category = category,
            stockCount = quantity,
            minThreshold = (quantity * 0.25).toInt().coerceAtLeast(10),
            location = location,
            unitPriceInr = unitPrice,
            status = CatalogItem.ItemStockStatus.OPTIMAL
        )
        _uiState.update { state ->
            state.copy(
                catalog = listOf(newItem) + state.catalog,
                activeDialog = null,
                snackbarMessage = "Added ${newItem.name} ($quantity units) to $location"
            )
        }
    }

    fun markNotificationRead(id: String) {
        _uiState.update { state ->
            val updated = state.notifications.map {
                if (it.id == id) it.copy(unread = false) else it
            }
            state.copy(notifications = updated)
        }
    }

    fun clearSnackbar() {
        _uiState.update { it.copy(snackbarMessage = null) }
    }
}

val defaultMetrics = listOf(
    StockMetric(
        id = "total_inventory_value",
        title = "Total Inventory Value",
        value = "₹42.8 L",
        unit = "INR",
        badgeText = "+4.2%",
        isPositiveBadge = true,
        subtitle = "vs last month benchmark",
        sparklinePoints = listOf(20f, 18f, 15f, 12f, 14f, 10f, 6f, 2f)
    ),
    StockMetric(
        id = "catalog_skus",
        title = "Catalog SKUs",
        value = "2,481",
        unit = "",
        subtitle = "98.2% in active circulation",
        progress = 0.982f
    ),
    StockMetric(
        id = "low_stock",
        title = "Low Stock Items",
        value = "38",
        unit = "SKUs",
        badgeText = "ATTN",
        isPositiveBadge = false,
        subtitle = "12 stockouts in <48h"
    ),
    StockMetric(
        id = "overstock",
        title = "Overstock SKUs",
        value = "21",
        unit = "lines",
        subtitle = "₹3.40 L tied operating capital",
        badgeText = "Ready for rebalance",
        isPositiveBadge = true
    ),
    StockMetric(
        id = "dead_stock",
        title = "Dead Stock",
        value = "63",
        unit = "items",
        subtitle = "₹1.36 L dormant >90 days",
        badgeText = "Aging liquidation",
        isPositiveBadge = false
    ),
    StockMetric(
        id = "health_score",
        title = "Health Score",
        value = "86",
        unit = "",
        badgeText = "+3%",
        isPositiveBadge = true,
        subtitle = "Week-over-week velocity boost",
        healthScore = 86
    )
)

val defaultDirectives = listOf(
    AiDirective(
        id = "dir_1",
        type = DirectiveType.CRITICAL_STOCKOUT,
        tagText = "Order Now • Critical Stockout",
        badgeText = "2 Days Left",
        title = "Printer Paper A4 (500 Sheets)",
        recommendation = "AI Recommendation: Order ",
        recommendationHighlight = "120 units",
        recommendationTail = " from PaperCorp India. Guaranteed 24h expedited lead time prevents ₹28k order halt.",
        actionText = "Review Order (₹14,400)",
        hasDismiss = true,
        criticalStats = CriticalStockoutStats(stock = 42, burnRate = 18, stockoutHours = "48h")
    ),
    AiDirective(
        id = "dir_2",
        type = DirectiveType.SPIKE_FORECAST,
        tagText = "Order Soon • Spike Forecast",
        badgeText = "5 Days Lead",
        title = "Braided USB-C Cable 1.5m",
        recommendation = "Tech Festival weekend promo creates +30% surge. Recommended buffer order: ",
        recommendationHighlight = "100 units.",
        recommendationTail = "",
        actionText = "Quick Restock (100 Units)",
        spikeStats = SpikeForecastStats(currentInventory = 184, surgeDemand = 240)
    ),
    AiDirective(
        id = "dir_3",
        type = DirectiveType.HUB_IMBALANCE,
        tagText = "Transfer Stock • Hub Imbalance",
        badgeText = "Save ₹3.2k",
        title = "Smart Security Cam 2K Pro",
        recommendation = "Intra-city dispatch takes 4 hours. Cancels urgent factory replenishment and saves ₹3,200 air-cargo premium.",
        recommendationHighlight = "",
        recommendationTail = "",
        actionText = "Create Transfer (30 Units C → A)",
        imbalanceStats = HubImbalanceStats(
            deficitHub = "Store A (Deficit)",
            deficitUnits = 12,
            shiftUnits = 30,
            surplusHub = "Central Hub C (Surplus)",
            surplusUnits = 147
        )
    ),
    AiDirective(
        id = "dir_4",
        type = DirectiveType.DEAD_STOCK_LIQUIDATION,
        tagText = "Dead Stock • Liquidation Action",
        badgeText = "93d Stagnant",
        title = "Vintage LED Monitor 21\"",
        recommendation = "Execute a 25% B2B bundle discount or initiate vendor credit return before Q4 depreciation lock.",
        recommendationHighlight = "",
        recommendationTail = "",
        actionText = "View Liquidation Plan",
        deadStockStats = DeadStockStats(trappedValue = "₹76,000", quantity = 34)
    )
)

val defaultWarehouses = listOf(
    WarehouseUtilization(
        id = "wh_1",
        name = "Bengaluru Store A (Indiranagar)",
        statusBadge = "Near Cap",
        percentage = 88,
        capacityInfo = "1,240 / 1,400 pallet capacity utilized",
        statusType = WarehouseUtilization.StatusType.NEAR_CAP
    ),
    WarehouseUtilization(
        id = "wh_2",
        name = "Central Logistics C (Peenya)",
        statusBadge = "High",
        percentage = 92,
        capacityInfo = "18,400 / 20,000 sq.ft filled",
        statusType = WarehouseUtilization.StatusType.HIGH
    ),
    WarehouseUtilization(
        id = "wh_3",
        name = "Bengaluru Store B (Koramangala)",
        statusBadge = "Optimal",
        percentage = 64,
        capacityInfo = "890 / 1,400 pallet capacity utilized",
        statusType = WarehouseUtilization.StatusType.OPTIMAL
    )
)

val defaultCatalog = listOf(
    CatalogItem("c1", "SKU-4820", "Printer Paper A4 (500 Sheets)", "Office Supplies", 42, 100, "Store A (Indiranagar)", 120.0, CatalogItem.ItemStockStatus.CRITICAL),
    CatalogItem("c2", "SKU-7731", "Braided USB-C Cable 1.5m", "Electronics", 184, 150, "Central Hub C (Peenya)", 299.0, CatalogItem.ItemStockStatus.LOW_STOCK),
    CatalogItem("c3", "SKU-9924", "Smart Security Cam 2K Pro", "Security & IoT", 12, 40, "Store A (Indiranagar)", 2850.0, CatalogItem.ItemStockStatus.LOW_STOCK),
    CatalogItem("c4", "SKU-3129", "Vintage LED Monitor 21\"", "Displays", 34, 15, "Store B (Koramangala)", 2235.0, CatalogItem.ItemStockStatus.DEAD_STOCK),
    CatalogItem("c5", "SKU-5512", "Wireless Ergonomic Mouse", "Peripherals", 320, 100, "Central Hub C (Peenya)", 850.0, CatalogItem.ItemStockStatus.OVERSTOCK),
    CatalogItem("c6", "SKU-8821", "Noise-Cancelling Headset Pro", "Audio", 85, 30, "Store B (Koramangala)", 3499.0, CatalogItem.ItemStockStatus.OPTIMAL),
    CatalogItem("c7", "SKU-1044", "Thermal Receipt Roll 80mm", "Point of Sale", 25, 60, "Store A (Indiranagar)", 45.0, CatalogItem.ItemStockStatus.CRITICAL),
    CatalogItem("c8", "SKU-6638", "Multi-Plug Extension Surge Spike", "Electrical", 140, 50, "Central Hub C (Peenya)", 490.0, CatalogItem.ItemStockStatus.OPTIMAL)
)

val defaultTransfers = listOf(
    StockTransfer("TR-1082", "Smart Security Cam 2K Pro", "Central Hub C (Peenya)", "Store A (Indiranagar)", 30, "Saved ₹3,200", "Pending Approval", "Today, 4:00 PM"),
    StockTransfer("TR-1079", "Wireless Ergonomic Mouse", "Central Hub C (Peenya)", "Store B (Koramangala)", 50, "Direct Dispatch", "In Transit", "Today, 2:30 PM"),
    StockTransfer("TR-1074", "Thermal Receipt Roll 80mm", "Store B (Koramangala)", "Store A (Indiranagar)", 40, "Completed", "Delivered", "Yesterday")
)

val defaultNotifications = listOf(
    NotificationAlert(
        id = "notif_1",
        title = "Critical Stockout Forecast",
        description = "Printer Paper A4 reaches zero stock in 48 hours at Store A (Indiranagar). Burn rate: 18 units/day.",
        timestamp = "8 mins ago",
        priority = NotificationAlert.Priority.CRITICAL,
        unread = true
    ),
    NotificationAlert(
        id = "notif_2",
        title = "Weekend Demand Spike Alert",
        description = "Tech Festival promo projected to drive 240 units demand for Braided USB-C Cable (+30% surge).",
        timestamp = "24 mins ago",
        priority = NotificationAlert.Priority.WARNING,
        unread = true
    ),
    NotificationAlert(
        id = "notif_3",
        title = "Hub Imbalance Detected",
        description = "Store A is running low on Smart Security Cams while Peenya Hub has 147 surplus units.",
        timestamp = "1 hour ago",
        priority = NotificationAlert.Priority.INFO,
        unread = true
    )
)
