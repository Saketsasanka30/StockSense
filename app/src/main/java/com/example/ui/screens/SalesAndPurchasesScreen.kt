package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.LocalShipping
import androidx.compose.material.icons.filled.Receipt
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

data class MockSalesOrder(
    val orderNumber: String,
    val customer: String,
    val itemsSummary: String,
    val amount: String,
    val status: String,
    val destination: String
)

data class MockPurchaseOrder(
    val poNumber: String,
    val supplier: String,
    val itemsSummary: String,
    val amount: String,
    val status: String,
    val expectedDelivery: String
)

@Composable
fun SalesAndPurchasesScreen(
    contentPadding: PaddingValues,
    onNewOrderClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    var selectedTab by remember { mutableIntStateOf(0) }

    val salesOrders = remember {
        listOf(
            MockSalesOrder("SO-8491", "TechHub Retailers", "Braided USB-C Cable (40x)", "₹14,000", "Reserved", "Indiranagar Store A"),
            MockSalesOrder("SO-8490", "Nexus Enterprise", "Printer Paper A4 (10x), Toner (2x)", "₹8,600", "Shipped", "Whitefield Hub"),
            MockSalesOrder("SO-8489", "Apex Infotech", "Smart Security Cam 2K Pro (5x)", "₹21,000", "Delivered", "Koramangala Store B"),
            MockSalesOrder("SO-8488", "Urban Living Co.", "Desk Organizers (30x)", "₹12,500", "Confirmed", "Central Logistics C")
        )
    }

    val purchaseOrders = remember {
        listOf(
            MockPurchaseOrder("PO-1049", "PaperCorp India", "Printer Paper A4 (120 units)", "₹14,400", "Dispatched", "Tomorrow 10:00 AM"),
            MockPurchaseOrder("PO-1048", "Apex Connect Ltd", "Braided USB-C Cable (100 units)", "₹18,500", "Confirmed", "In 3 Days"),
            MockPurchaseOrder("PO-1047", "VisionTech Sensors", "Smart Security Cam 2K Pro (50 units)", "₹1,40,000", "Received", "Delivered Sep 14"),
            MockPurchaseOrder("PO-1046", "Omni Supplies", "Thermal Receipt Rolls (200x)", "₹9,800", "Received", "Delivered Sep 12")
        )
    }

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.surface)
            .padding(contentPadding)
    ) {
        // Tab row
        TabRow(
            selectedTabIndex = selectedTab,
            containerColor = MaterialTheme.colorScheme.surfaceContainerLowest,
            contentColor = MaterialTheme.colorScheme.primary
        ) {
            Tab(
                selected = selectedTab == 0,
                onClick = { selectedTab = 0 },
                text = { Text("Sales Orders (${salesOrders.size})", fontWeight = FontWeight.Bold) }
            )
            Tab(
                selected = selectedTab == 1,
                onClick = { selectedTab = 1 },
                text = { Text("Purchase Orders (${purchaseOrders.size})", fontWeight = FontWeight.Bold) }
            )
        }

        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 16.dp),
            contentPadding = PaddingValues(vertical = 12.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            if (selectedTab == 0) {
                item {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "Active Sales Dispatches",
                            style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold)
                        )
                        Button(
                            onClick = onNewOrderClick,
                            shape = RoundedCornerShape(8.dp),
                            colors = ButtonDefaults.buttonColors(
                                containerColor = MaterialTheme.colorScheme.primary,
                                contentColor = MaterialTheme.colorScheme.onPrimary
                            )
                        ) {
                            Text("New Sales Order", style = MaterialTheme.typography.labelSmall)
                        }
                    }
                }

                items(salesOrders) { order ->
                    Surface(
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(12.dp),
                        color = MaterialTheme.colorScheme.surfaceContainerLowest,
                        shadowElevation = 1.dp
                    ) {
                        Column(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(14.dp),
                            verticalArrangement = Arrangement.spacedBy(6.dp)
                        ) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Icon(Icons.Default.Receipt, contentDescription = null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.size(18.dp))
                                    Spacer(modifier = Modifier.width(6.dp))
                                    Text(order.orderNumber, style = MaterialTheme.typography.labelLarge.copy(fontWeight = FontWeight.Bold))
                                }
                                Box(
                                    modifier = Modifier
                                        .clip(RoundedCornerShape(6.dp))
                                        .background(
                                            when (order.status) {
                                                "Delivered" -> Color(0xFFE8F5E9)
                                                "Shipped" -> Color(0xFFE3F2FD)
                                                else -> Color(0xFFFFF3E0)
                                            }
                                        )
                                        .padding(horizontal = 8.dp, vertical = 2.dp)
                                ) {
                                    Text(
                                        text = order.status,
                                        style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
                                        color = when (order.status) {
                                            "Delivered" -> Color(0xFF00855B)
                                            "Shipped" -> Color(0xFF0277BD)
                                            else -> Color(0xFFE65100)
                                        }
                                    )
                                }
                            }
                            Text(order.customer, style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.SemiBold))
                            Text(order.itemsSummary, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Text("Warehouse: ${order.destination}", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.outline)
                                Text(order.amount, style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.primary))
                            }
                        }
                    }
                }
            } else {
                item {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "Procurement & Purchase Orders",
                            style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold)
                        )
                        Button(
                            onClick = onNewOrderClick,
                            shape = RoundedCornerShape(8.dp)
                        ) {
                            Text("Create PO", style = MaterialTheme.typography.labelSmall)
                        }
                    }
                }

                items(purchaseOrders) { po ->
                    Surface(
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(12.dp),
                        color = MaterialTheme.colorScheme.surfaceContainerLowest,
                        shadowElevation = 1.dp
                    ) {
                        Column(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(14.dp),
                            verticalArrangement = Arrangement.spacedBy(6.dp)
                        ) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Icon(Icons.Default.ShoppingCart, contentDescription = null, tint = MaterialTheme.colorScheme.secondary, modifier = Modifier.size(18.dp))
                                    Spacer(modifier = Modifier.width(6.dp))
                                    Text(po.poNumber, style = MaterialTheme.typography.labelLarge.copy(fontWeight = FontWeight.Bold))
                                }
                                Box(
                                    modifier = Modifier
                                        .clip(RoundedCornerShape(6.dp))
                                        .background(
                                            if (po.status == "Received") Color(0xFFE8F5E9) else MaterialTheme.colorScheme.surfaceContainerHigh
                                        )
                                        .padding(horizontal = 8.dp, vertical = 2.dp)
                                ) {
                                    Text(
                                        text = po.status,
                                        style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
                                        color = if (po.status == "Received") Color(0xFF00855B) else MaterialTheme.colorScheme.onSurface
                                    )
                                }
                            }
                            Text(po.supplier, style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.SemiBold))
                            Text(po.itemsSummary, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Text("Expected: ${po.expectedDelivery}", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.outline)
                                Text(po.amount, style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.secondary))
                            }
                        }
                    }
                }
            }
        }
    }
}
