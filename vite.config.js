import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    nodePolyfills({
      protocolImports: true, // Polyfill `node:` protocol imports
    }),
    react()
  ],
})
