/// <reference types="vitest" />
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    lib: {
      entry: {
        tailwindcssPlugin: resolve(__dirname, 'src/tailwindcss/index.ts'),
        themesDaisyui: resolve(__dirname, 'src/themes/daisyui/index.ts'),
        messages: resolve(__dirname, 'src/messages/index.ts'),
      },
    },
    sourcemap: mode === 'development',
  },
}));
