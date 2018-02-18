// @flow

import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import counter from '../utils/counter'

type Props = {
  value: number
}

type State = {
  value: number
}

const DEFAULT_LENGTH = 4
class PointsCounter extends React.Component<Props, State> {
  state = {
    value: this.props.value
  }

  setValue = (val: number) => {
    this.setState({ value: val })
  }

  componentWillReceiveProps ({ value: finalValue }: Props) {
    const { value: initialValue }: Props = this.props
    if (finalValue === initialValue) return
    counter({
      finalValue,
      initialValue,
      setValue: this.setValue,
      duration: 1.5
    })
  }

  render () {
    const { value = '' } = this.state
    const len = value.toString().length
    const fontSize = 65 + (DEFAULT_LENGTH - len) * 15
    return (
      <View style={styles.container}>
        <Text style={[styles.text, { fontSize }]}>{value}</Text>
      </View>
    )
  }
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
