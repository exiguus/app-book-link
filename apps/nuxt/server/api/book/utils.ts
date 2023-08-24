/* eslint-disable no-console */
import isbn from 'node-isbn'
import { BookSearch, BookApiResponse, isBook } from './types'
import { RuntimeCache } from '@/libs/RuntimeCache.class'
export const cache = new RuntimeCache()
export const providers = {
  GOOGLE: 'google' as const,
  OPENLIBRARY: 'openlibrary' as const
  // OCLC announced that the xID services (including xISBN) is going to be retired on 3/15/16. After that the WorldCat integration will be broken.
  // https://github.com/xlcnd/isbnlib/issues/28
  // WORLDCAT: 'worldcat' as const
}

export function generateResponse(result: BookSearch): BookApiResponse {
  const hasError = Array.isArray(result) && result.every((book) => book.search.error !== undefined)
  if (hasError) {
    return {
      message: 'error',
      error: {
        title: 'Book not found',
        message: `Book not found for ${result[0].search.text}`
      }
    }
  } else {
    return {
      message: 'success',
      data: result.books[0].data
        ? {
            title: result.books[0].data.title,
            authors: result.books[0].data.authors,
            publisher: result.books[0].data.publisher,
            isbn: result.books[0]?.search.text
          }
        : {
            title: 'Unknown',
            authors: [],
            publisher: 'Unknown',
            isbn: result.books[0]?.search.text
          },
      error: !result.books[0].data
        ? {
            title: 'Book not found',
            message: `Book not found for ${result.books[0].search.text}`
          }
        : undefined,
      debug: process.env.NODE_ENV === 'development' ? result : undefined
    }
  }
}

export async function getResults(resolve: string, timestamp: number): Promise<BookSearch> {
  const result = await cache.get<BookSearch>({
    key: resolve,
    fallback: {
      books: [
        {
          search: {
            text: resolve,
            provider: 'cache',
            error: 'Fallback Cache',
            timestamp
          },
          data: {
            title: 'Unknown',
            authors: [],
            publisher: 'Unknown',
            isbn: resolve
          }
        }
      ]
    },
    callback: async () => {
      const books = await Promise.all(
        Object.values(providers).map(async (provider) => {
          const res: unknown = await isbn
            .provider([provider])
            .resolve(resolve)
            .then((data) => {
              console.log('Book found %j', provider)
              return data
            })
            .catch((err) => {
              console.log('Book not found', provider)
              return err
            })

          const data = isBook(res)
            ? {
                title: res.title,
                authors: res.authors,
                publisher: res.publisher,
                isbn: resolve
              }
            : undefined

          return {
            search: {
              text: resolve,
              provider,
              timestamp,
              error: res instanceof Error ? res.message : undefined
            },
            data,
            res
          }
        })
      )

      return {
        books: books || []
      }
    }
  })

  return result || []
}
