// @flow

import * as T from './types'
import { getId } from '../utils'

type PlayerPayload = {
  player: string,
  logId: string
}

type PointsPayload = {
  points: string
}

type ScoopMatchAction = {
  type: T.SCOOP_MATCH_STR,
  payload: PlayerPayload
}

type DrawAction = {
  type: T.DRAW_STR,
  payload: { logId: string }
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

export type ScoopMatch = (player: string, logId: string) => ScoopMatchAction
export const scoopMatch: ScoopMatch = (player, logId) => ({
  type: T.SCOOP_MATCH,
  payload: { player, logId }
})

export type Draw = (logId: string) => DrawAction
export const draw: Draw = logId => ({
  type: T.DRAW,
  payload: {
    logId
  }
})

export type HalfPoints = (player: string, logId: string) => HalfPointsAction
export const halfPoints: HalfPoints = (player, logId) => ({
  type: T.HALF_POINTS,
  payload: { player, logId }
})

export type AddPoints = (
  points: string,
  player: string,
  logId: string
) => AddPointsAction
export const addPoints: AddPoints = (points, player, logId) => ({
  type: T.ADD_POINTS,
  payload: { points, player, logId }
})

export type SubstractPoints = (
  points: string,
  player: string,
  logId: string
) => SubstractPointsAction
export const substractPoints: SubstractPoints = (points, player, logId) => ({
  type: T.SUBSTRACT_POINTS,
  payload: { points, player, logId }
})
