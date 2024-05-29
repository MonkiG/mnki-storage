export function isDataToStoreType (data: Record<string, any>): boolean {
  return Object.hasOwn(data, 'key') && Object.hasOwn(data, 'data')
}
export function isInvalidValue (value: any): boolean {
  return (
    value === undefined ||
    isFunction(value) ||
    typeof value === 'bigint' ||
    typeof value === 'symbol' ||
    isNan(value) ||
    isInfinity(value)
  )
}
export function isString (data: any): boolean {
  if (data instanceof String) {
    throw new Error('Do not use the String constructor')
  }

  return typeof data === 'string'
}

export function isStorage (data: any): boolean {
  return data instanceof Storage
}

export function isObject (data: any): boolean {
  return (
    typeof data === 'object' &&
      data !== null &&
      !isArray(data)
  )
}

export function isArray (data: any): boolean {
  return Array.isArray(data)
}

export function isPrimitive (data: any): boolean {
  return data === null || (typeof data !== 'object' && !isArray(data) && typeof data !== 'function')
}

export function isFunction (data: any): boolean {
  return typeof data === 'function' || data instanceof Function || {}.toString.call(data) === '[object Function]'
}

export function isNan (data: any): boolean {
  return (
    (data && data.toString() === 'NaN') ||
    (typeof data === 'number' && isNaN(data))
  )
}
export function isInfinity (data: any): boolean {
  return (
    ((
      data === Infinity ||
      data === -Infinity
    ) &&
    typeof data === 'number') ||
    (data && (data.toString() === 'Infinity' ||
    data.toString() === '-Infinity'))
  )
}
