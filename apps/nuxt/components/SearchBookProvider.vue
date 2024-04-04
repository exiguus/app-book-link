<script setup lang="ts">
import { computed, ref } from 'vue'
// TODO: move
import { isBookData, isErrorData } from '@/types/books'
import type { Book, BookApiResponse } from '@/types/books'
import useSearchText from '@/hooks/useSearchText'

const { searchText } = useSearchText()

const config = useRuntimeConfig()
const infoText = ref<string>()

export type BookResults = {
  data: Book | null
  pending: boolean
  error: string | null
} | null

const bookResults = ref<BookResults>(null)

const bookSearch = async ({ value }: { value: string }) => {
  const url = computed(() => `${config.public.api.book.url}/${value}`)
  return await useFetch<BookApiResponse, string>(url)
}

async function submit() {
  if (!searchText.value || searchText.value === bookResults.value?.data?.isbn) return
  bookResults.value = {
    pending: true,
    error: null,
    data: null
  }
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
    if (bookData) {
      const currentUrl = new URL(window.location.href)
      currentUrl.searchParams.set('share_text', bookData.isbn)
      window.history.pushState({}, '', currentUrl)
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

function share() {
  if (!bookResults.value || !bookResults.value?.data || !navigator) return
  if (navigator.share) {
    navigator.share({
      title: `book_link: Share ${bookResults.value.data.title}`,
      text: `${bookResults.value.data.title} by ${bookResults.value.data.authors.join(', ')}
Publisher: ${bookResults.value.data.publisher}
ISBN: ${bookResults.value.data.isbn}
`,
      url: window.location.href
    })
  } else {
    navigator.clipboard.writeText(window.location.href)
    infoText.value = 'The link was copied to your clipboard'
  }
}

function copy() {
  if (!bookResults.value || !bookResults.value?.data || !navigator) return
  const textContent = `Title: ${bookResults.value.data.title}
Author: ${bookResults.value.data.authors.join(', ')}
Publisher: ${bookResults.value.data.publisher}
ISBN: ${bookResults.value.data.isbn}
`
  navigator.clipboard.writeText(textContent)
  infoText.value = 'The book information was copied to your clipboard'
}

function copyImage() {
  if (!bookResults.value || !bookResults.value?.data || !navigator) return
  if (bookResults.value.data.image) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = bookResults.value.data.image.thumb
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      canvas.toBlob((blob) => {
        if (blob) {
          navigator.clipboard.write([
            new ClipboardItem({
              [blob.type]: blob
            })
          ])
          infoText.value = 'The book image was copied to your clipboard'
        } else {
          infoText.value = 'The book image could not be copied to your clipboard'
        }
      })
    }
  }
}
</script>
<template>
  <slot
    :book-results="bookResults"
    :data="bookResults?.data || null"
    :pending="bookResults?.pending || false"
    :error="bookResults?.error || null"
    :info-text="infoText"
    :submit="submit"
    :clear="clear"
    :share="share"
    :copy="copy"
    :copy-image="copyImage"
    :search-text="searchText"
  />
  <SearchByUrl :submit="submit" />
</template>
