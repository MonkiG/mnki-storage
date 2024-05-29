import DataError from '../errors/DataError'
import { type dataToStoreKind, type dataToStore } from '../types'
import treeTraversal from './treeTraversal'
import { isArray, isDataToStoreType, isObject } from './validators'

export default function toDataToStore (data: Record<string, any>): { type: dataToStoreKind, data: dataToStore } {
  const isAnObject = isObject(data)
  const isAnArray = isArray(data)

  if (!isAnArray && !isAnObject) {
    throw new DataError()
  }

  if (isDataToStoreType(data)) {
    treeTraversal(data)
    return { type: 'keyValue', data }
  } else {
    treeTraversal(data)
    return ({ type: 'json', data })
  }
}
