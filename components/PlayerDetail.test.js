import React from 'react'
import 'react-native'
import { shallow } from 'enzyme'
import { Map, Record } from 'immutable'
import renderer from 'react-test-renderer'

import { PlayerDetail } from './PlayerDetail'

describe('PlayerDetail', () => {
  const result = Record({ winner: null })

  test('renders with no props ', () => {
    const playerDetail = renderer.create(<PlayerDetail />).toJSON()
    expect(playerDetail).toMatchSnapshot()
  })

  test('renders with players detail and no results ', () => {
    const playerDetail = renderer
      .create(<PlayerDetail id={'1'} name='Jose' currentPoints={8000} />)
      .toJSON()
    expect(playerDetail).toMatchSnapshot()
  })

  test('renders with players detail results ', () => {
    const results = Map({
      '1': result({ winner: '1' }),
      '2': result({ winner: '2' }),
      '3': result({ winner: 'tie' })
    })
    const playerDetail = renderer
      .create(
        <PlayerDetail
          results={results}
          id={'1'}
          name='Jose'
          currentPoints={8000}
        />
      )
      .toJSON()
    expect(playerDetail).toMatchSnapshot()
  })

  test('renders with players detail results when there is only one duel ', () => {
    const results = Map({
      '1': result({ winner: '1' })
    })
    const playerDetail = renderer
      .create(
        <PlayerDetail
          results={results}
          id={'1'}
          name='Jose'
          currentPoints={8000}
        />
      )
      .toJSON()
    expect(playerDetail).toMatchSnapshot()
  })

  test('counter animation is not called if props value is the same', () => {
    const changePlayerName = jest.fn()
    const results = Map({
      '1': result({ winner: '1' })
    })
    const playerDetail = shallow(
      <PlayerDetail
        results={results}
        id={'1'}
        name='Jose'
        currentPoints={8000}
        changePlayerName={changePlayerName}
      />
    )
    expect(playerDetail).toMatchSnapshot()
  })
})
