import {
    call,
    takeEvery,
    put,
    select,
  } from 'redux-saga/effects';

import { normalize } from 'normalizr';

import { API_BASE_URL } from '../settings';
import * as selectors from '../reducers';
import * as actions from '../actions/city';
import * as types from '../types/city';
import * as schema from '../schemas/city';

function* fetchCities(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated)

        if(isAuth){
            const token = yield select(selectors.getAuthToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/cities/`,
                {
                    method: 'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                }
            );

            if(response.status ===200){
                const jsonResult = yield response.json();
                const {
                    entities: { cities },
                    result,
                } = normalize(jsonResult, schema.cities);
                yield put(
                    actions.completeFetchingCities(
                        cities,
                        result
                    ),
                );
            } else{
                console.log('ERROR GETTING THE CITIES')
            }
        }
    } catch (error) {
        console.log('ERROR', error);
    }
}

export function* watchCityFetch(){
    yield takeEvery(
        types.CITIES_FETCH_STARTED,
        fetchCities,
    )
}