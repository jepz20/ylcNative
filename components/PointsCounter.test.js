import React from 'react'
import 'react-native'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import counter from '../utils/counter'
import { PointsCounter } from './PointsCounter'

jest.mock('../utils/counter', () => jest.fn())
describe('PointsCounter', () => {
  test('renders with no props ', () => {
    const pointsCounter = renderer.create(<PointsCounter />).toJSON()
    expect(pointsCounter).toMatchSnapshot()
  })
  test('renders with a value of 2 digits', () => {
    const pointsCounter = renderer.create(<PointsCounter value={20} />).toJSON()
    expect(pointsCounter).toMatchSnapshot()
  })

  test('renders with a value of 4 digits', () => {
    const pointsCounter = renderer
      .create(<PointsCounter value={8000} />)
      .toJSON()
    expect(pointsCounter).toMatchSnapshot()
  })

  test('renders with a value of 5 digits', () => {
    const pointsCounter = renderer
      .create(<PointsCounter value={80000} />)
      .toJSON()
    expect(pointsCounter).toMatchSnapshot()
  })

  test('counter animation is called if props change', () => {
    const pointsCounter = shallow(<PointsCounter value={8000} />)
    pointsCounter.setProps({ value: 8000 })
    expect(counter.mock.calls.length).toBe(0)
  })
  test('counter animation is not called if props value is the same', () => {
    const pointsCounter = shallow(<PointsCounter value={8000} />)
    pointsCounter.setProps({ value: 0 })
    expect(counter.mock.calls.length).toBe(1)
  })

  test('counter test value updates the state', () => {
    const pointsCounter = shallow(<PointsCounter value={8000} />)
    pointsCounter.instance().setValue(10)
    expect(pointsCounter.state().value).toBe(10)
  })
})
