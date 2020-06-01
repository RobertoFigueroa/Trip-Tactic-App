import {
    call,
    takeEvery,
    put,
    select,
  } from 'redux-saga/effects';

import { normalize } from 'normalizr';


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
                console.log("Si hay trips")
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



function* createTrip(action) {
    const oldId = action.payload.id; //ese lo mando al creara el trip
    try {
        const isAuth = yield select(selectors.isAuthenticated);
        console.log(isAuth);
        if(isAuth){
            const token = yield select(selectors.getAuthToken);
            const userId = yield select(selectors.getAuthUserID);
            const data = { ...action.payload, user: userId};//le agrego al usuario que esta creando el mapa
            const response = yield call(
                fetch,
                `${API_BASE_URL}/trips/`,
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                }
            );

            if(response.status >= 200 && response.status <= 300){
                console.log("Se agrego correctamente");
                const jsonResult = yield response.json();
                yield put(
                    actions.completeAddingTrip(
                        oldId,
                        jsonResult,
                    ),
                );
            } else{
                console.log('Falló el post');
                yield put(actions.failAddingTrip(oldId, "Fallo la conexión"))
            }
        }
    } catch (error) {
        console.log("ERROR", error);
        yield put(actions.failAddingTrip(oldId, error));
    }
}

export function* watchTripsAdd(){
    yield takeEvery(
        types.TRIP_ADD_STARTED,
        createTrip,
    )
}


function* deleteTrip(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);
        console.log(isAuth);
        if(isAuth){
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/trips/${action.payload.id}/`,
                {
                    method: 'DELETE',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                }
            );

            if(response.status >= 200 && response.status <= 300){
                console.log("Se elimino correctamente");
                yield put(
                    actions.completeDeletingTrip(),
                );
            } else{
                console.log('Falló el post');
                yield put(actions.failAddingTrip(action.payload.id, "Fallo la conexión"))
            }
        }
    } catch (error) {
        console.log("ERROR", error);
        yield put(actions.failAddingTrip(action.payload.id, error));
    }
}

export function* watchTripDelete(){
    yield takeEvery(
        types.TRIP_DELETE_STARTED,
        deleteTrip,
    )
}

