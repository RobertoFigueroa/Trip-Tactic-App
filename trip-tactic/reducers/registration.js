import { combineReducers } from 'redux';

import * as types from '../types/registration';

const userRegistered = (state = null, action) => {
  switch(action.type) {
    case types.REGISTRATION_COMPLETED: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}

const isRegistering = (state = false, action) => {
  switch(action.type) {
    case types.REGISTRATION_COMPLETED: {
      return true;
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

export default combineReducers({
  userRegistered,
  isRegistering,
  error,
}); 

export const getUserRegistering = state => state.userRegistered;
export const getIsRegistering = state => state.isRegistering;

