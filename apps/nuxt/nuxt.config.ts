import { resolve } from 'path'

export default defineNuxtConfig({
  devtools: { enabled: true },
  components: true,
  typescript: {
    strict: true
  },
  build: {
    analyze: true
  },
  // https://nuxt.com/docs/guide/concepts/rendering#hybrid-rendering
  routeRules: {
    '/': { prerender: true }
  },
  // https://nuxt.com/docs/guide/concepts/modules#the-modules-property
  modules: ['@nuxt/content'],
  content: {
    // https://content.nuxtjs.org/api/configuration
    // https://content.nuxtjs.org/
    sources: {
      content: {
        driver: 'fs',
        prefix: '/docs',
        base: resolve(__dirname, '../../../--(*.md|*.json)')
      }
    }
  }
})
