import React, { useState } from 'react';
import {
  Smartphone,
  Download,
  Share2,
  CheckCircle2,
  ExternalLink,
  X,
  Sparkles,
  Camera,
  WifiOff,
  Volume2
} from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp?: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
  onOpenApp,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [installSuccess, setInstallSuccess] = useState<boolean>(false);
  const [isInstalling, setIsInstalling] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    setIsInstalling(true);
    try {
      const installed = await install();
      if (installed) {
        setInstallSuccess(true);
        setTimeout(() => {
          onClose();
        }, 1800);
      }
    } catch (e) {
      console.error('Install failed:', e);
    } finally {
      setIsInstalling(false);
    }
  };

  const handleViewOnline = () => {
    if (onOpenApp) {
      onOpenApp();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
        {/* Header Banner */}
        <div className="bg-gradient-to-br from-emerald-800 via-emerald-900 to-stone-950 text-white p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          
          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-0.5 shadow-lg flex items-center justify-center border border-emerald-300/40">
                <img
                  src="/pwa-192x192.png"
                  alt="AgriScan Icon"
                  className="w-full h-full object-cover rounded-[14px]"
                  onError={(e) => {
                    // fallback if not yet loaded
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-extrabold tracking-tight">AgriScan Ghana</h3>
                  <span className="text-[10px] font-black uppercase bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                    PWA App
                  </span>
                </div>
                <p className="text-xs text-emerald-200/90 font-medium mt-0.5">
                  Offline Crop AI • CSIR-CRI Protocol
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-emerald-950/60 hover:bg-emerald-900 text-emerald-200 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-700/40 flex items-center justify-between text-[11px] text-emerald-200">
            <span className="flex items-center gap-1">
              <Camera className="w-3.5 h-3.5 text-emerald-300" />
              <span>Full Camera Hardware</span>
            </span>
            <span className="flex items-center gap-1">
              <WifiOff className="w-3.5 h-3.5 text-emerald-300" />
              <span>100% Offline AI</span>
            </span>
            <span className="flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>Ghanaian Audio</span>
            </span>
          </div>
        </div>

        {/* Action Choice Body */}
        <div className="p-5 space-y-4">
          {installSuccess ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto animate-bounce" />
              <h4 className="font-extrabold text-sm text-emerald-950">App Installed Successfully!</h4>
              <p className="text-xs text-stone-600">
                AgriScan Ghana is now added to your home screen and app launcher.
              </p>
            </div>
          ) : isInstalled ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-xs text-emerald-950">Already Installed as an App</h4>
              <p className="text-xs text-stone-600">
                You are currently running AgriScan as a standalone application.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center space-y-1">
                <p className="text-sm font-bold text-stone-900">
                  How would you like to use AgriScan Ghana?
                </p>
                <p className="text-xs text-stone-500">
                  Choose between adding the app icon to your phone or viewing it in your browser.
                </p>
              </div>

              {/* Two Prominent Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Option 1: Install App */}
                <button
                  onClick={isInstallable ? handleInstallClick : undefined}
                  disabled={isInstalling || (!isInstallable && !isIOS)}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    isInstallable || isIOS
                      ? 'bg-gradient-to-br from-emerald-700 to-emerald-800 text-white border-emerald-600 shadow-md hover:from-emerald-600 hover:to-emerald-700 active:scale-[0.98]'
                      : 'bg-stone-100 text-stone-400 border-stone-200 cursor-default'
                  }`}
                >
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white mb-2">
                      <Download className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-sm font-extrabold flex items-center gap-1.5">
                      <span>Install App</span>
                      <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-amber-400 text-stone-950 font-black">
                        Recommended
                      </span>
                    </div>
                    <p className={`text-[11px] mt-1 leading-snug ${isInstallable || isIOS ? 'text-emerald-100' : 'text-stone-400'}`}>
                      Adds AgriScan to your phone home screen and works offline with fast access.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/20 text-[11px] font-bold flex items-center justify-between">
                    <span>{isInstalling ? 'Installing...' : 'Install Now'}</span>
                    <span>&darr;</span>
                  </div>
                </button>

                {/* Option 2: View App (Browser) */}
                <button
                  onClick={handleViewOnline}
                  className="p-3.5 rounded-2xl bg-stone-50 hover:bg-stone-100 text-stone-800 border border-stone-200 text-left flex flex-col justify-between transition-all active:scale-[0.98] shadow-xs"
                >
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-stone-200 flex items-center justify-center text-stone-700 mb-2">
                      <ExternalLink className="w-5 h-5 text-stone-700" />
                    </div>
                    <div className="text-sm font-extrabold text-stone-900">
                      View App
                    </div>
                    <p className="text-[11px] text-stone-600 mt-1 leading-snug">
                      Continue using AgriScan directly in your web browser without installing.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-stone-200 text-[11px] font-bold text-emerald-800 flex items-center justify-between">
                    <span>Open in Browser</span>
                    <span>&rarr;</span>
                  </div>
                </button>
              </div>

              {/* iOS Manual Instructions if running on Safari */}
              {isIOS && !isInstallable && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-xs text-amber-900 space-y-1.5">
                  <div className="font-bold flex items-center gap-1.5 text-amber-950">
                    <Share2 className="w-3.5 h-3.5 text-amber-700" />
                    <span>How to Install on iPhone / iPad (Safari):</span>
                  </div>
                  <ol className="list-decimal pl-4 space-y-0.5 text-[11px] text-amber-800 leading-normal">
                    <li>Tap the <strong>Share</strong> button (box with upward arrow) at bottom of Safari.</li>
                    <li>Scroll down and tap <strong>"Add to Home Screen"</strong>.</li>
                    <li>Tap <strong>"Add"</strong> in the top-right corner.</li>
                  </ol>
                </div>
              )}

              {/* Browser without BeforeInstallPrompt prompt tip */}
              {!isInstallable && !isIOS && !isInstalled && (
                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-[11px] text-stone-600 flex items-start gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <p>
                    On Android Chrome, you can also tap the three dots (<strong>⋮</strong>) in the top-right corner and select <strong>"Install app"</strong>.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="bg-stone-50 px-5 py-3 border-t border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] text-stone-500 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Automatic Service Worker Updates</span>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-bold text-stone-600 hover:text-stone-900 px-3 py-1.5 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
