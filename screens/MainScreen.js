// @flow
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { DuelHistoryContainer, LifePointsContainer } from '../containers'
import type { StateRE } from '../types/match'
import type { ToggleCalculatorVisibility } from '../actions/calculator'
import type { ChangePlayerName } from '../actions/match'

type Props = {
  match: StateRE,
  toggleCalculatorVisibility: ToggleCalculatorVisibility,
  changePlayerName: ChangePlayerName
}

class Main extends Component<Props> {
  render () {
    const {
      match: { logs, players, results, currentDuel },
      toggleCalculatorVisibility,
      changePlayerName
    } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.LifePointsContainerWrapper}>
          <LifePointsContainer
            players={players}
            results={results}
            toggleCalculatorVisibility={toggleCalculatorVisibility}
            changePlayerName={changePlayerName}
          />
        </View>
        <DuelHistoryContainer
          logs={logs}
          currentDuel={currentDuel}
          players={players}
          toggleCalculatorVisibility={toggleCalculatorVisibility}
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
  }
})

const mapStateToProps = ({ match, settings }) => ({
  match,
  settings
})

export default connect(mapStateToProps, actions)(Main)
