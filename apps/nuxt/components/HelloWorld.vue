<template>
  <div class="greetings">
    <div class="header">
      <div class="logo-claim">
        <img class="logo" alt="book_link logo" src="@/assets/logo.svg" width="64" height="64" />
        <h1 class="green">
          {{ msg }}
        </h1>
        <h3 class="use-claim">
          Use <strong class="green">book_link</strong> to find and share your book
        </h3>
      </div>
    </div>
    <div class="search">
      <div class="search-book">
        <SearchBook />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchBook from './SearchBook.vue'
defineProps<{
  msg: string
}>()
</script>

<style scoped>
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

.header {
  position: sticky;
  top: -7.5rem;
  background-color: var(--color-background);
}

.header .logo {
  display: block;
  width: 64px;
}

.header .logo-claim {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
}

.search {
  position: relative;
  background-color: var(--color-background);
  z-index: -1;
}

.search-book {
  position: sticky;
  top: 20rem;
}

.greetings {
  position: sticky;
  top: 1rem;
}
</style>
