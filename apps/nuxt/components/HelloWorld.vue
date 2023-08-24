<template>
  <div class="greetings">
    <div class="header">
      <img class="logo" alt="book_link logo" src="@/assets/logo.svg" width="64" height="64" />
      <h1 class="green">
        {{ msg }}
      </h1>
      <h3>Use <strong class="green">book_link</strong> to share it</h3>
    </div>
    <SearchBook />
  </div>
</template>

<script setup lang="ts">
import SearchBook from './SearchBook.vue'
defineProps<{
  msg: string
}>()
</script>

<style scoped>
.logo {
  display: block;
  width: 64px;
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
