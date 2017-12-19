import { Range } from 'immutable'

export const mapRangeOfLength = (length) => (fillFunction) => {
  return Range(1, length + 1).map(index => fillFunction(index.toString()))
}
