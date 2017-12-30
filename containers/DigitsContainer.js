// @flow

import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Row, TextButton, IconButton } from '../components'
import { DIGITS } from '../constants'
import type { DigitPress, Erase, Reset } from '../actions/index'

type Props = {
  value: string,
  digitPress: DigitPress,
  erase: Erase,
  reset: Reset
}
const DigitsContainer = ({ digitPress, erase, reset, value }: Props) => {
  const renderDigits = () => {
    return DIGITS.map((row, rowIndex) => (
      <Row key={rowIndex}>
        {row.map((digit: string, digitIndex: number) => (
          <TextButton
            key={digitIndex}
            value={digit}
            onPress={() => digitPress(digit)}
          />
        ))}
      </Row>
    ))
  }
  return (
    <View style={styles.container}>
      <Row>
        <IconButton name='calculator' />
        <TouchableWithoutFeedback onPress={reset}>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>{value}</Text>
          </View>
        </TouchableWithoutFeedback>
        <IconButton name='erase' onPress={erase} onLongPress={reset} />
      </Row>
      {renderDigits()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: 'green'
  },
  valueContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 2,
    justifyContent: 'center'
  },
  value: {
    alignSelf: 'flex-end',
    fontSize: 40,
    color: '#fff'
  }
})

export { DigitsContainer }
