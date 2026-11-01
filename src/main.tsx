import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register service worker with auto-update listener
const updateSW = registerSW({
  onNeedRefresh() {
    // Notify the UI to show the "App Update Available" notification
    window.dispatchEvent(
      new CustomEvent('pwa:need-refresh', {
        detail: {
          update: async () => {
            await updateSW(true);
          },
        },
      })
    );
  },
  onOfflineReady() {
    console.log('AgriScan Ghana is ready to work offline');
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
