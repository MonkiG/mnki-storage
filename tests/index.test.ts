import { describe, expect, test } from 'vitest'
import MnkiStorage, { MnkiLocal, MnkiSession } from '../src/index'

describe('Index tests', () => {
  test('MnkiStorage class should be defined', () => {
    expect(MnkiStorage).toBeDefined()
  })

  test('MnkiLocal class should be defined', () => {
    expect(MnkiLocal).toBeDefined()
  })

  test('MnkiSession class should be defined', () => {
    expect(MnkiSession).toBeDefined()
  })
})
