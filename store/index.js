import { createStore } from 'redux'
import reducers from '../reducers'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import immutableTransform from 'redux-persist-transform-immutable'

const persistConfig = {
  key: 'jepz-rootYLC',
  storage,
  transform: [immutableTransform()]
}

export const store = createStore(persistReducer(persistConfig, reducers))
// export const store = createStore(reducers)
export const persistor = persistStore(store)
