import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { DuelHistoryContainer, LifePointsContainer } from '../containers'

class Main extends Component {
  toggleCalculatorVisibility = (player) => {
    const { toggleCalculatorVisibility, setCurrentPlayer } = this.props
    setCurrentPlayer(player)
    toggleCalculatorVisibility()
  }

  render () {
    const {
      match: { logs, players, matchResults, currentDuel }, settings } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.LifePointsContainerWrapper}>
          <LifePointsContainer
            players={players}
            matchResults={matchResults}
            settings={settings}
            onPress={this.toggleCalculatorVisibility}
          />
        </View>
        <DuelHistoryContainer
          style={styles.DuelHistoryContainer}
          logs={logs}
          currentDuel={currentDuel}
          players={players}
          onPress={this.toggleCalculatorVisibility}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  },
  LifePointsContainerWrapper: {
    flexDirection: 'row',
    flex: 2,
    backgroundColor: 'green'
  },
  DuelHistoryContainer: {
    flex: 5
  }
})

const mapStateToProps = ({ match, settings }) => ({
  match,
  settings
})

export default connect(mapStateToProps, actions)(Main)
