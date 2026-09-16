package com.example.ui.components

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.unit.dp

@Composable
fun SparklineChart(
    modifier: Modifier = Modifier
        .fillMaxWidth()
        .height(34.dp),
    lineColor: Color = Color(0xFF00855B)
) {
    Canvas(modifier = modifier) {
        val w = size.width
        val h = size.height

        // Normalized control points matching:
        // M0,20 Q15,18 30,12 T60,14 T80,6 T100,2 (on 100x24 space)
        val p0 = Offset(0f, h * 0.83f)
        val cp1 = Offset(w * 0.15f, h * 0.75f)
        val p1 = Offset(w * 0.30f, h * 0.50f)
        val cp2 = Offset(w * 0.45f, h * 0.25f)
        val p2 = Offset(w * 0.60f, h * 0.58f)
        val cp3 = Offset(w * 0.75f, h * 0.90f)
        val p3 = Offset(w * 0.80f, h * 0.25f)
        val cp4 = Offset(w * 0.85f, h * -0.3f)
        val p4 = Offset(w * 1.0f, h * 0.12f)

        val strokePath = Path().apply {
            moveTo(p0.x, p0.y)
            quadraticTo(cp1.x, cp1.y, p1.x, p1.y)
            quadraticTo(w * 0.45f, h * 0.25f, p2.x, p2.y)
            quadraticTo(w * 0.70f, h * 0.65f, p3.x, p3.y)
            quadraticTo(w * 0.90f, h * 0.10f, p4.x, p4.y)
        }

        val fillPath = Path().apply {
            addPath(strokePath)
            lineTo(w, h)
            lineTo(0f, h)
            close()
        }

        // Fill with subtle translucent gradient
        drawPath(
            path = fillPath,
            brush = Brush.verticalGradient(
                colors = listOf(
                    lineColor.copy(alpha = 0.20f),
                    lineColor.copy(alpha = 0.02f)
                ),
                startY = 0f,
                endY = h
            )
        )

        // Draw line
        drawPath(
            path = strokePath,
            color = lineColor,
            style = Stroke(
                width = 2.5f * density,
                cap = StrokeCap.Round
            )
        )

        // Draw end dot
        drawCircle(
            color = lineColor,
            radius = 3.5f * density,
            center = p4
        )
    }
}

@Composable
fun HealthScoreGauge(
    score: Int,
    modifier: Modifier = Modifier
) {
    Canvas(modifier = modifier) {
        val strokeWidth = 3.5f * density
        val diameter = size.minDimension - strokeWidth
        val topLeft = Offset(
            (size.width - diameter) / 2f,
            (size.height - diameter) / 2f
        )
        val arcSize = androidx.compose.ui.geometry.Size(diameter, diameter)

        // Background circle track
        drawArc(
            color = Color(0xFFEAEDFF),
            startAngle = 0f,
            sweepAngle = 360f,
            useCenter = false,
            topLeft = topLeft,
            size = arcSize,
            style = Stroke(width = strokeWidth)
        )

        // Progress arc (starts from top, sweeps clockwise)
        val sweep = (score / 100f) * 360f
        drawArc(
            color = Color(0xFF2170E4),
            startAngle = -90f,
            sweepAngle = sweep,
            useCenter = false,
            topLeft = topLeft,
            size = arcSize,
            style = Stroke(
                width = strokeWidth,
                cap = StrokeCap.Round
            )
        )
    }
}
