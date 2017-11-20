import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { Button } from './Button'
const TextButton = ({ buttonStyle, textStyle, value, onPress }) => {
  return (
    <Button onPress={onPress} >
      <Text style={[styles.text, textStyle]}>{value}</Text>
    </Button>
  )
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 40
  }
})

export { TextButton }
