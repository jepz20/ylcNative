import {
  SCOOP_MATCH,
  DRAW,
  HALF_POINTS,
  ADD_POINTS,
  SUBSTRACT_POINTS
} from './types'

export const scoopMatch = player => ({
  type: SCOOP_MATCH,
  payload: player
})

export const draw = () => ({
  type: DRAW
})

export const halfPoints = player => ({
  type: HALF_POINTS,
  payload: player
})

export const addPoints = (points, player) => ({
  type: ADD_POINTS,
  payload: { points, player }
})

export const substractPoints = (points, player) => ({
  type: SUBSTRACT_POINTS,
  payload: { points, player }
})
