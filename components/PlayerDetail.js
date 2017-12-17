import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Indicator, PointsCounter } from '../components'
import isEmpty from 'lodash/isEmpty'
import { mapDueslPerMatch } from '../core'

const LIFE_POINTS_BACKGROUND = '#006400'

const PlayerDetail = ({
  matchResults,
  id,
  name,
  currentPoints,
  outerContainerStyle
}) => {
  const getIndicatorStyle = (winner, player) => {
    switch (winner) {
      case 'tie':
        return styles.indicatorTie
      case player:
        return styles.indicatorWin
      case undefined:
        return ''
      default:
        return styles.indicatorLoose
    }
  }

  const renderResultsIndicator = () => {
    const fillMatchResults = (index) => {
      const { winner } = matchResults[index] || {}
      return <Indicator key={index} style={getIndicatorStyle(winner, id)} />
    }
    return mapDueslPerMatch(fillMatchResults)
  }

  return (
    <View style={[styles.container, outerContainerStyle]}>
      <View style={styles.resultsContainer}>
        {!isEmpty(matchResults) && renderResultsIndicator()}
      </View>
      <PointsCounter value={currentPoints} />
      <View style={styles.playerNameContainer}>
        <Text style={styles.playerNameText}>
          {name}
        </Text>
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
  indicatorWin: {
    backgroundColor: 'green'
  },
  indicatorLoose: {
    backgroundColor: 'red'
  },
  indicatorTie: {
    backgroundColor: 'yellow'
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
