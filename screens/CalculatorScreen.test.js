import React from 'react'
import 'react-native'
import PropTypes from 'prop-types'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import CalculatorScreen from './CalculatorScreen'

const myStore = () => {
  const state = { calculator: { visible: true } }
  return {
    getState: () => {
      return state
    },
    subscribe: () => {},
    dispatch: () => {},
    changeBool: () => {
      state.calculator.visible = !state.calculator.visible
    }
  }
}
function testProvider () {
  class TestProvider extends React.Component {
    getChildContext () {
      console.log('I set the context', this.store.getState())
      // console.log(store({ calculator: { visible: bool } }).getState(), 'STATE')
      return { store: this.store }
    }

    constructor (props, context) {
      super(props, context)
      this.store = props.store
      console.log(context, 'sup')
      // this[storeKey] = props.store;
    }

    render () {
      console.log('I render')
      return React.Children.only(this.props.children)
    }
  }

  TestProvider.childContextTypes = {
    store: PropTypes.object
  }
  return TestProvider
}

describe('CalculatorScreen', () => {
  test('renders when not visible', () => {
    const TestProvider = testProvider()
    const store = myStore()
    const calculatorScreen = renderer
      .create(
        <TestProvider store={store}>
          <CalculatorScreen />
        </TestProvider>
      )
      .toJSON()
    expect(calculatorScreen).toMatchSnapshot()
  })

  test('renders when visible', () => {
    const TestProvider = testProvider()
    const store = myStore()
    const calculatorScreen = renderer.create(
      <TestProvider store={store}>
        <CalculatorScreen />
      </TestProvider>
    )
    store.changeBool()
    console.log('HAMMER TIME')
    calculatorScreen.update(
      <TestProvider store={store}>
        <CalculatorScreen />
      </TestProvider>
    )
    expect(calculatorScreen.toJSON()).toMatchSnapshot()
  })
})
