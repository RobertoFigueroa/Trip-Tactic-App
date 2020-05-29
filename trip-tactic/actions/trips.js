import * as types from '../types/trips';

export const startFetchingTrips = () => ({
    type: types.TRIP_FETCH_STARTED,
});
export const completeFetchingTrips = (entities, order) =>({
    type: types.TRIP_FETCH_COMPLETED,
    payload: {
        entities,
        order
    },
});
export const failFetchingTrips = error => ({
    type: types.TRIP_FETCH_FAILED,
    payload: {
        error,
    }
});

export const startAddingTrip = trip => ({
    type: types.TRIP_ADD_STARTED,
    payload: trip,
});
export const completeAddingTrip = (oldId, trip) => ({
    type: types.TRIP_ADD_COMPLETED,
    payload:{
        oldId,
        trip,
    }
});
export const failAddingTrip = (oldId, error) => ({
    type: types.TRIP_ADD_FAILED,
    payload: {
        oldId,
        error,
    }
});

export const startDeletingTrip = id => ({
    type: types.TRIP_DELETE_STARTED,
    payload:{
        id,
    }
});
export const completeDeletingTrip = () => ({
    type: types.TRIP_DELETE_COMPLETED,
});
export const failDeletingTrip = (id,error) => ({
    type: types.TRIP_DELETE_FAILED,
    payload:{
        id,
        error,
    }
});