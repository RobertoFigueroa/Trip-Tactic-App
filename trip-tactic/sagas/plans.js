import {
  call,
  takeEvery,
  put,
  select,
} from 'redux-saga/effects';

import { normalize } from 'normalizr';


import { API_BASE_URL } from '../settings';
import * as selectors from '../reducers';
import * as actions from '../actions/plans';
import * as types from '../types/plans';
import * as schemas from '../schemas/plans';



function* createPlan(action) {
  const oldId = action.payload.id;
  try {
      const isAuth = yield select(selectors.isAuthenticated);
      console.log(isAuth);
      if(isAuth){
          console.log("Esto le mando al crear plan", action.payload)
          const token = yield select(selectors.getAuthToken);
          const response = yield call(
              fetch,
              `${API_BASE_URL}/plans/`,
              {
                  method: 'POST',
                  body: JSON.stringify(action.payload),
                  headers:{
                      'Content-Type':'application/json',
                      'Authorization': `JWT ${token}`,
                  },
              }
          );

          if(response.status >= 200 && response.status <= 300){
              console.log("Se agrego un plan correctamente");
              const jsonResult = yield response.json();
              yield put(
                  actions.completeAddingPlan(
                      oldId,
                      jsonResult,
                  ),
              );
          } else{
              console.log('Falló el post');
              yield put(actions.failAddingPlan(oldId, "Fallo la conexión"))
          }
      }
  } catch (error) {
      console.log("ERROR", error);
      yield put(actions.failAddingPlan(oldId, error));
  }
}

export function* watchPlanAdd(){
  yield takeEvery(
      types.PLAN_ADD_STARTED,
      createPlan,
  )
}


function* fetchPlans(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated)
        if(isAuth){
            const token = yield select(selectors.getAuthToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/plans/`,
                {
                    method: 'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                }
            );

            if(response.status === 200){
                console.log("Si hay plans")
                const jsonResult = yield response.json();
                const {
                    entities: { plans },
                    result,
                } = normalize(jsonResult, schemas.plans);
                yield put(
                    actions.completeFetchingPlans(
                        plans,
                        result,
                    ),
                );
            } else{
                console.log('Error al recibir los planes');
                yield put(actions.failFetchingPlans("Error al recibir planes"));
            }
        }
    } catch (error) {
        console.log("ERROR", error)
        yield put(actions.failFetchingPlans(error));

    }
}

export function* watchPlansFetch(){
    yield takeEvery(
        types.PLAN_FETCH_STARTED,
        fetchPlans,
    )
}


function* deletePlan(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);
        console.log(isAuth);
        if(isAuth){
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/plans/${action.payload.id}/`,
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
                    actions.completeDeletingPlan(),
                );
            } else{
                console.log('Falló el post');
                yield put(actions.failDeletingPlan(action.payload.id, "Fallo la conexión"))
            }
        }
    } catch (error) {
        console.log("ERROR", error);
        yield put(actions.failDeletingPlan(action.payload.id, error));
    }
}

export function* watchPlanDelete(){
    yield takeEvery(
        types.PLAN_DELETE_STARTED,
        deletePlan,
    )
}