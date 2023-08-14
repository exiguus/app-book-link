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
  modules: ['@nuxt/content', '@vite-pwa/nuxt'],
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
  },
  experimental: {
    payloadExtraction: false
  },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext'
      }
    },
    prerender: {
      routes: ['/', '/about']
    }
  },
  imports: {
    autoImport: true
  },
  appConfig: {
    // you don't need to include this: only for testing purposes
    buildDate: new Date().toISOString()
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'book_link: Search for books by ISBN and share the results.',
      short_name: 'book_link',
      theme_color: '#00bd7e',
      icons: [
        {
          src: 'book_share.png',
          sizes: '256x256',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    },
    client: {
      installPrompt: true,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
      periodicSyncForUpdates: 20
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module'
    }
  }
})
