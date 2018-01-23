// @flow

import { Record, Map, List } from 'immutable'
import type { RecordFactory } from 'immutable'
import {
  SCOOP_MATCH,
  DRAW,
  HALF_POINTS,
  ADD_POINTS,
  SUBSTRACT_POINTS
} from '../actions/types'
import type {
  StateRE,
  State,
  Result,
  Player,
  Log,
  LogList,
  LogMap,
  PlayerMap,
  ResultMap
} from '../types/match'
import type { Action } from '../actions/match'
import { parsePoints, getId } from '../utils'
// TODO: Use AsyncStorage instead of hardcoded values
import { DEFAULT_POINTS, PLAYER_1_NAME, PLAYER_2_NAME } from '../constants'

export const PlayerRecord: RecordFactory<Player> = Record({
  id: getId(),
  name: 'Default',
  currentPoints: DEFAULT_POINTS
})

export const LogsRecord: RecordFactory<Log> = Record({
  id: getId(),
  playerId: '0',
  operationValue: 0,
  currentPoints: 0,
  previousPoints: 0,
  type: 'operation'
})

export const ResultsRecord: RecordFactory<Result> = Record({
  winner: null
})

export const INITIAL_STATE: RecordFactory<State> = Record({
  players: Map({
    '1': PlayerRecord({
      id: '1',
      name: PLAYER_1_NAME,
      currentPoints: DEFAULT_POINTS
    }),
    '2': PlayerRecord({
      id: '2',
      name: PLAYER_2_NAME,
      currentPoints: DEFAULT_POINTS
    })
  }),
  currentDuel: '1',
  logs: Map(),
  results: Map()
})

export const getPlayerPoints = (players: PlayerMap, player: string): number => {
  if (players.has(player)) {
    // $FlowFixMe
    return players.get(player).currentPoints
  }
  return 0
}

export const playerExist = (players: PlayerMap, player: string) =>
  players.has(player)

export const addToLog = (
  currentDuel: string,
  logs: LogMap,
  playerId: string,
  operationValue: number,
  previousPoints: number,
  nextPoints: number,
  logId: string,
  type: string = 'operation'
): LogMap => {
  const newLogs: LogMap = logs
  const newLog: LogList = (newLogs.get(currentDuel) || List()).push(
    LogsRecord({
      id: logId,
      playerId,
      operationValue,
      currentPoints: nextPoints,
      previousPoints,
      type
    })
  )
  return newLogs.merge({ [currentDuel]: newLog })
}

export const setDuelResult = (
  players: PlayerMap,
  currentDuel: string,
  results: ResultMap
): ResultMap => {
  const activePlayers: PlayerMap = players.filter(
    player => player.currentPoints > 0
  )

  const res: ResultMap = results
  const isWinner: boolean = activePlayers.size === 1
  const isTie: boolean = !activePlayers.size

  if (isWinner) {
    return res.merge({
      [currentDuel]: ResultsRecord({
        // $FlowFixMe
        winner: activePlayers.first().id
      })
    })
  }

  if (isTie) {
    return res.merge({
      [currentDuel]: ResultsRecord({ winner: 'tie' })
    })
  }

  return res
}

export const operateValue = (
  state: StateRE,
  player: string,
  operationValue: number,
  logId: string
): StateRE => {
  if (!playerExist(state.players, player)) return state

  const previousPoints: number = getPlayerPoints(state.players, player)
  const nextPoints: number = previousPoints + operationValue

  const players = state.players.mergeDeep({
    [player]: {
      currentPoints: nextPoints
    }
  })
  const { currentDuel, logs, results } = state
  return state.merge({
    players: players,
    logs: addToLog(
      currentDuel,
      logs,
      player,
      operationValue,
      previousPoints,
      nextPoints,
      logId
    ),
    results: setDuelResult(players, currentDuel, results)
  })
}

const draw = (state: StateRE, logId: string): StateRE => {
  const players: PlayerMap = state.players.map(player =>
    player.set('currentPoints', 0)
  )
  const { currentDuel, logs, results } = state
  return state.merge({
    players,
    logs: addToLog(currentDuel, logs, '-1', 0, 0, 0, logId, 'draw'),
    results: setDuelResult(players, currentDuel, results)
  })
}

export default function (state: StateRE = INITIAL_STATE(), action: Action) {
  switch (action.type) {
    case ADD_POINTS: {
      const { points, player, logId } = action.payload
      const operationValue = parsePoints(points)
      if (operationValue < 1) return state
      return operateValue(state, player, operationValue, logId)
    }
    case SUBSTRACT_POINTS: {
      const { points, player, logId } = action.payload
      const operationValue = parsePoints(points) * -1
      if (operationValue * -1 < 1) return state
      return operateValue(state, player, operationValue, logId)
    }
    case HALF_POINTS: {
      const { player, logId } = action.payload
      const operationValue =
        Math.ceil(getPlayerPoints(state.players, player) / 2) * -1
      return operateValue(state, player, operationValue, logId)
    }
    case SCOOP_MATCH: {
      const { player, logId } = action.payload
      const operationValue =
        Math.ceil(getPlayerPoints(state.players, player)) * -1
      return operateValue(state, player, operationValue, logId)
    }
    case DRAW:
      const { logId } = action.payload
      return draw(state, logId)
    default:
      return state
  }
}
