package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.outlined.BarChart
import androidx.compose.material.icons.outlined.Domain
import androidx.compose.material.icons.outlined.EventBusy
import androidx.compose.material.icons.outlined.HourglassDisabled
import androidx.compose.material.icons.outlined.Inventory2
import androidx.compose.material.icons.outlined.LocalShipping
import androidx.compose.material.icons.outlined.Settings
import androidx.compose.material.icons.outlined.SwapHoriz
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalDrawerSheet
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.R
import com.example.ui.NavigationTab

@Composable
fun EnterpriseDrawer(
    onClose: () -> Unit,
    onNavigateTab: (NavigationTab) -> Unit,
    onOpenManageHubs: () -> Unit,
    modifier: Modifier = Modifier
) {
    ModalDrawerSheet(
        modifier = modifier.width(290.dp),
        drawerContainerColor = MaterialTheme.colorScheme.surfaceContainerLowest
    ) {
        Column(
            modifier = Modifier
                .fillMaxHeight()
                .padding(vertical = 12.dp)
        ) {
            // Header
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    painter = painterResource(id = R.drawable.ic_stocksense_logo),
                    contentDescription = "StockSense",
                    tint = Color.Unspecified,
                    modifier = Modifier.size(28.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "StockSense",
                    style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                    color = MaterialTheme.colorScheme.onSurface
                )
                Spacer(modifier = Modifier.weight(1f))
                IconButton(
                    onClick = onClose,
                    modifier = Modifier.testTag("close_drawer_button")
                ) {
                    Icon(
                        imageVector = Icons.Default.Close,
                        contentDescription = "Close navigation",
                        tint = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }

            // Section label
            Text(
                text = "ENTERPRISE MODULES",
                style = MaterialTheme.typography.labelSmall.copy(
                    letterSpacing = 1.sp,
                    fontWeight = FontWeight.Bold
                ),
                color = MaterialTheme.colorScheme.outline,
                modifier = Modifier.padding(horizontal = 20.dp, vertical = 10.dp)
            )

            // Menu Items List
            Column(
                modifier = Modifier
                    .weight(1f)
                    .verticalScroll(rememberScrollState())
                    .padding(horizontal = 8.dp)
            ) {
                DrawerItem(
                    icon = Icons.Outlined.Inventory2,
                    label = "Inventory",
                    onClick = {
                        onNavigateTab(NavigationTab.INVENTORY)
                        onClose()
                    }
                )
                DrawerItem(
                    icon = Icons.Outlined.Domain,
                    label = "Warehouses",
                    onClick = {
                        onOpenManageHubs()
                        onClose()
                    }
                )
                DrawerItem(
                    icon = Icons.Outlined.SwapHoriz,
                    label = "Transfers",
                    onClick = {
                        onNavigateTab(NavigationTab.TRANSFERS)
                        onClose()
                    }
                )
                DrawerItem(
                    icon = Icons.Outlined.LocalShipping,
                    label = "Sales & Purchases",
                    onClick = {
                        onNavigateTab(NavigationTab.SALES_PURCHASES)
                        onClose()
                    }
                )
                DrawerItem(
                    icon = Icons.Default.AutoAwesome,
                    label = "AI Assistant (Gemini)",
                    onClick = {
                        onNavigateTab(NavigationTab.AI_CHAT)
                        onClose()
                    }
                )
                DrawerItem(
                    icon = Icons.Outlined.EventBusy,
                    label = "Expiry Tracking",
                    onClick = {
                        onNavigateTab(NavigationTab.ALERTS)
                        onClose()
                    }
                )
                DrawerItem(
                    icon = Icons.Outlined.HourglassDisabled,
                    label = "Dead Stock",
                    onClick = {
                        onNavigateTab(NavigationTab.INVENTORY)
                        onClose()
                    }
                )
                DrawerItem(
                    icon = Icons.Outlined.BarChart,
                    label = "Reports & Forecast",
                    onClick = {
                        onNavigateTab(NavigationTab.FORECAST)
                        onClose()
                    }
                )
                DrawerItem(
                    icon = Icons.Outlined.Settings,
                    label = "Settings",
                    onClick = {
                        onClose()
                    }
                )
            }

            // AI Engine Chip at bottom
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 8.dp)
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(10.dp))
                        .background(MaterialTheme.colorScheme.surfaceContainer)
                        .clickable {
                            onNavigateTab(NavigationTab.AI_CHAT)
                            onClose()
                        }
                        .padding(horizontal = 12.dp, vertical = 10.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Default.AutoAwesome,
                        contentDescription = "AI Active",
                        tint = MaterialTheme.colorScheme.secondary,
                        modifier = Modifier.size(18.dp)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = "AI Engine v2.4 Active",
                        style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.SemiBold),
                        color = MaterialTheme.colorScheme.onSurface
                    )
                }
            }
        }
    }
}

@Composable
private fun DrawerItem(
    icon: ImageVector,
    label: String,
    onClick: () -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(8.dp))
            .clickable(onClick = onClick)
            .padding(horizontal = 12.dp, vertical = 11.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(
            imageVector = icon,
            contentDescription = null,
            tint = MaterialTheme.colorScheme.onSurfaceVariant,
            modifier = Modifier.size(20.dp)
        )
        Spacer(modifier = Modifier.width(12.dp))
        Text(
            text = label,
            style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.Medium),
            color = MaterialTheme.colorScheme.onSurface
        )
    }
}
