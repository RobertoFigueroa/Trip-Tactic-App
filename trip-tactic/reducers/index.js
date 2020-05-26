import { combineReducers } from 'redux';

import auth, * as authSelectors from './auth';


const reducer = combineReducers({
  auth,
});

export default reducer;


export const getAuthToken = state => authSelectors.getAuthToken(state.auth);
export const getIsAuthenticating = state => authSelectors.getIsAuthenticating(state.auth);
export const getAuthenticatingError = state => authSelectors.getAuthenticatingError(state.auth);
export const getAuthUserID = state => authSelectors.getAuthUserID(state.auth);
export const getAuthExpiration = state => authSelectors.getAuthExpiration(state.auth);
export const getAuthUsername = state => authSelectors.getAuthUsername(state.auth);
export const isAuthenticated = state => getAuthToken(state) != null;
 



/*
How the state seems like

state = {
   auth : {
     token: null,
     decoded: null,
     isAuthenticating: false,
     error: null,
   }


}

*/