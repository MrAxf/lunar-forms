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
      external: [
        '@floating-ui/vue',
        '@headlessui/vue',
        '@lunar-forms/core',
        '@lunar-forms/fields',
        '@vueuse/core',
        'vue',
      ],
      output: {
        globals: {
          '@floating-ui/vue': 'FloatingUiVue',
          '@headlessui/vue': 'HeadlessuiVue',
          '@lunar-forms/core': 'LunarFormsCore',
          '@lunar-forms/fields': 'LunarFormsFields',
          '@vueuse/core': 'vueuseCore',
          vue: 'Vue',
        },
      },
    },
  },
  test: {
    include: ['test/**/*.test.ts'],
    environment: 'happy-dom',
  },
}));
