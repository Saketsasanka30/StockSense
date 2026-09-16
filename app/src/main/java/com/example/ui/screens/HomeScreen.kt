package com.example.ui.screens

import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
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
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.ArrowDropDown
import androidx.compose.material.icons.filled.Hub
import androidx.compose.material.icons.filled.Sync
import androidx.compose.material.icons.outlined.DocumentScanner
import androidx.compose.material.icons.outlined.SwapHoriz
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.model.AiDirective
import com.example.model.StockMetric
import com.example.ui.InventoryUiState
import com.example.ui.components.AiDirectivesSection
import com.example.ui.components.KpiMetricsRow
import com.example.ui.components.WarehouseUtilizationSection

@Composable
fun HomeScreen(
    uiState: InventoryUiState,
    onRefreshTelemetry: () -> Unit,
    onOpenHubSelector: () -> Unit,
    onReviewOrder: (AiDirective) -> Unit,
    onQuickRestock: (AiDirective) -> Unit,
    onCreateTransfer: (AiDirective) -> Unit,
    onViewLiquidation: (AiDirective) -> Unit,
    onDismissDirective: (String) -> Unit,
    onManageHubs: () -> Unit,
    onVisionScan: () -> Unit,
    onAddStock: () -> Unit,
    onMetricClick: (StockMetric) -> Unit,
    onViewAllMetrics: () -> Unit,
    contentPadding: PaddingValues,
    modifier: Modifier = Modifier
) {
    var rotationAngle by remember { mutableFloatStateOf(0f) }
    val animatedRotation by animateFloatAsState(
        targetValue = rotationAngle,
        animationSpec = tween(durationMillis = 800, easing = LinearEasing),
        label = "syncRotation"
    )

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.surface)
            .testTag("home_screen_lazy_column"),
        contentPadding = contentPadding,
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Greeting & Status Banner
        item {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 6.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(
                            text = "Good morning, Saket",
                            style = MaterialTheme.typography.headlineMedium.copy(
                                fontWeight = FontWeight.Bold,
                                letterSpacing = (-0.5).sp
                            ),
                            color = MaterialTheme.colorScheme.onSurface
                        )

                        // Location Context Chip Button
                        Row(
                            modifier = Modifier
                                .padding(top = 4.dp)
                                .clip(RoundedCornerShape(8.dp))
                                .background(MaterialTheme.colorScheme.surfaceContainerLow)
                                .clickable(onClick = onOpenHubSelector)
                                .padding(horizontal = 10.dp, vertical = 5.dp)
                                .testTag("location_context_chip"),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(
                                imageVector = Icons.Default.Hub,
                                contentDescription = null,
                                tint = MaterialTheme.colorScheme.primary,
                                modifier = Modifier.size(15.dp)
                            )
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(
                                text = uiState.selectedHub,
                                style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold),
                                color = MaterialTheme.colorScheme.onSurface
                            )
                            Spacer(modifier = Modifier.width(4.dp))
                            Text(
                                text = "(${uiState.selectedHubFilter})",
                                style = MaterialTheme.typography.labelSmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                            Icon(
                                imageVector = Icons.Default.ArrowDropDown,
                                contentDescription = null,
                                tint = MaterialTheme.colorScheme.onSurfaceVariant,
                                modifier = Modifier.size(16.dp)
                            )
                        }
                    }

                    // Refresh Sync Button
                    Surface(
                        modifier = Modifier
                            .size(42.dp)
                            .clip(CircleShape)
                            .testTag("refresh_telemetry_button"),
                        color = MaterialTheme.colorScheme.surfaceContainerLowest,
                        shadowElevation = 1.dp
                    ) {
                        IconButton(
                            onClick = {
                                rotationAngle += 360f
                                onRefreshTelemetry()
                            }
                        ) {
                            Icon(
                                imageVector = Icons.Default.Sync,
                                contentDescription = "Refresh telemetry",
                                tint = MaterialTheme.colorScheme.primary,
                                modifier = Modifier
                                    .size(20.dp)
                                    .rotate(animatedRotation)
                            )
                        }
                    }
                }

                // Quick Action Bar: 3 Clean Minimal Utility Buttons
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(top = 6.dp),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    QuickActionButton(
                        icon = Icons.Outlined.DocumentScanner,
                        label = "Scan Shelf",
                        onClick = onVisionScan,
                        modifier = Modifier.weight(1f)
                    )
                    QuickActionButton(
                        icon = Icons.Default.Add,
                        label = "Add SKU",
                        onClick = onAddStock,
                        modifier = Modifier.weight(1f)
                    )
                    QuickActionButton(
                        icon = Icons.Outlined.SwapHoriz,
                        label = "Transfers",
                        onClick = onManageHubs,
                        modifier = Modifier.weight(1f)
                    )
                }
            }
        }

        // Hero Portfolio & KPI Overview
        item {
            KpiMetricsRow(
                metrics = uiState.kpiMetrics,
                onViewAllMetrics = onViewAllMetrics,
                onMetricClick = onMetricClick
            )
        }

        // AI Inventory Priority Directives
        item {
            AiDirectivesSection(
                directives = uiState.directives,
                onReviewOrder = onReviewOrder,
                onQuickRestock = onQuickRestock,
                onCreateTransfer = onCreateTransfer,
                onViewLiquidation = onViewLiquidation,
                onDismissDirective = onDismissDirective
            )
        }

        // Hub Capacity & Utilization Section
        item {
            WarehouseUtilizationSection(
                warehouses = uiState.warehouses,
                onManageHubs = onManageHubs,
                onVisionScan = onVisionScan,
                onAddStock = onAddStock
            )
        }

        // Extra padding at the bottom so content is never obscured by the bottom nav
        item {
            Spacer(modifier = Modifier.height(20.dp))
        }
    }
}

@Composable
private fun QuickActionButton(
    icon: ImageVector,
    label: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Surface(
        modifier = modifier
            .height(44.dp)
            .clip(RoundedCornerShape(12.dp))
            .clickable(onClick = onClick),
        shape = RoundedCornerShape(12.dp),
        color = MaterialTheme.colorScheme.surfaceContainerLowest,
        shadowElevation = 0.5.dp
    ) {
        Row(
            modifier = Modifier.padding(horizontal = 8.dp),
            horizontalArrangement = Arrangement.Center,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = icon,
                contentDescription = label,
                tint = MaterialTheme.colorScheme.primary,
                modifier = Modifier.size(16.dp)
            )
            Spacer(modifier = Modifier.width(6.dp))
            Text(
                text = label,
                style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.SemiBold),
                color = MaterialTheme.colorScheme.onSurface,
                maxLines = 1
            )
        }
    }
}
