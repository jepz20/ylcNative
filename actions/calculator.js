// @flow

import * as T from './types'

type DigitPressAction = {
  type: T.DIGIT_PRESS_STR,
  payload: { digit: string }
}

type EraseAction = {
  type: T.ERASE_STR
}

type SetCurrentPlayerAction = {
  type: T.SET_CURRENT_PLAYER_STR,
  payload: { player: string }
}

type ToggleCalculatorVisibilityAction = {
  type: T.TOGGLE_CALCULATOR_VISIBILITY_STR,
  payload: { player: string | null }
}

type ResetAction = {
  type: T.RESET_CALCULATOR_VALUE_STR
}

export type Action =
  | DigitPressAction
  | EraseAction
  | SetCurrentPlayerAction
  | ToggleCalculatorVisibilityAction
  | ResetAction

export type DigitPress = (digit: string) => DigitPressAction
export const digitPress: DigitPress = digit => ({
  type: T.DIGIT_PRESS,
  payload: { digit }
})

export type Erase = () => EraseAction
export const erase: Erase = () => ({
  type: T.ERASE
})

export type SetCurrentPlayer = (player: string) => SetCurrentPlayerAction
export const setCurrentPlayer: SetCurrentPlayer = player => ({
  type: T.SET_CURRENT_PLAYER,
  payload: { player }
})

export type ToggleCalculatorVisibility = (
  player: string | null
) => ToggleCalculatorVisibilityAction

export const toggleCalculatorVisibility: ToggleCalculatorVisibility = player => ({
  type: T.TOGGLE_CALCULATOR_VISIBILITY,
  payload: { player }
})

export type Reset = () => ResetAction
export const reset: Reset = () => ({
  type: T.RESET_CALCULATOR_VALUE
})
