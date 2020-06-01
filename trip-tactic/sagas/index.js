import { fork, all } from 'redux-saga/effects';

import { watchLoginStarted } from '../sagas/auth';
import { watchTripsFetch, watchTripsAdd, watchTripDelete } from './trips';
import { watchSignin } from './registration';

function* mainSaga() {
  yield all([
    fork(watchLoginStarted),
    fork(watchTripsFetch),
    fork(watchSignin),
    fork(watchTripsAdd),
    fork(watchTripDelete),
  ]);
}


export default mainSaga;
