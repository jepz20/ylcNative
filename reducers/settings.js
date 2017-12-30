// @flow

import { Record } from 'immutable'
import type { RecordFactory, RecordOf } from 'immutable'
export type State = {
  duelsPerMatch: number,
  theme: string
}

export type StateRE = RecordOf<State>

type Action = {
  type: string
}

const INITIAL_STATE: RecordFactory<State> = Record({
  duelsPerMatch: 3,
  theme: 'defaul'
})

export default function (state: StateRE = INITIAL_STATE(), action: Action) {
  switch (action.type) {
    default:
      return state
  }
}
