export type Book = {
  title: string
  authors: string[]
  publisher: string
}

export type BookSearchItem = {
  search: {
    text: string
    provider: 'google' | 'openlibrary' | 'cache'
    timestamp: number
    error?: string
  }
  data?: Book
  res?: unknown
}

export type BookSearch = {
  books: Array<BookSearchItem>
}

export type BookResponse = {
  message: 'success' | 'error'
  data?: Book & { isbn: string }
  error?: {
    title: string
    message: string
    debug?: {
      error: unknown
    }
  }
  debug?: unknown
}

export const isBook = (res: unknown): res is Book =>
  typeof res === 'object' &&
  res !== null &&
  typeof (res as Book).title === 'string' &&
  Array.isArray((res as Book).authors) &&
  (res as Book).authors.every((author) => typeof author === 'string') &&
  typeof (res as Book).publisher === 'string'
