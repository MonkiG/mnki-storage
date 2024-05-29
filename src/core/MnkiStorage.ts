import BadStructureDataError from '../errors/BadStructureDataError'
import StorageError from '../errors/StorageError'
import StringError from '../errors/StringError'
import { type JSONObject, type dataToStore, type DataToStore, type MnkiStorageInterface, type dataToStoreKind, type JSONArray } from '../types'
import toDataToStore from '../utils/toJsonObject'
import treeTraversal from '../utils/treeTraversal'
import { isArray, isDataToStoreType, isStorage, isString } from '../utils/validators'

/**
 * @class MnkiStorage
 * @implements {MnkiStorageInterface}
 * @description A class that extends the way of handling storage operations with additional validations.
 */
export class MnkiStorage implements MnkiStorageInterface {
  /**
   * @property {Storage} storage - The storage object used to store data.
   */
  readonly storage: Storage

  /**
   * @constructor
   * @param {Storage} storage - The storage object to be used.
   * @param {dataToStore} [data] - Optional initial data to store.
   * @throws {StorageError} If the provided storage is invalid.
   */
  constructor (storage: Storage, data?: dataToStore) {
    if (!isStorage(storage)) throw new StorageError()

    this.storage = storage

    if (data) {
      const parsedData = toDataToStore(data)
      this.#handleSetData(parsedData)
    }
  }

  /**
   * @method set
   * @description Sets the data in the storage.
   * @param {dataToStore} data - The data to be stored.
   */
  set (data: dataToStore): void {
    const parsedData = toDataToStore(data)
    this.#handleSetData(parsedData)
  }

  /**
   * @method get
   * @description Retrieves the stored data for a given key.
   * @param {string} key - The key of the stored data.
   * @returns {JSONObject | null} The stored data or null if not found.
   * @throws {StringError} If the key is not a string.
   */
  get (key: string): JSONObject | null {
    const isAnString = isString(key)

    if (!isAnString) {
      throw new StringError('key')
    }

    const storedValue = this.storage.getItem(key)

    if (!storedValue) return null

    const parseResponse: JSONObject = { [key]: JSON.parse(storedValue) }

    return parseResponse
  }

  /**
   * @method getData
   * @description Retrieves all stored data.
   * @returns {JSONArray} An array of all stored data.
   */
  getData (): JSONArray {
    return Object.entries(this.storage).reduce((prev: Array<Record<string, any>>, curr) => {
      const [key, value] = curr
      prev.push({ [key]: JSON.parse(value as string) })
      return prev
    }, [])
  }

  /**
   * @method remove
   * @description Removes the stored data for a given key.
   * @param {string} key - The key of the data to be removed.
   * @returns {JSONObject | null} The removed data or null if not found.
   * @throws {StringError} If the key is not a string.
   */
  remove (key: string): JSONObject | null {
    if (!isString(key)) {
      throw new StringError('key')
    }

    const item = this.get(key)
    this.storage.removeItem(key)

    return item
  }

  /**
   * @method getLength
   * @description Gets the number of items stored.
   * @returns {number} The number of items stored.
   */
  getLength (): number {
    return this.storage.length
  }

  /**
   * @method clear
   * @description Clears all stored data.
   * @returns {void}
   */
  clear (): void {
    this.storage.clear()
  }

  /**
   * @method key
   * @description Retrieves the key at the given index.
   * @param {number} n - The index of the key.
   * @returns {string | null} The key at the given index or null if not found.
   */
  key (n: number): string | null {
    return this.storage.key(n)
  }

  /**
   * @method has
   * @description Checks if a given key exists in the storage.
   * @param {string} key - The key to check.
   * @returns {boolean} True if the key exists, false otherwise.
   */
  has (key: string): boolean {
    return Object.hasOwn(this.storage, key)
  }

  /**
   * @method keys
   * @description Retrieves all keys from the storage.
   * @returns {string[]} An array of all keys.
   */
  keys (): string[] {
    return Object.keys(this.storage)
  }

  /**
   * @method values
   * @description Retrieves all values from the storage.
   * @returns {string[]} An array of all values.
   */
  values (): string[] {
    return Object.values(this.storage)
  }

  /**
   * @private
   * @method #handleSetData
   * @description Handles the setting of data in the storage.
   * @param {object} param - The data type and data to be stored.
   * @param {dataToStoreKind} param.type - The type of data to be stored.
   * @param {dataToStore} param.data - The data to be stored.
   * @throws {StringError} If the key is not a string.
   * @throws {BadStructureDataError} If the data structure is invalid.
   */
  #handleSetData ({ type, data }: { type: dataToStoreKind, data: dataToStore }): void {
    if (type === 'keyValue') {
      const key = (data as DataToStore).key
      const value = (data as DataToStore).data

      if (!isString(key)) throw new StringError(key)

      treeTraversal(value)
      this.storage.setItem(key, JSON.stringify(value))
      return
    }

    if (isArray(data)) {
      (data as Array<Record<string, any>>).forEach((x) => {
        Object.entries(x).forEach(([key, value]) => {
          if (!isString(key)) throw new StringError(key)

          const isValidDataToStore = isDataToStoreType(x)

          if (!isValidDataToStore) {
            if (Object.keys(x).length > 1) {
              throw new BadStructureDataError()
            }
            this.storage.setItem(key, JSON.stringify(value))
            return
          }

          this.storage.setItem((x as DataToStore).key, JSON.stringify((x as DataToStore).data))
        })
      })

      return
    }

    Object.entries(data).forEach(([key, value]) => {
      if (!isString(key)) throw new StringError(key)

      this.storage.setItem(key, JSON.stringify(value))
    })
  }
}
