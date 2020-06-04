import * as types from '../types/comment'

export const startFetchingComments = () => ({
    type: types.COMMENTS_FETCH_STARTED,
});
export const completeFetchingComments = (entities, order) =>({
    type: types.COMMENTS_FETCH_COMPLETED,
    payload: {
        entities,
        order
    },
});
export const failFetchingComment = error => ({
    type: types.COMMENTS_FETCH_STARTED,
    payload: {
        error,
    }
});

export const startAddingComment = comment => ({
    type: types.COMMENT_ADD_STARTED,
    payload: comment,
});
export const completeAddingComment = (oldId, comment) => ({
    type: types.COMMENT_ADD_COMPLETED,
    payload:{
        oldId,
        comment,
    }
});
export const failAddingComment = (oldId, error) => ({
    type: types.COMMENT_ADD_FAILED,
    payload: {
        oldId,
        error,
    }
});