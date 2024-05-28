import { afterAll, beforeAll, describe, expect, expectTypeOf, test } from 'vitest'
import MnkiStorage from '../../src/index'

describe('MonkiStorage tests', () => {
  beforeAll(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  afterAll(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  test('Should throw error', () => {
    expect(() => {
      /* eslint-disable no-new */
      new MnkiStorage()
    }).toThrowError()
  })

  test('Should set the data', () => {
    const store = new MnkiStorage(localStorage, [{
      test: 'data'
    },
    {
      test2: 'data2'
    }])

    expect(store.getLength()).toBeGreaterThanOrEqual(2)
  })

  test('Should get the item setted', () => {
    const store = new MnkiStorage(localStorage)
    store.set('get', 'set')
    expect(store.get('get')).toBeDefined()
  })

  test('Should eliminate and return the item', () => {
    const store = new MnkiStorage(localStorage)
    const item = store.remove('get')
    expect(item).toBe('set')
    expect(store.get('get')).toBeNull()
  })

  test('Should return an array of strings', () => {
    const store = new MnkiStorage(localStorage)

    const values = store.values()
    const keys = store.keys()

    expect(Array.isArray(values)).toBe(true)
    expect(values.every(value => typeof value === 'string')).toBe(true)

    // Verifica que `keys` sea una matriz de cadenas (strings)
    expect(Array.isArray(keys)).toBe(true)
    expect(keys.every(key => typeof key === 'string')).toBe(true)
  })

  test('Should return a boolean', () => {
    expectTypeOf(new MnkiStorage(localStorage).has('test')).toBeBoolean()
  })
  test('Should return true', () => {
    expect(new MnkiStorage(localStorage).has('test')).toBe(true)
  })

  test('Lenght should be 0', () => {
    const store = new MnkiStorage(localStorage)
    store.clear()
    expect(store.getLength()).toBe(0)
  })

  test('entriesKeyValue should return the entries of the storage', () => {
    const storage = new MnkiStorage(localStorage)
    storage.set('key1', 'value1')
    storage.set('key2', 'value2')

    const entries = storage.getData()

    expect(entries).toEqual({
      key1: 'value1',
      key2: 'value2'
    })

    storage.clear()
  })

  test('key should return the correct key for a given index', () => {
    const storage = new MnkiStorage(localStorage)
    storage.set('key1', 'value1')
    storage.set('key2', 'value2')

    expect(storage.key(0)).toEqual('key1')

    expect(storage.key(1)).toEqual('key2')

    expect(storage.key(2)).toBeNull()
  })
})
