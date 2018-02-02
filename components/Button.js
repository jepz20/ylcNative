// @flow

import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import { renderEl } from '../utils'
import * as React from 'react'
import { TouchableHighlight, StyleSheet } from 'react-native'
type Props = {
  children: React.Node,
  style?: StyleObj
}
const Button: React.StatelessFunctionalComponent<Props> = ({
  style,
  children,
  ...props
}) => {
  if (!children) return null

  return (
    <TouchableHighlight
      style={[styles.container, style]}
      underlayColor='rgba(0, 0, 0, 0.4)'
      {...props}
    >
      {renderEl(children)}
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
