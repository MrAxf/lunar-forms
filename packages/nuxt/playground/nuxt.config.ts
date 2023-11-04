export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@formkit/auto-animate/nuxt',
  ],
  devtools: { enabled: true },
});
