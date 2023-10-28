<template>
  <article>
    <div>
      <h1>
        <strong>{{ data.title }}</strong> by <strong>{{ data.authors.join(', ') }}</strong>
      </h1>
    </div>
    <div :class="data.image && 'grid'">
      <dl @dblclick="copy">
        <dt>Title</dt>
        <dd>{{ data.title }}</dd>
        <dt>Author</dt>
        <dd>{{ data.authors.join(', ') }}</dd>
        <dt>Publisher</dt>
        <dd>{{ data.publisher }}</dd>
        <dt>ISBN</dt>
        <dd>{{ data.isbn }}</dd>
      </dl>
      <div v-if="data.image">
        <SrOnly>&nbsp;</SrOnly>
        <img
          :src="data.image.thumb"
          :alt="data.title"
          width="128"
          height="192"
          loading="lazy"
          @dblclick="copyImage"
        />
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
import SrOnly from './SrOnly.vue'
import type { Book } from '@/server/api/book/types'
defineProps<{
  data: Book
  copy: () => void
  copyImage: () => void
}>()
</script>

<style scoped>
article {
  width: 100%;
}

.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto;
  grid-template-areas: 'info image';
  gap: 1rem;
}

h1 {
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.6;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

dt::after {
  content: ':';
}

dd {
  font-weight: 700;
}

dt,
dd {
  display: inline;
  font-size: 1em;
  line-height: 2;
}

dt + dd::after {
  content: ' ';
  display: block;
}

dt + dd {
  margin-left: 0.5rem;
}

strong {
  font-weight: 700;
}

img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  cursor: pointer;
  border-radius: 0.25rem;
  border: 2px solid var(--color-text);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}
</style>
