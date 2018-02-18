import * as A from './match.js'
import * as T from './types'
describe('Match Actions', () => {
  test('scoopMatch', () => {
    expect(A.scoopMatch('3', '1')).toEqual({
      type: T.SCOOP_MATCH,
      payload: { player: '3', logId: '1' }
    })
  })

  test('draw', () => {
    expect(A.draw('1')).toEqual({
      type: T.DRAW,
      payload: { logId: '1' }
    })
  })

  test('halfPoints', () => {
    expect(A.halfPoints('3', '1')).toEqual({
      type: T.HALF_POINTS,
      payload: { player: '3', logId: '1' }
    })
  })

  test('addPoints', () => {
    expect(A.addPoints('2210', '1', '123')).toEqual({
      type: T.ADD_POINTS,
      payload: {
        points: '2210',
        player: '1',
        logId: '123'
      }
    })
  })

  test('substractPoints', () => {
    expect(A.substractPoints('1985', '2', '543')).toEqual({
      type: T.SUBSTRACT_POINTS,
      payload: {
        points: '1985',
        player: '2',
        logId: '543'
      }
    })
  })
  test('substractPoints', () => {
    expect(A.changePlayerName('test', '2')).toMatchSnapshot()
  })
})
