/* eslint-disable no-console */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFilePaths = function (dirPath, arrayOfFiles) {
  const files = fs.readdirSync(path.join(__dirname, dirPath))

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function (file) {
    if (fs.statSync(path.join(__dirname, dirPath, file)).isDirectory()) {
      arrayOfFiles = getFilePaths(path.join(dirPath, file), arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(__dirname, dirPath, file))
    }
  })

  return arrayOfFiles
}

function generate() {
  const packageFiles = getFilePaths('../packages/').filter(
    (file) => !file.includes('node_modules') && file.endsWith('package.json')
  )

  const packages = []
  // eslint-disable-next-line array-callback-return
  packageFiles.map((file) => {
    const content = fs.readFileSync(file)
    const packageJSON = JSON.parse(content)
    const packageName = packageJSON.name
    const packageVersion = packageJSON.version
    const packageDescription = packageJSON.description
    const packagePath = path.dirname(file)
    // eslint-disable-next-line array-callback-return
    if (!packageName) return
    packages.push({
      name: packageName,
      version: packageVersion,
      description: packageDescription,
      path: packagePath
    })
  })
  return packages
}

function main() {
  console.log('docs: writing PACKAGES.md...')
  try {
    const packages = generate()
    fs.writeFileSync(
      path.join(__dirname, '../packages', 'PACKAGES.md'),
      `# Packages
${packages
  .sort((a, b) => a.name.localeCompare(b.name))
  .map(
    (pkg) =>
      `\n- [${pkg.name}](.${pkg.path.split('/packages')[1]}/README.md) - ${
        pkg.description
      } - Version ${pkg.version}`
  )
  .join('')}
      `
    )
  } catch (err) {
    console.error(err)
    return process.exit(err.status)
  }
  return process.exit(0)
}

await main()
