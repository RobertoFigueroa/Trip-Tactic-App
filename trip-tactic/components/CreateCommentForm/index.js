import React, { useState } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { View, Text, Button, TextInput } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import * as actions from '../../actions/comment';
import * as selectors from '../../reducers';

import styles from './styles'

const CreateCommentForm = ({onCreate, placeId, userId}) => {
    const {control, handleSubmit, errors} = useForm();
    const onSumbit = data =>{
        const newData = {...data, id:uuidv4(), user_id: userId ,place:placeId};
        onCreate(newData);
    }
    return(
        <View style = {styles.container}>
            <Text>Score</Text>
            <Controller 
                as= {<TextInput placeholder = '5/5' keyboardType = 'numeric'/>}
                control = {control}
                name = 'score'
                onChange = {args=> args[0].nativeEvent.text}
                rules = {{required: true}}
                defaultValue = ''
            />
            {errors.name && <Text>This is required.</Text>}

            <Text>comment</Text>
            <Controller 
                as= {<TextInput placeholder = 'Additional info here'/>}
                control = {control}
                name = 'comment'
                onChange = {args=> args[0].nativeEvent.text}
                rules = {{required: true}}
                defaultValue = ''
            />
            {errors.name && <Text>This is required.</Text>}
            
            <Button title = {"Create"} onPress = {handleSubmit(onSumbit)}/>
        </View>
    );
}

export default connect(
    state => ({
        userId: selectors.getAuthUserID(state)
    }),
    dispatch => ({
        onCreate(comment){
            console.log('lo que lleva el dispatch', comment)
            dispatch(actions.startAddingComment(comment))
        }
    })
)(CreateCommentForm) 