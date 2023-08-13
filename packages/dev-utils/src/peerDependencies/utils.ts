/* eslint-disable no-console */
import { appendFile } from 'fs'
import { join } from 'path'
import { stringify } from 'json5'

const SCRIPT_PATH = join(__dirname, '../../../../../')
const LOGFILE = join(SCRIPT_PATH, 'peerDeps.log')
const log = { installed: [], alreadyInstalled: [] }

/**
 * Helpers
 **/

const isError = (error: unknown): error is Error => error instanceof Error

/**
 * Check if a key is in a object
 * @param {string} key
 * @param {Record<string, string>} object
 * @returns {boolean}
 */
const isInObject = (key: string, object: Record<string, string>) =>
  object && typeof object[key] === 'string'

/**
 * Check if a key is in a object and has a specific value
 * @param {string} key
 * @param {string} value
 * @param {Record<string, string>} object)
 * @returns {boolean}
 */
const isInObjectWithValue = (key: string, value: string, object: Record<string, string>) =>
  isInObject(key, object) && object[key] && object[key].startsWith(value)

/**
 * Test if all dependencies are added
 * @param {Record<string, string>} objectExpected
 * @param {Record<string, string>} objectAsserted,
 * @param {string} path package path
 * @returns {void}
 * @example
 * test({ foo: "1.0.0" }, { foo: "1.0.0" }) // throws
 * test({ foo: "1.0.0" }, { foo: "1.0.1" }) // throws
 * test({ foo: "1.0.0" }, { foo: "1.0.0", bar: "1.0.0" }) // throws
 * test({ foo: "1.0.0" }, { bar: "1.0.0" }) // throws
 **/

function test(
  objectExpected: Record<string, string>,
  objectAsserted: Record<string, string>,
  path: string
) {
  if (objectAsserted) {
    Object.entries(objectExpected).forEach(([name, version]) => {
      if (!isInObjectWithValue(name, version, objectAsserted)) {
        throw new Error(`${name}@${version} was not added as dependency in ${path}package.json`)
      } else {
        console.log(`${name}@${version} added as dependency`)
      }
    })
  }
}

/**
 * Write log to file
 * @param {string} path package path
 * @param {Record<string, Array<string>>} log
 * @returns {Promise<void>}
 **/
async function writeLog(path: string, log: Record<string, Array<string>>): Promise<void> {
  const datetime = new Date()
  const unixtime = datetime.getTime()
  const timestamp = datetime.toISOString()
  const logFileData = `[${unixtime}]: ${stringify({ timestamp, path, ...log }, null, 2)}` + '\n'

  await appendFile(LOGFILE, logFileData, (error: unknown) => {
    if (error) throw error
  })
}

export { isError, isInObject, isInObjectWithValue, test, writeLog, log, SCRIPT_PATH, LOGFILE }
