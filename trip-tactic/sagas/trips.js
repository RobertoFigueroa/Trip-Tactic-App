import {
    call,
    takeEvery,
    put,
    select,
  } from 'redux-saga/effects';

import { API_BASE_URL } from '../settings';
import * as selectors from '../reducers';
import * as actions from '../actions/trips';
import * as types from '../types/trips';
import * as schemas from '../schemas/trips';

function* fetchTrips(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated)

        if(isAuth){
            const token = yield select(selectors.getAuthToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/trips/my-trips/`,
                {
                    method: 'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                }
            );

            if(response.status === 200){
                const jsonResult = yield response.json();
                const {
                    entities: { trips },
                    result,
                } = normalize(jsonResult, schemas.trips);
                yield put(
                    actions.completeFetchingTrips(
                        trips,
                        result,
                    ),
                );
            } else{
                console.log('TODO')
            }
        }
    } catch (error) {
        console.log("ERROR", error)
    }
}

export function* watchTripsFetch(){
    yield takeEvery(
        types.TRIP_FETCH_STARTED,
        fetchTrips,
    )
}