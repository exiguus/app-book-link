/* eslint-disable no-console */
/* eslint-disable sonarjs/cognitive-complexity */
import { isError } from './utils'
import { help, add, install } from './actions'

export const main = () => {
  /**
   * Process peer dependencies actions for packages
   * @param {string} --install --path path/to/package | --add path/to/preset.json --path path/to/package | --help
   */
  const args = process.argv.slice(2)

  let path: string
  let file: string

  const hasPath = args.includes('--path')
  const hasHelp = args.includes('--help')
  const hasInstall = args.includes('--install')
  const hasAdd = args.includes('--add')

  if (args.length === 0) {
    processHelp()
  }

  if (hasPath) {
    path = args[args.indexOf('--path') + 1]
  } else {
    path = './'
  }

  if (path.slice(-1) !== '/') path = path + '/'

  if (hasAdd) {
    file = args[args.indexOf('--add') + 1]
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

  if (hasAdd) {
    processAdd()
  }

  async function processAdd() {
    try {
      await add(file, path)
      await install(path)
    } catch (error) {
      if (isError(error)) console.error(`${error.message}`)
      process.exit(1)
    }
    process.exit(0)
  }

  if (hasInstall) {
    processInstall()
  }

  async function processInstall() {
    try {
      await install(path)
    } catch (error) {
      if (isError(error)) console.error(`${error.message}`)
      process.exit(1)
    }
    process.exit(0)
  }
}
