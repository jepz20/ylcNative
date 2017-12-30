// @flow

import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'

type Props = {
  value: number
}

const PointsCounter: React.StatelessFunctionalComponent<Props> = ({
  value
}) => {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.text]}>{value}</Text>
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
