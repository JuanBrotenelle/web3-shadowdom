import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  define: {
    'process.env': {}, // Это можно убрать, но не стоит
  },
  build: {
    lib: {
      entry: './src/main.js',
      name: 'WalletModal',
      fileName: (format) => `wallet-modal.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
