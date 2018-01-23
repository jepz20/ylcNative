// __tests__/Intro-test.js
import 'react-native'
import React from 'react'
import { CalculatorScreen } from './CalculatorScreen'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

test('renders empty is calculator is not visible', () => {
  const tree = renderer.create(<CalculatorScreen />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders if the calculator is visible', () => {
  const tree = renderer
    .create(<CalculatorScreen calculator={{ visible: true }} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
