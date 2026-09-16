package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.DrawerValue
import androidx.compose.material3.ModalNavigationDrawer
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.rememberDrawerState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import com.example.model.AiDirective
import com.example.ui.InventoryViewModel
import com.example.ui.NavigationTab
import com.example.ui.components.EnterpriseDrawer
import com.example.ui.components.StockSenseBottomNav
import com.example.ui.components.StockSenseTopBar
import com.example.ui.dialogs.AddStockDialog
import com.example.ui.dialogs.CreateTransferDialog
import com.example.ui.dialogs.HubSelectorSheet
import com.example.ui.dialogs.LiquidationPlanDialog
import com.example.ui.dialogs.NotificationsSheet
import com.example.ui.dialogs.QuickRestockDialog
import com.example.ui.dialogs.ReviewOrderDialog
import com.example.ui.dialogs.VisionScanDialog
import com.example.ui.screens.AiChatbotScreen
import com.example.ui.screens.AlertsScreen
import com.example.ui.screens.ForecastScreen
import com.example.ui.screens.HomeScreen
import com.example.ui.screens.InventoryScreen
import com.example.ui.screens.SalesAndPurchasesScreen
import com.example.ui.screens.TransfersScreen
import com.example.ui.theme.StockSenseTheme
import kotlinx.coroutines.launch

class MainActivity : ComponentActivity() {
    private val viewModel: InventoryViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            StockSenseTheme {
                StockSenseApp(viewModel = viewModel)
            }
        }
    }
}

