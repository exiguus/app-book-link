/* eslint-disable no-console */
import { writeFileSync } from 'fs'
import { join } from 'path'
import { SCRIPT_PATH, generatePagination, generateTableMock } from './utils'
import { TableTypes } from './types'

/**
 * Actions
 **/

function help() {
  console.log('\n\r', `tableMock script`, '\n\r')
  console.log('\n\r', `Options:`, '\n\r')
  console.log(`--help`, '\n\r\n\r', `Help: node scripts/tableMock.cjs --help`, '\n\r')
  console.log(
    `--create`,
    '\n\r\n\r',
    `Create: node scripts/tableMock.cjs --create [column|row|default] --path [path/mock/should/be/created/file.json]`,
    '\n\r\n\r',
    `Example: node scripts/tableMock.cjs --create column --path ./apps/next/mocks/__mocks__/tableColumnsMock.json`,
    '\n\r\n\r',
    `--pages`,
    '\n\r\n\r',
    `Optional: Pages is a number of pages to be generated and an optional parameter for --create`,
    '\n\r\n\r',
    `--perPage`,
    '\n\r\n\r',
    `Optional: PerPage is a number of rows per page to be generated and an optional parameter for --create`,
    '\n\r\n\r',
    `Example: node scripts/tableMock.cjs --create row --pages 5 --perPage 10 --path ./apps/next/mocks/__mocks__/tableRowsMock.json`,
    '\n\r'
  )
}

async function create(type: keyof typeof TableTypes, path: string, pages: number, perPage: number) {
  for (let i = 0; i < pages; i++) {
    const page = i + 1
    const pagination = generatePagination({
      page,
      pages,
      perPage
    })
    const response = generateTableMock({
      type,
      rows: perPage,
      pagination
    })
    const pagePath =
      pages > 1 ? path.replace('.json', `-${page.toString().padStart(4, '0')}.json`) : path

    await writeFileSync(join(SCRIPT_PATH, pagePath), JSON.stringify(response, null, 2))
    console.log(`Create ${pagePath} with type: "${type}"`)
  }
}

export { create, help }
