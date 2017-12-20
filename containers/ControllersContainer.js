import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import { OperatorsContainer } from './OperatorsContainer'
import * as actions from '../actions'

const ControllersContainerWithoutRedux = ({
  player,
  toggleCalculatorVisibility
}) => {
  return (
    <View
      style={[
        styles.container,
        { flexDirection: player === '1' ? 'row' : 'row-reverse' }
      ]}
    >
      <View style={{ flex: 1, right: 0 }}>
        <TouchableWithoutFeedback
          onPress={toggleCalculatorVisibility}
          style={{ right: 0 }}
        >
          <View style={{ flex: 1 }} />
        </TouchableWithoutFeedback>
      </View>
      <OperatorsContainer player={player} outerStyle={styles.operators} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row'
  },
  operators: {
    left: 0
  }
})

const ControllersContainer = connect(null, actions)(
  ControllersContainerWithoutRedux
)
export { ControllersContainer }
