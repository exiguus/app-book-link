<template>
  <div class="results">
    <div v-if="!(pending || error) && data" class="results-item">
      <div class="result-item">
        <SearchResultItem :data="data" :copy="copy" :copy-image="copyImage" />
      </div>
      <nav class="result-item-nav">
        <ul>
          <li>
            <button class="icon secondary" type="reset" @click="clear">
              <IconClear aria-hidden="true" /><small>Clear</small>
            </button>
          </li>
          <li>
            <button class="icon secondary" type="button" @click="copy">
              <IconCopy aria-hidden="true" /><small>Copy Text</small>
            </button>
          </li>
          <li>
            <button class="icon secondary" type="button" @click="copyImage">
              <IconCopy aria-hidden="true" /><small>Copy Image</small>
            </button>
          </li>
          <li>
            <button class="icon secondary" type="button" @click="share">
              <IconShare aria-hidden="true" />
              <small>Share</small>
            </button>
          </li>
        </ul>
        <p v-if="infoText">{{ infoText }}</p>
      </nav>
    </div>
    <div v-if="pending" class="loading"><ProgressLoading /></div>
    <div v-if="!pending && error" class="error">{{ error }}</div>
    <div v-if="!data && !pending && !error" class="no-data">No data</div>
  </div>
</template>

<script lang="ts" setup>
import SearchResultItem from './SearchResultItem.vue'
import IconShare from './icons/IconShare.vue'
import IconCopy from './icons/IconCopy.vue'
import IconClear from './icons/IconClear.vue'
import ProgressLoading from './ProgressLoading.vue'

import type { Book } from '@/types/books'
defineProps<{
  data: Book | null
  pending: boolean
  error: string | null
  infoText?: string
  copy: () => void
  copyImage: () => void
  share: () => void
  clear: () => void
}>()
defineEmits(['update:book'])
</script>

<style scoped>
.results {
  display: flex;
  flex-direction: column;
  min-height: 28rem;
}

@media (min-width: 1024px) {
  .results {
    padding: 0 4rem;
  }
}

.result-item-nav {
  position: sticky;
  top: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.result-item-nav ul {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.result-item-nav ul li {
  list-style: none;
  margin: 0 0.5rem;
}

.result-item-nav button small {
  display: block;
  font-size: 0.666rem;
  line-height: 1.6;
  font-weight: 700;
  color: var(--color-text);
  text-transform: uppercase;
  margin-top: 0.5rem;
}

.result-item-nav p {
  max-width: 240px;
  padding: 1rem;
  text-align: center;
}

.result-item {
  position: sticky;
  top: 2rem;
  padding: 1rem 1rem 2rem;
  border: 1px solid var(--color-text);
  background-color: var(--color-background);
  z-index: 2;
}

.result-item,
.loading,
.error,
.no-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 0.5rem;
  min-height: 20rem;
}

.loading,
.error,
.no-data {
  padding: 1rem 6rem 2rem;
  margin-bottom: 2rem;
  border: 1px solid var(--color-border);
}
</style>
