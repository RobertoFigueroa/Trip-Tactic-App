import {
    call,
    takeEvery,
    put,
    select,
  } from 'redux-saga/effects';

import { normalize, schema } from 'normalizr';


import { API_BASE_URL } from '../settings';
import * as selectors from '../reducers';
import * as actions from '../actions/country';
import * as types from '../types/country';
import * as schemas from '../schemas/country';

function* fetchCountries(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if(isAuth){
            const token = yield select(selectors.getAuthToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/countries/`,
                {
                    method: 'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                }
            );
            if(response.status === 200){
                console.log('saga de fetch countries')
                const jsonResult = yield response.json();
                const{
                    entities: { countries },
                    result,
                } = normalize(jsonResult, schemas.countries);
                yield put(
                    actions.completeFetchingCountries(
                        countries,
                        result,
                    ),
                );
            } else{
                console.log('ERROR')
            }
        }

    } catch (error) {
        console.log('ERROR', error)
    }
};

export function* whatchCountriesFetch(){
    yield takeEvery(
        types.COUNTRIES_FETCH_STARTED,
        fetchCountries,
    )
}