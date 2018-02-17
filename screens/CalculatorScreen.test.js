import React from 'react'
import { LayoutAnimation } from 'react-native'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { TestProvider, mockStore } from '../setupTests'
import CalculatorScreen from './CalculatorScreen'

jest.mock('LayoutAnimation', () => ({
  easeInEaseOut: jest.fn()
}))

describe('CalculatorScreen', () => {
  test('renders as connected component when not visible', () => {
    const store = mockStore()
    const calculatorScreen = renderer
      .create(
        <TestProvider store={store}>
          <CalculatorScreen />
        </TestProvider>
      )
      .toJSON()
    expect(calculatorScreen).toMatchSnapshot()
  })

  test('renders as connected component when visible', () => {
    const store = mockStore({ calculator: { visible: true, player: 1 } })
    const calculatorScreen = renderer
      .create(
        <TestProvider store={store}>
          <CalculatorScreen />
        </TestProvider>
      )
      .toJSON()
    expect(calculatorScreen).toMatchSnapshot()
  })

  test('animation is applied when changing visiblity', () => {
    const calculatorScreen = shallow(
      <CalculatorScreen.WrappedComponent calculator={{ visible: true }} />
    )
    calculatorScreen.setProps({
      calculator: { currentPlayer: 1, visible: true }
    })
    const easeInEaseOutSpy = sinon.spy(LayoutAnimation, 'easeInEaseOut')
    expect(easeInEaseOutSpy.calledOnce).toBe(false)
    calculatorScreen.setProps({ calculator: { visible: false } })
    expect(easeInEaseOutSpy.calledOnce).toBe(true)
  })
})
