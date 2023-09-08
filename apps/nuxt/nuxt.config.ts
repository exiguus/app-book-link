import { resolve } from 'path'

export default defineNuxtConfig({
  devtools: { enabled: true },
  components: true,
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['VitePwaManifest'].includes(tag)
    }
  },
  typescript: {
    strict: true
  },
  runtimeConfig: {
    public: {
      pwa: {
        enable: process.env.NUXT_PWA_ENABLED === 'enabled'
      },
      api: {
        book: {
          url: process.env.NUXT_BOOK_API_URL
        }
      }
    }
  },
  build: {
    analyze: true
  },
  // https://nuxt.com/docs/guide/concepts/rendering#hybrid-rendering
  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true }
  },
  // https://nuxt.com/docs/guide/concepts/modules#the-modules-property
  modules: [
    '@nuxt/content',
    process.env.NODE_ENV === 'production' || process.env.NUXT_PWA_ENABLED === 'enable'
      ? '@vite-pwa/nuxt'
      : undefined
  ],
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
      id: '/',
      name: 'Digital Book Link',
      short_name: 'book_link',
      description: 'Search for books by ISBN and share the results.',
      theme_color: '#00bd7e',
      background_color: '#282828',
      share_target: {
        action: '/',
        method: 'GET',
        enctype: 'application/x-www-form-urlencoded',
        params: {
          text: 'share_text',
          title: 'share_title',
          url: 'share_url'
        }
      },
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
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      runtimeCaching: [
        {
          urlPattern: /\/api\/book\/.*/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'api-book-cache',
            expiration: {
              maxEntries: 128,
              maxAgeSeconds: 60 * 60 * 24 * 30 // <== 30 days
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /\/api\/_content\/.*/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'api-content-cache',
            expiration: {
              maxEntries: 128,
              maxAgeSeconds: 60 * 60 * 24 * 10 // <== 10 days
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    },
    client: {
      installPrompt: true
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module'
    }
  }
})
