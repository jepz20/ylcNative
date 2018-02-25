import Immutable from 'immutable'
import Serialize from 'remotedev-serialize'
import { createTransform } from 'redux-persist'

module.exports = function (config) {
  config = config || {}

  var serializer = Serialize.immutable(Immutable, config.records)
  return createTransform(serializer.stringify, serializer.parse, config)
}
