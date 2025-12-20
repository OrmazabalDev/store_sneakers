import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import path from 'path';

export default defineConfig({
  base: '/store_sneakers/',
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@components': path.resolve(__dirname, './components'),
      '@ui': path.resolve(__dirname, './components/ui'),
      '@lib': path.resolve(__dirname, './lib'),
      '@hooks': path.resolve(__dirname, './hooks'),
    },
  },
  css: {
    preprocessorOptions: {
      // Add support for global styles if needed
    },
  },
  server: {
    open: true,
  },
});
