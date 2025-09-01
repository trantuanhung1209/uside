import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    // Optimize build for better LCP
    rollupOptions: {
      output: {
        // Separate chunks for better caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['framer-motion', 'lucide-react'],
          firebase: ['firebase/app', 'firebase/firestore'],
          music: ['/src/contexts/MusicContext.tsx'],
        },
        // Optimize asset names
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext || '')) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/mp4|webm|ogg|mp3|wav|flac|aac/i.test(ext || '')) {
            return `assets/media/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    // Enable gzip compression
    reportCompressedSize: true,
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Source maps for debugging
    sourcemap: false,
    // Minify for production
    minify: 'terser',
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'firebase/app',
      'firebase/firestore',
    ],
    exclude: ['@splinetool/viewer'], // Load Spline viewer externally for better caching
  },
  // Asset handling
  assetsInclude: ['**/*.mp3', '**/*.mp4', '**/*.webm'],
  // CSS optimization
  css: {
    devSourcemap: false,
  },
})
