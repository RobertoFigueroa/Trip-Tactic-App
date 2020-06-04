import {
    call,
    takeEvery,
    put,
    select,
  } from 'redux-saga/effects';

import { normalize } from 'normalizr';
import { API_BASE_URL } from '../settings';
import * as selectors from '../reducers';
import * as actions from '../actions/place';
import * as types from '../types/place';
import * as schema from '../schemas/place';

function* fetchPlaces(action){
    try {
        const isAuth = yield select(selectors.isAuthenticated)

        if(isAuth){
            const token = yield select(selectors.getAuthToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/places/`,
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
                    entities: { places },
                    result,
                } = normalize(jsonResult, schema.places);
                yield put(
                    actions.completeFetchingPlaces(
                        places,
                        result
                    ),
                );
               console.log(places) 
            } else{
                console.log('ERROR GETTING THE PLACES')
            }
        }
    } catch (error) {
        console.log('ERROR', error);
    }
}

export function* watchPlaceFetch(){
    yield takeEvery(
        types.PLACE_FETCH_STARTED,
        fetchPlaces,
    )
}

function* addPlace(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);
        if(isAuth){
            console.log("Esto le mando al crear place", action.payload)
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/places/`,
                {
                    method: 'POST',
                    body: JSON.stringify(action.payload),
                    headers: {
                        'Content-Type':'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                }
            );
            console.log(response.status)
            if(response.status >= 200 && response.status <=300){
                console.log('buen camino')
                const jsonResult = yield response.json();
                yield put(
                    actions.completeAddingPlace(
                        action.payload.id,
                        jsonResult,
                    ),
                );
            } else{
                yield put(actions.failAddingPlace(oldId, 'Error adding your trip'))
            }
        }
    } catch (error) {
        console.log('ERROR', error);
    }
}

export function* watchPlaceAdd(){
    yield takeEvery(
        types.PLACE_ADD_STARTED,
        addPlace,
    )
}