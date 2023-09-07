<template>
  <form @submit.prevent="submit" @reset.prevent="submit">
    <fieldset>
      <SrOnly><legend>Search Book</legend></SrOnly>
      <div class="form-group">
        <p>
          <label for="search">
            <SrOnly
              >Search Book by <abbr title="International Standard Book Number">ISBN</abbr> or
              Title</SrOnly
            >
            <input
              id="search"
              v-model="value"
              name="search"
              type="search"
              defaultValue="978-0-345-39180-3"
              placeholder="ISBN, Title"
              required
              :pattern="isbnRegExpString"
            />
          </label>
        </p>
        <p>
          <button type="submit" @click.prevent="submit">Search</button>
        </p>
      </div>
    </fieldset>
    <p>Use your Camera to scan and share the code.</p>
  </form>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SrOnly from './SrOnly.vue'
import { isbnRegExpString } from '@/server/api/book/utils'

import useSearchText from '@/hooks/useSearchText'

const { searchText } = useSearchText()
defineProps<{
  submit: (payload: Event | MouseEvent) => void
}>()

const emit = defineEmits(['update:searchText'])

const value = computed({
  get() {
    return searchText.value
  },
  set(value) {
    emit('update:searchText', (searchText.value = value))
  }
})
</script>

<style scoped>
form {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: var(--color-background);
}

form > p {
  margin-top: -1rem;
  padding: 1rem 0;
  text-align: center;
}

fieldset {
  position: sticky;
  top: 5rem;
}
</style>
