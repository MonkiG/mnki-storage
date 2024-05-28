export default class BadStructureDataError extends Error {
  constructor () {
    super(`In order to store nested data you sould use the:
    {
        key: "",
        data: any
    } 
    Syntax or set a parent key to the object: 
    {
        parentKey: { 
        key1: 'value1', 
        nestedKey1: { 
            subnestedKey1: 123, 
            subnestedKey2: 'abc' 
        } 
        }
    }`)
  }
}
