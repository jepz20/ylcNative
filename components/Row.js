// @flow
import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { renderEl } from '../utils'

type Props = {
  children: React.Node
}

const Row: React.StatelessFunctionalComponent<Props> = ({ children }) => {
  return <View style={[styles.container]}>{renderEl(children)}</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  }
})

export { Row }
