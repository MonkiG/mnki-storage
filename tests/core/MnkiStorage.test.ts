import { beforeAll, describe, expect, expectTypeOf, test } from 'vitest'
import MnkiStorage from '../../src/index'
import ValueError from '../../src/errors/ValueError'
import BadStructureDataError from '../../src/errors/BadStructureDataError'
import StorageError from '../../src/errors/StorageError'

describe('MonkiStorage tests', () => {
  beforeAll(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  describe('Correct use', () => {
    const complexKeyDataJson = {
      key: 'user',
      data: {
        app: 'Web',
        name: 'John Doe',
        age: 30,
        address: {
          street: '123 Main St',
          city: 'Anytown',
          country: 'USA'
        },
        hobbies: ['reading', 'traveling', 'cooking'],
        friends: [
          { name: 'Alice', age: 28 },
          { name: 'Bob', age: 32 },
          { name: 'Eve', age: 25 }
        ],
        preferences: {
          color: 'blue',
          food: 'pizza',
          music: {
            genre: 'rock',
            favoriteSongs: ['Stairway to Heaven', 'Bohemian Rhapsody']
          }

        }
      }
    }

    const complexObject = {
      key1: 'value1',
      key2: {
        subKey1: 123,
        subKey2: ['a', 'b', 'c'],
        subKey3: {
          nestedKey: true,
          nestedArray: [4, 5, 6]
        }
      },
      key3: [1, 2, 3],
      key4: null,
      key6: new Date()
    }

    const arrayOfObjects = [
      { parentKey: { key1: 'value1', nestedKey1: { subnestedKey1: 123, subnestedKey2: 'abc' } } },
      { key3: ['a', 'b', 'c'] },
      { key4: { nestedKey: true } },
      { key5: 'test' },
      {
        key: 'user',
        data: {
          app: 'Web',
          name: 'John Doe',
          age: 30
        }
      }
    ]

    const LocalStorage = new MnkiStorage(localStorage)

    test('Should use localStorage', () => {
      const instance = new MnkiStorage(localStorage)
      expect(instance.storage).toBe(localStorage)
    })

    test('Should use sessionStorage', () => {
      const instance = new MnkiStorage(sessionStorage)
      expect(instance.storage).toBe(sessionStorage)
    })

    test('Should set and get the complex key data json', () => {
      LocalStorage.set(complexKeyDataJson)
      const dataSetted = LocalStorage.get('user')
      const dataToCompare = {
        [complexKeyDataJson.key]: complexKeyDataJson.data
      }
      expect(dataSetted).toEqual(dataToCompare)
    })

    test('Should set and get the complex Object', () => {
      LocalStorage.clear()
      LocalStorage.set(complexObject)
      const dataSetted = LocalStorage.get('key1')

      expect(dataSetted).toEqual({ key1: 'value1' })
      expect(LocalStorage.getLength()).toBe(5)
    })

    test('Should set and get the array object of objects', () => {
      LocalStorage.clear()
      LocalStorage.set(arrayOfObjects)
      const dataSetted = LocalStorage.get('parentKey')
      const dataSetted2 = LocalStorage.get('user')
      expect(dataSetted).toEqual({ parentKey: { key1: 'value1', nestedKey1: { subnestedKey1: 123, subnestedKey2: 'abc' } } })
      expect(dataSetted2).toEqual({ user: { app: 'Web', name: 'John Doe', age: 30 } })
    })

    test('Should eliminate and return the item', () => {
      const dataReturned = LocalStorage.remove('parentKey')

      expect(dataReturned).toEqual({ parentKey: { key1: 'value1', nestedKey1: { subnestedKey1: 123, subnestedKey2: 'abc' } } })
      expect(LocalStorage.get('parentKey')).toBe(null)
    })

    test('Lenght should be 0', () => {
      const store = new MnkiStorage(localStorage)
      store.clear()
      expect(store.getLength()).toBe(0)
    })

    test('Should return an array', () => {
      const storage = new MnkiStorage(localStorage)

      storage.set({ key1: 'value1' })
      storage.set({ key2: 'value2' })

      const entries = storage.getData()

      expectTypeOf(entries).toBeArray()

      expect(entries).toEqual([{ key1: 'value1' }, { key2: 'value2' }])

      storage.clear()
    })

    test('key should return the correct key for a given index', () => {
      const storage = new MnkiStorage(localStorage)
      storage.set({ key1: 'value1' })
      storage.set({ key2: 'value2' })

      expect(storage.key(0)).toEqual('key1')

      expect(storage.key(1)).toEqual('key2')

      expect(storage.key(2)).toBeNull()
    })

    test('Should return an array of strings', () => {
      const store = new MnkiStorage(localStorage)

      const values = store.values()
      const keys = store.keys()

      expect(Array.isArray(values)).toBe(true)
      expect(values.every(value => typeof value === 'string')).toBe(true)

      // Verifica que `keys` sea una matriz de cadenas (strings)
      expectTypeOf(keys).toBeArray()
      expect(keys.every(key => typeof key === 'string')).toBe(true)
    })

    test('Should return a boolean and true', () => {
      LocalStorage.set({ test: 'test' })
      expectTypeOf(new MnkiStorage(localStorage).has('test')).toBeBoolean()
      expect(new MnkiStorage(localStorage).has('test')).toBe(true)
    })
  })

  describe('Incorrect use', () => {
    const LocalStorage = new MnkiStorage(localStorage)

    test('Should throw error', () => {
      expect(() => {
        /* eslint-disable no-new */
        new MnkiStorage()
      }).toThrowError(StorageError)
    })

    test('Should throw DataStructureDataError', () => {
      expect(() => {
        LocalStorage.set([{ key1: 'value1', nestedKey1: { subnestedKey1: 123, subnestedKey2: 'abc' } }])
        LocalStorage.set([{ key1: 'value1', nestedKey1: { subnestedKey1: 123, subnestedKey2: 'abc' } }])
      }).toThrowError(BadStructureDataError)
    })

    test('Should throw an error when setting an invalid value', () => {
      expect(() => {
        LocalStorage.set({ key1: NaN })
      }).toThrowError(ValueError)

      expect(() => {
        LocalStorage.set({ key1: Infinity })
      }).toThrowError(ValueError)

      expect(() => {
        LocalStorage.set({ key1: -Infinity })
      }).toThrowError(ValueError)

      expect(() => {
        LocalStorage.set({ key1: undefined })
      }).toThrowError(ValueError)
    })

    test('Should return null for a non-existing key', () => {
      const result = LocalStorage.get('nonExistingKey')
      expect(result).toBeNull()
    })
  })
})
