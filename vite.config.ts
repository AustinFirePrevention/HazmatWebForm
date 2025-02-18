import { defineConfig } from 'vite'
import type { ViteUserConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
  } satisfies ViteUserConfig['test'],
  plugins: [react()],
  build: {
    outDir: 'docs'
  },
  base: '/HazmatWebForm'
})
