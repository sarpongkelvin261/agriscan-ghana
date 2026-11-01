import React, { useEffect, useState } from 'react';
import { RefreshCw, Sparkles, Check, X } from 'lucide-react';

interface PWAUpdateNotificationProps {
  onUpdateApplied?: () => void;
}

export const PWAUpdateNotification: React.FC<PWAUpdateNotificationProps> = ({
  onUpdateApplied,
}) => {
  const [needRefresh, setNeedRefresh] = useState<boolean>(false);
  const [updateFunction, setUpdateFunction] = useState<(() => Promise<void>) | null>(null);
  const [isApplying, setIsApplying] = useState<boolean>(false);
  const [dismissed, setDismissed] = useState<boolean>(false);

  useEffect(() => {
    // Listen for custom dispatch from virtual:pwa-register or service worker registration
    const handleSWUpdate = (event: CustomEvent<{ update: () => Promise<void> }>) => {
      setNeedRefresh(true);
      if (event.detail && typeof event.detail.update === 'function') {
        setUpdateFunction(() => event.detail.update);
      }
    };

    window.addEventListener('pwa:need-refresh' as any, handleSWUpdate);

    // Also support standard service worker controllerchange
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // A new version is available and ready!
                setNeedRefresh(true);
                setUpdateFunction(() => async () => {
                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                  window.location.reload();
                });
              }
            });
          }
        });
      });
    }

    return () => {
      window.removeEventListener('pwa:need-refresh' as any, handleSWUpdate);
    };
  }, []);

  const handleApplyUpdate = async () => {
    setIsApplying(true);
    try {
      if (updateFunction) {
        await updateFunction();
      } else {
        // Fallback: force reload from server bypassing HTTP cache
        window.location.reload();
      }
      if (onUpdateApplied) {
        onUpdateApplied();
      }
    } catch (err) {
      console.error('Failed to reload with update:', err);
      window.location.reload();
    }
  };

  if (!needRefresh || dismissed) {
    return null;
  }

  return (
    <aside
      aria-label="App Update Notification"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in slide-in-from-bottom duration-300 pointer-events-auto"
    >
      <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 text-white p-4 rounded-2xl shadow-2xl border-2 border-emerald-500/80 backdrop-blur-md flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600/90 text-white flex items-center justify-center shrink-0 shadow-sm border border-emerald-400/40">
              <Sparkles className="w-5 h-5 text-emerald-200 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-black tracking-tight text-white">
                  App Update Available
                </h4>
                <span className="text-[9px] uppercase tracking-wider font-extrabold bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 px-1.5 py-0.2 rounded-full">
                  New Code Ready
                </span>
              </div>
              <p className="text-[11px] text-stone-300 mt-0.5 leading-snug">
                Changes have been deployed to AgriScan. Tap update to apply new features to your phone immediately.
              </p>
            </div>
          </div>

          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            title="Dismiss for now"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleApplyUpdate}
            disabled={isApplying}
            className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isApplying ? 'animate-spin' : ''}`} />
            <span>{isApplying ? 'Applying Changes...' : 'Update & Apply Changes'}</span>
          </button>

          <button
            onClick={() => setDismissed(true)}
            className="py-2 px-3 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-semibold transition-colors"
          >
            Later
          </button>
        </div>
      </div>
    </aside>
  );
};
