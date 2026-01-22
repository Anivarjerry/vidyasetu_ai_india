
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
          includeAssets: [], // Removed specific assets to avoid 404s if missing
          manifest: {
            name: 'Vidyasetu AI',
            short_name: 'Vidyasetu',
            description: 'Premium School Management System with Real-time Tracking.',
            theme_color: '#ffffff',
            background_color: '#ffffff',
            display: 'standalone',
            start_url: '/',
            orientation: 'portrait',
            scope: '/',
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
                type: 'image/png'
              },
              {
                src: 'android/android-launchericon-512-512.png',
                sizes: '512x512',
                type: 'image/png'
              },
              {
                src: 'android/android-launchericon-512-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any maskable'
              }
            ]
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
