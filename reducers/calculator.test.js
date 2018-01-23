import calculator, { INITIAL_STATE } from './calculator'
import * as T from '../actions/types'
import {
  COMMON_VALUE_LENGTH,
  MAX_VALUE_LENGTH,
  CALCULATOR_DEFAULT_VALUE
} from '../constants'

describe('Calculator Reducers', () => {
  describe('Digit Press', () => {
    const action = { type: T.DIGIT_PRESS, payload: {} }

    test('substitute the default value when a digit is pressed', () => {
      const IS = INITIAL_STATE()
      const expected = INITIAL_STATE({ value: '1' })
      action.payload.digit = '1'
      expect(calculator(IS, action)).toEqual(expected)
    })

    test('return the default value when is the digit is the default', () => {
      const IS = INITIAL_STATE()
      const expected = INITIAL_STATE({ value: '0' })
      action.payload.digit = '0'
      expect(calculator(IS, action)).toEqual(expected)
    })

    test('add to the value when a digit is pressed', () => {
      const IS = INITIAL_STATE({ value: '1' })
      action.payload.digit = '5'
      const expected = INITIAL_STATE({ value: '15' })
      expect(calculator(IS, action)).toEqual(expected)
    })

    test('not exceed the max length', () => {
      const value = new Array(MAX_VALUE_LENGTH + 1).join('1')
      const IS = INITIAL_STATE({ value })
      action.payload.digit = '5'
      const expected = INITIAL_STATE({ value: value })
      expect(calculator(IS, action)).toEqual(expected)
    })

    test('not exceed the max length with a double digit', () => {
      const value = new Array(MAX_VALUE_LENGTH + 1).join('1')
      const IS = INITIAL_STATE({ value })
      action.payload.digit = '00'
      const expected = INITIAL_STATE({ value: value })
      expect(calculator(IS, action)).toEqual(expected)
    })

    test('not exceed the max length with a triple digit', () => {
      const value = new Array(MAX_VALUE_LENGTH + 1).join('1')
      const IS = INITIAL_STATE({ value })
      action.payload.digit = '00'
      const expected = INITIAL_STATE({ value: value })
      expect(calculator(IS, action)).toEqual(expected)
    })

    test('not exceed the common length with a double digit', () => {
      const value = new Array(COMMON_VALUE_LENGTH).join('1')
      const IS = INITIAL_STATE({ value })
      action.payload.digit = '00'
      const expected = INITIAL_STATE({ value: value + '0' })
      expect(calculator(IS, action)).toEqual(expected)
    })

    test('not exceed the common length with a triple digit', () => {
      const value = new Array(COMMON_VALUE_LENGTH).join('1')
      const IS = INITIAL_STATE({ value })
      action.payload.digit = '000'
      const expected = INITIAL_STATE({ value: value + '0' })
      expect(calculator(IS, action)).toEqual(expected)
    })

    test('add triple digit when value is less the common length - 3', () => {
      const value = new Array(COMMON_VALUE_LENGTH - 2).join('1')
      const IS = INITIAL_STATE({ value })
      action.payload.digit = '000'
      const expected = INITIAL_STATE({ value: value + '000' })
      expect(calculator(IS, action)).toEqual(expected)
    })

    test('add double digit when value is less the common length - 2', () => {
      const value = new Array(COMMON_VALUE_LENGTH - 1).join('1')
      const IS = INITIAL_STATE({ value })
      action.payload.digit = '00'
      const expected = INITIAL_STATE({ value: value + '00' })
      expect(calculator(IS, action)).toEqual(expected)
    })

    test('not add double digit at the beginning', () => {
      const IS = INITIAL_STATE()
      action.payload.digit = '00'
      expect(calculator(IS, action)).toEqual(IS)
    })

    test('not add triple digit at the beginning', () => {
      const IS = INITIAL_STATE()
      action.payload.digit = '000'
      expect(calculator(IS, action)).toEqual(IS)
    })
  })

  describe('Erase Press', () => {
    const action = { type: T.ERASE }
    test('do nothing if value is the default', () => {
      const IS = INITIAL_STATE()
      expect(calculator(IS, action)).toEqual(IS)
    })

    test('erase a number if value is not default', () => {
      const is = INITIAL_STATE({ value: '40' })
      const expected = INITIAL_STATE({ value: '4' })
      expect(calculator(is, action)).toEqual(expected)
    })
  })
  describe('toggle calculator', () => {
    const action = { type: T.TOGGLE_CALCULATOR_VISIBILITY, payload: {} }
    test('it should set the toggle visibility to true', () => {
      const IS = INITIAL_STATE()
      action.payload.player = null
      const expected = INITIAL_STATE({ visible: true })
      expect(calculator(IS, action)).toEqual(expected)
    })

    test('it should set the toggle visibility to false', () => {
      const IS = INITIAL_STATE({ visible: true })
      action.payload.player = null
      const expected = INITIAL_STATE({ visible: false })
      expect(calculator(IS, action)).toEqual(expected)
    })
  })
  describe('reset calculator', () => {
    const action = { type: T.RESET_CALCULATOR_VALUE, payload: {} }
    test('it should set the calculator value to the default', () => {
      const IS = INITIAL_STATE({ visible: true, value: 300 })
      const expected = INITIAL_STATE({
        visible: true,
        value: CALCULATOR_DEFAULT_VALUE
      })
      expect(calculator(IS, action)).toEqual(expected)
    })
  })
})
