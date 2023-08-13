import fs from 'fs'
import path from 'path'
// eslint-disable-next-line camelcase
import child_process from 'child_process'
import { help, add, install } from './actions'

jest.mock('fs', () => {
  return {
    writeFileSync: jest.fn()
  }
})

jest.mock('path', () => {
  return {
    resolve: jest.fn(),
    join: jest.fn()
  }
})

jest.mock('child_process', () => {
  return {
    spawnSync: jest.fn()
  }
})

describe('Actions', () => {
  describe('help', () => {
    test('success help', () => {
      jest.spyOn(global.console, 'log')

      help()
      // eslint-disable-next-line no-console
      expect(console.log).toBeCalledTimes(5)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore-next-line
      global.console.log.mockRestore()
    })
  })

  describe('add', () => {
    test('reject add', async () => {
      try {
        await add('path/to/preset.json', 'path/to/package/')
      } catch (error) {
        const errorExpected = error as Error
        expect(errorExpected.message).toEqual(
          'No peerDependencies to add found in path/to/preset.json'
        )
      }
      expect(fs.writeFileSync).not.toHaveBeenCalled()
      expect(path.resolve).not.toHaveBeenCalled()
      expect(path.join).toHaveBeenCalled()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore-next-line
      fs.writeFileSync.mockRestore()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore-next-line
      path.join.mockRestore()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore-next-line
      path.resolve.mockRestore()
    })
  })

  describe('install', () => {
    test('reject install', async () => {
      try {
        await install('path/to/package/')
      } catch (error) {
        const errorExpected = error as Error
        expect(errorExpected.message).toEqual(
          'No peerDependencies found in path/to/package/package.json'
        )
      }
      // eslint-disable-next-line camelcase
      expect(child_process.spawnSync).not.toHaveBeenCalled()
      expect(path.resolve).not.toHaveBeenCalled()
      expect(path.join).toHaveBeenCalled()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore-next-line
      // eslint-disable-next-line camelcase
      child_process.spawnSync.mockRestore()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore-next-line
      path.join.mockRestore()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore-next-line
      path.resolve.mockRestore()
    })
  })
})
