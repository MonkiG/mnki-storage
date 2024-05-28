export default class StringError extends Error {
  constructor (variableName: string) {
    super(`The variable ${variableName} should be a string`)
  }
}
