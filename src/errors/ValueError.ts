export default class ValueError extends Error {
  constructor (key: string) {
    super(`The value of the key: ${key} is not valid. value can't be of type:
- undefined
- function
- bigint
- symbol
- NaN
- Infinity`)
  }
}
