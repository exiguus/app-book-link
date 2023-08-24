<template>
  <form @submit.prevent="submit" @reset.prevent="submit">
    <fieldset>
      <SrOnly><legend>Search Book</legend></SrOnly>
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
    </fieldset>
    <p>Use your Camera to scan and share the code.</p>
  </form>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SrOnly from './SrOnly.vue'
import { isbnRegExpString } from '@/server/api/book/utils'

const props = defineProps<{
  searchValue: string
  submit: () => void
}>()
const emit = defineEmits(['update:searchValue'])

const value = computed({
  get() {
    return props.searchValue
  },
  set(value) {
    emit('update:searchValue', value)
  }
})
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
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
</style>
