import * as types from '../types/city';

export const startFetchingCities = () => ({
    type: types.CITIES_FETCH_STARTED,
});
export const completeFetchingCities = (entities, order) =>({
    type: types.CITIES_FETCH_COMPLETED,
    payload: {
        entities,
        order
    },
});
export const failFetchingCities = error => ({
    type: types.CITIES_FETCH_FAILED,
    payload: {
        error,
    }
});
export const selectCity = countryId => ({
    type: types.CITY_SELECTED,
    payload:{
        cityId,
    }
})