import { fork, all } from 'redux-saga/effects';

import { watchLoginStarted } from '../sagas/auth';
import { watchTripsFetch, watchTripsAdd, watchTripDelete } from './trips';
import { watchSignin } from './registration';
import { whatchCountriesFetch } from './country';
import { watchCityFetch } from './city';
import { watchPlaceFetch } from './place';

function* mainSaga() {
  yield all([
    fork(watchLoginStarted),
    fork(watchTripsFetch),
    fork(watchSignin),
    fork(watchTripsAdd),
    fork(watchTripDelete),
    fork(whatchCountriesFetch),
    fork(watchCityFetch),
    fork(watchPlaceFetch),
  ]);
}


export default mainSaga;
