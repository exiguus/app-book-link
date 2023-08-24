import { BookApiResponse } from './types'
import { cache, getResults, generateResponse } from './utils'

export default defineEventHandler(async (event): Promise<BookApiResponse> => {
  try {
    const defaultSearch = '978-0-345-39182-1'
    const search = getRouterParam(event, 'isdn') || defaultSearch
    const timestamp = Date.now()
    const result = await getResults(search, timestamp)

    const hasError = Array.isArray(result) && result.some((book) => book.search.error !== undefined)
    if (hasError) {
      cache.remove(search)
      return generateResponse(await getResults(search, timestamp))
    } else {
      return generateResponse(result)
    }
  } catch (error) {
    return {
      message: 'error',
      error: {
        title: 'Unknown error',
        message: 'Something went wrong. Please try again later.',
        debug: {
          error
        }
      }
    }
  }
})
