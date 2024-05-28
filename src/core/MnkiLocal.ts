import { MnkiStorage } from './MnkiStorage'

export class MnkiLocal extends MnkiStorage {
  constructor (data?: Array<Record<string, any>>) {
    super(localStorage, data)
  }
}
