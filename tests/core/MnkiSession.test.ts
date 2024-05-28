import { MnkiSession } from '../../src/core/MnkiSession'
import { describe, test, expect } from 'vitest'
describe('MnkiLocal tests', () => {
  test('Constructor without data should use localStorage', () => {
    const instance = new MnkiSession()
    expect(instance.storage).toBe(sessionStorage)
  })

  test('Constructor with data should store data in localStorage', () => {
    const data = [{ key: 'value' }]
    const instance = new MnkiSession(data)
    expect(instance.get('key')).toEqual({ key: 'value' })
  })

  // Continuar con pruebas adicionales...
})
