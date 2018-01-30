import React from 'react'
import 'react-native'
import PropTypes from 'prop-types'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import { Record } from 'immutable'
import { OperatorsContainer } from './OperatorsContainer'
import { TextButton } from '../components/index'
import * as Utils from '../utils'

const CalculatorRE = Record({
  currentPlayer: 1,
  visible: true,
  value: '100'
})

const mockStore = configureStore([])({ calculator: CalculatorRE() })
function testProvider () {
  class TestProvider extends React.Component {
    getChildContext () {
      return { store: mockStore }
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
  const TestProvider = testProvider()
  Utils.getId = jest.fn(() => 1)

  test('renders with no props', () => {
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
    const operatorsContainer = renderer
      .create(
        <TestProvider>
          <OperatorsContainer player='1' />
        </TestProvider>
      )
      .toJSON()
    expect(operatorsContainer).toMatchSnapshot()
  })

  test('scoops a duel', () => {
    const operatorsContainer = renderer.create(
      <TestProvider>
        <OperatorsContainer player='1' />
      </TestProvider>
    ).root
    const scoopButton = operatorsContainer
      .findAllByType(TextButton)
      .filter(it => it.props.name === 'scoop')[0]
    scoopButton.props.onPress()
    expect(mockStore.getActions()).toMatchSnapshot()
  })

  test('draws a duel', () => {
    const operatorsContainer = renderer.create(
      <TestProvider>
        <OperatorsContainer player='1' />
      </TestProvider>
    ).root
    const drawButton = operatorsContainer
      .findAllByType(TextButton)
      .filter(it => it.props.name === 'draw')[0]
    drawButton.props.onPress()
    expect(mockStore.getActions()).toMatchSnapshot()
  })

  test('add of a player', () => {
    const operatorsContainer = renderer.create(
      <TestProvider>
        <OperatorsContainer player='1' />
      </TestProvider>
    ).root
    const halfPointsButton = operatorsContainer
      .findAllByType(TextButton)
      .filter(it => it.props.name === 'halfPoints')[0]
    halfPointsButton.props.onPress()
    expect(mockStore.getActions()).toMatchSnapshot()
  })

  test('adds points to a player', () => {
    const operatorsContainer = renderer.create(
      <TestProvider>
        <OperatorsContainer player='1' />
      </TestProvider>
    ).root
    const addButton = operatorsContainer
      .findAllByType(TextButton)
      .filter(it => it.props.name === 'add')[0]
    addButton.props.onPress()
    expect(mockStore.getActions()).toMatchSnapshot()
  })

  test('substract points to a player', () => {
    const operatorsContainer = renderer.create(
      <TestProvider>
        <OperatorsContainer player='1' />
      </TestProvider>
    ).root
    const addButton = operatorsContainer
      .findAllByType(TextButton)
      .filter(it => it.props.name === 'substract')[0]
    addButton.props.onPress()
    expect(mockStore.getActions()).toMatchSnapshot()
  })
})
