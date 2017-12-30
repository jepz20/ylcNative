// @flow
import * as React from 'react'
import { View, StyleSheet } from 'react-native'

type Props = {
  children: React.Node
}

const Row: React.StatelessFunctionalComponent<Props> = ({ children }) => {
  return <View style={[styles.container]}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  }
})

export { Row }
