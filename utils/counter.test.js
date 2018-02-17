import counter, { calculateSkip } from './counter.js'

global.requestAnimationFrame = jest.fn(fn => fn())

describe('counter', () => {
  let val
  const setValue = jest.fn(value => {
    val = value
  })
  test('counter ends in the correct value', () => {
    counter({ finalValue: 100, initialValue: 10, setValue })
    expect(val).toBe(100)
  })

  test('counter adds if the finalValue is bigger than the initialValue with a small difference', () => {
    counter({ finalValue: 800, initialValue: 200, setValue })
    expect(val).toBe(800)
  })

  test('counter subtracs if the finalValue is smaller than the initialValue with a small difference', () => {
    counter({ finalValue: 1, initialValue: 123, setValue })
    expect(val).toBe(1)
  })

  test('counter subtracs if the finalValue is smaller than the initialValue with a big difference with a warning', () => {
    counter({ finalValue: 1, initialValue: 8300, setValue, duration: 1500 })
    expect(val).toBe(1)
  })

  test('counter throws an error if wrong type', () => {
    expect(() =>
      counter({ finalValue: 1, initialValue: 'a', setValue })
    ).toThrow()
  })

  test('counter throws an error if onEnd is not a function ', () => {
    expect(() =>
      counter({ finalValue: 1, initialValue: 1, setValue, onEnd: 'wrong' })
    ).toThrow()
  })

  test('counter calls the cancelanimation functions', () => {
    const c = counter({ finalValue: 1, initialValue: 2, setValue })
    const cancelAnimation = jest.fn()
    c.onCancelAnimation(cancelAnimation)
    expect(cancelAnimation).toBeCalled()
  })
})

describe('calculateSkip', () => {
  test('calculate the delta needed between values', () => {
    expect(calculateSkip(1, 60)).toBe(-1)
  })

  test('calculate the delta needed between two big values', () => {
    expect(calculateSkip(8000, 2000)).toBe(100)
  })

  test('calculate the delta needed between two small values for 2 seconds and 120 frames', () => {
    expect(calculateSkip(1, 120, 2, 120)).toBe(-1)
  })

  test('calculate the delta needed between two big values for 2 seconds and 120 frames', () => {
    expect(calculateSkip(1200, 0, 2, 120)).toBe(5)
  })
})
