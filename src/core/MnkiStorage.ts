import { type MnkiStorageInterface } from '../types'
import isString from '../utils/isString'

export class MnkiStorage implements MnkiStorageInterface {
  readonly storage: Storage

  constructor (storage: Storage, data?: Array<Record<string, any>>) {
    if (!(storage instanceof Storage)) throw new Error('storage must be an instance of Storage')

    this.storage = storage

    if (data) {
      data.forEach(record => {
        Object.entries(record).forEach(([key, value]) => {
          this.set(key, value)
        })
      })
    }
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

  getData (): Record<string, any> {
    return Object.entries(this.storage).reduce((prev: Record<string, any>, curr) => {
      prev[curr[0]] = curr[1]
      return prev
    }, {})
  }

  set (key: string, value: any): void {
    const keyParsered = isString(key)
    this.storage.setItem(keyParsered, value as string)
  }

  get (key: string): any | null {
    const keyParsered = isString(key)
    return this.storage.getItem(keyParsered)
  }

  remove (key: string): any | null {
    const keyParsered = isString(key)
    const item = this.get(key)
    this.storage.removeItem(keyParsered)

    return item
  }
}
