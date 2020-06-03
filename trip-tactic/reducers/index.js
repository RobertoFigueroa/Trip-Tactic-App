import { combineReducers } from 'redux';

import auth, * as authSelectors from './auth';
import trips, * as tripSelectors from './trips';
import registration, * as registrationSelectors from './registration';
import countries, * as countrySelectors from './country';
import events, * as eventSelectors from './events';
import plans, * as plansSelectors from './plans';
import cities, * as citySelectors from './city';
import places, * as placeSelectors from './place';

const reducer = combineReducers({
  auth,
  trips,
  registration,
  countries,
  events,
  plans,
  cities,
  places,
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

//events
export const getEvent = (state, id) => eventSelectors.getEvent(state.events, id);
export const getEventOfTrip = (state, tripId) => eventSelectors.getEventOfTrip(state.events, tripId);
export const getAllEvents = state => eventSelectors.getAllEvents(state.events);
export const isFetchingEvents = state => eventSelectors.isFetchingEvents(state.events);
export const getFetchingEventError = state => eventSelectors.getFetchingEventError(state.events);

//plans
export const getPlan = (state, id) => plansSelectors.getPlan(state.plans, id);
export const getPlanOfTrip = (state, tripId) => plansSelectors.getPlanOfTrip(state.plans, tripId);
export const getAllPlans = state => plansSelectors.getAllPlans(state.plans);
export const isFetchingPlans = state => plansSelectors.isFetchingPlans(state.plans);
export const getFetchingPlanError = state => plansSelectors.getFetchingPlanError(state.plans);

//city
export const getCity = (state, id) => citySelectors.getCity(state.cities, id);
export const getWantedCities = (state, countryId) => citySelectors.getWantedCities(state.cities, countryId);
export const isFetchingCities = state => citySelectors.isFetchingCities(state.cities);
export const getFetchingCitiesError = state => citySelectors.getFetchingCitiesError(state.cities);
export const getSelectedCity = state => citySelectors.getSelectedCity(state.cities);

//place
export const getPlace = (state, id) => placeSelectors.getPlace(state.places, id);
export const getWantedPlaces = (state, cityId) => placeSelectors.getWantedPlaces(state.places, cityId);
export const isFetchingPlaces = state => placeSelectors.isFetchingPlaces(state.places);
export const getFetchingPlacesError = state => placeSelectors.getErrorFetchingPlaces(state.places);
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