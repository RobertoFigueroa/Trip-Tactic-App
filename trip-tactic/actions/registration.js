import * as types from '../types/registration';

export const startSignin = user => ({ //user is a pojo with the fiedls required for create a new user
  type: types.REGISTRATION_STARTED,
  payload: {
    ...user,
  }
}); 

export const completeSignin = user => ({ //also a pojo
  type: types.REGISTRATION_COMPLETED,
  payload: {
    ...user,
  }
});

export const failSignin = error => ({
  type: types.REGISTRATION_FAILED,
  payload: {
    error,
  }
});