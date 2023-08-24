export type Book = {
  title: string
  authors: string[]
  publisher: string
  image?: {
    thumb: string
  }
  isbn: string
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

export type BookApiResponse = {
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

export const isBookWithImageLinks = (
  res: unknown
): res is Book & {
  imageLinks: {
    thumbnail?: string
    smallThumbnail?: string
  }
} =>
  isBook(res) &&
  'imageLinks' in res &&
  typeof res.imageLinks === 'object' &&
  res.imageLinks !== null &&
  (('thumbnail' in res.imageLinks && typeof res.imageLinks.thumbnail === 'string') ||
    ('smallThumbnail' in res.imageLinks && typeof res.imageLinks.smallThumbnail === 'string'))

export const isBookData = (data: unknown): data is BookApiResponse['data'] =>
  typeof data === 'object' &&
  data !== null &&
  'title' in data &&
  typeof data.title === 'string' &&
  'authors' in data &&
  Array.isArray(data.authors) &&
  data.authors.every((author) => typeof author === 'string') &&
  'publisher' in data &&
  typeof data.publisher === 'string' &&
  'isbn' in data &&
  typeof data.isbn === 'string'

export const isErrorData = (data: unknown): data is BookApiResponse['error'] =>
  typeof data === 'object' && data !== null && 'message' in data && typeof data.message === 'string'
