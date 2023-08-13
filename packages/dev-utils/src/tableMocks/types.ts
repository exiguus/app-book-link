export enum Types {
  'string' = 'string',
  'number' = 'number',
  'bool' = 'bool'
}

export enum TableTypes {
  'default' = 'default',
  'columns' = 'columns',
  'rows' = 'rows'
}

export const isTableType = (type: unknown): type is keyof typeof TableTypes =>
  typeof type === 'string' && Object.keys(TableTypes).includes(type)

export type Cell = {
  id: string
  name: string
  type: keyof typeof Types
  defaultValue: string
  deviateValue: 'true' | 'false'
  primary: 'true' | 'false'
  sortBy: string
  value: string
}

export type Row = {
  id: string
  name: string
  type: keyof typeof Types
  defaultValue: string
  deviateValue: 'true' | 'false'
  primary: 'true' | 'false'
  sortBy: string
  cells: Cell[]
}

export type Table = {
  id: string
  name: string
  caption: string
  dateRange: {
    start: string
    end: string
  }
  rows: Row[]
  describeBy?: {
    columns?: Cell[]
    rows?: Cell[]
  }
}

export type Pagination = {
  page: string
  perPage: string
  pages: string
  total: string
  nextPage?: string
  prevPage?: string
}

export type Response = {
  status: '200'
  message: 'success'
  description: 'table'
  data: {
    table: Table
    pagination?: Pagination
  }
}

export type Preset = {
  describByCells: Array<{
    type: keyof typeof Types
    value: string
  }>
  rowCells: Array<{
    type: keyof typeof Types
    default: string
    value: string[]
  }>
}
