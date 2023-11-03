/// <reference types="vitest" />
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

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
      name: 'LunarFormsDropdownFields',
      fileName: 'index',
    },
    sourcemap: mode === 'development',
    rollupOptions: {
      external: ['vue', '@lunar-forms/core', '@lunar-forms/fields'],
      output: {
        globals: {
          vue: 'Vue',
          '@lunar-forms/core': 'LunarFormsCore',
          '@lunar-forms/fields': 'LunarFormsFields',
        },
      },
    },
  },
  test: {
    include: ['test/**/*.test.ts'],
    environment: 'happy-dom',
  },
}));
