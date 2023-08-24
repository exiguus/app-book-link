<template>
  <div class="results">
    <div v-if="!(isPending || error) && data" class="results-item">
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
    <div v-if="isPending" class="loading">Loading...</div>
    <div v-if="!isPending && error" class="error">{{ error }}</div>
    <div v-if="!data && !isPending && !error" class="no-data">No data</div>
  </div>
</template>

<script lang="ts" setup>
import SearchResultItem from './SearchResultItem.vue'
import IconShare from './icons/IconShare.vue'
import IconCopy from './icons/IconCopy.vue'
import IconClear from './icons/IconClear.vue'

import { Book } from '@/server/api/book/types'
const props = defineProps<{
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

const isPending = ref<boolean>(true)

// focus the user on the result quickly
setTimeout(() => {
  isPending.value = props.pending
}, 300)
</script>

<style scoped>
.results {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media (min-width: 1024px) {
  .results {
    padding: 0 4rem;
  }
}

.result-item-nav {
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
  top: 4rem;
  border: 1px solid var(--color-text);
  background-color: var(--color-background);
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
  padding: 1rem 1rem 2rem;
  border-radius: 0.5rem;
}

.loading,
.error,
.no-data {
  margin-bottom: 2rem;
  border: 1px solid var(--color-border);
  min-height: 12rem;
}
</style>
