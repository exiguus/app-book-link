/* eslint-disable sonarjs/no-duplicate-string */
import { spawnSync } from 'child_process'
import { readFileSync } from 'fs'

function removeKeyFromObject(obj: Record<string, unknown>, keys: string) {
  if (Array.isArray(obj)) {
    obj.forEach(function (item) {
      removeKeyFromObject(item, keys)
    })
  } else if (typeof obj === 'object' && obj != null) {
    Object.getOwnPropertyNames(obj).forEach(function (key) {
      if (keys.includes(key)) delete obj[key]
      else removeKeyFromObject(obj[key] as Record<string, unknown>, keys)
    })
  }
  return obj
}

describe('tableMocks', () => {
  describe('actions', () => {
    test('help', () => {
      // eslint-disable-next-line no-console
      console.log(__dirname)
      const stdout = spawnSync('node', ['./test/tableMocks.cjs', '--help'], {
        encoding: 'utf8'
      })
        .stdout.toString()
        .replace('\n', '')

      expect(stdout).toContain('Help: node scripts/tableMock.cjs --help')

      expect(stdout).toContain(
        'Create: node scripts/tableMock.cjs --create [column|row|default] --path [path/mock/should/be/created/file.json]'
      )
    })

    test('create success', () => {
      const stdout = spawnSync(
        'node',
        [
          './test/tableMocks.cjs',
          '--create',
          'rows',
          '--path',
          './packages/dev-utils/test/mocks/tableMock.run.json',
          '--rows',
          '2'
        ],
        {
          encoding: 'utf8'
        }
      ).stdout.toString()

      expect(stdout).toContain(
        `Create ./packages/dev-utils/test/mocks/tableMock.run.json with type: "rows"`
      )

      const expectedOutput = readFileSync('./test/mocks/tableMock.test.json').toString()
      const output = readFileSync('./test/mocks/tableMock.run.json').toString()

      expect(
        JSON.stringify(
          removeKeyFromObject(removeKeyFromObject(JSON.parse(output), 'value'), 'type')
        )
      ).toBe(
        JSON.stringify(
          removeKeyFromObject(removeKeyFromObject(JSON.parse(expectedOutput), 'value'), 'type')
        )
      )
    })

    test('create reject', () => {
      const child = spawnSync(
        'node',
        ['./test/tableMocks.cjs', '--create', '--path', './test/mocks/tableMock.json'],
        {
          encoding: 'utf8'
        }
      )

      expect(child.status).toBe(1)
      expect(child.stderr.toString()).toContain(
        'Error: Invalid table type: --path. Must be one of default, columns, rows'
      )
    })
  })
})
