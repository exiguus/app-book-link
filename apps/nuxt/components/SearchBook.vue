<template>
  <SearchForm v-model:search-value="searchText" :submit="submit" />
  <SearchResults
    v-if="bookResults"
    :pending="bookResults.pending"
    :error="bookResults.error"
    :data="bookResults.data"
    :clear="clear"
    :copy="copy"
  />
</template>

<script setup lang="ts">
import SearchForm from './SearchForm.vue'
import SearchResults from './SearchResults.vue'
import { Book, BookApiResponse, isBookData, isErrorData } from '@/server/api/book/types'

const searchText = ref<string>('')
const resultText = ref<HTMLDivElement>()

export type BookResults = {
  data: Book | null
  pending: boolean
  error: string | null
} | null

const bookResults = ref<BookResults>(null)

const bookSearch = async ({ value }: { value: string }) => {
  const url = computed(() => `/api/book/${value}`)
  return await useFetch<BookApiResponse, string>(url)
}

async function submit() {
  bookResults.value = null
  const newValue = searchText?.value?.length > 0 ? searchText.value : null
  if (newValue) {
    const { pending, error, data } = await bookSearch({ value: newValue })
    const bookData = isBookData(data?.value?.data) ? data?.value?.data : null
    const errorData = isErrorData(data?.value?.error) ? data?.value?.error : null
    bookResults.value = {
      pending: pending.value,
      error: errorData?.message || error.value,
      data: bookData || null
    }
  } else {
    bookResults.value = {
      pending: false,
      error: 'Please enter a search term',
      data: null
    }
  }
}

function clear() {
  if (searchText.value) searchText.value = ''
  bookResults.value = null
}

function copy() {
  const textContent = resultText.value?.textContent
  if (textContent) {
    navigator.clipboard.writeText(textContent)
  }
}

function searchBySharedUrl(url: URL) {
  if (url.searchParams.has('share_text')) {
    searchText.value = url.searchParams.get('share_text') || ''
    submit()
    return
  }
  if (url.searchParams.has('share_title')) {
    searchText.value = url.searchParams.get('share_title') || ''
    submit()
  }
}

onMounted(() => {
  const currentURL = new URL(window.location.href)
  searchBySharedUrl(currentURL)
})
</script>