@Composable
fun StockSenseApp(
    viewModel: InventoryViewModel,
    modifier: Modifier = Modifier
) {
    val uiState by viewModel.uiState.collectAsState()
    val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)
    val scope = rememberCoroutineScope()
    val snackbarHostState = remember { SnackbarHostState() }

    // Dialog & Sheet States
    var selectedOrderDirective by remember { mutableStateOf<AiDirective?>(null) }
    var selectedSpikeDirective by remember { mutableStateOf<AiDirective?>(null) }
    var selectedTransferDirective by remember { mutableStateOf<AiDirective?>(null) }
    var selectedLiquidationDirective by remember { mutableStateOf<AiDirective?>(null) }
    var showVisionScanDialog by remember { mutableStateOf(false) }
    var showAddStockDialog by remember { mutableStateOf(false) }
    var showHubSelectorSheet by remember { mutableStateOf(false) }
    var showNotificationsSheet by remember { mutableStateOf(false) }

    ModalNavigationDrawer(
        drawerState = drawerState,
        drawerContent = {
            EnterpriseDrawer(
                onClose = { scope.launch { drawerState.close() } },
                onNavigateTab = { tab ->
                    viewModel.selectTab(tab)
                    scope.launch { drawerState.close() }
                },
                onOpenManageHubs = {
                    showHubSelectorSheet = true
                    scope.launch { drawerState.close() }
                }
            )
        }
    ) {
        Scaffold(
            modifier = modifier.fillMaxSize().testTag("app_scaffold"),
            topBar = {
                StockSenseTopBar(
                    currentHub = uiState.selectedHubFilter,
                    notificationCount = uiState.notifications.size,
                    onMenuClick = {
                        scope.launch {
                            if (drawerState.isClosed) drawerState.open() else drawerState.close()
                        }
                    },
                    onHubClick = { showHubSelectorSheet = true },
                    onSearchClick = { viewModel.selectTab(NavigationTab.INVENTORY) },
                    onNotificationClick = { showNotificationsSheet = true },
                    onProfileClick = {
                        scope.launch {
                            snackbarHostState.showSnackbar("Logged in as Saket (Warehouse Supervisor)")
                        }
                    }
                )
            },
            bottomBar = {
                StockSenseBottomNav(
                    activeTab = uiState.activeTab,
                    onTabSelected = { viewModel.selectTab(it) }
                )
            },
            snackbarHost = { SnackbarHost(hostState = snackbarHostState) }
        ) { innerPadding ->
            Box(modifier = Modifier.fillMaxSize().padding(top = innerPadding.calculateTopPadding())) {
                when (uiState.activeTab) {
                    NavigationTab.HOME -> {
                        HomeScreen(
                            uiState = uiState,
                            onRefreshTelemetry = {
                                viewModel.refreshTelemetry()
                                scope.launch {
                                    snackbarHostState.showSnackbar("Telemetry synchronized with regional fulfillment nodes")
                                }
                            },
                            onOpenHubSelector = { showHubSelectorSheet = true },
                            onReviewOrder = { directive -> selectedOrderDirective = directive },
                            onQuickRestock = { directive -> selectedSpikeDirective = directive },
                            onCreateTransfer = { directive -> selectedTransferDirective = directive },
                            onViewLiquidation = { directive -> selectedLiquidationDirective = directive },
                            onDismissDirective = { id ->
                                viewModel.dismissDirective(id)
                                scope.launch {
                                    snackbarHostState.showSnackbar("Directive dismissed")
                                }
                            },
                            onManageHubs = { showHubSelectorSheet = true },
                            onVisionScan = { showVisionScanDialog = true },
                            onAddStock = { showAddStockDialog = true },
                            onMetricClick = { metric ->
                                scope.launch {
                                    snackbarHostState.showSnackbar("${metric.title}: ${metric.value} ${metric.subtitle}")
                                }
                            },
                            onViewAllMetrics = { viewModel.selectTab(NavigationTab.INVENTORY) },
                            contentPadding = innerPadding
                        )
                    }

                    NavigationTab.INVENTORY -> {
                        InventoryScreen(
                            uiState = uiState,
                            onFilterSelect = { viewModel.setCatalogFilter(it) },
                            onSearchChange = { viewModel.setSearchQuery(it) },
                            onAddStock = { showAddStockDialog = true },
                            contentPadding = innerPadding
                        )
                    }

                    NavigationTab.FORECAST -> {
                        ForecastScreen(
                            contentPadding = innerPadding
                        )
                    }

                    NavigationTab.TRANSFERS -> {
                        TransfersScreen(
                            transfers = uiState.transfers,
                            contentPadding = innerPadding
                        )
                    }

                    NavigationTab.ALERTS -> {
                        AlertsScreen(
                            notifications = uiState.notifications,
                            contentPadding = innerPadding
                        )
                    }

                    NavigationTab.AI_CHAT -> {
                        AiChatbotScreen(
                            contentPadding = innerPadding,
                            onExecuteAction = { action ->
                                when {
                                    action.contains("Review") || action.contains("Purchase") -> {
                                        uiState.directives.firstOrNull { it.id == "crit_stockout_paper" }?.let {
                                            selectedOrderDirective = it
                                        }
                                    }
                                    action.contains("Restock") -> {
                                        uiState.directives.firstOrNull { it.id == "spike_usbc_cable" }?.let {
                                            selectedSpikeDirective = it
                                        }
                                    }
                                    action.contains("Transfer") -> {
                                        uiState.directives.firstOrNull { it.id == "imbalance_cam_pro" }?.let {
                                            selectedTransferDirective = it
                                        }
                                    }
                                    else -> viewModel.selectTab(NavigationTab.HOME)
                                }
                            }
                        )
                    }

                    NavigationTab.SALES_PURCHASES -> {
                        SalesAndPurchasesScreen(
                            contentPadding = innerPadding,
                            onNewOrderClick = {
                                showAddStockDialog = true
                            }
                        )
                    }
                }
            }
        }
    }

    // Modal Dialogs
    selectedOrderDirective?.let { directive ->
        ReviewOrderDialog(
            directive = directive,
            onConfirm = { units, supplier, cost ->
                viewModel.completeOrder(directive.id, units, supplier, cost)
                selectedOrderDirective = null
                scope.launch {
                    snackbarHostState.showSnackbar("Dispatched PO: $units units ordered from $supplier ($cost)")
                }
            },
            onDismiss = { selectedOrderDirective = null }
        )
    }

    selectedSpikeDirective?.let { directive ->
        QuickRestockDialog(
            directive = directive,
            onConfirm = { units ->
                viewModel.executeQuickRestock(directive.id, units)
                selectedSpikeDirective = null
                scope.launch {
                    snackbarHostState.showSnackbar("Fast Restock order of $units units placed for Tech Fest promo")
                }
            },
            onDismiss = { selectedSpikeDirective = null }
        )
    }

    selectedTransferDirective?.let { directive ->
        CreateTransferDialog(
            directive = directive,
            onConfirm = { units, from, to ->
                viewModel.executeTransfer(directive.id, units, from, to)
                selectedTransferDirective = null
                scope.launch {
                    snackbarHostState.showSnackbar("Transfer dispatched: $units units sent to $to")
                }
            },
            onDismiss = { selectedTransferDirective = null }
        )
    }

    selectedLiquidationDirective?.let { directive ->
        LiquidationPlanDialog(
            directive = directive,
            onApplyDiscount = { percent ->
                viewModel.applyLiquidationDiscount(directive.id, percent)
                selectedLiquidationDirective = null
                scope.launch {
                    snackbarHostState.showSnackbar("Liquidation campaign activated with $percent% discount")
                }
            },
            onDismiss = { selectedLiquidationDirective = null }
        )
    }

    if (showVisionScanDialog) {
        VisionScanDialog(
            onDismiss = { showVisionScanDialog = false }
        )
    }

    if (showAddStockDialog) {
        AddStockDialog(
            onAdd = { sku, name, category, qty, location, price ->
                viewModel.addNewStock(sku, name, category, qty, location, price)
                showAddStockDialog = false
                scope.launch {
                    snackbarHostState.showSnackbar("Added $name ($qty units) to inventory")
                }
            },
            onDismiss = { showAddStockDialog = false }
        )
    }

    if (showHubSelectorSheet) {
        HubSelectorSheet(
            currentHub = uiState.selectedHub,
            onSelectHub = { hub, filter ->
                viewModel.selectHub(hub, filter)
                showHubSelectorSheet = false
                scope.launch {
                    snackbarHostState.showSnackbar("Warehouse view updated to $hub")
                }
            },
            onDismiss = { showHubSelectorSheet = false }
        )
    }

    if (showNotificationsSheet) {
        NotificationsSheet(
            notifications = uiState.notifications,
            onDismiss = { showNotificationsSheet = false }
        )
    }
}
