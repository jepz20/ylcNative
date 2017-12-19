import { Record } from 'immutable'
import {
  DIGIT_PRESS,
  ERASE,
  SET_CURRENT_PLAYER,
  TOGGLE_CALCULATOR_VISIBILITY,
  RESET_CALCULATOR_VALUE
} from '../actions/types'
import {
  COMMON_VALUE_LENGTH,
  MAX_VALUE_LENGTH,
  CALCULATOR_DEFAULT_VALUE
} from '../constants'

const INITIAL_STATE = Record({
  value: CALCULATOR_DEFAULT_VALUE,
  currentPlayer: '1',
  visible: false
})

const getCalculatedValue = (currentValue, digit) => {
  if (currentValue === CALCULATOR_DEFAULT_VALUE) {
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

const getErasedValue = currentValue => {
  return currentValue.slice(0, -1) || CALCULATOR_DEFAULT_VALUE
}

export default function (state = new INITIAL_STATE(), action) {
  const { value } = state
  switch (action.type) {
    case DIGIT_PRESS:
      return state.merge({ value: getCalculatedValue(value, action.payload) })
    case ERASE:
      return state.merge({ value: getErasedValue(value) })
    case TOGGLE_CALCULATOR_VISIBILITY: {
      return state.merge({ visible: !state.visible })
    }
    case SET_CURRENT_PLAYER: {
      return state.merge({ currentPlayer: action.payload })
    }
    case RESET_CALCULATOR_VALUE: {
      return state.merge({ value: CALCULATOR_DEFAULT_VALUE })
    }
    default:
      return state
  }
}
