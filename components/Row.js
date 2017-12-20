import React from 'react'
import { View, StyleSheet } from 'react-native'

const Row = ({ style, children }) => {
  return <View style={[styles.container, style]}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  }
})

export { Row }
