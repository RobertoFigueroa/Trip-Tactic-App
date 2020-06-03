import omit from 'lodash/omit';
import unionWith from 'lodash/unionWith';
import union from 'lodash/union';
import isEqual from 'lodash/isEqual';
import filter from 'lodash/filter';

import { combineReducers } from 'redux';


import * as types from '../types/plans';


const byId = (state = {}, action) =>{
    switch(action.type){
        case types.PLAN_FETCH_COMPLETED:{
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
        case types.PLAN_ADD_STARTED:{
            const newState = {...state};
            newState[action.payload.id] ={
                ...action.payload,
                isConfirmed: false,
            };
            return newState
        }
        case types.PLAN_ADD_COMPLETED:{
            const{oldId, plan} = action.payload;
            const newState = omit(state, oldId);
            newState[plan.id] = {
                ...plan,
                isConfirmed: true
            };
            return newState
        }
        case types.PLAN_DELETE_STARTED:{
            return omit(state, action.payload.id)
        }
        default:{
            return state
        }
    }
};

const order = (state = [], action) =>{
    switch(action.type){
        case types.PLAN_FETCH_COMPLETED:{
            return union(state, action.payload.order);
        }
        case types.PLAN_ADD_STARTED:{
            return[...state, action.payload.id];
        }
        case types.PLAN_ADD_COMPLETED:{
            const {oldId, plan} = action.payload;
            return state.map(id => id === oldId? plan.id : id);
        }
        case types.PLAN_DELETE_STARTED:{
            return state.filter(id => id !== action.payload.id);
        }
        default:{
            return state
        }
    }
};

const isFetching = (state = false, action) =>{
    switch(action.type){
        case types.PLAN_FETCH_STARTED:{
            return true;
        }
        case types.PLAN_FETCH_COMPLETED:{
            return false;
        }
        case types.PLAN_FETCH_FAILED:{
            return false;
        }
        default:{
            return state;
        }
    }
}

const error = (state = null, action) => {
    switch(action.type){
        case types.PLAN_FETCH_FAILED:{
            return action.payload.error;
        }
        case types.PLAN_FETCH_STARTED:{
            return null
        }
        case types.PLAN_FETCH_COMPLETED:{
            return null;
        }
        default:{
            return state;
        }
    }
}

const plans = combineReducers({
    byId,
    order,
    isFetching,
    error,
});

export default plans;

//Selectors

export const getPlan = (state, id) => state.byId[id];
export const getPlanOfTrip = (state, tripId) => filter(state.byId, pl => pl.trip === tripId);
export const getAllPlans = state => state.order.map(id => getPlan(state,id));
export const isFetchingPlans = state => state.isFetching;
export const getFetchingPlanError = state => state.error;