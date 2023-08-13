import { Preset } from './types'

const COUNT_PAGES = 1
const COUNT_ROWS = 32
const COUNT_CELLS = 6

/**
 * @param {Date} start
 * @param {Date} end
 * @returns {string} date in format YYYY-MM-DD
 * @example
 * randomDate(new Date(2023, 2, 1), new Date(2023, 3, 18))
 * // => "2023-03-18"
 **/
function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    .toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    .split('/')
    .reverse()
    .join('-')
}

/**
 * presetCell is an object with a value property that is an array of arrays.
 * Each array in the value property is a column of the table.
 */
function generatePreset() {
  const dates: string[] = []
  const uuids: string[] = []
  const reports: string[] = []

  const start = new Date(2023, 2, 2)
  const end = new Date(2023, 3, 19)

  for (let i = 0; i < COUNT_ROWS; i++) {
    const date = randomDate(start, end)
    dates.push(date)
    uuids.push(`${Math.floor(Math.random() * 1000000000)}`)
    reports.push(`R${Math.random().toString(36).substring(7)}`)
  }

  const preset: Preset = {
    describByCells: [
      { type: 'string', value: 'Date' },
      { type: 'number', value: 'UUID' },
      { type: 'string', value: 'Report' },
      { type: 'string', value: 'Status' },
      { type: 'bool', value: 'Boolean' },
      { type: 'string', value: 'Description' }
    ],
    rowCells: [
      {
        type: 'string',
        default: '2023-03-18',
        value: dates
      },
      { type: 'number', default: '0', value: uuids },
      { type: 'string', default: 'Report', value: reports },
      { type: 'string', default: 'none', value: ['ok', 'none', 'error'] },
      { type: 'bool', default: 'false', value: ['false', 'true'] },
      {
        type: 'string',
        default: '',
        value: [
          'Lorem Ipsum dolor sit amet consectetur adipiscing elit',
          'Edipiscing elit',
          'Amet consectetur adipiscing elit',
          'Dolor sit amet consectetur nep elit',
          'Torem piscing non met ron'
        ]
      }
    ]
  }

  return { preset, dates, uuids, reports }
}

export { COUNT_PAGES, COUNT_ROWS, COUNT_CELLS, generatePreset }
