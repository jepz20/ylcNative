import React from 'react'
import 'react-native'
import renderer from 'react-test-renderer'

import { PointsCounter } from './PointsCounter'

describe('PointsCounter', () => {
  test('renders with no props ', () => {
    const pointsCounter = renderer.create(<PointsCounter />).toJSON()
    expect(pointsCounter).toMatchSnapshot()
  })
  test('renders with a value ', () => {
    const pointsCounter = renderer.create(<PointsCounter value={20} />).toJSON()
    expect(pointsCounter).toMatchSnapshot()
  })
})
