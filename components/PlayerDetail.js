import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Indicator, PointsCounter } from '../components'
import isEmpty from 'lodash/isEmpty'
import { createArray } from '../utils'

const LIFE_POINTS_BACKGROUND = 'green'

const PlayerDetail = (props) => {
  const getIndicatorStyle = (winner, player) => {
    if (!winner) {
      return null
    }
    if (winner === 'tie') {
      return styles.indicatorTie
    } else if (winner === player) {
      return styles.indicatorWin
    } else {
      return styles.indicatorLoose
    }
  }

  const renderResultsIndicator = () => {
    const { matchResults, settings, id } = props
    if (isEmpty(matchResults)) {
      return null
    }

    return createArray(settings.duelsPerMatch).map((_, index) => {
      const { winner } = matchResults[index + 1] || {}
      const style = getIndicatorStyle(winner, id)
      return <Indicator key={index} style={style} />
    })
  }

  const { currentPoints, name } = props
  return (
    <View style={[styles.container, props.outerContainerStyle]}>
      <View style={styles.resultsContainer}>
        {renderResultsIndicator()}
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
    borderColor: '#000',
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
