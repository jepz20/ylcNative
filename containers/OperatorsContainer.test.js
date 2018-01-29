import React from 'react'
import 'react-native'
import PropTypes from 'prop-types'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import { Record } from 'immutable'
import { OperatorsContainer } from './OperatorsContainer'
import { TextButton } from '../components'

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

describe('OperatorsContainer', () => {
  test('renders with no props', () => {
    const TestProvider = testProvider()
    const operatorsContainer = renderer
      .create(
        <TestProvider>
          <OperatorsContainer />
        </TestProvider>
      )
      .toJSON()
    expect(operatorsContainer).toMatchSnapshot()
  })

  test('renders correctly', () => {
    const TestProvider = testProvider()
    const calculator = Record({
      currentPlayer: 1,
      visible: true,
      value: '100'
    })()
    const operatorsContainer = renderer
      .create(
        <TestProvider>
          <OperatorsContainer calculator={calculator} player='1' />
        </TestProvider>
      )
      .toJSON()
    expect(operatorsContainer).toMatchSnapshot()
  })
})
