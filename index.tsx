
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

  // --- SPLASH SCREEN REMOVAL LOGIC ---
  // Wait for the animation to finish (approx 2.5 seconds total) before removing the splash screen
  const splash = document.getElementById('splash-screen');
  if (splash) {
    setTimeout(() => {
        splash.style.opacity = '0'; // Fade out
        setTimeout(() => {
            splash.style.display = 'none'; // Hide completely
            splash.remove(); // Remove from DOM
        }, 500); // Wait for fade out to complete
    }, 2500); // Duration of the animation sequence
  }
}
