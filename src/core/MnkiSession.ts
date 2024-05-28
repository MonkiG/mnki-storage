import { MnkiStorage } from './MnkiStorage'

export class MnkiSession extends MnkiStorage {
  constructor (data?: Array<Record<string, any>>) {
    super(sessionStorage, data)
  }
}
