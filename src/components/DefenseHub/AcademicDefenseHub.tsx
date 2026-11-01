import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Presentation,
  Network,
  Copy,
  Check,
  Printer,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Award,
  CheckCircle2,
  XCircle,
  Zap,
  Droplets
} from 'lucide-react';
import { ACADEMIC_ABSTRACT, CHAPTER_4_CONTENT, CHAPTER_5_CONTENT } from '../../data/academicDrafts';
import { GHANA_APP_COMPARISON_MATRIX } from '../../data/ghanaAgroData';

export const AcademicDefenseHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'abstract' | 'chapter4' | 'chapter5' | 'architecture' | 'use_case' | 'ghana_benchmark'>('abstract');
  const [copiedAbstract, setCopiedAbstract] = useState<boolean>(false);

  const handleCopyAbstract = () => {
    navigator.clipboard.writeText(ACADEMIC_ABSTRACT.abstractText);
    setCopiedAbstract(true);
    setTimeout(() => setCopiedAbstract(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" /> Part 5 — Documentation & Academic Defense Support
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
            Academic Thesis Materials & Defense Slide Deck
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
            Ready-to-submit Chapter 4 (Implementation & Results) and Chapter 5 (Conclusion & Recommendations) write-ups, 1-page defense abstract, and interactive system architecture and use case diagrams.
          </p>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center gap-1 bg-stone-100 p-1.5 rounded-xl border border-stone-200 self-start md:self-auto overflow-x-auto">
          {[
            { id: 'abstract', label: '1-Page Abstract', icon: <Presentation className="w-3.5 h-3.5" /> },
            { id: 'chapter4', label: 'Chapter 4 (Results)', icon: <BookOpen className="w-3.5 h-3.5" /> },
            { id: 'chapter5', label: 'Chapter 5 (Conclusion)', icon: <BookOpen className="w-3.5 h-3.5" /> },
            { id: 'architecture', label: 'System Architecture', icon: <Network className="w-3.5 h-3.5" /> },
            { id: 'use_case', label: 'Use Case Diagram', icon: <Network className="w-3.5 h-3.5" /> },
            { id: 'ghana_benchmark', label: 'Ghana App Benchmark', icon: <Award className="w-3.5 h-3.5" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: 1-PAGE PROJECT ABSTRACT & SLIDE DECK ABSTRACT */}
      {activeTab === 'abstract' && (
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-stone-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  {ACADEMIC_ABSTRACT.student}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-stone-900 mt-2 leading-tight">
                  {ACADEMIC_ABSTRACT.title}
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Department of Computer Science • University Academic Defense
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyAbstract}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors"
                >
                  {copiedAbstract ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAbstract ? 'Copied' : 'Copy Abstract'}</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-colors shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>
              </div>
            </div>

            {/* Abstract Text */}
            <div className="text-sm leading-relaxed text-stone-700 space-y-4 font-serif text-justify">
              {ACADEMIC_ABSTRACT.abstractText.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Key Academic Keywords */}
            <div className="pt-6 border-t border-stone-100 text-xs">
              <strong className="text-stone-900">Keywords: </strong>
              <span className="text-stone-600 font-mono">
                Convolutional Neural Networks, Edge AI, MobileNetV2, Post-Training Quantization (INT8), Smallholder Farming, Crop Pathology, Ghana Agriculture, PlantVillage, CCMT Dataset, Zero-Network Inference.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CHAPTER 4 (IMPLEMENTATION & RESULTS) */}
      {activeTab === 'chapter4' && (
        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <div className="pb-4 border-b border-stone-100">
            <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">Final Year Project Dissertation</span>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
              {CHAPTER_4_CONTENT.title}
            </h3>
          </div>

          <div className="space-y-6 text-sm leading-relaxed text-stone-800">
            {CHAPTER_4_CONTENT.sections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="text-base font-bold text-stone-900">{section.heading}</h4>
                <p className="text-stone-700 text-justify leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CHAPTER 5 (CONCLUSION & RECOMMENDATIONS) */}
      {activeTab === 'chapter5' && (
        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <div className="pb-4 border-b border-stone-100">
            <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">Final Year Project Dissertation</span>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
              {CHAPTER_5_CONTENT.title}
            </h3>
          </div>

          <div className="space-y-6 text-sm leading-relaxed text-stone-800">
            {CHAPTER_5_CONTENT.sections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="text-base font-bold text-stone-900">{section.heading}</h4>
                <div className="text-stone-700 whitespace-pre-line text-justify leading-relaxed">
                  {section.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SYSTEM ARCHITECTURE DIAGRAM */}
      {activeTab === 'architecture' && (
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-stone-900">End-to-End On-Device Edge System Architecture</h3>
              <p className="text-xs text-stone-500">Hardware & software workflow from camera photon capture to localized voice output</p>
            </div>
            <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
              Zero-Network Architecture
            </span>
          </div>

          {/* Interactive Flow Visualizer */}
          <div className="bg-stone-900 text-white p-6 rounded-2xl overflow-x-auto">
            <div className="min-w-[700px] flex items-center justify-between gap-3 text-center">
              {/* Box 1 */}
              <div className="bg-stone-800 p-4 rounded-xl border border-stone-700 w-44">
                <span className="text-2xl block mb-1">📸</span>
                <p className="text-xs font-bold text-emerald-400">1. Leaf Image Input</p>
                <p className="text-[10px] text-stone-400 mt-1">Android Camera Sensor / Gallery Image</p>
              </div>

              <ChevronRight className="w-5 h-5 text-emerald-500 shrink-0" />

              {/* Box 2 */}
              <div className="bg-stone-800 p-4 rounded-xl border border-stone-700 w-44">
                <span className="text-2xl block mb-1">⚙️</span>
                <p className="text-xs font-bold text-emerald-400">2. Preprocessing</p>
                <p className="text-[10px] text-stone-400 mt-1">Resize 224x224 RGB, UINT8 Quantized Tensor</p>
              </div>

              <ChevronRight className="w-5 h-5 text-emerald-500 shrink-0" />

              {/* Box 3 */}
              <div className="bg-emerald-950/80 p-4 rounded-xl border border-emerald-500 w-48 shadow-lg shadow-emerald-900/50">
                <span className="text-2xl block mb-1">🧠</span>
                <p className="text-xs font-bold text-emerald-300">3. TFLite Interpreter</p>
                <p className="text-[10px] text-stone-300 mt-1">MobileNetV2 INT8 (2.8MB), NNAPI Acceleration (42ms)</p>
              </div>

              <ChevronRight className="w-5 h-5 text-emerald-500 shrink-0" />

              {/* Box 4 */}
              <div className="bg-stone-800 p-4 rounded-xl border border-stone-700 w-44">
                <span className="text-2xl block mb-1">🗄️</span>
                <p className="text-xs font-bold text-emerald-400">4. SQLite Database</p>
                <p className="text-[10px] text-stone-400 mt-1">MoFA Chemical & Organic Treatments Catalog</p>
              </div>

              <ChevronRight className="w-5 h-5 text-emerald-500 shrink-0" />

              {/* Box 5 */}
              <div className="bg-stone-800 p-4 rounded-xl border border-stone-700 w-44">
                <span className="text-2xl block mb-1">🔊</span>
                <p className="text-xs font-bold text-emerald-400">5. Farmer Output</p>
                <p className="text-[10px] text-stone-400 mt-1">High-contrast UI + Twi/Ga/EN Voice Readout</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: USE CASE DIAGRAM */}
      {activeTab === 'use_case' && (
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-black text-stone-900">UML Use Case Specification (Rural Farming Scenario)</h3>
            <p className="text-xs text-stone-500">Actors, system boundaries, and offline operations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wide text-emerald-800">Primary Actors</h4>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-white rounded-xl border border-stone-200">
                  <p className="font-bold text-stone-900">Actor 1: Smallholder Farmer (Primary User)</p>
                  <p className="text-stone-600 mt-0.5">Captures photo in field, receives instant diagnosis, listens to audio treatment in local language.</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-stone-200">
                  <p className="font-bold text-stone-900">Actor 2: MoFA Agricultural Extension Agent (AEA)</p>
                  <p className="text-stone-600 mt-0.5">Consults chemical active ingredients and recommended knapsack dosage rates; exports CSV logs for district reports.</p>
                </div>
              </div>
            </div>

            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wide text-emerald-800">Core Use Cases (Offline Boundary)</h4>
              <ul className="space-y-2 text-xs text-stone-700">
                <li className="p-2 bg-white rounded-xl border border-stone-200 flex items-center gap-2">
                  <span className="text-emerald-700 font-bold">UC-01:</span>
                  <span>Capture / Select Leaf Image without internet connectivity</span>
                </li>
                <li className="p-2 bg-white rounded-xl border border-stone-200 flex items-center gap-2">
                  <span className="text-emerald-700 font-bold">UC-02:</span>
                  <span>Execute Neural Classification via on-device TFLite model</span>
                </li>
                <li className="p-2 bg-white rounded-xl border border-stone-200 flex items-center gap-2">
                  <span className="text-emerald-700 font-bold">UC-03:</span>
                  <span>Retrieve MoFA Registered Treatment from local SQLite table</span>
                </li>
                <li className="p-2 bg-white rounded-xl border border-stone-200 flex items-center gap-2">
                  <span className="text-emerald-700 font-bold">UC-04:</span>
                  <span>Play Localized Voice Synthesis in Ghanaian vernacular (Twi / Ga)</span>
                </li>
                <li className="p-2 bg-white rounded-xl border border-stone-200 flex items-center gap-2">
                  <span className="text-emerald-700 font-bold">UC-05:</span>
                  <span>Record Scan to Persistent History & Export CSV Report</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: GHANA COMPETITIVE BENCHMARK & ADVANCEMENTS */}
      {activeTab === 'ghana_benchmark' && (
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Academic & Practical Contribution
              </span>
              <h3 className="text-lg sm:text-xl font-black text-stone-900 mt-2">
                Comparative Empirical Benchmark: AgriScan Ghana vs. Existing Field Solutions
              </h3>
              <p className="text-xs text-stone-500 mt-0.5 max-w-3xl leading-relaxed">
                Demonstrates tangible architectural and agronomic superiority over PlantVillage Nuru (Penn State/FAO/MoFA) and Plantix (Peat GmbH) under Ghanaian smallholder constraints.
              </p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-mono text-stone-700">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>MoFA & EPA Ghana Calibrated</span>
            </div>
          </div>

          {/* Three Key Architectural Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-950 font-bold text-xs uppercase">
                <Zap className="w-4 h-4 text-emerald-700" />
                <span>1. Zero-Bandwidth Edge Inference</span>
              </div>
              <p className="text-xs text-emerald-900 leading-relaxed">
                42ms on-device latency with 2.84 MB INT8 model. Operates seamlessly in off-grid rural farming communities with zero cellular network.
              </p>
            </div>

            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-950 font-bold text-xs uppercase">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>2. Ghana EPA Anti-Counterfeit</span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                Integrates official EPA Ghana registration numbers and scratch-code verification to eliminate lethal counterfeit pesticides and banned chemicals.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 space-y-1.5">
              <div className="flex items-center gap-2 text-blue-950 font-bold text-xs uppercase">
                <Droplets className="w-4 h-4 text-blue-700" />
                <span>3. Knapsack & Rain-Fastness</span>
              </div>
              <p className="text-xs text-blue-900 leading-relaxed">
                Calibrated to Ghanaian customary "Poles" & Acres, 15L knapsack tank counts, and local meteorological rain wash-off risks.
              </p>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-100 text-stone-700 border-b border-stone-200">
                    <th className="p-3 font-bold w-1/3">Evaluation Metric / Capability</th>
                    <th className="p-3 font-black text-emerald-950 bg-emerald-100/70 border-x border-emerald-200 w-1/4">
                      AgriScan Ghana (Proposed System)
                    </th>
                    <th className="p-3 font-semibold text-stone-700 w-1/5">
                      PlantVillage Nuru (FAO/MoFA)
                    </th>
                    <th className="p-3 font-semibold text-stone-700 w-1/5">
                      Plantix (Commercial Global)
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
                                Unique Innovation
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
      )}
    </div>
  );
};
