import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'

import store from './store'
import MainScreen from './screens/MainScreen'
import CalculatorScreen from './screens/CalculatorScreen'

export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainScreen />
          <CalculatorScreen />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
