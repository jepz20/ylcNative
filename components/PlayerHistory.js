// @flow

import * as React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native'
import type { LogMap, LogList } from '../types/match'
import { mapDueslPerMatch } from '../core'
import { NO_LOG_CHARACTER } from '../constants'
import { Map } from 'immutable'
import type { ToggleCalculatorVisibility } from '../actions/calculator'

const POSITIVE = 'green'
const NEGATIVE = 'red'
type Props = {
  logs: LogMap,
  playerId: string,
  currentDuel: string,
  toggleCalculatorVisibility: ToggleCalculatorVisibility
}

const PlayerHistory = ({
  logs,
  playerId,
  currentDuel = '1',
  toggleCalculatorVisibility
}: Props) => {
  const currentLog: ?LogList = logs.get(String(currentDuel))
  const renderLog = (currentLog: LogList) =>
    currentLog
      .reverse()
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
              {operationValue > 0 && '+'}
              {operationValue}
            </Text>
            <Text style={[styles.currentPoints]}>{previousPoints}</Text>
          </View>
        )
      })

  const renderNoLogs = (noLogChar: string) =>
    mapDueslPerMatch(index => (
      <View style={styles.logContainer} key={index}>
        <Text style={styles.noLog}>{noLogChar}</Text>
      </View>
    ))

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => toggleCalculatorVisibility(playerId)}
      >
        <View>
          {currentLog ? renderLog(currentLog) : renderNoLogs(NO_LOG_CHARACTER)}
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
  logs: Map()
}

export { PlayerHistory }
