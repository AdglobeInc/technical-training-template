// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      appBaseUrl: process.env.API_BASE_URL,
      appTestUrl: process.env.API_TEST_URL,
    },
  },
});
