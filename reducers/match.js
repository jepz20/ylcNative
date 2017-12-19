import {
  SCOOP_MATCH,
  DRAW,
  HALF_POINTS,
  ADD_POINTS,
  SUBSTRACT_POINTS
} from '../actions/types'
import { Record, Map, List } from 'immutable'

// TODO: Use AsyncStorage instead of hardcoded values
const DEFAULT_POINTS = 8000
const PLAYER_1_NAME = 'Jose'
const PLAYER_2_NAME = 'Eduardo'

const PlayerRecord = Record({
  id: Date.now(),
  name: 'Default',
  currentPoints: DEFAULT_POINTS
})

const LogsRecord = Record({
  id: Date.now(),
  playerId: null,
  operationValue: 0,
  currentPoints: null,
  previousPoints: null
})

const MatchRecord = Record({
  winner: null
})

const INITIAL_STATE = Record({
  players: Map({
    '1': new PlayerRecord({
      id: '1',
      name: PLAYER_1_NAME,
      currentPoints: DEFAULT_POINTS
    }),
    '2': new PlayerRecord({
      id: '2',
      name: PLAYER_2_NAME,
      currentPoints: DEFAULT_POINTS
    })
  }),
  currentDuel: '1',
  logs: Map(),
  matchResults: Map()
})

const getPlayerPoints = (state, player) =>
  state.players.get(player).currentPoints

const addToLog = (state, playerId, operationValue, previousPoints, nextPoints) => {
  const { currentDuel, logs } = state
  const currentLog = logs[currentDuel] || List()
  const newLog = currentLog.push(new LogsRecord({
    id: Date.now(),
    playerId,
    operationValue,
    currentPoints: nextPoints,
    previousPoints
  }))

  return logs.merge({ [currentDuel]: newLog })
}

const setDuelResult = (players, { currentDuel, matchResults }) => {
  const activePlayers = players
    .filter(player => player.currentPoints > 0)

  const isWinner = activePlayers.size === 1

  if (isWinner) {
    return matchResults.merge({
      [currentDuel]: new MatchRecord({ winner: activePlayers.first().id })
    })
  }

  if (!activePlayers.size) {
    return matchResults.merge({
      [currentDuel]: new MatchRecord({ winner: 'tie' })
    })
  }

  return matchResults
}

const operateValue = (state, player, operationValue) => {
  const previousPoints = getPlayerPoints(state, player)
  const nextPoints = previousPoints + operationValue

  const players = state.players.mergeDeep({
    [player]: {
      currentPoints: nextPoints
    }
  })

  return state.merge({
    players: players,
    logs: addToLog(state, player, operationValue, previousPoints, nextPoints),
    matchResults: setDuelResult(players, state)
  })
}

const draw = (state) => {
  const players = state.players.map(player => player.set('currentPoints', 0))
  return state.merge({
    players: players,
    matchResults: setDuelResult(players, state)
  })
}

export default function (state = new INITIAL_STATE(), action) {
  const { payload, type } = action
  let operationValue
  switch (type) {
    case ADD_POINTS:
      operationValue = parseInt(payload.points, 10)
      return operateValue(state, payload.player, operationValue)
    case SUBSTRACT_POINTS:
      operationValue = parseInt(payload.points, 10) * -1
      return operateValue(state, payload.player, operationValue)
    case HALF_POINTS:
      operationValue = Math.ceil(getPlayerPoints(state, payload) / 2) * -1
      return operateValue(state, payload, operationValue)
    case SCOOP_MATCH:
      operationValue = Math.ceil(getPlayerPoints(state, payload)) * -1
      return operateValue(state, payload, operationValue)
    case DRAW:
      return draw(state)
    default:
      return state
  }
}
