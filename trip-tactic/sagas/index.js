import { fork, all } from 'redux-saga/effects';

import { watchLoginStarted } from '../sagas/auth';
import { watchTripsFetch } from './trips';

function* mainSaga() {
  yield all([
    fork(watchLoginStarted),
    fork(watchTripsFetch),
  ]);
}


export default mainSaga;
