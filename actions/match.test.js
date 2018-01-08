import * as A from './match.js'
import * as T from './types'
describe('Match Actions', () => {
  test('scoopMatch', () => {
    expect(A.scoopMatch('3')).toEqual({
      type: T.SCOOP_MATCH,
      payload: { player: '3' }
    })
  })

  test('draw', () => {
    expect(A.draw()).toEqual({
      type: T.DRAW
    })
  })

  test('halfPoints', () => {
    expect(A.halfPoints('3')).toEqual({
      type: T.HALF_POINTS,
      payload: { player: '3' }
    })
  })

  test('addPoints', () => {
    expect(A.addPoints('2210', '1')).toEqual({
      type: T.ADD_POINTS,
      payload: {
        points: '2210',
        player: '1'
      }
    })
  })

  test('substractPoints', () => {
    expect(A.substractPoints('1985', '2')).toEqual({
      type: T.SUBSTRACT_POINTS,
      payload: {
        points: '1985',
        player: '2'
      }
    })
  })
})
