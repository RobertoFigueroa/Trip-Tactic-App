import {
  call,
  takeEvery,
  put,
  select,
} from 'redux-saga/effects';

import { normalize } from 'normalizr';


import { API_BASE_URL } from '../settings';
import * as selectors from '../reducers';
import * as actions from '../actions/events';
import * as types from '../types/events';
import * as schemas from '../schemas/events';

function* fetchEvents(action) {
  try {
      const isAuth = yield select(selectors.isAuthenticated)

      if(isAuth){
          const token = yield select(selectors.getAuthToken)
          const response = yield call(
              fetch,
              `${API_BASE_URL}/events/`,
              {
                  method: 'GET',
                  headers:{
                      'Content-Type':'application/json',
                      'Authorization': `JWT ${token}`,
                  },
              }
          );

          if(response.status === 200){
              console.log("Si hay events")
              const jsonResult = yield response.json();
              const {
                  entities: { events },
                  result,
              } = normalize(jsonResult, schemas.events);
              yield put(
                  actions.completeFetchingEvents(
                      events,
                      result,
                  ),
              );
          } else{
              console.log('Erro while fetching');
              actions.failFetchingEvents("Erro while fetching events");
          }
      }
  } catch (error) {
      console.log("ERROR", error)
      actions.failFetchingEvents(error);
  }
}

export function* watchEventsFetch(){
  yield takeEvery(
      types.EVENT_FETCH_STARTED,
      fetchEvents,
  )
}



function* createEvent(action) {
  const oldId = action.payload.id; //ese lo mando al creara el event
  try {
      const isAuth = yield select(selectors.isAuthenticated);
      console.log(isAuth);
      if(isAuth){
          const token = yield select(selectors.getAuthToken);
          const response = yield call(
              fetch,
              `${API_BASE_URL}/events/`,
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
              console.log("Se agrego correctamente el evento");
              const jsonResult = yield response.json();
              yield put(
                  actions.completeAddingEvent(
                      oldId,
                      jsonResult,
                  ),
              );
          } else{
              console.log('Falló el post');
              yield put(actions.failAddingEvent(oldId, "Fallo la conexión"))
          }
      }
  } catch (error) {
      console.log("ERROR", error);
      yield put(actions.failAddingEvent(oldId, error));
  }
}

export function* watchEventAdded(){
  yield takeEvery(
      types.EVENT_ADD_STARTED,
      createEvent,
  )
}


function* deleteEvent(action) {
  try {
      const isAuth = yield select(selectors.isAuthenticated);
      console.log(isAuth);
      if(isAuth){
          const token = yield select(selectors.getAuthToken);
          const response = yield call(
              fetch,
              `${API_BASE_URL}/events/${action.payload.id}/`,
              {
                  method: 'DELETE',
                  headers:{
                      'Content-Type':'application/json',
                      'Authorization': `JWT ${token}`,
                  },
              }
          );

          if(response.status >= 200 && response.status <= 300){
              console.log("Se elimino correctamente el evento");
              yield put(
                  actions.completeDeletingEvent(),
              );
          } else{
              console.log('Falló el post');
              yield put(actions.failDeletingEvent(action.payload.id, "Fallo la conexión"))
          }
      }
  } catch (error) {
      console.log("ERROR", error);
      yield put(actions.failDeletingEvent(action.payload.id, error));
  }
}

export function* watchDeleteEvent(){
  yield takeEvery(
      types.EVENT_DELETE_STARTED,
      deleteEvent,
  )
}

