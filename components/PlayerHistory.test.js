import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { Map, Record, List } from 'immutable'
import renderer from 'react-test-renderer'

import { PlayerHistory } from './PlayerHistory'

describe('PlayerHistory', () => {
  test('renders with no props ', () => {
    const playerDetail = renderer.create(<PlayerHistory />).toJSON()
    expect(playerDetail).toMatchSnapshot()
  })

  test('renders with empty logs ', () => {
    const log = Map()
    const playerDetail = renderer
      .create(
        <PlayerHistory
          playerId='1'
          currentDuel='2'
          toggleCalculatorVisibility={() => {}}
          logs={log}
        />
      )
      .toJSON()
    expect(playerDetail).toMatchSnapshot()
  })

  test('renders with first duel with no movements ', () => {
    const log = Map({
      '1': List()
    })
    const playerDetail = renderer
      .create(
        <PlayerHistory
          playerId='1'
          currentDuel='2'
          toggleCalculatorVisibility={() => {}}
          logs={log}
        />
      )
      .toJSON()
    expect(playerDetail).toMatchSnapshot()
  })

  test('renders with first duel with 2 logs ', () => {
    const logRecord = Record({
      id: '1',
      playerId: '1',
      operationValue: 10,
      currentPoints: 10,
      previousPoints: 20,
      type: 'operation'
    })

    const log = Map({
      '1': List([
        logRecord(),
        logRecord({ id: '2', playerId: '2' }),
        logRecord({ id: '3', playerId: '1', operationValue: -22 })
      ])
    })
    const playerDetail = renderer
      .create(
        <PlayerHistory
          playerId='1'
          currentDuel='1'
          toggleCalculatorVisibility={jest.fn()}
          logs={log}
        />
      )
      .toJSON()
    expect(playerDetail).toMatchSnapshot()
  })

  test('renders with second duel when no logs, when first duel has 2 logs ', () => {
    const logRecord = Record({
      id: '1',
      playerId: '1',
      operationValue: 10,
      currentPoints: 10,
      previousPoints: 20,
      type: 'operation'
    })

    const log = Map({
      '1': List([logRecord(), logRecord({ id: '2', playerId: '2' })])
    })
    const playerDetail = renderer
      .create(
        <PlayerHistory
          playerId='1'
          currentDuel='2'
          toggleCalculatorVisibility={jest.fn()}
          logs={log}
        />
      )
      .toJSON()
    expect(playerDetail).toMatchSnapshot()
  })

  test('should toggle visibility', () => {
    const logRecord = Record({
      id: '1',
      playerId: '1',
      operationValue: 10,
      currentPoints: 10,
      previousPoints: 20,
      type: 'operation'
    })

    const log = Map({
      '1': List([logRecord(), logRecord({ id: '2', playerId: '2' })])
    })

    const mockToggle = jest.fn()
    const playerDetail = renderer.create(
      <PlayerHistory
        playerId='1'
        currentDuel='2'
        toggleCalculatorVisibility={mockToggle}
        logs={log}
      />
    ).root
    const touchable = playerDetail.findByType(TouchableWithoutFeedback)
    touchable.props.onPress()
    expect(mockToggle).toBeCalled()
  })
})
