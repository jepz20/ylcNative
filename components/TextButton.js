// @flow

import * as React from 'react'
import { Text, StyleSheet } from 'react-native'
import { Button } from './Button'

type Props = {
  size?: 'large' | 'small' | 'medium',
  value: string,
  onPress: any
}
const TextButton: React.StatelessFunctionalComponent<Props> = ({
  size = 'medium',
  value,
  ...props
}) => {
  return (
    <Button {...props}>
      <Text style={[styles.text, styles[size]]}>{value}</Text>
    </Button>
  )
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 40
  },
  small: {
    fontSize: 15
  },
  large: {
    fontSize: 100
  },
  medium: {
    fontSize: 40
  }
})

export { TextButton }
