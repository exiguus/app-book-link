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
    manifest: {
      name: 'Digital Book Link',
      short_name: 'book_link',
      description: 'Search for books by ISBN and share the results.',
      theme_color: '#00bd7e',
      icons: [
        {
          src: 'pwa-64x64.png',
          sizes: '64x64',
          type: 'image/png'
        },
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: 'maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
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
