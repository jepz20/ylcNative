import * as Utils from './index'
import { Seq } from 'immutable'
describe('Utils parsePoints', () => {
  test('to parse point with a string', () => {
    expect(Utils.parsePoints('1')).toBe(1)
  })

  test('to parse point with a string with 0 at the beginning', () => {
    expect(Utils.parsePoints('00809')).toBe(809)
  })

  test('to parse point with a string with 0 at the end', () => {
    expect(Utils.parsePoints('329000')).toBe(329000)
  })

  test('parse point returns 0 when theres no value', () => {
    expect(Utils.parsePoints()).toBe(0)
  })
})

describe('Utils mapRangeOfLength', () => {
  test('returns a function', () => {
    expect(typeof Utils.mapRangeOfLength(1)).toBe('function')
  })

  test('returns an array with size of the given length', () => {
    expect(Utils.mapRangeOfLength(123)(() => {}).size).toBe(123)
  })

  test('returns a Sequence', () => {
    const fn = index => index * 2
    const t = Utils.mapRangeOfLength(4)(fn)
    expect(Seq.isSeq(t)).toBe(true)
  })

  test('returns an array of the given length', () => {
    const fn = index => index * 2
    expect(Utils.mapRangeOfLength(4)(fn).toJS()).toEqual([2, 4, 6, 8])
  })

  test('returns an array of the given length', () => {
    const fn = index => index * 2
    expect(Utils.mapRangeOfLength(4)(fn).toJS()).toEqual([2, 4, 6, 8])
  })

  test('should return an error if length is less than 1', () => {
    expect(Utils.mapRangeOfLength(-1)).toThrowError(
      'length should be greater than 1'
    )
  })
})
