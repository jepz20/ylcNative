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
import { parsePoints } from '../utils'

// TODO: Use AsyncStorage instead of hardcoded values
const DEFAULT_POINTS: number = 8000
const PLAYER_1_NAME: string = 'Jose'
const PLAYER_2_NAME: string = 'Eduardo'

const getId = (): string => Date.now().toString()

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
  previousPoints: 0
})

export const resultsRecord: RecordFactory<Result> = Record({
  winner: null
})

const INITIAL_STATE: RecordFactory<State> = Record({
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

const getPlayerPoints = (players: PlayerMap, player: string): number => {
  if (players.has(player)) {
    // $FlowFixMe
    return players.get(player).currentPoints
  }
  console.warn(players, player, 'getPlayerPoint')
  return 0
}

const addToLog = (
  currentDuel: string,
  logs: ?LogMap,
  playerId: string,
  operationValue: number,
  previousPoints: number,
  nextPoints: number
): LogMap => {
  const newLogs: LogMap = logs || Map()
  const newLog: LogList = (newLogs.get(currentDuel) || List()).push(
    LogsRecord({
      id: getId(),
      playerId,
      operationValue,
      currentPoints: nextPoints,
      previousPoints
    })
  )
  return newLogs.merge({ [currentDuel]: newLog })
}

const setDuelResult = (
  players: PlayerMap,
  currentDuel: string,
  results: ?ResultMap = Map()
): ResultMap => {
  const activePlayers: PlayerMap = players.filter(
    player => player.currentPoints > 0
  )

  const res: ResultMap = results || Map()
  const isWinner: boolean = activePlayers.size === 1
  const isTie: boolean = !activePlayers.size

  if (isWinner) {
    return res.merge({
      [currentDuel]: resultsRecord({
        // $FlowFixMe
        winner: activePlayers.first().id
      })
    })
  }

  if (isTie) {
    return res.merge({
      [currentDuel]: resultsRecord({ winner: 'tie' })
    })
  }

  return res
}

const operateValue = (
  state: StateRE,
  player: string,
  operationValue: number
): StateRE => {
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
      nextPoints
    ),
    results: setDuelResult(players, currentDuel, results)
  })
}

const draw = (state: StateRE): StateRE => {
  const players: PlayerMap = state.players.map(player =>
    player.set('currentPoints', 0)
  )
  return state.merge({
    players,
    results: setDuelResult(players, state.currentDuel, state.results)
  })
}

export default function (state: StateRE = INITIAL_STATE(), action: Action) {
  switch (action.type) {
    case ADD_POINTS: {
      const { points, player } = action.payload
      let operationValue: number = parsePoints(points)
      return operateValue(state, player, operationValue)
    }
    case SUBSTRACT_POINTS: {
      const { points, player } = action.payload
      let operationValue: number = parsePoints(points) * -1
      return operateValue(state, player, operationValue)
    }
    case HALF_POINTS: {
      const { player } = action.payload
      let operationValue: number =
        Math.ceil(getPlayerPoints(state.players, player) / 2) * -1
      return operateValue(state, player, operationValue)
    }
    case SCOOP_MATCH: {
      const { player } = action.payload
      let operationValue: number =
        Math.ceil(getPlayerPoints(state.players, player)) * -1
      return operateValue(state, player, operationValue)
    }
    case DRAW:
      return draw(state)
    default:
      return state
  }
}
