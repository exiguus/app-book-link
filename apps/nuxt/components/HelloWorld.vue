<template>
  <div class="greetings">
    <div class="header">
      <img class="logo" alt="book_link logo" src="@/assets/logo.svg" />
      <h1 class="green">
        {{ msg }}
      </h1>
      <h3>Use <strong class="green">book_link</strong> to share it</h3>
    </div>
    <form @submit.prevent="submit" @reset.prevent="submit">
      <fieldset>
        <legend class="sr-only">Search Book</legend>
        <p>
          <label for="search">
            <span class="sr-only"
              >Search Book by <abbr title="International Standard Book Number">ISBN</abbr> or
              Title</span
            >
            <input
              id="search"
              ref="searchInput"
              name="search"
              type="search"
              defaultValue="978-0-345-39180-3"
              placeholder="ISBN, Title"
              required
              pattern="\d{9}[\d|X]|(\d{3}-){2}\d{1,3}-[\d|X]"
            />
          </label>
        </p>
        <p>
          <button type="submit" @click="submit">Search</button>
        </p>
      </fieldset>
      <p>Use your Camera to scan and paste the code.</p>
    </form>
    <div v-if="book">
      <div v-if="!book.pending && book.data" class="results">
        <div ref="resultText" class="result-item" @doubleClick="copy">
          <SearchResults :book="book.data.data" />
        </div>
        <nav class="result-item-nav">
          <ul>
            <li><button type="reset" @click="clear">Clear</button></li>
            <li><button type="button" @click="copy">Copy</button></li>
          </ul>
        </nav>
      </div>
      <div v-if="book.pending">Loading</div>
      <div v-if="book.error">{{ book.error }}</div>
      <div v-if="!book.data && !book.pending && !book.error">No data</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchResults from './SearchResults.vue'

defineProps<{
  msg: string
}>()

const searchInput = ref<HTMLInputElement>()
const resultText = ref<HTMLDivElement>()
const book = ref()
const bookSearch = async ({ value }: { value: string }) => {
  const url = computed(() => `/api/book/${value}`)
  const { data, pending, error } = await useFetch(url)
  return { data, pending, error }
}
async function submit() {
  const newValue = searchInput?.value?.value
  if (newValue) {
    book.value = await bookSearch({ value: newValue })
  }
}
function clear() {
  if (searchInput.value) searchInput.value.value = ''
  book.value = undefined
}
function copy() {
  const textContent = resultText.value?.textContent
  if (textContent) {
    navigator.clipboard.writeText(textContent)
  }
}
</script>

<style scoped>
.logo {
  display: block;
  width: 64px;
}

.results {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
}

.result-item-nav {
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
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
  margin-bottom: 1em;
}

.header,
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
}

form {
  margin-bottom: 1rem;
}

fieldset {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: none;
  margin-bottom: 1rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
