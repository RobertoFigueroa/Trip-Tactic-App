import omit from 'lodash/omit';
import unionWith from 'lodash/unionWith';
import union from 'lodash/union';
import isEqual from 'lodash/isEqual';

import { combineReducers } from 'redux';


import * as types from '../types/events';


const byId = (state = {}, action) =>{
    switch(action.type){
        case types.EVENT_FETCH_COMPLETED:{
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
        case types.EVENT_ADD_STARTED:{
            const newState = {...state};
            newState[action.payload.id] ={
                ...action.payload,
                isConfirmed: false,
            };
            return newState
        }
        case types.EVENT_ADD_COMPLETED:{
            const{oldId, event} = action.payload;
            const newState = omit(state, oldId);
            newState[event.id] = {
                ...event,
                isConfirmed: true
            };
            return newState
        }
        case types.EVENT_DELETE_STARTED:{
            return omit(state, action.payload.id)
        }
        default:{
            return state
        }
    }
};

const order = (state = [], action) =>{
    switch(action.type){
        case types.EVENT_FETCH_COMPLETED:{
            return union(state, action.payload.order);
        }
        case types.EVENT_ADD_STARTED:{
            return[...state, action.payload.id];
        }
        case types.EVENT_ADD_COMPLETED:{
            const {oldId, event} = action.payload;
            return state.map(id => id === oldId? event.id : id);
        }
        case types.EVENT_DELETE_STARTED:{
            return state.filter(id => id !== action.payload.id);
        }
        default:{
            return state
        }
    }
};

const isFetching = (state = false, action) =>{
    switch(action.type){
        case types.EVENT_FETCH_STARTED:{
            return true;
        }
        case types.EVENT_FETCH_COMPLETED:{
            return false;
        }
        case types.EVENT_FETCH_FAILED:{
            return false;
        }
        default:{
            return state;
        }
    }
}

const error = (state = null, action) => {
    switch(action.type){
        case types.EVENT_FETCH_FAILED:{
            return action.payload.error;
        }
        case types.EVENT_FETCH_STARTED:{
            return null
        }
        case types.EVENT_FETCH_COMPLETED:{
            return null;
        }
        default:{
            return state;
        }
    }
}

const events = combineReducers({
    byId,
    order,
    isFetching,
    error,
});

export default events;

//Selectors

export const getEvent = (state, id) => state.byId[id];
export const getEventOfTrip = (state, tripId) => state.order.map(id => getEvent(state, id).trip === tripId && getEvent(state, id));
export const getAllEvents = state => state.order.map(id => getEvent(state,id));
export const isFetchingEvents = state => state.isFetching;
export const getFetchingEventError = state => state.error;