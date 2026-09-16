package com.example.ui.screens

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
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.Send
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.Mic
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.SmartToy
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

data class ChatMessage(
    val id: String = java.util.UUID.randomUUID().toString(),
    val sender: MessageSender,
    val text: String,
    val timestamp: String,
    val isActionable: Boolean = false,
    val actionText: String? = null
)

enum class MessageSender {
    USER,
    AI
}

@Composable
fun AiChatbotScreen(
    contentPadding: PaddingValues,
    onExecuteAction: ((String) -> Unit)? = null,
    modifier: Modifier = Modifier
) {
    val messages = remember {
        mutableStateListOf(
            ChatMessage(
                sender = MessageSender.AI,
                text = "Hello Saket. I am StockSense AI Command Intelligence (v2.4). I monitor all 2,481 SKUs across your 3 Bengaluru fulfillment hubs. Ask me about stockout risks, surge demand predictions, supplier performance, or inter-hub transfers.",
                timestamp = "Just now"
            )
        )
    }

    var inputText by remember { mutableStateOf("") }
    var isThinking by remember { mutableStateOf(false) }
    val listState = rememberLazyListState()
    val coroutineScope = rememberCoroutineScope()

    val quickQuestions = listOf(
        "Analyze Stockout Risks",
        "Tech Fest Demand Spike",
        "Inter-Hub Transfer Route",
        "Dead Stock Liquidation",
        "Warehouse Capacity Telemetry"
    )

    fun sendUserMessage(query: String) {
        if (query.isBlank()) return
        val userMsg = ChatMessage(
            sender = MessageSender.USER,
            text = query.trim(),
            timestamp = "Just now"
        )
        messages.add(userMsg)
        inputText = ""
        isThinking = true

        coroutineScope.launch {
            listState.animateScrollToItem(messages.size - 1)
            delay(800) // Realistic AI synthesis latency
            val aiResponse = generateAiResponse(query)
            messages.add(aiResponse)
            isThinking = false
            listState.animateScrollToItem(messages.size - 1)
        }
    }

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.surface)
            .padding(contentPadding)
    ) {
        // Header
        Surface(
            modifier = Modifier.fillMaxWidth(),
            color = MaterialTheme.colorScheme.surfaceContainerLowest,
            shadowElevation = 1.dp
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 12.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Box(
                    modifier = Modifier
                        .size(36.dp)
                        .clip(CircleShape)
                        .background(MaterialTheme.colorScheme.secondaryContainer),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.AutoAwesome,
                        contentDescription = "AI",
                        tint = MaterialTheme.colorScheme.secondary,
                        modifier = Modifier.size(20.dp)
                    )
                }
                Spacer(modifier = Modifier.width(10.dp))
                Column {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(
                            text = "StockSense AI Assistant",
                            style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                            color = MaterialTheme.colorScheme.onSurface
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Box(
                            modifier = Modifier
                                .clip(RoundedCornerShape(4.dp))
                                .background(Color(0xFFE8F5E9))
                                .padding(horizontal = 6.dp, vertical = 1.dp)
                        ) {
                            Text(
                                text = "Gemini 3.5 Active",
                                style = MaterialTheme.typography.labelSmall.copy(
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 9.sp
                                ),
                                color = Color(0xFF00855B)
                            )
                        }
                    }
                    Text(
                        text = "Real-time supply chain reasoning & predictive directives",
                        style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.outline
                    )
                }
            }
        }

        // Messages List
        LazyColumn(
            state = listState,
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth()
                .padding(horizontal = 16.dp),
            contentPadding = PaddingValues(vertical = 12.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            items(messages, key = { it.id }) { msg ->
                MessageBubble(message = msg, onActionClick = onExecuteAction)
            }

            if (isThinking) {
                item {
                    Row(
                        modifier = Modifier
                            .clip(RoundedCornerShape(14.dp))
                            .background(MaterialTheme.colorScheme.surfaceContainerLow)
                            .padding(horizontal = 14.dp, vertical = 10.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        CircularProgressIndicator(
                            modifier = Modifier.size(16.dp),
                            strokeWidth = 2.dp,
                            color = MaterialTheme.colorScheme.secondary
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = "StockSense AI is analyzing fulfillment network data...",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            }
        }

        // Quick Suggestion Chips
        LazyRow(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 12.dp, vertical = 6.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            items(quickQuestions) { q ->
                Surface(
                    modifier = Modifier
                        .clip(RoundedCornerShape(20.dp))
                        .clickable { sendUserMessage(q) },
                    color = MaterialTheme.colorScheme.surfaceContainerLow,
                    border = androidx.compose.foundation.BorderStroke(
                        1.dp,
                        MaterialTheme.colorScheme.outlineVariant
                    )
                ) {
                    Text(
                        text = q,
                        style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Medium),
                        color = MaterialTheme.colorScheme.primary,
                        modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp)
                    )
                }
            }
        }

        // Input Field Bar
        Surface(
            modifier = Modifier.fillMaxWidth(),
            color = MaterialTheme.colorScheme.surfaceContainerLowest,
            shadowElevation = 4.dp
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 12.dp, vertical = 8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                OutlinedTextField(
                    value = inputText,
                    onValueChange = { inputText = it },
                    placeholder = { Text("Ask StockSense AI about your inventory...") },
                    modifier = Modifier
                        .weight(1f)
                        .testTag("ai_chat_input"),
                    shape = RoundedCornerShape(24.dp),
                    singleLine = true,
                    keyboardOptions = KeyboardOptions(imeAction = ImeAction.Send),
                    keyboardActions = KeyboardActions(onSend = { sendUserMessage(inputText) })
                )

                Spacer(modifier = Modifier.width(6.dp))

                IconButton(
                    onClick = { sendUserMessage(inputText) },
                    modifier = Modifier
                        .size(44.dp)
                        .clip(CircleShape)
                        .background(MaterialTheme.colorScheme.primary)
                        .testTag("ai_send_button")
                ) {
                    Icon(
                        imageVector = Icons.AutoMirrored.Filled.Send,
                        contentDescription = "Send",
                        tint = MaterialTheme.colorScheme.onPrimary,
                        modifier = Modifier.size(18.dp)
                    )
                }
            }
        }
    }
}

