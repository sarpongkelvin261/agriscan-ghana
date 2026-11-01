import React from 'react';
import {
  Smartphone,
  BookOpen,
  Calculator,
  CloudRain,
  ShieldCheck,
  Radio,
  QrCode,
  WifiOff,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  Leaf,
  Layers,
  HelpCircle,
  ShieldAlert
} from 'lucide-react';

export type MainView =
  | 'scanner'
  | 'clinical'
  | 'dosage_calculator'
  | 'spray_weather'
  | 'agrochemical_auth'
  | 'outbreak_radar';

interface SidebarProps {
  currentView: MainView;
  onSelectView: (view: MainView) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onOpenAndroidModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  isOpen,
  onCloseMobile,
  isCollapsed,
  onToggleCollapse,
  onOpenAndroidModal
}) => {
  const primaryNavItems: {
    id: MainView;
    label: string;
    description: string;
    icon: React.ReactNode;
    badge?: string;
  }[] = [
    {
      id: 'scanner',
      label: 'Field Diagnostic App',
      description: 'Camera leaf scanner, healthy crop check & vernacular voice',
      icon: <Smartphone className="w-4 h-4" />,
      badge: 'Edge AI'
    },
    {
      id: 'clinical',
      label: '9 Crops & MoFA Index',
      description: 'Pathology catalog, chemical treatments & dosages',
      icon: <BookOpen className="w-4 h-4" />,
      badge: 'CSIR-CRI'
    }
  ];

  const fieldToolItems: {
    id: MainView;
    label: string;
    description: string;
    icon: React.ReactNode;
    badge?: string;
  }[] = [
    {
      id: 'dosage_calculator',
      label: 'Knapsack Dosage Calculator',
      description: 'Ghana EPA dilutions per 15L knapsack tank',
      icon: <Calculator className="w-4 h-4" />
    },
    {
      id: 'spray_weather',
      label: 'Spray Weather Advisor',
      description: 'Wind, rain & humidity runoff advisory',
      icon: <CloudRain className="w-4 h-4" />
    },
    {
      id: 'agrochemical_auth',
      label: 'Agrochemical Authenticator',
      description: 'Anti-counterfeit EPA/CRIG batch verification',
      icon: <ShieldAlert className="w-4 h-4" />
    },
    {
      id: 'outbreak_radar',
      label: 'Regional Outbreak Radar',
      description: '16 regions disease pressure heatmap',
      icon: <Radio className="w-4 h-4" />
    }
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-stone-950/70 z-40 lg:hidden backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen flex flex-col bg-stone-900 border-r border-stone-800 text-stone-200 transition-all duration-300 ease-in-out shadow-2xl lg:shadow-none ${
          isCollapsed ? 'lg:w-20' : 'lg:w-72'
        } ${
          isOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 border-b border-stone-800 flex items-center justify-between px-4 shrink-0 bg-stone-950/40">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white text-xl shadow-md shadow-emerald-900/40 shrink-0">
              🌿
            </div>
            {!isCollapsed && (
              <div className="truncate">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm text-white tracking-tight">AgriScan Ghana</span>
                  <span className="text-[9px] font-black uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded">
                    MoFA
                  </span>
                </div>
                <p className="text-[10px] text-stone-400 truncate">
                  Offline Edge Diagnostic Suite
                </p>
              </div>
            )}
          </div>

          {/* Close button for Mobile / Collapse button for Desktop */}
          <div className="flex items-center gap-1">
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              title="Close menu"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Navigation Body */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-thin scrollbar-thumb-stone-800">
          {/* Section: Diagnostic Workspace */}
          <div>
            {!isCollapsed && (
              <p className="px-3 text-[10px] font-black uppercase tracking-wider text-stone-400 mb-2">
                Core Workspace
              </p>
            )}
            <div className="space-y-1">
              {primaryNavItems.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectView(item.id);
                      onCloseMobile();
                    }}
                    title={isCollapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                      isActive
                        ? 'bg-emerald-600 text-white font-bold shadow-sm shadow-emerald-900/40'
                        : 'text-stone-300 hover:bg-stone-800/80 hover:text-white'
                    }`}
                  >
                    <div
                      className={`shrink-0 ${
                        isActive ? 'text-white' : 'text-emerald-400'
                      }`}
                    >
                      {item.icon}
                    </div>
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold truncate">{item.label}</span>
                          {item.badge && (
                            <span
                              className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${
                                isActive
                                  ? 'bg-emerald-800 text-emerald-100'
                                  : 'bg-stone-800 text-emerald-400 border border-stone-700'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-[10px] truncate leading-tight mt-0.5 ${
                            isActive ? 'text-emerald-100' : 'text-stone-300'
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Field Agronomy Tools */}
          <div>
            {!isCollapsed && (
              <p className="px-3 text-[10px] font-black uppercase tracking-wider text-stone-400 mb-2">
                Field Agronomy Tools
              </p>
            )}
            <div className="space-y-1">
              {fieldToolItems.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectView(item.id);
                      onCloseMobile();
                    }}
                    title={isCollapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all ${
                      isActive
                        ? 'bg-emerald-600 text-white font-bold shadow-sm shadow-emerald-900/40'
                        : 'text-stone-400 hover:bg-stone-800/70 hover:text-stone-200'
                    }`}
                  >
                    <div
                      className={`shrink-0 ${
                        isActive ? 'text-white' : 'text-stone-400'
                      }`}
                    >
                      {item.icon}
                    </div>
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-semibold truncate block">
                          {item.label}
                        </span>
                        <p
                          className={`text-[10px] truncate leading-tight mt-0.5 ${
                            isActive ? 'text-emerald-100' : 'text-stone-300'
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Android Mobile Phone Testing Card */}
          <div className="pt-2">
            {!isCollapsed ? (
              <div className="bg-gradient-to-br from-emerald-950 via-stone-900 to-emerald-950 p-3.5 rounded-2xl border border-emerald-800/50 space-y-2.5 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600/40 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                    <Smartphone className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="text-xs font-bold text-white truncate">Test on Phone</h5>
                    <p className="text-[10px] text-emerald-300 truncate">Camera & Offline PWA</p>
                  </div>
                </div>

                <p className="text-[10px] text-stone-300 leading-relaxed">
                  Open on your Android phone to test with real device cameras, voice audio, and healthy crop detection.
                </p>

                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => {
                      onOpenAndroidModal();
                      onCloseMobile();
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95 border border-amber-300/40"
                  >
                    <span className="w-2 h-2 rounded-full bg-stone-950" />
                    <span>AGSG Icon & APK Studio</span>
                  </button>
                  <button
                    onClick={() => {
                      onOpenAndroidModal();
                      onCloseMobile();
                    }}
                    className="w-full py-1.5 px-3 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 border border-emerald-600/40"
                  >
                    <QrCode className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Phone QR Code</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenAndroidModal();
                  onCloseMobile();
                }}
                title="Test on Android Phone (QR Code)"
                className="w-full p-2.5 rounded-xl bg-emerald-800/60 hover:bg-emerald-700 text-emerald-200 flex items-center justify-center transition-colors border border-emerald-700/50"
              >
                <QrCode className="w-4 h-4 text-emerald-300" />
              </button>
            )}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-stone-800 bg-stone-950/60 text-xs shrink-0">
          {!isCollapsed ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-stone-300">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  ~42ms Edge AI
                </span>
                <span className="flex items-center gap-1 text-stone-300">
                  <WifiOff className="w-3 h-3" />
                  100% Offline
                </span>
              </div>
              <p className="text-[9px] text-stone-300 leading-tight">
                CSIR-CRI & MoFA Ghana Approved Protocols
              </p>
            </div>
          ) : (
            <div className="flex justify-center" title="100% Offline Edge AI">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
