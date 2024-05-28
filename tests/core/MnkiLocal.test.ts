import { MnkiLocal } from './../../src/core/MnkiLocal'
import { describe, test, expect } from 'vitest'
describe('MnkiLocal tests', () => {
  test('Constructor without data should use localStorage', () => {
    const instance = new MnkiLocal()
    expect(instance.storage).toBe(localStorage)
  })

  test('Constructor with data should store data in localStorage', () => {
    const data = [{ key: 'value' }]
    const instance = new MnkiLocal(data)
    expect(instance.get('key')).toBe('value')
  })

  // Continuar con pruebas adicionales...
})
