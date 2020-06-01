import omit from 'lodash/omit';
import unionWith from 'lodash/unionWith';
import union from 'lodash/union';
import isEqual from 'lodash/isEqual';

import {combineReducers} from 'redux';


import * as types from '../types/trips';


const byId = (state = {}, action) =>{
    switch(action.type){
        case types.TRIP_FETCH_COMPLETED:{
            const{entities, order} = action.payload;
            console.log("este es el estado inicial", state);
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
        case types.TRIP_ADD_STARTED:{
            const newState = {...state};
            newState[action.payload.id] ={
                ...action.payload,
                isConfirmed: false,
            };
            return newState
        }
        case types.TRIP_ADD_COMPLETED:{
            const{oldId, trip} = action.payload;
            const newState = omit(state, oldId);
            newState[trip.id] = {
                ...trip,
                isConfirmed: true
            };
            return newState
        }
        case types.TRIP_DELETE_STARTED:{
            return omit(state, action.payload.id)
        }
        default:{
            return state
        }
    }
};

const order = (state = [], action) =>{
    switch(action.type){
        case types.TRIP_FETCH_COMPLETED:{
            return union(state, action.payload.order);
        }
        case types.TRIP_ADD_STARTED:{
            return[...state, action.payload.id];
        }
        case types.TRIP_ADD_COMPLETED:{
            const {oldId, trip} = action.payload;
            return state.map(id => id === oldId? trip.id : id);
        }
        case types.TRIP_DELETE_STARTED:{
            return state.filter(id => id !== action.payload.id);
        }
        default:{
            return state
        }
    }
};

const isFetching = (state = false, action) =>{
    switch(action.type){
        case types.TRIP_FETCH_STARTED:{
            return true;
        }
        case types.TRIP_FETCH_COMPLETED:{
            return false;
        }
        case types.TRIP_FETCH_FAILED:{
            return false;
        }
        default:{
            return state;
        }
    }
}

const error = (state = null, action) => {
    switch(action.type){
        case types.TRIP_FETCH_FAILED:{
            return action.payload.error;
        }
        case types.TRIP_FETCH_STARTED:{
            return null
        }
        case types.TRIP_FETCH_COMPLETED:{
            return null;
        }
        default:{
            return state;
        }
    }
}

const trips = combineReducers({
    byId,
    order,
    isFetching,
    error,
});

export default trips;

//Selectors

export const getTrip = (state, id) => state.byId[id];
export const getAllTrips = state => state.order.map(id => getTrip(state,id));
export const isFetchingTrips = state => state.isFetching;
export const getFetchingTripsError = state => state.error;