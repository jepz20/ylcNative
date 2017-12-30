// @flow

import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Indicator, PointsCounter } from '../components'
import { mapDueslPerMatch, getDuelResultStatus } from '../core'
import type { ResultMap } from '../types/match'

const LIFE_POINTS_BACKGROUND = '#006400'

type Props = {
  results: ResultMap,
  id: string,
  name: string,
  currentPoints: number,
  outerContainerStyle: any
}

const PlayerDetail: React.StatelessFunctionalComponent<Props> = ({
  results,
  id,
  name,
  currentPoints,
  outerContainerStyle
}) => {
  const renderResultsIndicator = () => {
    const fillresults = (index: string): React.Element<typeof Indicator> => {
      // $FlowFixMe
      const winner = results.has(index) ? results.get(index).winner : undefined
      return <Indicator key={index} type={getDuelResultStatus(winner, id)} />
    }
    return mapDueslPerMatch(fillresults)
  }

  return (
    <View style={[styles.container, outerContainerStyle]}>
      <View style={styles.resultsContainer}>
        {!results.isEmpty() && renderResultsIndicator()}
      </View>
      <PointsCounter value={currentPoints} />
      <View style={styles.playerNameContainer}>
        <Text style={styles.playerNameText}>{name}</Text>
      </View>
    </View>
  )
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
    color: '#fff'
  }
})

export { PlayerDetail }
