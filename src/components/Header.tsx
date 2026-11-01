import React from 'react';
import { Menu, WifiOff, Maximize2, QrCode, Smartphone, BookOpen, Calculator, CloudRain, ShieldAlert, Radio } from 'lucide-react';
import { MainView } from './Sidebar';

interface HeaderProps {
  currentView: MainView;
  onOpenMobileMenu: () => void;
  isZenMode?: boolean;
  onToggleZenMode?: () => void;
  onOpenAndroidTesting?: () => void;
}

const VIEW_TITLES: Record<MainView, { title: string; subtitle: string; icon: React.ReactNode }> = {
  scanner: {
    title: 'Field Diagnostic Workspace',
    subtitle: 'Edge AI Leaf Scanner & Multilingual Voice Guidance',
    icon: <Smartphone className="w-4 h-4 text-emerald-400" />
  },
  clinical: {
    title: '9 Ghanaian Crops & MoFA Pathology Index',
    subtitle: 'Standardized Pathology Profiles & CSIR-CRI Dosage Protocols',
    icon: <BookOpen className="w-4 h-4 text-emerald-400" />
  },
  dosage_calculator: {
    title: 'Knapsack Dosage Calculator',
    subtitle: 'Ghana EPA Dilution Rates for 15L Smallholder Sprayers',
    icon: <Calculator className="w-4 h-4 text-emerald-400" />
  },
  spray_weather: {
    title: 'Spray Weather Advisory',
    subtitle: 'Microclimate Wind & Precipitation Runoff Prevention',
    icon: <CloudRain className="w-4 h-4 text-emerald-400" />
  },
  agrochemical_auth: {
    title: 'Agrochemical Authenticator',
    subtitle: 'EPA / CRIG Regulatory Batch Barcode Verification',
    icon: <ShieldAlert className="w-4 h-4 text-emerald-400" />
  },
  outbreak_radar: {
    title: 'Regional Outbreak Radar',
    subtitle: '16 Ghanaian Agricultural Regions Real-Time Alert Heatmap',
    icon: <Radio className="w-4 h-4 text-emerald-400" />
  }
};

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onOpenMobileMenu,
  isZenMode,
  onToggleZenMode,
  onOpenAndroidTesting
}) => {
  const info = VIEW_TITLES[currentView] || VIEW_TITLES.scanner;

  return (
    <header className="bg-stone-900 border-b border-stone-800 sticky top-0 z-30 text-white shadow-md">
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        {/* Left: Mobile Menu Toggle & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white transition-colors"
            title="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex p-1 rounded-lg bg-stone-800/80 border border-stone-700/60">
                {info.icon}
              </span>
              <h2 className="text-sm sm:text-base font-extrabold tracking-tight text-white truncate">
                {info.title}
              </h2>
            </div>
            <p className="text-[11px] text-stone-300 hidden md:block">
              {info.subtitle}
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Offline Edge AI Badge */}
          <span className="hidden sm:flex items-center gap-1.5 text-[11px] bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full font-bold">
            <WifiOff className="w-3 h-3 text-emerald-400" />
            <span>100% Offline AI</span>
          </span>

          {/* Test on Android Phone Button */}
          {onOpenAndroidTesting && (
            <button
              onClick={onOpenAndroidTesting}
              title="Test on Android Phone (Scan QR Code or Open Link)"
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 border border-emerald-400/30 shadow-xs transition-all active:scale-95 whitespace-nowrap"
            >
              <QrCode className="w-3.5 h-3.5 text-emerald-200" />
              <span>Test on Phone</span>
            </button>
          )}

          {/* Fullscreen / Pure App Mode Toggle */}
          {currentView === 'scanner' && onToggleZenMode && (
            <button
              onClick={onToggleZenMode}
              title="Fullscreen Pure Mobile App (Hide all outer bars)"
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline text-[11px]">Pure App</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
