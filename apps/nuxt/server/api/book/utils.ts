/* eslint-disable no-console */
import isbn from 'node-isbn'
import axios from 'axios'
import { BookSearch, BookApiResponse, isBook, isBookWithImageLinks } from './types'
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
            image: result.books[0].data.image
              ? {
                  thumb: result.books[0].data.image.thumb
                }
              : undefined,
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

          const images: {
            origin: string | null
            base64?: string
          } = {
            origin: null
          }

          if (isBookWithImageLinks(res)) {
            if (res.imageLinks.thumbnail) {
              images.origin = res.imageLinks.thumbnail
            } else if (res.imageLinks.smallThumbnail) {
              images.origin = res.imageLinks.smallThumbnail
            }
          }

          if (images.origin) {
            const image = await axios.get(images.origin, { responseType: 'arraybuffer' })
            const imageBase64 = Buffer.from(image.data).toString('base64')
            images.base64 = `data:${image.headers['content-type']};base64,${imageBase64}`
          }
          const data = isBook(res)
            ? {
                title: res.title,
                authors: res.authors,
                publisher: res.publisher,
                image: images.base64
                  ? {
                      thumb: images.base64
                    }
                  : undefined,
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

// ISBN 10 or 13 validation
// See: https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s13.html
export const isbnRegExpString =
  '^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$'
export const isbnRegExp = new RegExp(isbnRegExpString)

export const isValidSearch = (search: string): boolean => {
  return isbnRegExp.test(search)
}
