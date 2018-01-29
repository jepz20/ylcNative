// @flow

import * as React from 'react'
import { Button } from './Button'
import { Entypo } from '@expo/vector-icons'

type Props = {
  name: string,
  size?: number,
  color?: string
}

const SIZES = {
  small: 20,
  medium: 40,
  large: 60
}

const IconButton: React.StatelessFunctionalComponent<Props> = ({
  name,
  size = 'medium',
  color = '#fff',
  ...props
}) => {
  return (
    <Button {...props}>
      <Entypo name={name} size={SIZES[size]} color={color} />
    </Button>
  )
}

export { IconButton }
