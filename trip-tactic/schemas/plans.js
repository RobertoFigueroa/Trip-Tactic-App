import {schema} from 'normalizr';

export const plan = new schema.Entity(
    'plans',
);
export const plans = new schema.Array(plan);