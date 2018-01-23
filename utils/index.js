// @flow

import { Range } from 'immutable'

export type FillFunction = (index: string) => any

export const mapRangeOfLength = (length: number) => (
  fillFunction: FillFunction
) => {
  if (length < 1) {
    throw new Error('length should be greater than 1')
  }
  return Range(1, length + 1).map((index: number) =>
    fillFunction(index.toString())
  )
}

export const parsePoints = (value: ?string): number =>
  value ? parseInt(value, 10) : 0

export const getId = (): string => Date.now().toString()
