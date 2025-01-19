import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  define: {
    'global': 'globalThis',
    'process': {
      'env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }
  },
  build: {
    outDir: '../static/dist',
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/main.jsx'),
      name: 'FairProtocol',
      formats: ['es'],
      fileName: 'fair-protocol'
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  }
});