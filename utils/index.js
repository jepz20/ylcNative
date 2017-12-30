// @flow

import { Range } from 'immutable'

export type FillFunction = (index: string) => any

export const mapRangeOfLength = (length: number) => (
  fillFunction: FillFunction
) => {
  return Range(1, length + 1).map((index: number) =>
    fillFunction(index.toString())
  )
}

export const parsePoints = (value: ?string): number =>
  value ? parseInt(value, 10) : 0
