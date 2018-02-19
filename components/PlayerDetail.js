// @flow

import * as React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { Indicator, PointsCounter } from '../components'
import { mapDueslPerMatch, getDuelResultStatus } from '../core'
import type { ResultMap } from '../types/match'
import type { ChangePlayerName } from '../actions/match'
import { Map } from 'immutable'

const LIFE_POINTS_BACKGROUND = '#006400'

type Props = {
  results: ResultMap,
  id: string,
  name: string,
  currentPoints: number,
  changePlayerName: ChangePlayerName
}

const renderResultsIndicator = (results, id) => {
  const fillresults = (index: string): React.Element<typeof Indicator> => {
    // $FlowFixMe
    const winner = results.has(index) ? results.get(index).winner : undefined
    return <Indicator key={index} type={getDuelResultStatus(winner, id)} />
  }
  return mapDueslPerMatch(fillresults)
}

class PlayerDetail extends React.Component<Props> {
  onChangeText = (ev: string) => {
    const { changePlayerName, id } = this.props
    changePlayerName(ev, id)
  }
  render () {
    const { results = Map(), id, name, currentPoints } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.resultsContainer}>
          {!results.isEmpty() && renderResultsIndicator(results, id)}
        </View>
        <PointsCounter value={currentPoints} />
        <View style={styles.playerNameContainer}>
          <TextInput
            underlineColorAndroid='transparent'
            style={styles.playerNameText}
            onChangeText={this.onChangeText}
            value={name}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIFE_POINTS_BACKGROUND,
    borderColor: '#005a00',
    borderWidth: 1
  },
  resultsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 35,
    marginTop: 10
  },
  playerNameContainer: {
    height: 40,
    justifyContent: 'flex-end',
    marginLeft: 5,
    marginBottom: 5
  },
  playerNameText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
    borderBottomWidth: 0
  }
})

export { PlayerDetail }
