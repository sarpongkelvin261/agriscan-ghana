import React from 'react';
import { MobileSimulator } from './components/MobileSimulator/MobileSimulator';
import { PWAUpdateNotification } from './components/PWA/PWAUpdateNotification';

export default function App() {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-stone-950 text-stone-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-900">
      {/* Clean Production AgriScan Ghana Mobile & Web Application */}
      <MobileSimulator />

      {/* Background PWA Update Notification */}
      <PWAUpdateNotification />
    </div>
  );
}
