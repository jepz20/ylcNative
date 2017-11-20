import React, { Component } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { PlayerHistory } from '../components'

class DuelHistoryContainer extends Component {
  renderPlayersHistory () {
    const { players, logs, currentDuel, onPress } = this.props
    return Object.keys(players).map(key => {
      return (
        <TouchableWithoutFeedback key={key} onPress={() => onPress(key)} >
          <View style={{ flex: 1 }}>
            <PlayerHistory
              key={key}
              logs={logs}
              playerId={players[key].id}
              currentDuel={currentDuel}
            />
          </View>
        </TouchableWithoutFeedback>
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