@Composable
private fun MessageBubble(
    message: ChatMessage,
    onActionClick: ((String) -> Unit)?
) {
    val isUser = message.sender == MessageSender.USER
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = if (isUser) Arrangement.End else Arrangement.Start
    ) {
        if (!isUser) {
            Box(
                modifier = Modifier
                    .size(28.dp)
                    .clip(CircleShape)
                    .background(MaterialTheme.colorScheme.secondaryContainer),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Default.SmartToy,
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.secondary,
                    modifier = Modifier.size(16.dp)
                )
            }
            Spacer(modifier = Modifier.width(8.dp))
        }

        Column(
            modifier = Modifier
                .fillMaxWidth(0.85f)
                .clip(
                    RoundedCornerShape(
                        topStart = 16.dp,
                        topEnd = 16.dp,
                        bottomStart = if (isUser) 16.dp else 4.dp,
                        bottomEnd = if (isUser) 4.dp else 16.dp
                    )
                )
                .background(
                    if (isUser) MaterialTheme.colorScheme.primaryContainer else MaterialTheme.colorScheme.surfaceContainerLowest
                )
                .padding(14.dp),
            verticalArrangement = Arrangement.spacedBy(6.dp)
        ) {
            Text(
                text = message.text,
                style = MaterialTheme.typography.bodyMedium.copy(lineHeight = 20.sp),
                color = if (isUser) MaterialTheme.colorScheme.onPrimaryContainer else MaterialTheme.colorScheme.onSurface
            )

            if (message.isActionable && message.actionText != null) {
                Surface(
                    modifier = Modifier
                        .clip(RoundedCornerShape(8.dp))
                        .background(MaterialTheme.colorScheme.primary)
                        .clickable { onActionClick?.invoke(message.actionText) }
                        .padding(horizontal = 12.dp, vertical = 6.dp),
                    color = MaterialTheme.colorScheme.primary
                ) {
                    Text(
                        text = message.actionText,
                        style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
                        color = MaterialTheme.colorScheme.onPrimary
                    )
                }
            }

            Text(
                text = message.timestamp,
                style = MaterialTheme.typography.labelSmall.copy(fontSize = 9.sp),
                color = MaterialTheme.colorScheme.outline
            )
        }

        if (isUser) {
            Spacer(modifier = Modifier.width(8.dp))
            Box(
                modifier = Modifier
                    .size(28.dp)
                    .clip(CircleShape)
                    .background(MaterialTheme.colorScheme.primary),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Default.Person,
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.onPrimary,
                    modifier = Modifier.size(16.dp)
                )
            }
        }
    }
}

