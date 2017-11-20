import React, { Component } from 'react'
import { View, StyleSheet, LayoutAnimation } from 'react-native'
import { connect } from 'react-redux'
import { DigitsContainer, ControllersContainer } from '../containers'
import * as actions from '../actions'

class CalculatorScreen extends Component {
  componentWillUpdate (nextProps) {
    if (nextProps.calculator.visible === this.props.calculator.visible) {
      return
    }
    LayoutAnimation.easeInEaseOut()
  }

  render () {
    if (!this.props.calculator.visible) return null

    const { digitPress, erase, calculator } = this.props
    return (
      <View style={styles.container}>
        <ControllersContainer player={calculator.currentPlayer} />
        <DigitsContainer
          value={calculator.value}
          onDigitPress={digitPress}
          onErasePress={erase}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
