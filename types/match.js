// @flow

import type { RecordOf, Map, List } from 'immutable'
export type Player = {
  id: string,
  name: string,
  currentPoints: number
}

export type Log = {
  id: string,
  playerId: string,
  operationValue: number,
  currentPoints: number,
  previousPoints: number
}

export type Result = {
  winner: ?string
}

export type PlayerRE = RecordOf<Player>
export type LogRE = RecordOf<Log>
export type ResultRE = RecordOf<Result>
export type LogList = List<LogRE>

export type PlayerMap = Map<string, PlayerRE>
export type LogMap = Map<string, LogList>
export type ResultMap = Map<string, ResultRE>

export type State = {
  players: PlayerMap,
  currentDuel: string,
  logs: LogMap,
  results: ResultMap
}

export type StateRE = RecordOf<State>
