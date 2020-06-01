import {schema} from 'normalizr';

export const country = new schema.Entity(
    'countries',
);
export const countries = new schema.Array(country);