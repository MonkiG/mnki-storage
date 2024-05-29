import BadStructureDataError from '../errors/BadStructureDataError'
import DataError from '../errors/DataError'
import StorageError from '../errors/StorageError'
import StringError from '../errors/StringError'
import { type dataToStore, type DataToStore, type MnkiStorageInterface } from '../types'
import treeTraversal from '../utils/treeTraversal'
import { isArray, isDataToStoreType, isObject, isStorage, isString } from '../utils/validators'

export class MnkiStorage implements MnkiStorageInterface {
  readonly storage: Storage

  constructor (storage: Storage, data?: dataToStore) {
    if (!isStorage(storage)) throw new StorageError()

    this.storage = storage

    if (data) {
      this.#handleSetData(data)
    }
  }

  set (data: dataToStore): void {
    this.#handleSetData(data)
  }

  get <T>(key: string): Record<string, T> | null {
    const isAnString = isString(key)

    if (!isAnString) {
      throw new StringError('key')
    }

    const storedValue = this.storage.getItem(key)

    if (!storedValue) return null

    const parseResponse = { [key]: JSON.parse(storedValue) }

    return parseResponse
  }

  getData (): Array<Record<string, any>> {
    return Object.entries(this.storage).reduce((prev: Array<Record<string, any>>, curr) => {
      const [key, value] = curr
      prev.push({ [key]: JSON.parse(value as string) })
      return prev
    }, [])
  }

  remove<T> (key: string): Record<string, T> | null {
    if (!isString(key)) {
      throw new StringError('key')
    }

    const item = this.get<T>(key)
    this.storage.removeItem(key)

    return item
  }

  getLength (): number {
    return this.storage.length
  }

  clear (): void {
    this.storage.clear()
  }

  key (n: number): string | null {
    return this.storage.key(n)
  }

  has (key: string): boolean {
    return Object.hasOwn(this.storage, key)
  }

  keys (): string[] {
    return Object.keys(this.storage)
  }

  values (): string[] {
    return Object.values(this.storage)
  }

  #handleSetData (data: dataToStore): void {
    const isAnObject = isObject(data)
    const isAnArray = isArray(data)
    const isAnDataToStoreType = isDataToStoreType(data)

    if (!isAnArray && !isAnObject) {
      throw new DataError()
    }

    if (!isAnArray && isAnDataToStoreType) {
      const key = (data as DataToStore).key
      const value = (data as DataToStore).data

      if (!isString(key)) throw new StringError(key)

      treeTraversal(value)
      this.storage.setItem(key, JSON.stringify(value))
      return
    }

    if (isAnObject && !isAnDataToStoreType) {
      Object.entries(data).forEach(([key, value]) => {
        if (!isString(key)) throw new StringError(key)

        treeTraversal({ key: value }) // Recorre el arbol y valida los datos
        this.storage.setItem(key, JSON.stringify(value))
      })
      return
    }

    if (isAnArray) {
      (data as Array<Record<string, any>>).forEach((x) => {
        Object.entries(x).forEach(([key, value]) => {
          if (!isString(key)) throw new StringError(key)

          const isValidDataToStore = isDataToStoreType(x)

          if (Object.keys(x).length > 1 && !Object.hasOwn(x, 'key')) {
            throw new BadStructureDataError()
          }

          if (isValidDataToStore) {
            treeTraversal({ [(x as DataToStore).key]: (x as DataToStore).data })
            this.storage.setItem((x as DataToStore).key, JSON.stringify((x as DataToStore).data))
          } else {
            treeTraversal({ key: value }) // Recorre el arbol y valida los datos
            this.storage.setItem(key, JSON.stringify(value))
          }
        })
      })
    }
  }
}
