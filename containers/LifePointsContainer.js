// @flow

import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { PlayerDetail } from '../components'
import type { PlayerMap, ResultMap } from '../types/match'
import type { ToggleCalculatorVisibility } from '../actions/calculator'
import { Map } from 'immutable'

type Props = {
  players: PlayerMap,
  results: ResultMap,
  toggleCalculatorVisibility: ToggleCalculatorVisibility
}
const LifePointsContainer = ({
  players = Map(),
  results,
  toggleCalculatorVisibility
}: Props) => {
  const checkIndexIsEven = n => {
    return n % 2 === 0
  }
  return (
    <View style={styles.LifePointsContainerWrapper}>
      {players.valueSeq().map((player, index) => {
        const style = { borderRightWidth: checkIndexIsEven(index) ? 0 : 1 }
        return (
          <TouchableWithoutFeedback
            key={player.id}
            onPress={() => toggleCalculatorVisibility(player.id)}
          >
            <View style={{ flex: 1 }}>
              <PlayerDetail
                results={results}
                outerContainerStyle={style}
                name={player.name}
                currentPoints={player.currentPoints}
                id={player.id}
              />
            </View>
          </TouchableWithoutFeedback>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  LifePointsContainerWrapper: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'green'
  }
})

export { LifePointsContainer }
