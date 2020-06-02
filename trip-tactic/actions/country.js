import * as types from '../types/country'

export const startFetchingCountries = () => ({
    type: types.COUNTRIES_FETCH_STARTED,
});
export const completeFetchingCountries = (entities, order) =>({
    type: types.COUNTRIES_FETCH_COMPLETED,
    payload: {
        entities,
        order
    },
});
export const failFetchingCountries = error => ({
    type: types.COUNTRIES_FETCH_FAILED,
    payload: {
        error,
    }
});
export const selectCountry = countryId => ({
    type: types.COUNTRY_SELECTED,
    payload:{
        countryId,
    }
})
export const deselectCountry = () =>({
    type: types.COUNTRY_DESELECTED,
})