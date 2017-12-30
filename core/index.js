// @flow

import { mapRangeOfLength } from '../utils'
// TODO: change this to read settings from internal DB
const duelsPerMatch = 3
export const mapDueslPerMatch = mapRangeOfLength(duelsPerMatch)

export const getDuelResultStatus = (winner: ?string, player: string) => {
  switch (winner) {
    case 'tie':
      return 'tie'
    case player:
      return 'win'
    case undefined:
      return 'default'
    default:
      return 'loose'
  }
}
