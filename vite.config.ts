/// <reference types="vitest" />
/// <reference types="vite/client" />
import terser from '@rollup/plugin-terser';
import react from '@vitejs/plugin-react';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load .env.dev in development mode before Vite processes env files
  if (mode === 'development' && existsSync('.env.dev')) {
    try {
      const envDevContent = readFileSync('.env.dev', 'utf-8');
      const envDevLines = envDevContent.split('\n');

      envDevLines.forEach((line) => {
        const trimmedLine = line.trim();
        // Skip empty lines and comments
        if (trimmedLine && !trimmedLine.startsWith('#')) {
          const equalIndex = trimmedLine.indexOf('=');
          if (equalIndex > 0) {
            const key = trimmedLine.substring(0, equalIndex).trim();
            let value = trimmedLine.substring(equalIndex + 1).trim();
            // Remove quotes if present
            value = value.replace(/^["']|["']$/g, '');
            // Set in process.env so Vite's loadEnv can pick it up
            if (key.startsWith('VITE_')) {
              process.env[key] = value;
            }
          }
        }
      });
    } catch (error) {
      // Silent fail if file can't be read
    }
  }
  return {
    build: {
      outDir: 'build',
      chunkSizeWarningLimit: 1600
    },
    plugins: [
      react(),
      tsconfigPaths(),
      // To enable console in production remove below conditions
      (command === 'serve' || command === 'build') &&
        terser({
          compress: {
            drop_console: true
          }
        }),
      // TODO : Change below manifest file according to your project add appropriate icons in public folder
      VitePWA({
        registerType: 'prompt',
        includeAssets: ['icons/favicon.ico'],
        manifest: {
          theme_color: '#f88935',
          background_color: '#f69435',
          display: 'standalone',
          scope: '/',
          start_url: '/',
          name: 'Scamper Education',
          short_name: 'Scamper Education',
          description: 'Scamper Education - school admin panel',
          icons: [
            {
              src: 'icons/icon-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'icons/icon-256x256.png',
              sizes: '256x256',
              type: 'image/png'
            },
            {
              src: 'icons/icon-384x384.png',
              sizes: '384x384',
              type: 'image/png'
            },
            {
              src: 'icons/icon-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/setupTests.ts']
    }
  };
});
