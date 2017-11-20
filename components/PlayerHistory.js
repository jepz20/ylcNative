import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { createArray } from '../utils'
const DUELS_PER_MATCH = 3
const NO_LOG_CHARACTER = '.'
const POSITIVE = 'green'
const NEGATIVE = 'red'

const PlayerHistory = ({ logs, playerId, currentDuel }) => {
  const currentLog = logs[currentDuel] || []
  const renderLog = () => (
    currentLog.map(({ previousPoints, operationValue, id, playerId: logPlayerId }) => {
      if (logPlayerId !== playerId) return null

      return (
        <View style={[styles.logContainer]} key={id}>
          <Text style={[styles.operationValue, { color: operationValue > 0 ? POSITIVE : NEGATIVE }]} >
            {operationValue > 0 && '+'}{operationValue}
          </Text>
          <Text style={[styles.currentPoints]} >
            {previousPoints}
          </Text>
        </View>
      )
    })
  )

  const renderNoLogs = () => {
    return createArray(DUELS_PER_MATCH).map((_, index) => (
      <View style={[styles.logContainer]} key={index}>
        <Text style={styles.noLog}>{NO_LOG_CHARACTER}</Text>
      </View>
    ))
  }

  return (
    <View style={styles.container}>
      {!currentLog.length && renderNoLogs()}
      {renderLog()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  logContainer: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  operationValue: {
    alignSelf: 'flex-end',
    fontSize: 15,
    marginRight: 10,
    marginBottom: 5,
    flex: 1,
    textAlign: 'right'
  },
  currentPoints: {
    fontSize: 30,
    flex: 2,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: 'grey'
  },
  noLog: {
    fontSize: 30,
    color: 'grey',
    alignSelf: 'flex-end'
  }
})

PlayerHistory.defaultProps = {
  logs: []
}

export { PlayerHistory }
