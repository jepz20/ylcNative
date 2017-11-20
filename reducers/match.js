import {
  SCOOP_MATCH,
  DRAW,
  HALF_POINTS,
  ADD_POINTS,
  SUBSTRACT_POINTS
} from '../actions/types'
import cloneDeep from 'lodash/cloneDeep'

const DEFAULT_POINTS = 8000
const INITIAL_STATE = {
  players: {
    '1': {
      id: '1',
      name: 'Jose',
      currentPoints: DEFAULT_POINTS
    },
    '2': {
      id: '2',
      name: 'Eduardo',
      currentPoints: DEFAULT_POINTS
    }
  },
  currentDuel: '1',
  logs: {
    '1': [
      {
        id: '1',
        operationValue: 100,
        previousPoints: 8000,
        currentPoints: 8100,
        playerId: '1'
      }, {
        id: '2',
        operationValue: -1500,
        previousPoints: 8000,
        currentPoints: 6500,
        playerId: '2'
      }, {
        id: '3',
        operationValue: 100,
        previousPoints: 8000,
        currentPoints: 7900,
        playerId: '1'
      }
    ]
  },
  matchResults: {}
}

const getPlayerPoints = (state, player) => state.players[player].currentPoints

const addToLog = (state, playerId, operationValue, previousPoints) => {
  const { currentDuel, logs } = state
  logs[currentDuel].push({
    id: Date.now(),
    playerId,
    operationValue,
    currentPoints: getPlayerPoints(state, playerId),
    previousPoints
  })
}

const setDuelWinner = (state) => {
  const { players, currentDuel, matchResults } = state
  const activePlayers = []
  Object.keys(players).map(key => {
    if (players[key].currentPoints > 0) {
      activePlayers.push(key)
    }
  })

  if (activePlayers.length === 1) {
    matchResults[currentDuel] = { winner: activePlayers[0] }
  }

  if (!activePlayers.length) {
    matchResults[currentDuel] = { winner: 'tie' }
  }
}

const operateValue = (state, player, operationValue) => {
  const newState = cloneDeep(state)
  const previousPoints = getPlayerPoints(state, player)
  newState.players[player].currentPoints =
    previousPoints + operationValue
  addToLog(newState, player, operationValue, previousPoints)
  setDuelWinner(newState)
  return newState
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
      operationValue = Math.ceil(getPlayerPoints(state, payload)) * -1
      return operateValue(state, payload, operationValue)
    default:
      return state
  }
}
