import React from 'react'
import 'react-native'
import PropTypes from 'prop-types'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'

import CalculatorScreen from './CalculatorScreen'

function testProvider (store) {
  class TestProvider extends React.Component {
    getChildContext () {
      return { store }
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

describe('CalculatorScreen', () => {
  test('renders when not visible', () => {
    const mockStore = configureStore([])({ calculator: { visible: false } })
    const TestProvider = testProvider(mockStore)
    const calculatorScreen = renderer
      .create(
        <TestProvider>
          <CalculatorScreen />
        </TestProvider>
      )
      .toJSON()
    expect(calculatorScreen).toMatchSnapshot()
  })

  test('renders when visible', () => {
    const mockStore = configureStore([])({ calculator: { visible: false } })
    let TestProvider = testProvider(mockStore)
    const calculatorScreen = renderer.create(
      <TestProvider>
        <CalculatorScreen />
      </TestProvider>
    )
    const mockStore2 = configureStore([])({ calculator: { visible: true } })
    console.log(mockStore.getState(), 'mock')
    console.log(
      mockStore.replaceReducer(() => ({ caculator: { visible: true } })),
      'mock'
    )
    console.log(mockStore.getState(), 'mock after')
    TestProvider = testProvider(mockStore2)
    calculatorScreen.update(
      <TestProvider>
        <CalculatorScreen calculator={{ visible: 'perrooo' }} />
      </TestProvider>
    )
    // calculatorScreen.update(
    //   <TestProvider>
    //     <CalculatorScreen hello={'hello'}/>
    //   </TestProvider>
    // )
    expect(calculatorScreen.toJSON()).toMatchSnapshot()
  })
})
