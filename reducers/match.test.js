import match, {
  INITIAL_STATE,
  LogsRecord,
  ResultsRecord,
  PlayerRecord
} from './match'
import * as T from '../actions/types'
import { Map, List } from 'immutable'
import { MAX_NAME_LENGTH } from '../constants'
import { REHYDRATE } from 'redux-persist'

describe('Match Reducers', () => {
  describe('Add Points', () => {
    const action = { type: T.ADD_POINTS, payload: {} }
    const IS = INITIAL_STATE({
      players: Map({
        '1': PlayerRecord({
          id: '1',
          name: 'test',
          currentPoints: 8000
        }),
        '2': PlayerRecord({
          id: '2',
          name: 'test2',
          currentPoints: 8000
        })
      })
    })

    test('add values when its a valid player and value', () => {
      action.payload.points = '1358'
      action.payload.player = '1'
      action.payload.logId = '1'
      const expected = INITIAL_STATE({
        players: Map({
          '1': PlayerRecord({
            id: '1',
            name: 'test',
            currentPoints: 9358
          }),
          '2': PlayerRecord({
            id: '2',
            name: 'test2',
            currentPoints: 8000
          })
        }),
        logs: Map({
          '1': List([
            LogsRecord({
              currentPoints: 9358,
              id: '1',
              operationValue: 1358,
              playerId: '1',
              previousPoints: 8000
            })
          ])
        })
      })
      expect(match(IS, action)).toEqual(expected)
    })

    test('dont add when is an invalid player', () => {
      action.payload.points = '1358'
      action.payload.player = '4'
      action.payload.logId = '1'
      expect(match(IS, action)).toEqual(IS)
    })

    test('dont add when is an invalid value', () => {
      action.payload.points = '-1'
      action.payload.player = '1'
      action.payload.logId = '1'
      expect(match(IS, action)).toEqual(IS)
    })

    test('dont add when is the value is 0 value', () => {
      action.payload.points = '0'
      action.payload.player = '1'
      action.payload.logId = '1'
      expect(match(IS, action)).toEqual(IS)
    })

    test('dont add when the duel has ended', () => {
      const IS = INITIAL_STATE({
        players: Map({
          '1': PlayerRecord({
            id: '1',
            name: 'test',
            currentPoints: 8000
          }),
          '2': PlayerRecord({
            id: '2',
            name: 'test2',
            currentPoints: 8000
          })
        }),
        results: Map({
          '1': ResultsRecord({
            winner: '1'
          })
        })
      })
      action.payload.points = '2500'
      action.payload.player = '1'
      action.payload.logId = '1'
      expect(match(IS, action)).toEqual(IS)
    })
  })
  describe('Substract Points', () => {
    const action = { type: T.SUBSTRACT_POINTS, payload: {} }
    const IS = INITIAL_STATE({
      players: Map({
        '1': PlayerRecord({
          id: '1',
          name: 'test',
          currentPoints: 8000
        }),
        '2': PlayerRecord({
          id: '2',
          name: 'test2',
          currentPoints: 8000
        })
      })
    })

    test('substract values when its a valid player and value', () => {
      action.payload.points = '1505'
      action.payload.player = '2'
      action.payload.logId = '1'
      const expected = INITIAL_STATE({
        players: Map({
          '1': PlayerRecord({
            id: '1',
            name: 'test',
            currentPoints: 8000
          }),
          '2': PlayerRecord({
            id: '2',
            name: 'test2',
            currentPoints: 6495
          })
        }),
        logs: Map({
          '1': List([
            LogsRecord({
              currentPoints: 6495,
              id: '1',
              operationValue: -1505,
              playerId: '2',
              previousPoints: 8000
            })
          ])
        })
      })
      expect(match(IS, action)).toEqual(expected)
    })

    test('substract values when its a valid player and value and set a match winner', () => {
      action.payload.points = '8000'
      action.payload.player = '2'
      action.payload.logId = '1'
      const expected = INITIAL_STATE({
        players: Map({
          '1': PlayerRecord({
            id: '1',
            name: 'test',
            currentPoints: 8000
          }),
          '2': PlayerRecord({
            id: '2',
            name: 'test2',
            currentPoints: 0
          })
        }),
        logs: Map({
          '1': List([
            LogsRecord({
              currentPoints: 0,
              id: '1',
              operationValue: -8000,
              playerId: '2',
              previousPoints: 8000
            })
          ])
        }),
        results: Map({
          '1': ResultsRecord({ winner: '1' })
        })
      })
      expect(match(IS, action)).toEqual(expected)
    })

    test('dont substract when is an invalid player', () => {
      action.payload.points = '1505'
      action.payload.player = '-1'
      action.payload.logId = '1'
      expect(match(IS, action)).toEqual(IS)
    })

    test('dont substract when is an invalid value', () => {
      action.payload.points = '-99090'
      action.payload.player = '1'
      action.payload.logId = '1'
      expect(match(IS, action)).toEqual(IS)
    })
    test('dont substract  is the value is 0 value', () => {
      action.payload.points = '-99090'
      action.payload.player = '1'
      action.payload.logId = '1'
      expect(match(IS, action)).toEqual(IS)
    })
  })
  describe('Half Points', () => {
    const action = { type: T.HALF_POINTS, payload: {} }
    const IS = INITIAL_STATE({
      players: Map({
        '1': {
          id: '1',
          name: 'test',
          currentPoints: 8000
        },
        '2': {
          id: '2',
          name: 'test2',
          currentPoints: 8000
        }
      })
    })

    test('half the points values when its a valid player and value', () => {
      action.payload.player = '2'
      action.payload.logId = '1'
      const expected = INITIAL_STATE({
        players: Map({
          '1': {
            id: '1',
            name: 'test',
            currentPoints: 8000
          },
          '2': {
            id: '2',
            name: 'test2',
            currentPoints: 4000
          }
        }),
        logs: Map({
          '1': List([
            LogsRecord({
              currentPoints: 4000,
              id: '1',
              operationValue: -4000,
              playerId: '2',
              previousPoints: 8000
            })
          ])
        })
      })
      expect(match(IS, action)).toEqual(expected)
    })

    test('dont halfpoints when is an invalid player', () => {
      action.payload.points = '1505'
      action.payload.player = '-1'
      action.payload.logId = '1'
      expect(match(IS, action)).toEqual(IS)
    })

    test('half points to ciel', () => {
      action.payload.player = '1'
      action.payload.logId = '1'
      const IS = INITIAL_STATE({
        players: Map({
          '1': {
            id: '1',
            name: 'test',
            currentPoints: 3525
          },
          '2': {
            id: '2',
            name: 'test2',
            currentPoints: 8000
          }
        })
      })
      const expected = INITIAL_STATE({
        players: Map({
          '1': {
            id: '1',
            name: 'test',
            currentPoints: 1762
          },
          '2': {
            id: '2',
            name: 'test2',
            currentPoints: 8000
          }
        }),
        logs: Map({
          '1': List([
            LogsRecord({
              currentPoints: 1762,
              id: '1',
              operationValue: -1763,
              playerId: '1',
              previousPoints: 3525
            })
          ])
        })
      })
      expect(match(IS, action)).toEqual(expected)
    })
  })
  describe('Scoop Match', () => {
    const action = { type: T.SCOOP_MATCH, payload: {} }
    const IS = INITIAL_STATE({
      players: Map({
        '1': PlayerRecord({
          id: '1',
          name: 'test',
          currentPoints: 8000
        }),
        '2': PlayerRecord({
          id: '2',
          name: 'test2',
          currentPoints: 8000
        })
      })
    })

    test('scoop the match when its a valid player and value', () => {
      action.payload.player = '2'
      action.payload.logId = '1'
      const expected = INITIAL_STATE({
        players: Map({
          '1': PlayerRecord({
            id: '1',
            name: 'test',
            currentPoints: 8000
          }),
          '2': PlayerRecord({
            id: '2',
            name: 'test2',
            currentPoints: 0
          })
        }),
        logs: Map({
          '1': List([
            LogsRecord({
              currentPoints: 0,
              id: '1',
              operationValue: -8000,
              playerId: '2',
              previousPoints: 8000
            })
          ])
        }),
        results: Map({
          '1': ResultsRecord({
            winner: '1'
          })
        })
      })
      expect(match(IS, action)).toEqual(expected)
    })

    test('dont scoop match when is an invalid player', () => {
      action.payload.points = '1505'
      action.payload.player = '-1'
      action.payload.logId = '1'
      expect(match(IS, action)).toEqual(IS)
    })
  })
  describe('Draw Match', () => {
    const action = { type: T.DRAW, payload: {} }
    const IS = INITIAL_STATE({
      players: Map({
        '1': PlayerRecord({
          id: '1',
          name: 'test',
          currentPoints: 8000
        }),
        '2': PlayerRecord({
          id: '2',
          name: 'test2',
          currentPoints: 8000
        })
      })
    })

    test('draw the match when its a valid player and value', () => {
      action.payload.logId = '1'
      const expected = INITIAL_STATE({
        players: Map({
          '1': PlayerRecord({
            id: '1',
            name: 'test',
            currentPoints: 0
          }),
          '2': PlayerRecord({
            id: '2',
            name: 'test2',
            currentPoints: 0
          })
        }),
        logs: Map({
          '1': List([
            LogsRecord({
              currentPoints: 0,
              id: '1',
              operationValue: 0,
              playerId: '-1',
              previousPoints: 0,
              type: 'draw'
            })
          ])
        }),
        results: Map({
          '1': ResultsRecord({
            winner: 'tie'
          })
        })
      })
      expect(match(IS, action)).toEqual(expected)
    })
  })

  describe('Change Player Name', () => {
    const action = { type: T.CHANGE_PLAYER_NAME, payload: {} }
    const IS = INITIAL_STATE({
      players: Map({
        '1': PlayerRecord({
          id: '1',
          name: 'test',
          currentPoints: 8000
        }),
        '2': PlayerRecord({
          id: '2',
          name: 'test2',
          currentPoints: 8000
        })
      })
    })

    test('changes the players name', () => {
      action.payload.player = '1'
      action.payload.name = 'testchanged'

      const expected = INITIAL_STATE({
        players: Map({
          '1': PlayerRecord({
            id: '1',
            name: 'testchanged',
            currentPoints: 8000
          }),
          '2': PlayerRecord({
            id: '2',
            name: 'test2',
            currentPoints: 8000
          })
        })
      })
      expect(match(IS, action)).toEqual(expected)
    })

    test('do nothing if players name doesnt exist', () => {
      action.payload.player = '3'
      action.payload.name = 'testchanged'
      expect(match(IS, action)).toEqual(IS)
    })

    test('do nothing if players name doesnt exist', () => {
      action.payload.player = '1'
      action.payload.name = 'verylongtextshouldbestop'

      const expected = INITIAL_STATE({
        players: Map({
          '1': PlayerRecord({
            id: '1',
            name: 'verylongtextshouldbestop'.substring(0, MAX_NAME_LENGTH),
            currentPoints: 8000
          }),
          '2': PlayerRecord({
            id: '2',
            name: 'test2',
            currentPoints: 8000
          })
        })
      })
      expect(match(IS, action)).toEqual(expected)
    })
  })

  describe('Rehydrates', () => {
    const action = { type: REHYDRATE, payload: {} }
    const IS = INITIAL_STATE({
      players: Map({
        '1': PlayerRecord({
          id: '1',
          name: 'test',
          currentPoints: 8000
        }),
        '2': PlayerRecord({
          id: '2',
          name: 'test2',
          currentPoints: 8000
        })
      })
    })

    test('rehydrates with no value', () => {
      expect(match(IS, action)).toEqual(IS)
    })

    test('rehydrates with changes', () => {
      const expected = INITIAL_STATE({
        players: Map({
          '1': PlayerRecord({
            id: '1',
            name: 'verylongtextshouldbestop'.substring(0, MAX_NAME_LENGTH),
            currentPoints: 8000
          }),
          '2': PlayerRecord({
            id: '2',
            name: 'test2',
            currentPoints: 8000
          })
        }),
        results: Map({
          '1': ResultsRecord({
            winner: '1'
          })
        }),
        logs: Map({
          '1': List([
            LogsRecord({
              currentPoints: 9358,
              id: '1',
              operationValue: 1358,
              playerId: '1',
              previousPoints: 8000
            })
          ])
        })
      })
      action.payload.match = expected.toJS()
      expect(match(IS, action)).toEqual(expected)
    })
  })
})
