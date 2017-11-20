import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const PointsCounter = ({ textStyle, containerStyle, value }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.text, textStyle]}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 65,
    color: '#fff',
    fontWeight: 'bold'
  }
})

export { PointsCounter }
