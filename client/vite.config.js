import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react({
      fastRefresh: true,
      // Ajout de la configuration pour le plugin React
      include: "**/*.{jsx,tsx}",
    })
  ],
  server: {
    cors: true,
    strictPort: true,
    port: 5173,
  },
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
  }
});