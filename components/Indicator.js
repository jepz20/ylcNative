// @flow

import * as React from 'react'
import { View, StyleSheet } from 'react-native'

type Props = {
  type: 'win' | 'loose' | 'tie' | 'default'
}
const Indicator: React.StatelessFunctionalComponent<Props> = ({ type }) => {
  return <View style={[styles.indicator, styles[type]]} />
}

const styles = StyleSheet.create({
  indicator: {
    borderRadius: 50,
    height: 30,
    width: 30,
    borderWidth: 1,
    elevation: 2,
    borderColor: '#000'
  },
  win: {
    backgroundColor: 'green'
  },
  loose: {
    backgroundColor: 'red'
  },
  tie: {
    backgroundColor: 'yellow'
  },
  default: {
    backgroundColor: 'grey'
  }
})

export { Indicator }
