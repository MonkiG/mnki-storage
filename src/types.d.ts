export interface ObjectUtilsInterface {
  has: (key: string) => boolean
  keys: () => string[]
  values: () => string[]
  getData: () => Record<string, any>
}

export interface StorageRepositoryInterface {
  set: (data: Record<string, any>) => void
  get: <T extends object>(key: string) => Record<string, T> | null
  remove: <T extends object>(key: strin) => Record<string, T> | null
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

export type dataToStore = Record<string, any> | Array<Record<string, any>> | DataToStore
