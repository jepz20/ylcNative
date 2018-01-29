import React from 'react'
import 'react-native'
import PropTypes from 'prop-types'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'

import { ControllersContainer } from './ControllersContainer'

function testProvider () {
  class TestProvider extends React.Component {
    getChildContext () {
      return { store: configureStore()([]) }
    }

    render () {
      return this.props.children
    }
  }

  TestProvider.childContextTypes = {
    store: PropTypes.object
  }
  return TestProvider
}

describe('ControllersContainer', () => {
  test('renders with no props', () => {
    const TestProvider = testProvider()
    const controllersContainer = renderer
      .create(
        <TestProvider>
          <ControllersContainer />
        </TestProvider>
      )
      .toJSON()
    expect(controllersContainer).toMatchSnapshot()
  })

  test('renders player 1', () => {
    const TestProvider = testProvider()
    const toggle = jest.fn()
    const controllersContainer = renderer
      .create(
        <TestProvider>
          <ControllersContainer
            player={'1'}
            toggleCalculatorVisibility={toggle}
          />
        </TestProvider>
      )
      .toJSON()
    expect(controllersContainer).toMatchSnapshot()
  })
  test('renders player 2', () => {
    const TestProvider = testProvider()
    const toggle = jest.fn()
    const controllersContainer = renderer
      .create(
        <TestProvider>
          <ControllersContainer
            player={'2'}
            toggleCalculatorVisibility={toggle}
          />
        </TestProvider>
      )
      .toJSON()
    expect(controllersContainer).toMatchSnapshot()
  })
})
