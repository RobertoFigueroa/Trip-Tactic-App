import {schema} from 'normalizr';

export const place = new schema.Entity(
    'places',
);
export const places = new schema.Array(place);