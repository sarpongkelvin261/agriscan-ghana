import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Zap,
  Layers,
  Award,
  ChevronRight,
  WifiOff
} from 'lucide-react';
import { GHANA_APP_COMPARISON_MATRIX, AppComparisonFeature } from '../../data/ghanaAgroData';

interface GhanaAppComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GhanaAppComparisonModal: React.FC<GhanaAppComparisonModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full border border-stone-200 shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-stone-900 text-white p-5 sm:p-6 border-b border-stone-800 shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Award className="w-4 h-4" /> Competitive Benchmarking & Architectural Upgrades
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white mt-1">
                AgriScan Ghana vs. Existing Field Disease Apps in Ghana
              </h3>
              <p className="text-xs text-stone-300 mt-1 max-w-2xl leading-relaxed">
                Empirical feature-by-feature comparison demonstrating why AgriScan is significantly more advanced, practical, and resilient than PlantVillage Nuru, Plantix, and legacy MoFA portals.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-white p-2 rounded-xl hover:bg-stone-800 transition-colors shrink-0 font-bold"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Body / Comparison Matrix */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-stone-800">
          {/* Executive Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
              <div className="flex items-center gap-2 text-emerald-950 font-black text-xs uppercase tracking-wide">
                <Zap className="w-4 h-4 text-emerald-700" />
                1. Edge Speed & Zero-Data
              </div>
              <p className="text-xs text-emerald-900 mt-1.5 leading-snug">
                <strong>42ms on-device latency</strong> with 2.84 MB INT8 footprint vs. 15–30s cloud upload delays or 180MB bloated models.
              </p>
            </div>

            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
              <div className="flex items-center gap-2 text-amber-950 font-black text-xs uppercase tracking-wide">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                2. Regulatory & Anti-Fake
              </div>
              <p className="text-xs text-amber-900 mt-1.5 leading-snug">
                Integrates <strong>EPA Ghana / PPRSD approved chemicals</strong> and scratch-code authentication to combat counterfeit pesticides.
              </p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
              <div className="flex items-center gap-2 text-blue-950 font-black text-xs uppercase tracking-wide">
                <Layers className="w-4 h-4 text-blue-700" />
                3. Actionable Field Mix
              </div>
              <p className="text-xs text-blue-900 mt-1.5 leading-snug">
                Calibrated to <strong>15L/16L knapsacks</strong>, Ghanaian <strong>Poles & Acres</strong>, and rain-fastness wash-off radar.
              </p>
            </div>
          </div>

          {/* Detailed Matrix Table */}
          <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-100 text-stone-700 border-b border-stone-200">
                    <th className="p-3 font-bold w-1/3">Capability / Feature</th>
                    <th className="p-3 font-black text-emerald-950 bg-emerald-100/70 border-x border-emerald-200 w-1/4">
                      AgriScan Ghana (Upgraded)
                    </th>
                    <th className="p-3 font-semibold text-stone-700 w-1/5">
                      PlantVillage Nuru (FAO/MoFA)
                    </th>
                    <th className="p-3 font-semibold text-stone-700 w-1/5">
                      Plantix (Peat / Global)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {GHANA_APP_COMPARISON_MATRIX.map((item, idx) => (
                    <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                      <td className="p-3">
                        <div className="font-bold text-stone-900">{item.featureName}</div>
                        <div className="text-[10px] text-stone-500 uppercase tracking-wider mt-0.5">{item.category}</div>
                      </td>
                      <td className="p-3 bg-emerald-50/40 border-x border-emerald-200 font-medium text-emerald-950">
                        <div className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold block">{item.agriScanGhana.detail}</span>
                            {item.agriScanGhana.advantage === 'unique' && (
                              <span className="text-[9px] uppercase font-black tracking-wider bg-emerald-700 text-white px-1.5 py-0.2 rounded inline-block mt-1">
                                Unique to AgriScan
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-stone-600">
                        <div className="flex items-start gap-1.5">
                          {item.plantVillageNuru.supported ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                          )}
                          <span className="text-[11px] leading-snug">{item.plantVillageNuru.detail}</span>
                        </div>
                      </td>
                      <td className="p-3 text-stone-600">
                        <div className="flex items-start gap-1.5">
                          {item.plantixPeat.supported ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                          )}
                          <span className="text-[11px] leading-snug">{item.plantixPeat.detail}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-stone-100 p-4 border-t border-stone-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1 text-xs text-stone-600">
            <span className="font-bold text-emerald-800">Final Defense Conclusion:</span> AgriScan bridges the gap between academic vision models and real Ghanaian smallholder farming conditions.
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
