import React from 'react'
import { View, StyleSheet } from 'react-native'

const Indicator = ({ style }) => {
  return (
    <View style={[styles.indicator, style]} />
  )
}

const styles = StyleSheet.create({
  indicator: {
    borderRadius: 50,
    backgroundColor: 'grey',
    height: 30,
    width: 30,
    borderWidth: 1,
    elevation: 2,
    borderColor: '#000'
  }
})

export { Indicator }
