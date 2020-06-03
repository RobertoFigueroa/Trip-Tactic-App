import omit from 'lodash/omit';
import unionWith from 'lodash/unionWith';
import union from 'lodash/union';
import isEqual from 'lodash/isEqual';
import filter from "lodash/filter";

import {combineReducers} from 'redux';

import * as types from '../types/place';

const byId = (state = {}, action) =>{
    switch(action.type){
        case types.PLACE_FETCH_COMPLETED:{
            const{entities, order} = action.payload;
            if(state){

                const newState = {...state};
                order.forEach(id=>{
                    newState[id] = {
                        ...entities[id],
                        isConfirmed: true
                    };
                });
                return newState;
            }
            else {
                const newState = unionWith(state, entities, isEqual);
                return newState;
            }
        }
        case types.PLACE_ADD_STARTED:{
            const newState = {...state};
            newState[action.payload.id] ={
                ...action.payload,
                isConfirmed: false,
            };
            return newState
        }
        case types.PLACE_ADD_COMPLETED:{
            const{oldId, place} = action.payload;
            const newState = omit(state, oldId);
            newState[place.id] = {
                ...place,
                isConfirmed: true
            };
            return newState
        }
        default:{
            return state
        }
    }
};

const order = (state = [], action) =>{
    switch(action.type){
        case types.PLACE_FETCH_COMPLETED:{
            return union(state, action.payload.order);
        }
        case types.PLACE_ADD_STARTED:{
            return[...state, action.payload.id];
        }
        case types.PLACE_ADD_COMPLETED:{
            const {oldId, place} = action.payload;
            return state.map(id => id === oldId? place.id : id);
        }
        default:{
            return state
        }
    }
};

const isFetching = (state = false, action) =>{
    switch(action.type){
        case types.PLACE_FETCH_STARTED:{
            return true;
        }
        case types.PLACE_FETCH_COMPLETED:{
            return false;
        }
        case types.PLACE_FETCH_FAILED:{
            return false;
        }
        default:{
            return state;
        }
    }
};

const errorFetching = (state = null, action) =>{
    switch(action.type){
        case types.PLACE_FETCH_FAILED:{
            return action.payload.error;
        }
        case types.PLACE_FETCH_STARTED:{
            return null
        }
        case types.PLACE_FETCH_COMPLETED:{
            return null;
        }
        default:{
            return state;
        }
    }
};

const places = combineReducers({
    byId,
    order,
    isFetching, 
    errorFetching
});

export default places;

//Selectors

export const getPlace = (state, id) => state.byId[id];
export const getWantedPlaces = (state, cityId) => filter(state.byId, {'city': cityId})
export const isFetchingPlaces = state => state.isFetching;
export const getErrorFetchingPlaces = state => state.errorFetching;