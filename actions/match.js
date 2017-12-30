// @flow

import * as T from './types'

type PlayerPayload = {
  player: string
}

type PointsPayload = {
  points: string
}

type ScoopMatchAction = {
  type: T.SCOOP_MATCH_STR,
  payload: PlayerPayload
}

type DrawAction = {
  type: T.DRAW_STR
}

type HalfPointsAction = {
  type: T.HALF_POINTS_STR,
  payload: PlayerPayload
}

type AddPointsAction = {
  type: T.ADD_POINTS_STR,
  payload: PlayerPayload & PointsPayload
}

type SubstractPointsAction = {
  type: T.SUBSTRACT_POINTS_STR,
  payload: PlayerPayload & PointsPayload
}

export type Action =
  | ScoopMatchAction
  | DrawAction
  | HalfPointsAction
  | AddPointsAction
  | SubstractPointsAction

export type ScoopMatch = (player: string) => ScoopMatchAction
export const scoopMatch: ScoopMatch = player => ({
  type: T.SCOOP_MATCH,
  payload: { player }
})

export type Draw = () => DrawAction
export const draw = () => ({
  type: T.DRAW
})

export type HalfPoints = (player: string) => HalfPointsAction
export const halfPoints: HalfPoints = player => ({
  type: T.HALF_POINTS,
  payload: { player }
})

export type AddPoints = (points: string, player: string) => AddPointsAction
export const addPoints: AddPoints = (points, player) => ({
  type: T.ADD_POINTS,
  payload: { points, player }
})

export type SubstractPoints = (
  points: string,
  player: string
) => SubstractPointsAction
export const substractPoints: SubstractPoints = (points, player) => ({
  type: T.SUBSTRACT_POINTS,
  payload: { points, player }
})
