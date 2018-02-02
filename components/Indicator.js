// @flow

import * as React from 'react'
import { View, StyleSheet } from 'react-native'

type Props = {
  type: 'win' | 'loose' | 'tie' | 'neutral'
}
const Indicator: React.StatelessFunctionalComponent<Props> = ({
  type = 'neutral'
}) => {
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
  neutral: {
    backgroundColor: 'grey'
  }
})

export { Indicator }
