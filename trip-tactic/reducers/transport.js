import omit from 'lodash/omit';
import unionWith from 'lodash/unionWith';
import union from 'lodash/union';
import isEqual from 'lodash/isEqual';

import {combineReducers} from 'redux';


import * as types from '../types/transport';


const byId = (state = {}, action) =>{
    switch(action.type){
        case types.TRANSPORT_FETCH_COMPLETED:{
            const{entities, order} = action.payload;
            console.log(entities, order);
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

        default:{
            return state
        }
    }
};

const order = (state = [], action) =>{
    switch(action.type){
        case types.TRANSPORT_FETCH_COMPLETED:{
            return union(state, action.payload.order);
        }
        default:{
            return state
        }
    }
};

const isFetching = (state = false, action) =>{
    switch(action.type){
        case types.TRANSPORT_FETCH_STARTED:{
            return true;
        }
        case types.TRANSPORT_FETCH_COMPLETED:{
            return false;
        }
        case types.TRANSPORT_FETCH_FAILED:{
            return false;
        }
        default:{
            return state;
        }
    }
}

const error = (state = null, action) => {
    switch(action.type){
        case types.TRANSPORT_FETCH_FAILED:{
            return action.payload.error;
        }
        case types.TRANSPORT_FETCH_STARTED:{
            return null
        }
        case types.TRANSPORT_FETCH_COMPLETED:{
            return null;
        }
        default:{
            return state;
        }
    }
}

const transports = combineReducers({
    byId,
    order,
    isFetching,
    error,
});

export default transports;

//Selectors

export const getTransport = (state, id) => state.byId[id];
export const getAllTransports = state => state.order.map(id => getTransport(state,id));
export const isFetcihngTransports = state => state.isFetching;
export const getFetchingTransportsError = state => state.error;