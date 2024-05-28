export default class StorageError extends Error {
  constructor () {
    super('The storage variable must be and instance of Storage')
  }
}
