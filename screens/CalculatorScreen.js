// @flow
import React, { Component } from 'react'
import { View, StyleSheet, LayoutAnimation } from 'react-native'
import { connect } from 'react-redux'
import { DigitsContainer, ControllersContainer } from '../containers'
import * as actions from '../actions'
import type { StateRE } from '../reducers/calculator'
import type { DigitPress, Erase, Reset } from '../actions/calculator'
type Props = {
  calculator: StateRE,
  digitPress: DigitPress,
  erase: Erase,
  reset: Reset
}
export class CalculatorScreen extends Component<Props> {
  static defaultProps = {
    calculator: {}
  }

  componentWillUpdate (nextProps: Props) {
    console.log('UPDATED', nextProps.calculator, this.props.calculator)

    if (nextProps.calculator.visible === this.props.calculator.visible) {
      return
    }
    LayoutAnimation.easeInEaseOut()
  }

  render () {
    if (!this.props.calculator.visible) return null

    const { digitPress, erase, calculator, reset } = this.props

    return (
      <View style={styles.container}>
        <ControllersContainer player={calculator.currentPlayer} />
        <DigitsContainer
          value={calculator.value}
          digitPress={digitPress}
          erase={erase}
          reset={reset}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    marginTop: 60
  }
})

const mapStateToProps = ({ calculator }) => ({
  calculator
})

export default connect(mapStateToProps, actions)(CalculatorScreen)
