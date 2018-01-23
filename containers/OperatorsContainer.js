// @flow

import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { TextButton } from '../components'
import { connect } from 'react-redux'
import * as actions from '../actions'
import type { ToggleCalculatorVisibility, Reset } from '../actions/calculator'
import type { StateRE } from '../reducers/calculator'
import type {
  AddPoints,
  SubstractPoints,
  HalfPoints,
  Draw,
  ScoopMatch
} from '../actions/match'
import { getId } from '../utils'

type Props = {
  player: string,
  calculator: StateRE,
  addPoints: AddPoints,
  substractPoints: SubstractPoints,
  halfPoints: HalfPoints,
  scoopMatch: ScoopMatch,
  draw: Draw,
  toggleCalculatorVisibility: ToggleCalculatorVisibility,
  reset: Reset
}
const OperatorsContainerWithoutRedux = ({
  player,
  calculator,
  addPoints,
  substractPoints,
  halfPoints,
  scoopMatch,
  draw,
  toggleCalculatorVisibility,
  reset
}: Props) => {
  const applyOperation = (type, player) => {
    switch (type) {
      case 'scoop':
        scoopMatch(player, getId())
        break
      case 'draw':
        draw(getId())
        break
      case 'halfPoints':
        halfPoints(player, getId())
        break
      case 'add':
        addPoints(calculator.value, player, getId())
        break
      case 'substract':
        substractPoints(calculator.value, player, getId())
        break
    }
    toggleCalculatorVisibility(null)
    reset()
  }

  return (
    <View style={styles.container}>
      <View style={[{ flex: 1 }]}>
        <TextButton
          onPress={() => applyOperation('scoop', player)}
          value='SCOOP'
          size='small'
        />
      </View>
      <View style={[styles.row, { flex: 1 }]}>
        <TextButton
          onPress={() => applyOperation('draw', player)}
          value='DRAW'
          size='small'
        />
        <TextButton
          onPress={() => applyOperation('halfPoints', player)}
          value='1/2'
          size='small'
        />
      </View>
      <View style={[styles.row, { flex: 2 }]}>
        <TextButton
          onPress={() => applyOperation('add', player)}
          value='+'
          size='large'
        />
        <TextButton
          onPress={() => applyOperation('substract', player)}
          value='-'
          size='large'
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
  }
})

const mapStateToProps = ({ calculator }) => ({
  calculator
})

const OperatorsContainer = connect(mapStateToProps, actions)(
  OperatorsContainerWithoutRedux
)

export { OperatorsContainer }
