import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Row, TextButton, Button } from '../components'
import { DIGITS } from '../constants'
import { Entypo } from '@expo/vector-icons'

const DigitsContainer = ({ onDigitPress, onErasePress, value }) => {
  const renderDigits = () => {
    return DIGITS.map((row, rowIndex) => (
      <Row key={rowIndex}>
        {
          row.map((digit, digitIndex) => (
            <TextButton
              key={digitIndex}
              value={digit}
              onPress={() => onDigitPress(digit)}
            />
          ))
        }
      </Row>
    ))
  }
  return (
    <View style={styles.container}>
      <Row style={{ backgroundColor: 'green' }}>
        <Button>
          <Entypo name='calculator' size={40} color='#fff' />
        </Button>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{value}</Text>
        </View>
        <Button onPress={onErasePress}>
          <Entypo name='erase' size={40} color='#fff' />
        </Button>
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
