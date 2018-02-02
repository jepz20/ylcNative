import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import renderer from 'react-test-renderer'
import { TestProvider, mockStore } from '../setupTests.js'
import { ControllersContainer } from './ControllersContainer'

describe('ControllersContainer', () => {
  test('renders with no props', () => {
    const store = mockStore()
    const controllersContainer = renderer
      .create(
        <TestProvider store={store}>
          <ControllersContainer />
        </TestProvider>
      )
      .toJSON()
    expect(controllersContainer).toMatchSnapshot()
  })

  test('renders player 1', () => {
    const store = mockStore()
    const controllersContainer = renderer
      .create(
        <TestProvider store={store}>
          <ControllersContainer
            player={'1'}
          />
        </TestProvider>
      )
      .toJSON()
    expect(controllersContainer).toMatchSnapshot()
  })
  test('renders player 2', () => {
    const store = mockStore()
    const controllersContainer = renderer
      .create(
        <TestProvider store={store}>
          <ControllersContainer
            player={'2'}
          />
        </TestProvider>
      )
      .toJSON()
    expect(controllersContainer).toMatchSnapshot()
  })

  test('to toggle visiblity', () => {
    const store = mockStore()
    const controllersContainer = renderer
      .create(
        <TestProvider store={store}>
          <ControllersContainer
            player={'2'}
          />
        </TestProvider>
      ).root
    const touchable = controllersContainer.findByType(TouchableWithoutFeedback)
    touchable.props.onPress()
    expect(store.getActions()).toMatchSnapshot()
  })
})
