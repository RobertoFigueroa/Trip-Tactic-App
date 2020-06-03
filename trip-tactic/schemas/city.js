import {schema} from 'normalizr';

export const city = new schema.Entity(
    'cities',
);
export const cities = new schema.Array(city);