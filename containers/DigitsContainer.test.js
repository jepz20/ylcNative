import React from 'react'
import 'react-native'
import PropTypes from 'prop-types'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import { TextButton, IconButton } from '../components'
import { DigitsContainer } from './DigitsContainer'

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

describe('DigitsContainer', () => {
  test('renders with no props', () => {
    const TestProvider = testProvider()
    const controllersContainer = renderer
      .create(
        <TestProvider>
          <DigitsContainer />
        </TestProvider>
      )
      .toJSON()
    expect(controllersContainer).toMatchSnapshot()
  })

  test('renders with value 2', () => {
    const TestProvider = testProvider()
    const controllersContainer = renderer
      .create(
        <TestProvider>
          <DigitsContainer value='2' />
        </TestProvider>
      )
      .toJSON()
    expect(controllersContainer).toMatchSnapshot()
  })

  test('press a digit', () => {
    const TestProvider = testProvider()
    const digitPress = jest.fn()
    const digitsContainer = renderer.create(
      <TestProvider>
        <DigitsContainer value='2' digitPress={digitPress} />
      </TestProvider>
    ).root
    digitsContainer.findAllByType(TextButton)[0].props.onPress()
    expect(digitPress).toBeCalled()
  })

  test('reset a digit', () => {
    const TestProvider = testProvider()
    const erase = jest.fn()
    const digitsContainer = renderer.create(
      <TestProvider>
        <DigitsContainer value='2' erase={erase} />
      </TestProvider>
    ).root
    digitsContainer.findAllByType(IconButton)[1].props.onPress()
    expect(erase).toBeCalled()
  })

  test('reset calculator', () => {
    const TestProvider = testProvider()
    const reset = jest.fn()
    const digitsContainer = renderer.create(
      <TestProvider>
        <DigitsContainer value='2' reset={reset} />
      </TestProvider>
    ).root
    digitsContainer.findAllByType(IconButton)[1].props.onLongPress()
    expect(reset).toBeCalled()
  })
})
