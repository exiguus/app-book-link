<template>
  <div class="results">
    <div v-if="!(isPending || error) && data" class="results-item">
      <div class="result-item" @doubleClick="copy">
        <SearchResultItem :data="data" />
      </div>
      <nav class="result-item-nav">
        <ul>
          <li><button type="reset" @click="clear">Clear</button></li>
          <li><button type="button" @click="copy">Copy</button></li>
          <li><button type="button" @click="share">Share</button></li>
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
const props = defineProps<{
  data: {
    title: string
    authors: string[]
    publisher: string
    isbn: string
  } | null
  pending: boolean
  error: string | null
  infoText?: string
  copy: () => void
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

.result-item-nav p {
  max-width: 240px;
  padding: 1rem;
  text-align: center;
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
  padding: 2rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
}

.loading,
.error,
.no-data {
  margin-bottom: 2rem;
  min-height: 12rem;
}
</style>
