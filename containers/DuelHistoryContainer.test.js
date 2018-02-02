import React from 'react'
import { Map, Record } from 'immutable'
import renderer from 'react-test-renderer'

import { DuelHistoryContainer } from './DuelHistoryContainer'

describe('DuelHistoryContainer', () => {
  const playerRE = Record({
    id: '1',
    name: 'test 1',
    currentPoints: '8000'
  })

  test('renders correctly with one player', () => {
    const players = Map({
      '1': playerRE()
    })
    const duelHistoryContainer = renderer
      .create(<DuelHistoryContainer players={players} />)
      .toJSON()
    expect(duelHistoryContainer).toMatchSnapshot()
  })

  test('renders correctly with more than 1 player', () => {
    const players = Map({
      '1': playerRE(),
      '2': playerRE({ id: 2, name: 'test 2' })
    })
    const duelHistoryContainer = renderer
      .create(<DuelHistoryContainer players={players} />)
      .toJSON()
    expect(duelHistoryContainer).toMatchSnapshot()
  })
})
