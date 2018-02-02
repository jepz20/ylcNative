import React from 'react'
import 'react-native'
import renderer from 'react-test-renderer'
import { TextButton, IconButton } from '../components'
import { DigitsContainer } from './DigitsContainer'
import { TestProvider, mockStore } from '../setupTests'

describe('DigitsContainer', () => {
  test('renders with no props', () => {
    const store = mockStore()
    const controllersContainer = renderer
      .create(
        <TestProvider store={store}>
          <DigitsContainer />
        </TestProvider>
      )
      .toJSON()
    expect(controllersContainer).toMatchSnapshot()
  })

  test('renders with value 2', () => {
    const store = mockStore()
    const controllersContainer = renderer
      .create(
        <TestProvider store={store}>
          <DigitsContainer value='2' />
        </TestProvider>
      )
      .toJSON()
    expect(controllersContainer).toMatchSnapshot()
  })

  test('press a digit', () => {
    const store = mockStore()
    const digitPress = jest.fn()
    const digitsContainer = renderer.create(
      <TestProvider store={store}>
        <DigitsContainer value='2' digitPress={digitPress} />
      </TestProvider>
    ).root
    digitsContainer.findAllByType(TextButton)[0].props.onPress()
    expect(digitPress).toBeCalled()
  })

  test('reset a digit', () => {
    const store = mockStore()
    const erase = jest.fn()
    const digitsContainer = renderer.create(
      <TestProvider store={store}>
        <DigitsContainer value='2' erase={erase} />
      </TestProvider>
    ).root
    digitsContainer.findAllByType(IconButton)[1].props.onPress()
    expect(erase).toBeCalled()
  })

  test('reset calculator', () => {
    const store = mockStore()
    const reset = jest.fn()
    const digitsContainer = renderer.create(
      <TestProvider store={store}>
        <DigitsContainer value='2' reset={reset} />
      </TestProvider>
    ).root
    digitsContainer.findAllByType(IconButton)[1].props.onLongPress()
    expect(reset).toBeCalled()
  })
})
