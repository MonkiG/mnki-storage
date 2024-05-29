import ValueError from '../errors/ValueError'
import { isInvalidValue, isString } from './validators'

export default function treeTraversal (tree: any): void {
  if (!tree) return
  const keys = Object.keys(tree as Record<string, any>)

  if (keys.length <= 0) return
  keys.forEach((x) => {
    const treeData = tree[x]
    if (isInvalidValue(treeData)) {
      throw new ValueError(x)
    }

    if (!isString(treeData)) {
      treeTraversal(treeData as Record<string, any>)
    }
  })
}
