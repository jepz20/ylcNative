// @flow

import React from 'react'
import { StyleSheet, View, UIManager } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'

import { store, persistor } from './store'
import MainScreen from './screens/MainScreen'
import CalculatorScreen from './screens/CalculatorScreen'

export default class App extends React.Component<{}> {
  componentDidMount () {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true)
  }

  render () {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={styles.container}>
            <MainScreen />
            <CalculatorScreen />
          </View>
        </PersistGate>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
