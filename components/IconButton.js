import React from 'react'
import { Button } from './Button'
import { Entypo } from '@expo/vector-icons'
const IconButton = ({ name, size = 40, color = '#fff', ...props }) => {
  return (
    <Button {...props}>
      <Entypo name={name} size={size} color={color} />
    </Button>
  )
}

export { IconButton }
