import {
    call,
    takeEvery,
    put,
    select,
  } from 'redux-saga/effects';

import { normalize } from 'normalizr';
import { API_BASE_URL } from '../settings';
import * as selectors from '../reducers';
import * as actions from '../actions/comment';
import * as types from '../types/comment';
import * as schema from '../schemas/comment';

function* fetchComments(action){
    try {
        const isAuth = yield select(selectors.isAuthenticated)

        if(isAuth){
            const token = yield select(selectors.getAuthToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/userFeedBack/`,
                {
                    method: 'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                }
            );

            if(response.status === 200){
                const jsonResult = yield response.json();
                const {
                    entities: { comments },
                    result,
                } = normalize(jsonResult, schema.comments);
                yield put(
                    actions.completeFetchingComments(
                        comments,
                        result
                    ),
                );
                console.log(comments)
            } else{
                console.log('ERROR GETTING THE COMMENTS')
            }
        }
    } catch (error) {
        console.log('ERROR', error);
    }
}

export function* watchCommentFetch(){
    yield takeEvery(
        types.COMMENTS_FETCH_STARTED,
        fetchComments,
    )
}

function* addComment(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);
        if(isAuth){
            console.log('Esto llego al sagas de comment', action.payload)
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/userFeedBack/`,
                {
                    method: 'POST',
                    body: JSON.stringify(action.payload),
                    headers: {
                        'Content-Type':'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                }
            );
            console.log(response.status)
            if(response.status >= 200 && response.status <=300){
                console.log('buen camino')
                const jsonResult = yield response.json();
                yield put(
                    actions.completeAddingComment(
                        action.payload.id,
                        jsonResult,
                    ),
                );
            } else{
                yield put(actions.failAddingComment(action.payload.id, 'Error adding your Comment'))
            }
        }
    } catch (error) {
        console.log('ERROR', error);
    }
}

export function* watchCommentAdd(){
    yield takeEvery(
        types.COMMENT_ADD_STARTED,
        addComment,
    )
}