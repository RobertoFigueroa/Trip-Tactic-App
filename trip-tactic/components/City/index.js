import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, Image } from 'react-native'

import styles from './styles';
import * as selectors from '../../reducers';
import * as actions from '../../actions/city';

const img = require('../../assets/cities.jpg');

const City = ({info, onClick}) => (
    <View style = {styles.cardNotSelected} >
            <View style = {styles.cardContent}>
                <Image style={styles.image} source={img}/>
                <Text style ={styles.text}>{info.name}</Text>
                <Button title={'Select'} onPress = {onClick}/>
            </View> 
        </View>
);

export default connect(
    (state, { id })=> ({
        isSelected: selectors.getSelectedCity(state) === id,
        info: selectors.getCity(state,id)
    }),
    (dispatch, { id }) => ({
        onClick(){
            dispatch(actions.selectCity(id))
        }
    })
)(City)