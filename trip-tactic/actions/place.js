import * as types from '../types/place'

export const startFetchingPlaces = () => ({
    type: types.PLACE_FETCH_STARTED,
});
export const completeFetchingPlaces = (entities, order) =>({
    type: types.PLACE_FETCH_COMPLETED,
    payload: {
        entities,
        order
    },
});
export const failFetchingPlace = error => ({
    type: types.PLACE_FETCH_FAILED,
    payload: {
        error,
    }
});

export const startAddingPlace = place => ({
    type: types.PLACE_ADD_STARTED,
    payload: place,
});
export const completeAddingPlace = (oldId, place) => ({
    type: types.PLACE_ADD_COMPLETED,
    payload:{
        oldId,
        place,
    }
});
export const failAddingPlace = (oldId, error) => ({
    type: types.PLACE_ADD_FAILED,
    payload: {
        oldId,
        error,
    }
});