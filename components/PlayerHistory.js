import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { mapDueslPerMatch } from '../core'
import { NO_LOG_CHARACTER } from '../constants'
const POSITIVE = 'green'
const NEGATIVE = 'red'

const PlayerHistory = ({ logs, playerId, currentDuel, onPress }) => {
  const currentLog = logs.get(currentDuel.toString())

  const renderLog = () => (
    currentLog.valueSeq()
      .map(({ operationValue, playerId: logPlayerId, previousPoints, id }) => {
        if (logPlayerId !== playerId) return null

        return (
          <View style={[styles.logContainer]} key={id}>
            <Text
              style={[
                styles.operationValue,
                { color: operationValue > 0 ? POSITIVE : NEGATIVE }
              ]}
            >
              {operationValue > 0 && '+'}{operationValue}
            </Text>
            <Text style={[styles.currentPoints]} >
              {previousPoints}
            </Text>
          </View>
        )
      })
  )

  const renderNoLogs = () => (
    mapDueslPerMatch((index) => (
      <View style={styles.logContainer} key={index}>
        <Text style={styles.noLog}>{NO_LOG_CHARACTER}</Text>
      </View>
    ))
  )

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableWithoutFeedback onPress={() => onPress(playerId)}>
        <View>
          { currentLog
            ? renderLog()
            : renderNoLogs()
          }
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
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
