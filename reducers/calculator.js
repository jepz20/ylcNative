import {
  DIGIT_PRESS,
  ERASE,
  SET_CURRENT_PLAYER,
  TOGGLE_CALCULATOR_VISIBILITY,
  RESET_CALCULATOR_VALUE
} from '../actions/types'
import { COMMON_VALUE_LENGTH, MAX_VALUE_LENGTH, DEFAULT_CALCULATOR_VALUE } from '../constants'
const INITIAL_STATE = {
  value: DEFAULT_CALCULATOR_VALUE,
  currentPlayer: '1',
  visible: false
}

const getCalculatedValue = (currentValue, digit) => {
  if (currentValue === DEFAULT_CALCULATOR_VALUE) {
    return digit
  }

  if (currentValue.length >= MAX_VALUE_LENGTH) {
    return currentValue
  }

  let newValue = `${currentValue}${digit}`

  // if the value contains more than one digit(ej: 0, 000) and the length is too big
  // the user probably pressed it by mistake in that case just put 1 0
  let diff = newValue.length - COMMON_VALUE_LENGTH
  if (diff > 0 && digit.length > 1) {
    // put as much digits as necessary to have the common value length
    newValue = `${currentValue}${digit.slice(0, diff + 1)}`
  }

  if (newValue.length > MAX_VALUE_LENGTH) {
    newValue = newValue.slice(0, MAX_VALUE_LENGTH)
  }

  return newValue
}

const getErasedValue = currentValue => {
  return currentValue.slice(0, -1) || DEFAULT_CALCULATOR_VALUE
}

export default function (state = INITIAL_STATE, action) {
  const { value } = state
  switch (action.type) {
    case DIGIT_PRESS:
      return { ...state, value: getCalculatedValue(value, action.payload) }
    case ERASE:
      return { ...state, value: getErasedValue(value) }
    case TOGGLE_CALCULATOR_VISIBILITY: {
      return { ...state, visible: !state.visible }
    }
    case SET_CURRENT_PLAYER: {
      return { ...state, currentPlayer: action.payload }
    }
    case RESET_CALCULATOR_VALUE: {
      return { ...state, value: DEFAULT_CALCULATOR_VALUE }
    }
    default:
      return state
  }
}
