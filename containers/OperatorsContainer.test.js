import React from 'react'
import 'react-native'
import renderer from 'react-test-renderer'
import { Record } from 'immutable'
import { OperatorsContainer } from './OperatorsContainer'
import { TextButton } from '../components/index'
import { TestProvider, mockStore } from '../setupTests'
import * as Utils from '../utils'

const CalculatorRE = Record({
  currentPlayer: 1,
  visible: true,
  value: '100'
})

describe('OperatorsContainer', () => {
  Utils.getId = jest.fn(() => 1)

  test('renders with no props', () => {
    const store = mockStore({ calculator: CalculatorRE() })
    const operatorsContainer = renderer
      .create(
        <TestProvider store={store}>
          <OperatorsContainer />
        </TestProvider>
      )
      .toJSON()
    expect(operatorsContainer).toMatchSnapshot()
  })

  test('renders correctly', () => {
    const store = mockStore({ calculator: CalculatorRE() })
    const operatorsContainer = renderer
      .create(
        <TestProvider store={store}>
          <OperatorsContainer player='1' />
        </TestProvider>
      )
      .toJSON()
    expect(operatorsContainer).toMatchSnapshot()
  })

  test('scoops a duel', () => {
    const store = mockStore({ calculator: CalculatorRE() })
    const operatorsContainer = renderer.create(
      <TestProvider store={store}>
        <OperatorsContainer player='1' />
      </TestProvider>
    ).root
    const scoopButton = operatorsContainer
      .findAllByType(TextButton)
      .filter(it => it.props.name === 'scoop')[0]
    scoopButton.props.onPress()
    expect(store.getActions()).toMatchSnapshot()
  })

  test('draws a duel', () => {
    const store = mockStore({ calculator: CalculatorRE() })
    const operatorsContainer = renderer.create(
      <TestProvider store={store}>
        <OperatorsContainer player='1' />
      </TestProvider>
    ).root
    const drawButton = operatorsContainer
      .findAllByType(TextButton)
      .filter(it => it.props.name === 'draw')[0]
    drawButton.props.onPress()
    expect(store.getActions()).toMatchSnapshot()
  })

  test('add of a player', () => {
    const store = mockStore({ calculator: CalculatorRE() })
    const operatorsContainer = renderer.create(
      <TestProvider store={store}>
        <OperatorsContainer player='1' />
      </TestProvider>
    ).root
    const halfPointsButton = operatorsContainer
      .findAllByType(TextButton)
      .filter(it => it.props.name === 'halfPoints')[0]
    halfPointsButton.props.onPress()
    expect(store.getActions()).toMatchSnapshot()
  })

  test('adds points to a player', () => {
    const store = mockStore({ calculator: CalculatorRE() })
    const operatorsContainer = renderer.create(
      <TestProvider store={store}>
        <OperatorsContainer player='1' />
      </TestProvider>
    ).root
    const addButton = operatorsContainer
      .findAllByType(TextButton)
      .filter(it => it.props.name === 'add')[0]
    addButton.props.onPress()
    expect(store.getActions()).toMatchSnapshot()
  })

  test('substract points to a player', () => {
    const store = mockStore({ calculator: CalculatorRE() })
    const operatorsContainer = renderer.create(
      <TestProvider store={store}>
        <OperatorsContainer player='1' />
      </TestProvider>
    ).root
    const addButton = operatorsContainer
      .findAllByType(TextButton)
      .filter(it => it.props.name === 'substract')[0]
    addButton.props.onPress()
    expect(store.getActions()).toMatchSnapshot()
  })
})
