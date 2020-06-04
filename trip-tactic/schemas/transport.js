import {schema} from 'normalizr';

export const transport = new schema.Entity(
    'transports',
);
export const transports = new schema.Array(transport);