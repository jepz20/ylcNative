import 'react-native'
import React from 'react'
import { TextButton } from './TextButton'

import renderer from 'react-test-renderer'

describe('TextButton', () => {
  test('renders with no props', () => {
    const textButton = renderer.create(<TextButton />).toJSON()
    expect(textButton).toMatchSnapshot()
  })

  test('renders with a text', () => {
    const textButton = renderer.create(<TextButton value={'test'} />).toJSON()
    expect(textButton).toMatchSnapshot()
  })

  test('renders a small button with a text', () => {
    const textButton = renderer
      .create(<TextButton size='small' value={'test'} />)
      .toJSON()
    expect(textButton).toMatchSnapshot()
  })

  test('renders a medium button with a text', () => {
    const textButton = renderer
      .create(<TextButton size='medium' value={'test'} />)
      .toJSON()
    expect(textButton).toMatchSnapshot()
  })

  test('renders a large button with a text', () => {
    const textButton = renderer
      .create(<TextButton size='large' value={'test'} />)
      .toJSON()
    expect(textButton).toMatchSnapshot()
  })
})
