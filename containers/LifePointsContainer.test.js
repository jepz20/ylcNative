import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { Map, Record } from 'immutable'
import renderer from 'react-test-renderer'

import { LifePointsContainer } from './LifePointsContainer'

describe('LifePointsContainer', () => {
  const result = Record({ winner: null })
  const results = Map({
    '1': result({ winner: '1' }),
    '2': result({ winner: '2' }),
    '3': result({ winner: 'tie' })
  })
  const playerRE = Record({
    id: '1',
    name: 'test 1',
    currentPoints: '8000'
  })

  test('renders with no props ', () => {
    const lifePointsContainer = renderer
      .create(<LifePointsContainer />)
      .toJSON()
    expect(lifePointsContainer).toMatchSnapshot()
  })

  test('renders with 2 players', () => {
    const players = Map({
      '1': playerRE(),
      '2': playerRE({ id: '2', name: 'test 2' })
    })
    const lifePointsContainer = renderer
      .create(<LifePointsContainer results={results} players={players} />)
      .toJSON()
    expect(lifePointsContainer).toMatchSnapshot()
  })

  test('renders with 1 player', () => {
    const players = Map({
      '1': playerRE()
    })
    const lifePointsContainer = renderer
      .create(<LifePointsContainer results={results} players={players} />)
      .toJSON()
    expect(lifePointsContainer).toMatchSnapshot()
  })

  test('should toggle visibility for all players', () => {
    const players = Map({
      '1': playerRE(),
      '2': playerRE({ id: '2', name: 'test 2' })
    })
    const mockToggle = jest.fn()
    const lifePointsContainer = renderer.create(
      <LifePointsContainer
        results={results}
        players={players}
        toggleCalculatorVisibility={mockToggle}
      />
    ).root
    const touchable = lifePointsContainer.findAllByType(
      TouchableWithoutFeedback
    )
    expect(touchable.length).toBe(2)
    touchable[0].props.onPress()
    touchable[1].props.onPress()
    expect(mockToggle).toHaveBeenCalledTimes(2)
  })
})
