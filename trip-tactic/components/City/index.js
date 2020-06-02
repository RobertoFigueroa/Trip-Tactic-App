import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native'

import styles from './styles';
import * as selectors from '../../reducers';
import * as actions from '../../actions/city';

const City = ({info, onClick, isSelected = false}) => (
    <View style = {styles.card} >
            <View style = {isSelected? styles.cardSelected: styles.cardNotSelected}>
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