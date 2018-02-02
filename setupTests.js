// setup file
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import PropTypes from 'prop-types'
import React from 'react'

configure({ adapter: new Adapter() })

export class TestProvider extends React.Component {
  getChildContext () {
    return { store: this.store }
  }

  constructor (props, context) {
    super(props)
    this.store = props.store
  }

  render () {
    return this.props.children
  }
}

TestProvider.childContextTypes = {
  store: PropTypes.object
}

export const mockStore = configureStore()
