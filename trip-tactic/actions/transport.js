import * as types from '../types/transport';

export const startFetchingTransports = () => ({
    type: types.TRANSPORT_FETCH_STARTED,
});
export const completeFetchingTransports = (entities, order) =>({
    type: types.TRANSPORT_FETCH_COMPLETED,
    payload: {
        entities,
        order
    },
});
export const failFetchingTransports = error => ({
    type: types.TRANSPORT_FETCH_FAILED,
    payload: {
        error,
    }
});