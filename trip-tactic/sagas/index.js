import { fork, all } from 'redux-saga/effects';

import { watchLoginStarted } from '../sagas/auth';
import { watchTripsFetch, watchTripsAdd } from './trips';
import { watchSignin } from './registration';

function* mainSaga() {
  yield all([
    fork(watchLoginStarted),
    fork(watchTripsFetch),
    fork(watchSignin),
    fork(watchTripsAdd),
  ]);
}


export default mainSaga;
