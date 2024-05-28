import { describe, expect, expectTypeOf, test } from 'vitest'
import { isString, isStorage, isInfinity, isFunction, isPrimitive, isArray, isObject } from './../src/utils/validators'

describe('Utils tests', () => {
  describe('isString', () => {
    test('Should return a boolean and be true', () => {
      /* eslint-disable no-new-wrappers */
      const testString = isString('test string')

      expectTypeOf(testString).toBeBoolean()

      expect(testString).toBe(true)
    })

    test('Should throw error', () => {
      expect(() => {
        isString(new String('test string 2'))
      }).toThrowError()
    })
  })

  describe('isStorage', () => {
    test('Should return a boolean and true', () => {
      const storage = isStorage(localStorage)
      const storage2 = isStorage(sessionStorage)

      expect(storage).toBe(true)
      expect(storage2).toBe(true)

      expectTypeOf(storage).toBeBoolean()
      expectTypeOf(storage2).toBeBoolean()

      expect(isStorage(1)).toBe(false)
    })

    test('Should throw error', () => {
      expect(isStorage(1)).toBe(false)
    })
  })
})

describe('isObject function', () => {
  test('Should return true for an object', () => {
    expect(isObject({})).toBe(true)
  })

  test('Should return false for an array', () => {
    expect(isObject([])).toBe(false)
  })

  test('Should return false for null', () => {
    expect(isObject(null)).toBe(false)
  })

  test('Should return false for a primitive value', () => {
    expect(isObject(123)).toBe(false)
  })
})

describe('isArray function', () => {
  test('Should return true for an array', () => {
    expect(isArray([])).toBe(true)
  })

  test('Should return false for an object', () => {
    expect(isArray({})).toBe(false)
  })

  test('Should return false for null', () => {
    expect(isArray(null)).toBe(false)
  })

  test('Should return false for a primitive value', () => {
    expect(isArray(123)).toBe(false)
  })
})

describe('isPrimitive function', () => {
  test('Should return true for null', () => {
    expect(isPrimitive(null)).toBe(true)
  })

  test('Should return true for a number', () => {
    expect(isPrimitive(123)).toBe(true)
  })

  test('Should return true for a string', () => {
    expect(isPrimitive('test')).toBe(true)
  })

  test('Should return true for undefined', () => {
    expect(isPrimitive(undefined)).toBe(true)
  })

  test('Should return true for a boolean', () => {
    expect(isPrimitive(true)).toBe(true)
  })

  test('Should return true for NaN', () => {
    expect(isPrimitive(NaN)).toBe(true)
  })

  test('Should return false for an object', () => {
    expect(isPrimitive({})).toBe(false)
  })

  test('Should return false for an array', () => {
    expect(isPrimitive([])).toBe(false)
  })
})

describe('isFunction function', () => {
  test('Should return true for a function', () => {
    expect(isFunction(() => {})).toBe(true)
  })

  test('Should return true for a built-in function', () => {
    expect(isFunction(Array)).toBe(true)
  })

  test('Should return false for an object', () => {
    expect(isFunction({})).toBe(false)
  })

  test('Should return false for a number', () => {
    expect(isFunction(123)).toBe(false)
  })
})

describe('isInfinity function', () => {
  test('Should return true for positive Infinity', () => {
    expect(isInfinity(Infinity)).toBe(true)
  })

  test('Should return true for negative Infinity', () => {
    expect(isInfinity(-Infinity)).toBe(true)
  })

  test('Should return true for "Infinity" as a string', () => {
    expect(isInfinity('Infinity')).toBe(false)
  })

  test('Should return true for "-Infinity" as a string', () => {
    expect(isInfinity('-Infinity')).toBe(false)
  })

  test('Should return false for a number', () => {
    expect(isInfinity(123)).toBe(false)
  })

  test('Should return false for a string', () => {
    expect(isInfinity('test')).toBe(false)
  })
})
