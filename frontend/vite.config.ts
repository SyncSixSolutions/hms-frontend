import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@emotion/core': '@emotion/react',
    },
  },
  optimizeDeps: {
    include: ['@emotion/styled', '@emotion/react'],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
})
