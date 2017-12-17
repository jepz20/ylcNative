import React from 'react'
import { TouchableHighlight, StyleSheet } from 'react-native'
const Button = ({ style, children, ...props }) => {
  return (
    <TouchableHighlight
      style={[styles.container, style]}
      underlayColor='rgba(0, 0, 0, 0.4)'
      {...props}
    >
      {children}
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  text: {
    color: '#fff',
    fontSize: 40
  }
})

export { Button }
