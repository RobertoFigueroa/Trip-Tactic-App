import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {
  persistStore,
  persistReducer,
} from 'redux-persist';

import reducer from './reducers';
import mainSaga from './sagas';
import { AsyncStorage } from 'react-native';


export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const persistedReducer = persistReducer(
    {
      key : "root",
      storage: AsyncStorage,
      whitelist: ['auth'],
    },
    reducer,
  );

  const store = createStore(
    persistedReducer,
    applyMiddleware(sagaMiddleware),
  );

  const persistor = persistStore(store);

  sagaMiddleware.run(mainSaga);

  return { store, persistor };
}