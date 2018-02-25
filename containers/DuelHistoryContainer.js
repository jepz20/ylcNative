// @flow

import React from 'react'
import { View, StyleSheet } from 'react-native'
import { PlayerHistory } from '../components'
import type { PlayerMap, LogMap } from '../types/match'
import type { ToggleCalculatorVisibility } from '../actions/calculator'
import { Map } from 'immutable'
type Props = {
  players: PlayerMap,
  logs: LogMap,
  currentDuel: string,
  toggleCalculatorVisibility: ToggleCalculatorVisibility
}

const DuelHistoryContainer = ({
  players = new Map(),
  logs,
  currentDuel,
  toggleCalculatorVisibility
}: Props) => {
  return (
    <View style={[styles.container]}>
      {players
        .valueSeq()
        .map(player => (
          <PlayerHistory
            key={player.id}
            logs={logs}
            playerId={player.id}
            currentDuel={currentDuel}
            toggleCalculatorVisibility={toggleCalculatorVisibility}
          />
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 5
  }
})
export { DuelHistoryContainer }
