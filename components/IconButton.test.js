import 'react-native'
import React from 'react'
import { IconButton } from './IconButton'

import renderer from 'react-test-renderer'

describe('IconButton', () => {
  test('Renders a button with a icon', () => {
    const iconButton = renderer.create(<IconButton name='plus' />).toJSON()
    expect(iconButton).toMatchSnapshot()
  })

  test('Renders a button with default size', () => {
    const iconButton = renderer
      .create(<IconButton name='plus' size='default' />)
      .toJSON()
    expect(iconButton).toMatchSnapshot()
  })

  test('doesnt renders a children', () => {
    const iconButton = renderer
      .create(<IconButton>Shouldn't render</IconButton>)
      .toJSON()
    expect(iconButton).toMatchSnapshot()
  })
})
