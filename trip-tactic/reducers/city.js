import unionWith from 'lodash/unionWith';
import union from 'lodash/union';
import isEqual from 'lodash/isEqual';
import filter from "lodash/filter";

import {combineReducers} from 'redux';
import * as types from '../types/city';

const byId = (state = {}, action) =>{
    switch(action.type){
        case types.CITIES_FETCH_COMPLETED:{
            const{entities, order} = action.payload;
            if(state){
                const newState = {...state};
                order.forEach(id=>{
                    newState[id] = {
                        ...entities[id],
                    };
                });
                return newState;
            }
            else {
                const newState = unionWith(state, entities, isEqual);
                return newState;
            }
        }
        default:{
            return state
        }
    }
};

const order = (state = [], action) => {
    switch(action.type){
        case types.CITIES_FETCH_COMPLETED:{
            return union(state, action.payload.order);
        }
        default:{
            return state;
        }
    }
};

const selectedCity = (state = null, action) =>{
    switch(action.type){
        case types.CITY_SELECTED:{
            return action.payload.cityId;
        }
        case types.CITY_DESELECTED:{
            return null;
        }
        default:{
            return state;
        }
    }
};

const isFetching = (state = false, action) =>{
    switch(action.type){
        case types.CITIES_FETCH_STARTED:{
            return true;
        }
        case types.CITIES_FETCH_COMPLETED:{
            return false;
        }
        case types.CITIES_FETCH_FAILED:{
            return false;
        }
        default:{
            return state;
        }
    }
};

const fetchingError = (state = null, action) =>{
    switch(action.type){
        case types.CITIES_FETCH_FAILED:{
            return action.payload;
        }
        case types.CITIES_FETCH_STARTED:{
            return null;
        }
        case types.CITIES_FETCH_COMPLETED:{
            return null;
        }
        default:{
            return state;
        }
    }
};

const cities = combineReducers({
    byId,
    order,
    selectedCity,
    isFetching,
    fetchingError,
});

export default cities;

//SELECTORS

export const getCity = (state, id) => state.byId[id];
export const getWantedCities = (state, countryId) => filter(state.byId, {'country':countryId});
export const isFetchingCities = state => state.isFetching;
export const getFetchingCitiesError = state => state.fetchingError;
export const getSelectedCity = state => state.selectedCity;