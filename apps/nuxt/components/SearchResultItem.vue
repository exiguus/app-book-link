<template>
  <article>
    <h1>Title: {{ data.title }}</h1>
    <SrOnly>&nbsp;</SrOnly>
    <h2>Author: {{ data.authors.join(', ') }}</h2>
    <SrOnly>&nbsp;</SrOnly>
    <p>Publisher: {{ data.publisher }}</p>
    <SrOnly>&nbsp;</SrOnly>
    <p>ISBN: {{ data.isbn }}</p>
  </article>
</template>

<script lang="ts" setup>
import SrOnly from './SrOnly.vue'
defineProps<{
  data: {
    title: string
    authors: string[]
    publisher: string
    isbn: string
  }
}>()
</script>

<style scoped>
h1,
h2,
p {
  font-size: 1em;
}
</style>
