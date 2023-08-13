import fs from 'fs'
import { expect, describe, test } from '@jest/globals'
import { isError, isInObject, isInObjectWithValue, test as testUtil, writeLog } from './utils'

jest.mock('fs', () => {
  return {
    appendFile: jest.fn()
  }
})

describe('Utils', () => {
  describe('isError', () => {
    test('success isError', () => {
      // eslint-disable-next-line unicorn/error-message
      expect(isError(new Error())).toEqual(true)
      expect(isError(new Error('Error Message'))).toEqual(true)
    })
    test('reject not isError', () => {
      expect(isError('')).toEqual(false)
      expect(isError(0)).toEqual(false)
      expect(isError(null)).toEqual(false)
      expect(isError(undefined)).toEqual(false)
      expect(isError({})).toEqual(false)
      expect(isError([])).toEqual(false)
      expect(isError(() => ({}))).toEqual(false)
    })
  })

  describe('isInObject', () => {
    test('success isInObject', () => {
      expect(isInObject('key', { key: 'value' })).toEqual(true)
    })
    test('reject isInObject', () => {
      expect(isInObject('key', {})).toEqual(false)
      expect(isInObject('key', { number: '0' })).toEqual(false)
      expect(isInObject('key', { null: 'null' })).toEqual(false)
      expect(isInObject('key', { undefined: 'undefined' })).toEqual(false)
      expect(isInObject('key', { object: '{}' })).toEqual(false)
      expect(isInObject('key', { array: '[]' })).toEqual(false)
      expect(isInObject('key', { function: '() => ({})' })).toEqual(false)
    })
  })

  describe('isInObjectWithValue', () => {
    test('success isInObjectWithValue', () => {
      expect(isInObjectWithValue('key', 'value', { key: 'value' })).toEqual(true)
    })
    test('reject isInObjectWithValue', () => {
      expect(isInObjectWithValue('key', 'value', {})).toEqual(false)
      expect(isInObjectWithValue('key', 'value', { key: '0' })).toEqual(false)
      expect(isInObjectWithValue('key', 'value', { key: 'null' })).toEqual(false)
      expect(isInObjectWithValue('key', 'value', { key: 'undefined' })).toEqual(false)
      expect(isInObjectWithValue('key', 'value', { key: '{}' })).toEqual(false)
      expect(isInObjectWithValue('key', 'value', { key: '[]' })).toEqual(false)
      expect(isInObjectWithValue('key', 'value', { key: '() => ({})' })).toEqual(false)
    })
  })

  describe('test', () => {
    test('success test', () => {
      const objectExpected = { key: 'value' }
      const objectAsserted = { key: 'value' }
      expect(testUtil(objectExpected, objectAsserted, 'path/')).toBe(undefined)
    })
    test('reject test', () => {
      const objectExpected = { key: 'value' }
      const objectAsserted = { key: 'not value' }
      try {
        testUtil(objectExpected, objectAsserted, 'path/')
      } catch (error) {
        const errorExpected = error as Error
        expect(errorExpected.message).toEqual(
          'key@value was not added as dependency in path/package.json'
        )
      }
    })

    describe('writeLog', () => {
      test('success writeLog', () => {
        const log = {
          foo: ['bar']
        }

        writeLog('path/', log)
        expect(fs.appendFile).toHaveBeenCalled()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore-next-line
        fs.appendFile.mockRestore()
      })
    })
  })
})
