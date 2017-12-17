import {
  SCOOP_MATCH,
  DRAW,
  HALF_POINTS,
  ADD_POINTS,
  SUBSTRACT_POINTS
} from '../actions/types'

// TODO: Use AsyncStorage instead of hardcoded values
const DEFAULT_POINTS = 8000
const PLAYER_1_NAME = 'Jose'
const PLAYER_2_NAME = 'Eduardo'

const INITIAL_STATE = {
  players: {
    '1': {
      id: '1',
      name: PLAYER_1_NAME,
      currentPoints: DEFAULT_POINTS
    },
    '2': {
      id: '2',
      name: PLAYER_2_NAME,
      currentPoints: DEFAULT_POINTS
    }
  },
  currentDuel: '1',
  logs: { },
  matchResults: {}
}

const getPlayerPoints = (state, player) => state.players[player].currentPoints

const addToLog = (state, playerId, operationValue, previousPoints, nextPoints) => {
  const { currentDuel, logs } = state
  const currentLog = logs[currentDuel] || []

  return {
    ...logs,
    [currentDuel]: [
      ...currentLog, {
        id: Date.now(),
        playerId,
        operationValue,
        currentPoints: nextPoints,
        previousPoints
      }
    ]
  }
}

const setDuelResult = (players, { currentDuel, matchResults }) => {
  const activePlayers = Object.keys(players).reduce((active, key) => {
    if (players[key].currentPoints > 0) {
      return [...active, key]
    }

    return active
  }, [])

  const isWinner = activePlayers.length === 1
  if (isWinner) {
    return {
      ...matchResults,
      [currentDuel]: { winner: activePlayers[0] }
    }
  }

  if (!activePlayers.length) {
    return {
      ...matchResults,
      [currentDuel]: { winner: 'tie' }
    }
  }
}

const operateValue = (state, player, operationValue) => {
  const previousPoints = getPlayerPoints(state, player)
  const nextPoints = previousPoints + operationValue
  const { [player]: playerDetail } = state.players
  const players = {
    ...state.players,
    [player]: { ...playerDetail, currentPoints: nextPoints }
  }

  return {
    ...state,
    players: players,
    logs: addToLog(state, player, operationValue, previousPoints, nextPoints),
    matchResults: setDuelResult(players, state)
  }
}

const draw = (state) => {
  const players = { ...state.players }
  Object.keys(players).map(key => { players[key].currentPoints = 0 })
  return {
    ...state,
    players: players,
    matchResults: setDuelResult(players, state)
  }
}

export default function (state = INITIAL_STATE, action) {
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
