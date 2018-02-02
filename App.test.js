import React from 'react'
import App from './App'
import { UIManager } from 'react-native'
import renderer from 'react-test-renderer'

it('renders without crashing when setLayoutAnimationEnabledExperimental doesnt exists', () => {
  const rendered = renderer.create(<App />).toJSON()
  expect(rendered).toMatchSnapshot()
})

it('renders without crashing when it doesnt exists UIManager', () => {
  UIManager.setLayoutAnimationEnabledExperimental = jest.fn()
  const rendered = renderer.create(<App />).toJSON()
  expect(rendered).toBeTruthy()
})
