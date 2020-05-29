import {
  call,
  takeEvery,
  put,
  select,
} from 'redux-saga/effects';


import { API_BASE_URL } from '../settings';
import * as actions from '../actions/registration';
import * as types from '../types/registration';


function* signin(action) {

  const user = JSON.stringify(action.payload);

  try {
    console.log("SI entro al sigin saga", JSON.stringify(action.payload));
    const response = yield call(
      fetch,
      `${API_BASE_URL}/users/`,
      {
        method: 'POST',
        body: JSON.stringify(action.payload),
        headers:{
          'Content-Type': 'application/json',
        },
      },
    );
  
    if (response.status >= 200 && response.status <= 300) {
      console.log("Exitosamente registraod!");
      yield put(actions.completeSignin(user));
    } else {
      console.log("Falló el registro")
      yield put(actions.failSignin("Usuario ya existente, vuelve a intentarlo"));
    }
  } catch (error) {
    console.error("Fallo grueso", error);
    yield put(actions.failSignin('Falló la conexión'));
  }
  
  }

export function* watchSignin() {
  yield takeEvery(
    types.REGISTRATION_STARTED,
    signin
  );
}