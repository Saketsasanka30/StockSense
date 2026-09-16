package com.example.model

enum class DirectiveType {
    CRITICAL_STOCKOUT,
    SPIKE_FORECAST,
    HUB_IMBALANCE,
    DEAD_STOCK_LIQUIDATION
}

data class StockMetric(
    val id: String,
    val title: String,
    val value: String,
    val unit: String = "",
    val badgeText: String? = null,
    val isPositiveBadge: Boolean = true,
    val subtitle: String,
    val progress: Float? = null,
    val sparklinePoints: List<Float> = emptyList(),
    val healthScore: Int? = null
)

data class CriticalStockoutStats(
    val stock: Int = 42,
    val burnRate: Int = 18,
    val stockoutHours: String = "48h"
)

data class SpikeForecastStats(
    val currentInventory: Int = 184,
    val surgeDemand: Int = 240
)

data class HubImbalanceStats(
    val deficitHub: String = "Store A (Deficit)",
    val deficitUnits: Int = 12,
    val shiftUnits: Int = 30,
    val surplusHub: String = "Central Hub C (Surplus)",
    val surplusUnits: Int = 147
)

data class DeadStockStats(
    val trappedValue: String = "₹76,000",
    val quantity: Int = 34
)

data class AiDirective(
    val id: String,
    val type: DirectiveType,
    val tagText: String,
    val badgeText: String,
    val title: String,
    val recommendation: String,
    val recommendationHighlight: String,
    val recommendationTail: String,
    val actionText: String,
    val hasDismiss: Boolean = false,
    val criticalStats: CriticalStockoutStats? = null,
    val spikeStats: SpikeForecastStats? = null,
    val imbalanceStats: HubImbalanceStats? = null,
    val deadStockStats: DeadStockStats? = null,
    val isDismissed: Boolean = false,
    val isCompleted: Boolean = false
)

data class WarehouseUtilization(
    val id: String,
    val name: String,
    val statusBadge: String,
    val percentage: Int,
    val capacityInfo: String,
    val statusType: StatusType
) {
    enum class StatusType {
        NEAR_CAP,
        HIGH,
        OPTIMAL
    }
}

data class CatalogItem(
    val id: String,
    val sku: String,
    val name: String,
    val category: String,
    val stockCount: Int,
    val minThreshold: Int,
    val location: String,
    val unitPriceInr: Double,
    val status: ItemStockStatus
) {
    enum class ItemStockStatus {
        OPTIMAL,
        LOW_STOCK,
        CRITICAL,
        OVERSTOCK,
        DEAD_STOCK
    }
}

data class NotificationAlert(
    val id: String,
    val title: String,
    val description: String,
    val timestamp: String,
    val priority: Priority,
    val unread: Boolean = true
) {
    enum class Priority {
        CRITICAL,
        WARNING,
        INFO
    }
}

data class StockTransfer(
    val id: String,
    val itemName: String,
    val fromWarehouse: String,
    val toWarehouse: String,
    val units: Int,
    val savings: String,
    val status: String,
    val eta: String
)
