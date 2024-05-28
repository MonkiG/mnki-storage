export interface ObjectUtilsInterface {
  has: (key: string) => boolean
  keys: () => string[]
  values: () => string[]
  getData: () => Record<string, any>
}

export interface StorageRepositoryInterface {
  set: (key: string, value: any) => any
  get: (key: string) => any
  remove: (key: strin) => any
}

export interface MnkiStorageInterface extends ObjectUtilsInterface, StorageRepositoryInterface {
  #storage: Storage
  getLength: () => number
  clear: () => void
  key: (n: number) => string | null

}
