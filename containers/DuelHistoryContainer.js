import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { PlayerHistory } from '../components'

class DuelHistoryContainer extends Component {
  renderPlayersHistory () {
    const { players, logs, currentDuel, onPress } = this.props

    return players.valueSeq().map(player => {
      return (
        <PlayerHistory
          key={player.id}
          logs={logs}
          playerId={player.id}
          currentDuel={currentDuel}
          onPress={onPress}
        />
      )
    })
  }

  render () {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.renderPlayersHistory()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  }
})
export { DuelHistoryContainer }
