/* eslint-disable no-console */
/* eslint-disable sonarjs/cognitive-complexity */
import { writeFileSync } from 'fs'
import { spawnSync } from 'child_process'
import { join } from 'path'
import { SCRIPT_PATH, isInObject, test, writeLog, isInObjectWithValue } from './utils'

/**
 * Actions
 **/

function help() {
  console.log('\n\r', `peerDependencies script`, '\n\r')
  console.log('\n\r', `Options:`, '\n\r')
  console.log(`--help`, '\n\r\n\r', `Help: node scripts/peerDependencies.cjs --help`, '\n\r')
  console.log(
    `--install`,
    '\n\r\n\r',
    `Install: node scripts/peerDependencies.cjs --install --path [path/to/package]`,
    '\n\r\n\r',
    `Example: node scripts/peerDependencies.cjs --install --path ./packages/ui/theme`,
    '\n\r'
  )
  console.log(
    `--add`,
    '\n\r\n\r',
    `Add: node scripts/peerDependencies.cjs --add path/to/preset.json --path [path/package]`,
    '\n\r\n\r',
    `Example: node scripts/peerDependencies.cjs --add ./scripts/peerDependencies/presets/jest.json --path ./packages/ui/theme`,
    '\n\r'
  )
}

/**
 * Install peerDependencies
 * @param {string} path package path to install peerDependencies
 * @returns {Promise<void>}
 */
async function install(path: string) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { peerDependencies, devDependencies, dependencies } = require(join(
    SCRIPT_PATH,
    path,
    // eslint-disable-next-line sonarjs/no-duplicate-string
    'package.json'
  ))

  if (!peerDependencies) {
    throw new Error(`No peerDependencies found in ${path}package.json`)
  }

  console.log(`Resolving peerDependencies...`, '\n')

  Object.entries(peerDependencies).forEach(([name, version]) => {
    try {
      require.resolve(name)
      console.log(`${name}@${version} resolved`)
    } catch (err) {
      console.warn(`${name}@${version} not resolved`)
    }
  })

  console.log('\n', `Installing peerDependencies...`, '\n')

  const log: { installed: Array<string>; alreadyInstalled: Array<string> } = {
    installed: [],
    alreadyInstalled: []
  }
  await Promise.all(
    Object.entries(peerDependencies).map(([name, version]) => {
      return new Promise((resolve, _reject) => {
        if (!isInObject(name, { ...dependencies, ...devDependencies })) {
          version = typeof version === 'string' ? version.replace('.x', '') : `${version}`
          const params = ['i', '-D']
          // install root directory
          if (path === '.') {
            params.push('-w')
          } else {
            params.push(`--filter=./${path}`)
          }
          const stdout = spawnSync('pnpm', [...params, `${name}@${version}`], {
            encoding: 'utf8'
          }).stdout.replace('\n', '')

          console.log(stdout)
          log.installed.push(`${name}@${version}`)
        } else {
          console.log(`${name}@${version} already installed as dependency`)
          log.alreadyInstalled.push(`${name}@${version}`)
        }
        resolve('success')
      })
    })
  )

  console.log('\n', `Test peerDependencies installed`, '\n')

  const {
    devDependencies: assertedDevDependencies,
    dependencies: assertedDependencies
    // eslint-disable-next-line @typescript-eslint/no-var-requires
  } = require(join(SCRIPT_PATH, path, 'package.json'))
  test(
    peerDependencies,
    {
      ...assertedDevDependencies,
      ...assertedDependencies
    },
    path
  )

  await writeLog(path, log)
}

/**
 * Test if all peerDependencies are installed
 * @param {string} file preset to add
 * @param {string} path package path to add preset to
 * @returns {Promise<void>}
 * @example
 * add("presets/jest.json", "packages/ui/theme")
 **/
async function add(file: string, path: string) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { peerDependencies } = require(join(SCRIPT_PATH, file))
  if (!peerDependencies) {
    throw new Error(`No peerDependencies to add found in ${file}`)
  } else {
    console.log('\n', `Add ${file} peerDependencies to ${path}package.json`, '\n')
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { peerDependencies: existingPeerDependencies } = require(join(
      SCRIPT_PATH,
      path,
      'package.json'
    ))
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { ...rest } = require(join(SCRIPT_PATH, path, 'package.json'))
    const packageJson = JSON.stringify(
      {
        ...rest,
        peerDependencies: {
          ...existingPeerDependencies,
          ...peerDependencies
        }
      },
      null,
      2
    )
    await writeFileSync(join(SCRIPT_PATH, path, 'package.json'), packageJson)

    console.log('\n', `Test peerDependencies added`, '\n')

    Object.entries(peerDependencies).forEach(([name, version]) => {
      if (!isInObjectWithValue(name, `${version}`, existingPeerDependencies)) {
        console.log('\n', `Added ${name}@${version} to peerDependencies`, '\n')
      }
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { peerDependencies: expectedPeerDependencies } = require(join(SCRIPT_PATH, file))
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { peerDependencies: currentPeerDependencies } = require(join(
    SCRIPT_PATH,
    path,
    'package.json'
  ))
  test(expectedPeerDependencies, currentPeerDependencies, path)
}

export { help, install, add }
