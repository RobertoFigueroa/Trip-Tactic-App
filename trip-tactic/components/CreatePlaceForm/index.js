import React, { useState } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { View, Text, Button, TextInput } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import * as actions from '../../actions/place';

import styles from './styles'

const CreatePlaceForm = ({onCreate, cityId}) => {
    const {control, handleSubmit, errors} = useForm();
    const onSumbit = data =>{
        const newData = {...data, id:uuidv4(), city:cityId};
        onCreate(newData);
    }
    return(
        <View style = {styles.container}>
            <Text>Name</Text>
            <Controller 
                as= {<TextInput placeholder = 'Place name'/>}
                control = {control}
                name = 'name'
                onChange = {args=> args[0].nativeEvent.text}
                rules = {{required: true}}
                defaultValue = ''
            />
            {errors.name && <Text>This is required.</Text>}

            <Text>Type</Text>
            <Controller 
                as= {<TextInput placeholder = 'Place type'/>}
                control = {control}
                name = 'place_type'
                onChange = {args=> args[0].nativeEvent.text}
                rules = {{required: true}}
                defaultValue = ''
            />
            {errors.name && <Text>This is required.</Text>}

            <Text>Description</Text>
            <Controller 
                as= {<TextInput placeholder = 'Place Description'/>}
                control = {control}
                name = 'description'
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
    undefined,
    dispatch => ({
        onCreate(place){
            console.log('lo que lleva el dispatch', place)
            dispatch(actions.startAddingPlace(place))
        }
    })
)(CreatePlaceForm)