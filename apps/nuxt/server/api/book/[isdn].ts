import { BookApiResponse } from './types'
import { cache, getResults, generateResponse, isValidSearch } from './utils'

export default defineEventHandler(async (event): Promise<BookApiResponse> => {
  try {
    const defaultSearch = '978-0-345-39182-1'
    const search = (getRouterParam(event, 'isdn') || defaultSearch).trim()
    if (!isValidSearch(search)) {
      return {
        message: 'error',
        error: {
          title: 'Invalid ISBN search parameter',
          message:
            'Invalid search parameter. Please try again. Format is ISBN-10 or ISBN-13. For Example: 978-0-345-39182-1.'
        }
      }
    }
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
