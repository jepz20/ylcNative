import React from 'react'
import { Text } from 'react-native'
import renderer from 'react-test-renderer'

import { Row } from './Row'

describe('Row', () => {
  test('renders with no props ', () => {
    const row = renderer.create(<Row />).toJSON()
    expect(row).toMatchSnapshot()
  })

  test('renders with a children as text', () => {
    const row = renderer.create(<Row value={20}>This is a test</Row>).toJSON()
    expect(row).toMatchSnapshot()
  })

  test('renders with a children as a component', () => {
    const row = renderer
      .create(
        <Row value={20}>
          <Text>Test</Text>
        </Row>
      )
      .toJSON()
    expect(row).toMatchSnapshot()
  })
})
