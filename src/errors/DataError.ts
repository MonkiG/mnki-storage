export default class DataError extends Error {
  constructor () {
    super('The data to be setted must be either an object<key,value>, and array ob objects<key,value> or a DataToStore type')
  }
}
