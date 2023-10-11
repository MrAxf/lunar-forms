/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'LunarFormsFields',
      fileName: 'index',
    },
    sourcemap: mode === 'development',
    rollupOptions: {
      external: ['vue', '@lunar-forms/core'],
      output: {
        globals: {
          vue: 'Vue',
          '@lunar-forms/core': 'LunarFormsCore',
        },
      },
    },
  },
  test: {
    include: ['test/**/*.test.ts'],
    environment: 'happy-dom',
  },
}));
