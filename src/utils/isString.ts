export default function isString (data: any): string {
  if (typeof data !== 'string' && !(data instanceof String)) {
    throw new Error(`${data} should be a string`)
  }

  return data.valueOf()
}