private fun generateAiResponse(query: String): ChatMessage {
    val q = query.lowercase()
    val responseText = when {
        q.contains("stockout") || q.contains("risk") || q.contains("paper") -> {
            "CRITICAL ALERT: Printer Paper A4 (500 Sheets) has 42 units remaining at Indiranagar Store A. Burn rate is 18 units/day, leading to zero stock in under 48 hours.\n\nRecommended Action: Reorder 120 units from PaperCorp India (24h expedited lead time). Total cost: ₹14,400. This prevents an estimated ₹28,000 order halt."
        }
        q.contains("tech fest") || q.contains("surge") || q.contains("spike") || q.contains("cable") -> {
            "DEMAND FORECAST: The upcoming Tech Festival weekend is projected to increase Braided USB-C Cable demand by +30% (from 184 to 240 units).\n\nRecommended Action: Dispatch a fast buffer replenishment of 100 units from Apex Connect Ltd. Estimated stockout risk without buffer: 92%."
        }
        q.contains("transfer") || q.contains("imbalance") || q.contains("camera") -> {
            "INTER-HUB IMBALANCE: Central Logistics C (Peenya) holds 147 units of Smart Security Cam 2K Pro (excess stock buffer), while Indiranagar Store A has only 12 units (critical deficit).\n\nRecommended Action: Dispatch an intra-city truck transfer of 30 units (C → A). Transit duration is 4 hours, and it eliminates an emergency factory air-cargo surcharge, saving ₹3,200."
        }
        q.contains("dead stock") || q.contains("monitor") || q.contains("liquidation") -> {
            "DEAD STOCK DETECTED: 34 units of Vintage LED Monitor 21\" have been stagnant for 93 days at Peenya warehouse. Trapped capital: ₹76,000.\n\nRecommended Action: Execute a 25% B2B bundle discount on the wholesale portal, or submit an RMA credit return to avoid Q4 depreciation lock."
        }
        q.contains("telemetry") || q.contains("capacity") || q.contains("warehouse") -> {
            "WAREHOUSE TELEMETRY:\n• Store A (Indiranagar): 88% capacity (1,240/1,400 pallets) - NEAR CAP\n• Central Logistics C (Peenya): 92% capacity (18,400/20,000 sq.ft) - HIGH\n• Store B (Koramangala): 64% capacity (890/1,400 pallets) - OPTIMAL\n\nRecommendation: Route all new inbound non-critical pallet shipments to Koramangala Store B to relieve Indiranagar pressure."
        }
        else -> {
            "StockSense Intelligence analysis for \"$query\": Network metrics indicate overall inventory health is at 86% Optimal. Total network value is ₹42.8 L across 2,481 SKUs. Currently 38 SKUs are in low-stock status and 21 lines are overstocked. You can issue purchase orders, transfer stock, or initiate barcode audits from the command center."
        }
    }

    return ChatMessage(
        sender = MessageSender.AI,
        text = responseText,
        timestamp = "Just now",
        isActionable = true,
        actionText = when {
            q.contains("stockout") -> "Review Purchase Order (₹14,400)"
            q.contains("surge") -> "Quick Restock (100 Units)"
            q.contains("transfer") -> "Dispatch Transfer (30 Units C → A)"
            else -> "View Command Center"
        }
    )
}
