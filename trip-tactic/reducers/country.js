import unionWith from 'lodash/unionWith';
import union from 'lodash/union';
import isEqual from 'lodash/isEqual';

import {combineReducers} from 'redux';
import * as types from '../types/country';

const byId = (state = {}, action) =>{
    switch(action.type){
        case types.COUNTRIES_FETCH_COMPLETED:{
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
        case types.COUNTRIES_FETCH_COMPLETED:{
            return union(state, action.payload.order);
        }
        default:{
            return state;
        }
    }
}

const selectedCountry = (state = null, action) =>{
    switch(action.type){
        case types.COUNTRY_SELECTED:{
            return action.payload.countryId;
        }
        default:{
            return state;
        }
    }
}

const isFetching = (state = false, action) =>{
    switch(action.type){
        case types.COUNTRIES_FETCH_STARTED:{
            return true;
        }
        case types.COUNTRIES_FETCH_COMPLETED:{
            return false;
        }
        case types.COUNTRIES_FETCH_FAILED:{
            return false;
        }
        default:{
            return state;
        }
    }
}

const fetchingError = (state = null, action) =>{
    switch(action.type){
        case types.COUNTRIES_FETCH_FAILED:{
            return action.payload;
        }
        case types.COUNTRIES_FETCH_STARTED:{
            return null;
        }
        case types.COUNTRIES_FETCH_COMPLETED:{
            return null;
        }
        default:{
            return state;
        }
    }
}

const countries = combineReducers({
    byId,
    order,
    selectedCountry,
    isFetching,
    fetchingError,
});

export default countries;

//SELECTORS

export const getCountry = (state, id) => state.byId[id];
export const getAllCountries = state => state.order.map(id => getCountry(state,id));
export const isFetchingCountries = state => state.isFetching;
export const getFetchingTripsError = state => state.fetchingError;
export const getSelectedCounty = state => state.selectedCountry;