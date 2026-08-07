import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor';
            }
            if (id.includes('lucide') || id.includes('framer-motion')) {
              return 'ui';
            }
            if (id.includes('xyflow') || id.includes('dagre')) {
              return 'flow';
            }
            if (id.includes('recharts')) {
              return 'charts';
            }
            return 'vendor-other';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
