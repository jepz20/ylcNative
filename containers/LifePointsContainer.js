import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { PlayerDetail } from '../components'

const LifePointsContainer = ({ players, matchResults, settings, onPress }) => {
  const checkIndexIsEven = (n) => {
    return n % 2 === 0
  }

  return (
    <View style={styles.LifePointsContainerWrapper}>
      {
        Object.keys(players).map((key, index) => {
          const style = { borderRightWidth: checkIndexIsEven(index) ? 0 : 1 }
          return (
            <TouchableWithoutFeedback key={key} onPress={() => onPress(key)} >
              <View style={{ flex: 1 }}>
                <PlayerDetail
                  matchResults={matchResults}
                  outerContainerStyle={style}
                  {...players[key]}
                  settings={settings}
                />
              </View>
            </TouchableWithoutFeedback>
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  LifePointsContainerWrapper: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'green'
  }
})

export { LifePointsContainer }
