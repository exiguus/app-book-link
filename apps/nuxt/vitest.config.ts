import { fileURLToPath } from 'node:url'
/// <reference types="vite" />
import { mergeConfig, defineConfig } from 'vite'
/// <reference types="vitest" />
import { configDefaults } from 'vitest/config'
import type { InlineConfig } from 'vitest'
import type { UserConfig } from 'vite'
import viteConfig from './vite.config'

interface VitestConfigExport extends UserConfig {
  test: InlineConfig
}
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      transformMode: {
        web: [/\.[jt]sx$/]
      }
    }
  } as VitestConfigExport)
)
