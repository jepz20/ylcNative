import { combineReducers } from 'redux'
import match from './match'
import settings from './settings'
import calculator from './calculator'

export default combineReducers({
  match,
  settings,
  calculator
})
