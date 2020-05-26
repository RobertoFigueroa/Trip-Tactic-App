import { fork, all } from 'redux-saga/effects';

import { watchLoginStarted } from '../sagas/auth';

function* mainSaga() {
  yield all([
    fork(watchLoginStarted),
  ]);
}


export default mainSaga;
