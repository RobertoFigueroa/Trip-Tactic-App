import * as types from '../types/events';

export const startFetchingEvents = () => ({
    type: types.EVENT_FETCH_STARTED,
});
export const completeFetchingEvents = (entities, order) =>({
    type: types.EVENT_FETCH_COMPLETED,
    payload: {
        entities,
        order
    },
});
export const failFetchingEvents = error => ({
    type: types.EVENT_FETCH_FAILED,
    payload: {
        error,
    }
});

export const startAddingEvent = trip => ({
    type: types.EVENT_ADD_STARTED,
    payload: trip,
});
export const completeAddingEvent = (oldId, trip) => ({
    type: types.EVENT_ADD_COMPLETED,
    payload:{
        oldId,
        trip,
    }
});
export const failAddingEvent = (oldId, error) => ({
    type: types.EVENT_ADD_FAILED,
    payload: {
        oldId,
        error,
    }
});

export const startDeletingEvent = id => ({
    type: types.EVENT_DELETE_STARTED,
    payload:{
        id,
    }
});
export const completeDeletingEvent = () => ({
    type: types.EVENT_DELETE_COMPLETED,
});
export const failDeletingEvent = (id,error) => ({
    type: types.EVENT_DELETE_FAILED,
    payload:{
        id,
        error,
    }
});

