import { combineReducers } from 'redux';

import auth, * as authSelectors from './auth';
import trips, * as tripSelectors from './trips';
import registration, * as registrationSelectors from './registration';
import countries, * as countrySelectors from './country';

const reducer = combineReducers({
  auth,
  trips,
  registration,
  countries,
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
export const isAuthenticated = state => authSelectors.getAuthToken(state) !== null;
 
//trips
export const getTrip = (state, id) => tripSelectors.getTrip(state.trips, id);
export const getAllTrips = state => tripSelectors.getAllTrips(state.trips);
export const isFetchingTrips = state => tripSelectors.isFetchingTrips(state.trips);
export const getFetchingTripsError = state => tripSelectors.getFetchingTripsError(state.trips);

//registration
export const getUserRegistering = state => registrationSelectors.getUserRegistering(state.registration);
export const getIsRegistering = state => registrationSelectors.getIsRegistering(state.registration);
export const getRegistrationCompleted = state => registrationSelectors.getRegistrationCompleted(state.registration);

//county
export const getCountry = (state, id) => countrySelectors.getCountry(state.countries, id);
export const getAllCountries = state => countrySelectors.getAllCountries(state.countries);
export const isFetchingCountries = state => countrySelectors.isFetchingCountries(state.countries);
export const getFetchingCountriesError = state => countrySelectors.getFetchingCountriesError(state.countries);
export const getSelectedCountry = state => countrySelectors.getSelectedCounty(state.countries);

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