import {schema} from 'normalizr';

export const trip = new schema.Entity(
    'trips',
);
export const trips = new schema.Array(trip);