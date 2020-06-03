import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native'

import styles from './styles';
import * as selectors from '../../reducers';
import * as actions from '../../actions/place';

const City = ({info, onClick}) => (
    <View style = {styles.cardNotSelected} >
            <View style ={styles.cardNotSelected} >
                <Text style ={styles.text}>{info.name}</Text>
                <Button title={'Schedule a trip'} onPress = {onClick}/>
            </View> 
        </View>
)
export default connect(
    (state, { id })=> ({
        info: selectors.getPlace(state,id)
    }),
    null
    // (dispatch, { id }) => ({
    //     onClick(){

    //     }
    // })
)(City)