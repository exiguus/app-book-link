/* eslint-disable no-console */
import { spawnSync } from 'child_process'
import { writeFileSync } from 'fs'
import { join } from 'path'

const packageFile = {
  peerDependencies: {
    'example-package': '^42'
  },
  devDependencies: {
    'example-package': '^42'
  }
}

const presetFile = {
  peerDependencies: {
    'another-example-package': '^23'
  }
}

describe('peerDependencies', () => {
  afterEach(async () => {
    await writeFileSync(
      join(__dirname, '../../test/package/package.json'),
      JSON.stringify(packageFile, null, 2)
    )
    await writeFileSync(
      join(__dirname, '../../test/preset.json'),
      JSON.stringify(presetFile, null, 2)
    )
  })

  describe('actions', () => {
    test('help', () => {
      console.log(__dirname)
      // eslint-disable-next-line sonarjs/no-duplicate-string
      const stdout = spawnSync('node', ['./test/peerDependencies.cjs', '--help'], {
        encoding: 'utf8'
      })
        .stdout.toString()
        .replace('\n', '')

      console.log('out', stdout.toString())
      expect(stdout).toContain('Help: node scripts/peerDependencies.cjs --help')

      expect(stdout).toContain(
        'Install: node scripts/peerDependencies.cjs --install --path [path/to/package]'
      )

      expect(stdout).toContain(
        'Add: node scripts/peerDependencies.cjs --add path/to/preset.json --path [path/package]'
      )
    })

    test('add success', () => {
      const stdout = spawnSync(
        'node',
        [
          './test/peerDependencies.cjs',
          '--add',
          './packages/dev-utils/test/preset.json',
          '--path',
          // eslint-disable-next-line sonarjs/no-duplicate-string
          './packages/dev-utils/test/package/'
        ],
        {
          encoding: 'utf8'
        }
      ).stdout.toString()

      expect(stdout).toContain(
        'Add ./packages/dev-utils/test/preset.json peerDependencies to ./packages/dev-utils/test/package/package.json'
      )
      expect(stdout).toContain('Test peerDependencies added')
      expect(stdout).toContain('Added another-example-package@^23 to peerDependencies')
    })

    test('add reject', () => {
      const child = spawnSync(
        'node',
        [
          './test/peerDependencies.cjs',
          '--add',
          './packages/dev-utils/test/notExist.json',
          '--path',
          './packages/dev-utils/test/package/'
        ],
        {
          encoding: 'utf8'
        }
      )

      expect(child.status).toBe(1)
    })

    test('install', () => {
      const stdout = spawnSync(
        'node',
        [
          './test/peerDependencies.cjs',
          '--install',
          '--path',
          './packages/dev-utils/test/package/'
        ],
        {
          encoding: 'utf8'
        }
      ).stdout.toString()

      expect(stdout).toContain('Resolving peerDependencies...')
      expect(stdout).toContain('Installing peerDependencies...')
      expect(stdout).toContain('example-package@^42 already installed as dependency')
      expect(stdout).toContain('Test peerDependencies installed')
      expect(stdout).toContain('example-package@^42 added as dependency')
    })

    test('install rejected', () => {
      const child = spawnSync(
        'node',
        [
          './test/peerDependencies.cjs',
          '--install',
          '--path',
          './packages/dev-utils/test/package-not-exist/'
        ],
        {
          encoding: 'utf8'
        }
      )

      expect(child.status).toBe(1)
    })

    test('add and install', () => {
      const stdoutAdd = spawnSync(
        'node',
        [
          './test/peerDependencies.cjs',
          '--add',
          './packages/dev-utils/test/preset.json',
          '--path',
          './packages/dev-utils/test/package/'
        ],
        {
          encoding: 'utf8'
        }
      ).stdout.toString()

      expect(stdoutAdd).toContain(
        'Add ./packages/dev-utils/test/preset.json peerDependencies to ./packages/dev-utils/test/package/package.json'
      )
      expect(stdoutAdd).toContain('Test peerDependencies added')
      expect(stdoutAdd).toContain('Added another-example-package@^23 to peerDependencies')

      const stdoutInstall = spawnSync(
        'node',
        [
          './test/peerDependencies.cjs',
          '--install',
          '--path',
          './packages/dev-utils/test/package/'
        ],
        {
          encoding: 'utf8'
        }
      ).stdout.toString()

      expect(stdoutInstall).toContain('Resolving peerDependencies...')
      expect(stdoutInstall).toContain('Installing peerDependencies...')
      expect(stdoutInstall).toContain('example-package@^42 already installed as dependency')
      expect(stdoutInstall).toContain('Test peerDependencies installed')
      expect(stdoutInstall).toContain('example-package@^42 added as dependency')
    })
  })
})
