/* eslint-disable no-console */
import { isError } from './utils'
import { help, create } from './actions'
import { TableTypes, isTableType } from './types'
import { COUNT_PAGES, COUNT_ROWS } from './consts'

// eslint-disable-next-line sonarjs/cognitive-complexity
export const main = () => {
  /**
   * Create mock data for table
   * @param {string} --create [column|row|default] --path [path/mock/should/be/created/file.json] | --help
   */
  const args = process.argv.slice(2)

  let path: string
  let type: keyof typeof TableTypes
  let pages: number = COUNT_PAGES
  let perPage: number = COUNT_ROWS

  const hasPath = args.includes('--path')
  const hasHelp = args.includes('--help')
  const hasCreate = args.includes('--create')
  const hasPages = args.includes('--pages')
  const hasPerPage = args.includes('--perPage')

  if (args.length === 0) {
    processHelp()
  }

  if (hasPath) {
    path = args[args.indexOf('--path') + 1]
  } else {
    path = './'
  }

  if (hasCreate) {
    const createArg = args[args.indexOf('--create') + 1]
    if (isTableType(createArg)) {
      type = createArg
    } else {
      throw new Error(
        `Invalid table type: ${createArg}. Must be one of ${Object.keys(TableTypes).join(', ')}`
      )
    }
  }

  if (hasPages) {
    const pageParam = parseInt(args[args.indexOf('--pages') + 1])
    pages = !isNaN(pageParam) ? pageParam : COUNT_PAGES
  }

  if (hasPerPage) {
    const perPageParam = parseInt(args[args.indexOf('--perPage') + 1])
    perPage = !isNaN(perPageParam) ? perPageParam : COUNT_ROWS
  }

  if (hasHelp) {
    processHelp()
  }

  function processHelp() {
    try {
      help()
      process.exit(0)
    } catch (error) {
      if (isError(error)) console.error(`${error.message}`)
      process.exit(1)
    }
  }

  if (hasCreate) {
    processCreate()
  }

  async function processCreate() {
    try {
      await create(type, path, pages, perPage)
    } catch (error) {
      if (isError(error)) console.error(`${error.message}`)
      process.exit(1)
    }
    process.exit(0)
  }
}
