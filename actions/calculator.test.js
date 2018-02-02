import * as A from './calculator.js'
import * as T from './types'
describe('Calculator Actions', () => {
  test('digitPress', () => {
    expect(A.digitPress('3')).toEqual({
      type: T.DIGIT_PRESS,
      payload: { digit: '3' }
    })
  })

  test('erase', () => {
    expect(A.erase()).toEqual({
      type: T.ERASE
    })
  })

  test('toggleCalculatorVisibility', () => {
    expect(A.toggleCalculatorVisibility('1')).toEqual({
      type: T.TOGGLE_CALCULATOR_VISIBILITY,
      payload: { player: '1' }
    })
  })

  test('reset', () => {
    expect(A.reset()).toEqual({
      type: T.RESET_CALCULATOR_VALUE
    })
  })
})
