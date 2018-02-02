import { Text } from 'react-native'
import React from 'react'
import { Button } from './Button'

import renderer from 'react-test-renderer'

describe('Button', () => {
  test('Renders a button with a Text', () => {
    const button = renderer
      .create(
        <Button>
          <Text>Test</Text>
        </Button>
      )
      .toJSON()
    expect(button).toMatchSnapshot()
  })

  test('renders when plain text is provided as a children', () => {
    const button = renderer.create(<Button>Test just string</Button>).toJSON()
    expect(button).toMatchSnapshot()
  })

  test('render nothing no children is provided', () => {
    const button = renderer.create(<Button />).toJSON()
    expect(button).toMatchSnapshot()
  })
})
