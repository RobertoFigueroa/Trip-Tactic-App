import {
  call,
  takeEvery,
  put,
  select,
} from 'redux-saga/effects';

import { normalize } from 'normalizr';


import { API_BASE_URL } from '../settings';
import * as selectors from '../reducers';
import * as actions from '../actions/transport';
import * as types from '../types/transport';
import * as schemas from '../schemas/transport';

function* fetchTransports(action) {
  try {
      const isAuth = yield select(selectors.isAuthenticated)

      if(isAuth){
          const token = yield select(selectors.getAuthToken)
          const response = yield call(
              fetch,
              `${API_BASE_URL}/transports/`,
              {
                  method: 'GET',
                  headers:{
                      'Content-Type':'application/json',
                      'Authorization': `JWT ${token}`,
                  },
              }
          );

          if(response.status === 200){
              console.log("Si hay transports")
              const jsonResult = yield response.json();
              const {
                  entities: { transports },
                  result,
              } = normalize(jsonResult, schemas.transports);
              yield put(
                  actions.completeFetchingTransports(
                      transports,
                      result,
                  ),
              );
          } else{
              console.log('TODO');
              actions.failFetchingTransports("Erro while fetching transports");
          }
      }
  } catch (error) {
      console.log("ERROR", error)
      actions.failFetchingTransports(error);
  }
}

export function* watchTransportsFetch(){
  yield takeEvery(
      types.TRANSPORT_FETCH_STARTED,
      fetchTransports,
  )
}
