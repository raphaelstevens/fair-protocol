import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../static/dist',
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'src/main.jsx'),
      output: {
        entryFileNames: 'fair-protocol.js',
        format: 'iife',
        name: 'FairProtocol',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      },
      external: ['react', 'react-dom']
    },
    cssCodeSplit: false,
    // Assurez-vous que le CSS est extrait dans un fichier séparé
    cssMinify: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  }
});