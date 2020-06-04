import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, ActivityIndicator, Button  } from 'react-native';

import styles from './styles';
import * as selectors from '../../reducers';
import * as actions from '../../actions/comment';
import * as cityActions from '../../actions/place';
import Comment from '../Comment';

const CommentContainer = ({navigation,comments, isLoading, onLoad, placeId}) =>{
    useEffect(onLoad,[]);
    return(
        <View style = {styles.container}>
            {
                comments.length ===0 && !isLoading &&(
                    <Text>
                        {"There are no comments for this place, be the first one"}
                    </Text>
                )
            }
            {
                isLoading &&(
                    <ActivityIndicator  size="small" color="#0000ff" />
                )
            }
            {
                comments.length > 0 && !isLoading && (
                    comments.map(({id}) => <Comment key = {id} id = {id} navigation = {navigation}/>)
                )
            }
            <Button title = '+' onPress = {() => navigation.navigate('Add Comment',{placeId})} />
        </View>
    )
};

export default connect(
    (state, {placeId}) =>({
        comments: selectors.getPlaceComments(state, placeId),
        isLoading: selectors.isFetchingComments(state),
    }),
    dispatch =>({
        onLoad(){
            dispatch(actions.startFetchingComments())
        },
    }),
)(CommentContainer)