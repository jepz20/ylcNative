import {
  DIGIT_PRESS,
  ERASE,
  SET_CURRENT_PLAYER,
  TOGGLE_CALCULATOR_VISIBILITY,
  RESET_CALCULATOR_VALUE
} from './types'

export const digitPress = digit => ({
  type: DIGIT_PRESS,
  payload: digit
})

export const erase = () => ({
  type: ERASE
})

export const setCurrentPlayer = player => ({
  type: SET_CURRENT_PLAYER,
  payload: player
})

export const toggleCalculatorVisibility = player => ({
  type: TOGGLE_CALCULATOR_VISIBILITY
})

export const reset = () => ({
  type: RESET_CALCULATOR_VALUE
})
