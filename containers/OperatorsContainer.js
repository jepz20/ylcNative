import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TextButton } from '../components'
import { connect } from 'react-redux'
import * as actions from '../actions'

const OperatorsContainerWithoutRedux = props => {
  const {
    player,
    calculator,
    addPoints,
    substractPoints,
    halfPoints,
    scoopMatch,
    draw,
    toggleCalculatorVisibility,
    reset
  } = props

  const applyOperation = type => {
    switch (type) {
      case 'scoop':
        scoopMatch(player)
        break
      case 'draw':
        draw()
        break
      case 'halfPoints':
        halfPoints(player)
        break
      case 'add':
        addPoints(calculator.value, player)
        break
      case 'substract':
        substractPoints(calculator.value, player)
        break
    }
    toggleCalculatorVisibility()
    reset()
  }

  return (
    <View style={styles.container}>
      <View style={[{ flex: 1 }]}>
        <TextButton
          onPress={() => applyOperation('scoop')}
          value='SCOOP'
          textStyle={styles.smallText}
        />
      </View>
      <View style={[styles.row, { flex: 1 }]}>
        <TextButton
          onPress={() => applyOperation('draw')}
          value='DRAW'
          textStyle={styles.smallText}
        />
        <TextButton
          onPress={() => applyOperation('halfPoints')}
          value='1/2'
          textStyle={styles.smallText}
        />
      </View>
      <View style={[styles.row, { flex: 2 }]}>
        <TextButton
          onPress={() => applyOperation('add')}
          value='+'
          textStyle={styles.bigText}
        />
        <TextButton
          onPress={() => applyOperation('substract')}
          value='-'
          textStyle={styles.bigText}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green'
  },
  row: {
    flexDirection: 'row'
  },
  smallText: {
    fontSize: 15
  },
  bigText: {
    fontSize: 100
  }
})

const mapStateToProps = ({ calculator }) => ({
  calculator
})

const OperatorsContainer = connect(mapStateToProps, actions)(
  OperatorsContainerWithoutRedux
)

export { OperatorsContainer }
