
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        VitePWA({
          registerType: 'autoUpdate',
          // Workbox config enables the Service Worker (Critical for PWA Score)
          workbox: {
            globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
            cleanupOutdatedCaches: true,
            clientsClaim: true,
            skipWaiting: true,
          },
          // Only include assets that actually exist in your public folder
          includeAssets: ['android/android-launchericon-192-192.png', 'ios/180.png'], 
          manifest: {
            // Essential PWA Fields for Stores
            id: '/',
            start_url: '/',
            scope: '/',
            name: 'Vidyasetu AI',
            short_name: 'Vidyasetu',
            description: 'Premium School Management System with Real-time Tracking.',
            theme_color: '#ffffff',
            background_color: '#ffffff',
            display: 'standalone',
            display_override: ['window-controls-overlay', 'standalone', 'minimal-ui'],
            orientation: 'portrait',
            categories: ['education', 'productivity', 'utilities'],
            lang: 'en',
            dir: 'ltr',
            prefer_related_applications: false,
            icons: [
              {
                src: 'android/android-launchericon-48-48.png',
                sizes: '48x48',
                type: 'image/png'
              },
              {
                src: 'android/android-launchericon-72-72.png',
                sizes: '72x72',
                type: 'image/png'
              },
              {
                src: 'android/android-launchericon-96-96.png',
                sizes: '96x96',
                type: 'image/png'
              },
              {
                src: 'android/android-launchericon-144-144.png',
                sizes: '144x144',
                type: 'image/png'
              },
              {
                src: 'android/android-launchericon-192-192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any' // Standard icon
              },
              {
                src: 'android/android-launchericon-512-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any' // Standard large icon
              },
              {
                src: 'android/android-launchericon-512-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable' // Adaptive icon for Android (Round/Square auto-fit)
              }
            ],
            // Screenshots are left empty as requested, you can upload them manually in PWABuilder
            screenshots: []
          }
        })
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve('.'),
        }
      }
    };
});
