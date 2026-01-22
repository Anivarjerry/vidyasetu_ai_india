
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { registerSW } from 'virtual:pwa-register';

// Register Service Worker for PWA functionality (Offline support & Installability)
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New content available. Reload?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App is ready to work offline');
  },
});

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
