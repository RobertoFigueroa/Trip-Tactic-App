import { combineReducers } from 'redux';

import * as types from '../types/registration';

const userRegistered = (state = {}, action) => {
  switch(action.type) {
    case types.REGISTRATION_COMPLETED: {
      return {...state, ...action.payload};
    }
    default: {
      return state;
    }
  }
}

const isRegistering = (state = null, action) => {
  switch(action.type) {
    case types.REGISTRATION_STARTED: {
      return false;
    }
    case types.REGISTRATION_COMPLETED: {
      return true;
    }
    case types.REGISTRATION_FAILED: {
      return null;
    }
    default:{
      return state;
    }
  }
}

const error = (state=null, action) => {
  switch(action.type) {
    case types.REGISTRATION_FAILED: {
      return action.payload
    }
    case types.REGISTRATION_STARTED: {
      return null;
    }
    default : {
      return state;
    }
  }
}

const registrationCompleted = (state=false, action) => {
  switch(action.type) {
    case types.REGISTRATION_COMPLETED: {
      return true;
    }
    default : {
      return state;
    }
  }
}

export default combineReducers({
  userRegistered,
  isRegistering,
  error,
  registrationCompleted,
}); 

export const getUserRegistering = state => state.userRegistered;
export const getIsRegistering = state => state.isRegistering;
export const getRegistrationCompleted = state => state.registrationCompleted;

