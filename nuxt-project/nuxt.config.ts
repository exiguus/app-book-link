import { resolve } from "node:path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  components: true,
  build: {
    // https://nuxt.com/docs/configuration-glossary/configuration-build#analyze
    analyze: true,
  }
})
