import React from 'react'
import renderer from 'react-test-renderer'
import { TestProvider, mockStore } from '../setupTests'
import MainScreen from './MainScreen'
import { INITIAL_STATE } from '../reducers/match'

jest.mock('LayoutAnimation', () => {
  return {
    easeInEaseOut: jest.fn()
  }
})

describe('MainScreen', () => {
  test('renders correctly', () => {
    const store = mockStore({ match: INITIAL_STATE() })
    const mainScreen = renderer
      .create(
        <TestProvider store={store}>
          <MainScreen />
        </TestProvider>
      )
      .toJSON()
    expect(mainScreen).toMatchSnapshot()
  })
})
