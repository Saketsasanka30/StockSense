import React, { useState } from 'react';
import { ScanLine, Camera, Upload, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

export const StockVision: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        item: 'Printer Paper A4 (500 Sheets)',
        sku: 'SKU-0012-A4',
        systemCount: 42,
        visionEstimatedCount: 42,
        confidence: 0.98,
        status: 'MATCHED',
        note: 'Zero variance detected across primary shelf rack B14.',
      });
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <ScanLine className="w-5 h-5 text-blue-600" />
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">AI StockVision™ Shelf Scanner</h1>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Computer-vision verification of physical shelf stock against real-time database quantities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera Viewfinder Box */}
        <div className="bg-slate-950 rounded-xl p-6 flex flex-col items-center justify-center min-h-[360px] relative overflow-hidden text-center text-white border border-slate-800 shadow-lg">
          {/* Laser guide lines */}
          <div className="absolute inset-x-8 top-12 bottom-12 border-2 border-blue-500/30 rounded-lg pointer-events-none flex items-center justify-center">
            <div className="w-full h-0.5 bg-blue-500/80 shadow-[0_0_12px_#3b82f6] animate-pulse"></div>
          </div>

          <Camera className="w-12 h-12 text-blue-400 mb-3" />
          <div className="font-bold text-sm">Align Shelf Rack or Pallet in Viewfinder</div>
          <div className="text-xs text-slate-400 mt-1 max-w-xs">
            StockSense AI automatically extracts barcode markers and computes 3D bounding boxes.
          </div>

          <div className="mt-8 z-10 flex gap-3">
            <button
              onClick={handleSimulateScan}
              disabled={isScanning}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-xs font-bold transition shadow"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing Vision Model...</span>
                </>
              ) : (
                <>
                  <ScanLine className="w-4 h-4" />
                  <span>Capture & Analyze</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Audit Report & Comparison */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-1">Vision Count Reconciliation</h2>
            <p className="text-xs text-slate-500">
              Audit results are compared against ERP records to detect inventory shrinkage or misplaced bins.
            </p>

            {scanResult ? (
              <div className="mt-6 space-y-4">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Physical Shelf Count Confirmed</span>
                  </div>
                  <div className="mt-2 text-xs text-slate-700 space-y-1">
                    <div>
                      <span className="text-slate-500">Target Product:</span>{' '}
                      <span className="font-bold text-slate-900">{scanResult.item}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">SKU:</span>{' '}
                      <span className="font-mono text-slate-700">{scanResult.sku}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Database Record:</span>{' '}
                      <span className="font-bold">{scanResult.systemCount} units</span>
                    </div>
                    <div>
                      <span className="text-slate-500">StockVision AI Count:</span>{' '}
                      <span className="font-bold text-emerald-700">{scanResult.visionEstimatedCount} units</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Confidence:</span>{' '}
                      <span className="font-bold">{Math.round(scanResult.confidence * 100)}%</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-500 italic">{scanResult.note}</p>
              </div>
            ) : (
              <div className="mt-12 text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <ScanLine className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <div className="text-xs font-semibold text-slate-600">No active shelf capture</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Click 'Capture & Analyze' to run simulated computer vision audit.
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
            <button
              disabled={!scanResult}
              className="bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white px-4 py-2 rounded-lg text-xs font-bold transition"
            >
              Sign-Off Physical Count
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
