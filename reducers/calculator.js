// @flow

import { Record } from 'immutable'
import type { RecordFactory, RecordOf } from 'immutable'
import {
  DIGIT_PRESS,
  ERASE,
  SET_CURRENT_PLAYER,
  TOGGLE_CALCULATOR_VISIBILITY,
  RESET_CALCULATOR_VALUE
} from '../actions/types'
import type { Action } from '../actions/calculator'
import {
  COMMON_VALUE_LENGTH,
  MAX_VALUE_LENGTH,
  CALCULATOR_DEFAULT_VALUE
} from '../constants'

import { parsePoints } from '../utils'
export type State = {
  value: string,
  currentPlayer: string | null,
  visible: boolean
}

export type StateRE = RecordOf<State>

export const INITIAL_STATE: RecordFactory<State> = Record({
  value: CALCULATOR_DEFAULT_VALUE,
  currentPlayer: null,
  visible: false
})

const getCalculatedValue = (currentValue: string, digit: string): string => {
  if (currentValue === CALCULATOR_DEFAULT_VALUE) {
    if (parsePoints(digit) === parsePoints(CALCULATOR_DEFAULT_VALUE)) {
      return CALCULATOR_DEFAULT_VALUE
    }
    return digit
  }

  if (currentValue.length >= MAX_VALUE_LENGTH) {
    return currentValue
  }

  let newValue = `${currentValue}${digit}`

  // if the value contains more than one digit(ej: 00, 000) and the length
  // is too big the user probably pressed it by mistake in that case just put
  // one 0
  let diff = newValue.length - COMMON_VALUE_LENGTH
  if (diff > 0 && digit.length > 1) {
    // put as much digits as necessary to have the common value length
    newValue = `${currentValue}${digit.slice(0, -diff) || 0}`
  }

  if (newValue.length > MAX_VALUE_LENGTH) {
    newValue = newValue.slice(0, MAX_VALUE_LENGTH)
  }

  return newValue
}

const getErasedValue = (currentValue: string): string => {
  return currentValue.slice(0, -1) || CALCULATOR_DEFAULT_VALUE
}

export default function (
  state: StateRE = INITIAL_STATE(),
  action: Action
): StateRE {
  const { value } = state
  switch (action.type) {
    case DIGIT_PRESS:
      return state.merge({
        value: getCalculatedValue(value, action.payload.digit)
      })
    case ERASE:
      return state.merge({ value: getErasedValue(value) })
    case TOGGLE_CALCULATOR_VISIBILITY:
      return state.merge({
        visible: !state.visible,
        currentPlayer: action.payload.player
      })
    case SET_CURRENT_PLAYER: {
      return state.merge({ currentPlayer: action.payload.player })
    }
    case RESET_CALCULATOR_VALUE: {
      return state.merge({ value: CALCULATOR_DEFAULT_VALUE })
    }
    default:
      return state
  }
}
