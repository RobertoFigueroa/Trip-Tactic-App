import * as types from '../types/plans';

export const startFetchingPlans = () => ({
    type: types.PLAN_FETCH_STARTED,
});
export const completeFetchingPlans = (entities, order) =>({
    type: types.PLAN_FETCH_COMPLETED,
    payload: {
        entities,
        order
    },
});
export const failFetchingPlans = error => ({
    type: types.PLAN_FETCH_FAILED,
    payload: {
        error,
    }
});

export const startAddingPlan = plan => ({
    type: types.PLAN_ADD_STARTED,
    payload: plan,
});
export const completeAddingPlan = (oldId, plan) => ({
    type: types.PLAN_ADD_COMPLETED,
    payload:{
        oldId,
        plan,
    }
});
export const failAddingPlan = (oldId, error) => ({
    type: types.PLAN_ADD_FAILED,
    payload: {
        oldId,
        error,
    }
});

export const startDeletingPlan = id => ({
    type: types.PLAN_DELETE_STARTED,
    payload:{
        id,
    }
});
export const completeDeletingPlan = () => ({
    type: types.PLAN_DELETE_COMPLETED,
});
export const failDeletingPlan = (id,error) => ({
    type: types.PLAN_DELETE_FAILED,
    payload:{
        id,
        error,
    }
});

