import { Text } from 'react-native'
import React from 'react'
import { Indicator } from './Indicator'

import renderer from 'react-test-renderer'

describe('Indicator', () => {
  test('renders with type win ', () => {
    const indicator = renderer.create(<Indicator type='win' />).toJSON()
    expect(indicator).toMatchSnapshot()
  })

  test('renders with type loose ', () => {
    const indicator = renderer.create(<Indicator type='loose' />).toJSON()
    expect(indicator).toMatchSnapshot()
  })

  test('renders with type tie ', () => {
    const indicator = renderer.create(<Indicator type='loose' />).toJSON()
    expect(indicator).toMatchSnapshot()
  })

  test('renders with type neutral', () => {
    const indicator = renderer
      .create(<Indicator>Shouldn't render</Indicator>)
      .toJSON()
    expect(indicator).toMatchSnapshot()
  })

  test('renders with default props as neutral', () => {
    const indicator = renderer
      .create(<Indicator>Shouldn't render</Indicator>)
      .toJSON()
    expect(indicator).toMatchSnapshot()
  })
})
