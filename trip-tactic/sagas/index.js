import { fork, all } from 'redux-saga/effects';

import { watchLoginStarted } from '../sagas/auth';
import { watchTripsFetch, watchTripsAdd, watchTripDelete } from './trips';
import { watchSignin } from './registration';
import {whatchCountriesFetch} from './country'
import { watchPlanAdd, watchPlansFetch, watchPlanDelete } from './plans';
import { watchCityFetch } from './city';
import { watchPlaceFetch, watchPlaceAdd } from './place';

function* mainSaga() {
  yield all([
    fork(watchLoginStarted),
    fork(watchTripsFetch),
    fork(watchSignin),
    fork(watchTripsAdd),
    fork(watchTripDelete),
    fork(whatchCountriesFetch),
    fork(watchPlanAdd),
    fork(watchPlansFetch),
    fork(watchPlanDelete),
    fork(watchCityFetch),
    fork(watchPlaceFetch),
    fork(watchPlaceAdd)
  ]);
}


export default mainSaga;
