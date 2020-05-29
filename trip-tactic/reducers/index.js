import { combineReducers } from 'redux';

import auth, * as authSelectors from './auth';
import trips, * as tripSelectors from './trips';
import registration, * as registrationSelectors from './registration';

const reducer = combineReducers({
  auth,
  trips,
  registration,
});

export default reducer;

//Selectors

//Auth
export const getAuthToken = state => authSelectors.getAuthToken(state.auth);
export const getIsAuthenticating = state => authSelectors.getIsAuthenticating(state.auth);
export const getAuthenticatingError = state => authSelectors.getAuthenticatingError(state.auth);
export const getAuthUserID = state => authSelectors.getAuthUserID(state.auth);
export const getAuthExpiration = state => authSelectors.getAuthExpiration(state.auth);
export const getAuthUsername = state => authSelectors.getAuthUsername(state.auth);
export const isAuthenticated = state => authSelectors.getAuthToken(state) != null;
 
//trips
export const getTrip = (state, id) => tripSelectors.getTrip(state.trips, id);
export const getAllTrips = state => tripSelectors.getAllTrips(state.trips);
export const isFetchingTrips = state => tripSelectors.isFetchingTrips(state.trips);
export const getFetchingTripsError = state => tripSelectors.getFetchingTripsError(state.trips);

//registration
export const getUserRegistering = state => registrationSelectors.getUserRegistering(state.registration);
export const getIsRegistering = state => registrationSelectors.getIsRegistering(state.registration);


/*
How the state seems like

state = {
   auth : {
     token: null,
     decoded: null,
     isAuthenticating: false,
     error: null,
   }
   trips:{
     byId:{},
     order:[],
     isFetching: false,
     error: null,
   }


}

*/