<template>
  <article>
    <h1>Title: {{ book.title }}</h1>
    <span class="copy-only">&nbsp;</span>
    <h2>Author: {{ book.authors.join(', ') }}</h2>
    <span class="copy-only">&nbsp;</span>
    <p>Publisher: {{ book.publisher }}</p>
    <span class="copy-only">&nbsp;</span>
    <p>ISBN: {{ book.isbn }}</p>
  </article>
</template>

<script lang="ts" setup>
defineProps<{
  book: {
    title: string
    authors: string[]
    publisher: string
    isbn: string
  }
}>()
</script>

<style scoped>
.copy-only {
  position: absolute;
  left: -9999px;
}
article {
  padding: 2rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
}
h1,
h2,
p {
  font-size: 1em;
}
</style>
