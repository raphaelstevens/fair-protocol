import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic'
    })
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/main.jsx'),
      name: 'FairProtocol',
      formats: ['es'],
      fileName: 'fair-protocol'
    },
    rollupOptions: {
      external: [],  // Ne rien externaliser
      output: {
        format: 'es',
        inlineDynamicImports: true
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
});