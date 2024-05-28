import { describe, expect, expectTypeOf, test } from 'vitest'
import isString from '../src/utils/isString'
import isStorage from '../src/utils/isStorage'

describe('Utils tests', () => {
  describe('isString', () => {
    test('Should return a string', () => {
      /* eslint-disable no-new-wrappers */
      const testString = isString('test string')
      const testString2 = isString(new String('test string 2'))

      expectTypeOf(testString).toBeString()
      expectTypeOf(testString2).toBeString()
    })

    test('Should throw error', () => {
      expect(() => {
        isString(1)
        isString(localStorage)
      }).toThrowError()
    })
  })

  describe('isStorage', () => {
    test('Should return a storage', () => {
      const storage = isStorage(localStorage)
      const storage2 = isStorage(sessionStorage)

      expect(storage).instanceOf(Storage)
      expect(storage2).instanceOf(Storage)
    })

    test('Should throw error', () => {
      expect(() => {
        isStorage('')
      }).toThrowError()
    })
  })
})
