import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, Image, Alert} from 'react-native';

import styles from './styles';
import * as selectors from '../../reducers';
import * as actions from '../../actions/trips';

const img = require('../../assets/tripCard.png');

const Trip = ({name, isConfirmed = false, onDelete, id, navigation}) =>(
    <View style = {!isConfirmed ? styles.notCofirmedYet : styles.card} onStartShouldSetResponder={() => navigation.navigate("Plans",{id})}>
        <View style={styles.cardContent}>
            <Image style={styles.image} source={img}/>
            <Text style={styles.text}>{ name }</Text>
            <View style={styles.buttons}>
                <Button title={"Add Plans"} color={'#208511'} onPress={() => navigation.navigate("CreatePlan",{id})}/> 
                <Button title={"x"} color={'#b3483d'} onPress={() => onDelete(id)}/> 
            </View>
        </View>
    </View>
);

export default connect(
    (state, { id}) => ({
        ...selectors.getTrip(state,id)
        
    }),
    dispatch => ({
        onDelete(id) {
            dispatch(actions.startDeletingTrip(id));
        }
    }),
)(Trip)