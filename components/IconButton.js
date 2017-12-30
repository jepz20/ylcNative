// @flow

import * as React from 'react'
import { Button } from './Button'
import { Entypo } from '@expo/vector-icons'

type Props = {
  name: string,
  size: number,
  color: string
}

const IconButton = ({ name, size, color, ...props }: Props) => {
  return (
    <Button {...props}>
      <Entypo name={name} size={size} color={color} />
    </Button>
  )
}

IconButton.defaultProps = {
  size: 40,
  color: '#FFF'
}

export { IconButton }
