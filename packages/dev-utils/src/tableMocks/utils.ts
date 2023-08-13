import { join } from 'path'
import { COUNT_CELLS, COUNT_ROWS, generatePreset } from './consts'
import { Pagination, Table, TableTypes, Types, Response } from './types'

const SCRIPT_PATH = join(__dirname, '../../../../../')

/**
 * @param {Array} types
 * @returns {string} random type from types array
 * @example
 * getRandomType(["string", "number", "bool"])
 * // => "string"
 **/
const getRandomType = <T>(types: T[]) => types[Math.floor(Math.random() * types.length)]

/**
 * @param {unknown} error
 * @returns {error is Error}
 * @example
 * isError(new Error("error"))
 * // => true
 **/
const isError = (error: unknown): error is Error => error instanceof Error

/**
 * generate the table mock data in a response format
 * @param {string} type
 * @param {number} pages
 * @param {number} rows
 * @returns {Table}
 * @example
 * generateTableMock({ type: "columns", pages: 1, rows: 10 })
 **/
const generateTableMock = ({
  type,
  rows = COUNT_ROWS,
  pagination = undefined
}: {
  type: keyof typeof TableTypes
  page?: string
  rows?: number
  pagination?: Pagination
  // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  const table: Table = {
    id: 'table-id',
    name: 'table-name',
    caption: 'table-caption',
    dateRange: {
      start: '2023-03-01',
      end: '2023-04-18'
    },
    rows: []
  }

  const types = Object.values(Types)

  const { preset, reports } = generatePreset()
  if (type === 'rows') {
    preset.rowCells.splice(2, 1)
    preset.describByCells.splice(2, 1)
    // eslint-disable-next-line no-console
    console.log({ preset })
  }

  const cellsCount = type === 'rows' ? COUNT_CELLS - 1 : COUNT_CELLS
  /**
   * rows is an array of objects. Each object is a row of the table.
   * Each row has a cells property that is an array of objects.
   * Each object in the cells property is a cell of the table.
   * Each cell has a value property that is a string.
   * The value property is randomly selected from the presetCell object.
   */
  table.rows = []

  for (let i = 0; i < rows; i++) {
    table.rows.push({
      id: `row-id-${i + 1}`,
      name: `row-name-${i + 1}`,
      type: getRandomType(types),
      defaultValue: '',
      deviateValue: 'false' as const,
      primary: 'false' as const,
      sortBy: '',
      cells: []
    })
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cellsCount; j++) {
      table.rows[i].cells.push({
        id: `row-cell-id-${i + 1}-${j + 1}`,
        name: `cell-name-${j + 1}`,
        type: Types[preset.rowCells[j].type],
        defaultValue: preset.rowCells[j].default ?? '',
        deviateValue: 'false',
        primary: `${j === 1 ? 'true' : 'false'}`,
        sortBy: `head-id-${j + 1}`,
        value: `${
          preset.rowCells[j].value[Math.floor(Math.random() * preset.rowCells[j].value.length)]
        }`
      })
    }
  }

  if (type === TableTypes.columns || type === TableTypes.rows) {
    table.describeBy = { columns: [] }

    if (type === TableTypes.rows) {
      table.describeBy?.columns?.push({
        id: `head-id-0`,
        name: `head-name-0`,
        type: getRandomType(types),
        defaultValue: '',
        deviateValue: 'false',
        primary: 'false',
        sortBy: `head-id-0`,
        value: 'Report'
      })
    }

    for (let i = 0; i < cellsCount; i++) {
      if (table.describeBy === null || table.describeBy.columns === undefined) return
      table.describeBy.columns.push({
        id: `head-id-${i + 1}`,
        name: `head-name-${i + 1}`,
        type: getRandomType(types),
        defaultValue: '',
        deviateValue: 'false',
        primary: `${i === 1 ? 'true' : 'false'}`,
        sortBy: `head-id-${i + 1}`,
        value: preset.describByCells[i].value
      })
    }
  }

  if (type === TableTypes.rows) {
    table.describeBy = {
      columns: table.describeBy?.columns,
      rows: []
    }
    for (let i = 0; i < rows; i++) {
      if (table.describeBy === null || table.describeBy.rows === undefined) return

      table.describeBy.rows.push({
        id: `head-id-${i + 1}`,
        name: `head-name-${i + 1}`,
        type: getRandomType(types),
        defaultValue: '',
        deviateValue: 'false',
        primary: `${i === 0 ? 'true' : 'false'}`,
        sortBy: `head-id-${i + 1}`,
        value: reports[i]
      })
    }
  }

  const response: Response = {
    message: 'success',
    status: '200',
    description: 'table',
    data: {
      table
    }
  }

  if (pagination) {
    response.data.pagination = pagination
  }

  return response
}

const generatePagination = ({
  page,
  pages,
  perPage
}: {
  page: number
  pages: number
  perPage: number
}) => {
  const nextPage = page < pages ? `${page + 1}` : undefined
  const prevPage = page > 1 ? `${page - 1}` : undefined
  const pagination: Pagination | undefined =
    pages > 1
      ? {
          page: `${page}`,
          pages: `${pages}`,
          perPage: `${perPage}`,
          total: `${pages * perPage}`
        }
      : undefined

  if (pagination) {
    if (nextPage) {
      pagination.nextPage = nextPage
    }
    if (prevPage) {
      pagination.prevPage = prevPage
    }
  }
  return pagination
}

export { generateTableMock, generatePagination, SCRIPT_PATH, isError }
