export interface ObjectUtilsInterface {
  has: (key: string) => boolean
  keys: () => string[]
  values: () => string[]
  getData: () => Record<string, any>
}

export interface StorageRepositoryInterface {
  set: (data: Record<string, any>) => void
  get: (key: string) => JSONObject<T> | null
  remove: (key: string) => JSONObject<T> | null
}

export interface MnkiStorageInterface extends ObjectUtilsInterface, StorageRepositoryInterface {
  #storage: Storage
  getLength: () => number
  clear: () => void
  key: (n: number) => string | null

}

export interface DataToStore {
  key: string
  data: any
}

type infinity = 'Infinity' | '-Infinity'
type NaN = 'NaN'
export type invalidValues =
undefined |
bigint |
symbol |
/* eslint-disable-next-line @typescript-eslint/ban-types */
Function |
(() => any) | (() => Promise<any>) |
NaN |
infinity

export type JSONPrimitivesValues = Exclude<
| string
| number
| boolean
| null, invalidValues>

export interface JSONObject {
  [key: string]: JSONPrimitivesValues | JSONObject
}

export type JSONArray = JSONObject[]

export type JSON = JSONObject | JSONArray

export type dataToStoreKind = 'json' | 'keyValue'
export type dataToStore = JSON | DataToStore
