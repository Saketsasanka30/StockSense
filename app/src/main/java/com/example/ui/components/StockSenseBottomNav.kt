package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.outlined.CrisisAlert
import androidx.compose.material.icons.outlined.Inventory2
import androidx.compose.material.icons.outlined.SpaceDashboard
import androidx.compose.material.icons.outlined.SyncAlt
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.NavigationTab

@Composable
fun StockSenseBottomNav(
    activeTab: NavigationTab,
    onTabSelected: (NavigationTab) -> Unit,
    modifier: Modifier = Modifier
) {
    Surface(
        modifier = modifier.fillMaxWidth(),
        color = MaterialTheme.colorScheme.surfaceContainerLowest.copy(alpha = 0.95f),
        shadowElevation = 8.dp
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .navigationBarsPadding()
                .height(64.dp)
                .padding(horizontal = 4.dp),
            horizontalArrangement = Arrangement.SpaceAround,
            verticalAlignment = Alignment.CenterVertically
        ) {
            NavItem(
                icon = Icons.Outlined.SpaceDashboard,
                label = "Home",
                isSelected = activeTab == NavigationTab.HOME,
                onClick = { onTabSelected(NavigationTab.HOME) },
                testTag = "tab_home"
            )
            NavItem(
                icon = Icons.Outlined.Inventory2,
                label = "Inventory",
                isSelected = activeTab == NavigationTab.INVENTORY,
                onClick = { onTabSelected(NavigationTab.INVENTORY) },
                testTag = "tab_inventory"
            )
            NavItem(
                icon = Icons.Default.AutoAwesome,
                label = "Forecast",
                isSelected = activeTab == NavigationTab.FORECAST,
                isAiSpecial = true,
                onClick = { onTabSelected(NavigationTab.FORECAST) },
                testTag = "tab_forecast"
            )
            NavItem(
                icon = Icons.Outlined.SyncAlt,
                label = "Transfers",
                isSelected = activeTab == NavigationTab.TRANSFERS,
                onClick = { onTabSelected(NavigationTab.TRANSFERS) },
                testTag = "tab_transfers"
            )
            NavItem(
                icon = Icons.Outlined.CrisisAlert,
                label = "Alerts",
                isSelected = activeTab == NavigationTab.ALERTS,
                onClick = { onTabSelected(NavigationTab.ALERTS) },
                testTag = "tab_alerts"
            )
        }
    }
}

@Composable
private fun NavItem(
    icon: ImageVector,
    label: String,
    isSelected: Boolean,
    onClick: () -> Unit,
    testTag: String,
    isAiSpecial: Boolean = false
) {
    val interactionSource = remember { MutableInteractionSource() }

    Column(
        modifier = Modifier
            .clickable(
                interactionSource = interactionSource,
                indication = null,
                onClick = onClick
            )
            .padding(vertical = 4.dp)
            .testTag(testTag),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        // Icon Pill Container
        Box(
            modifier = Modifier
                .clip(RoundedCornerShape(16.dp))
                .background(
                    if (isSelected) MaterialTheme.colorScheme.primaryContainer else Color.Transparent
                )
                .padding(horizontal = 14.dp, vertical = 4.dp),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = icon,
                contentDescription = label,
                tint = when {
                    isSelected -> MaterialTheme.colorScheme.onPrimaryContainer
                    isAiSpecial -> MaterialTheme.colorScheme.secondary
                    else -> MaterialTheme.colorScheme.onSurfaceVariant
                },
                modifier = Modifier.size(22.dp)
            )

            // Optional purple AI dot for Forecast
            if (isAiSpecial && !isSelected) {
                Box(
                    modifier = Modifier
                        .size(6.dp)
                        .align(Alignment.TopEnd)
                        .clip(CircleShape)
                        .background(MaterialTheme.colorScheme.secondary)
                )
            }
        }

        Spacer(modifier = Modifier.height(2.dp))

        Text(
            text = label,
            style = MaterialTheme.typography.labelSmall.copy(
                fontSize = 10.sp,
                fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium
            ),
            color = if (isSelected) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
