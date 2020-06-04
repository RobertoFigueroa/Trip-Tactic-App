import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, Image, Alert} from 'react-native';

import styles from './styles';
import * as selectors from '../../reducers';
import * as actions from '../../actions/plans';

const Plan = ({name, isConfirmed = false, onDelete, id, navigation, date}) =>(
    <View style = {!isConfirmed ? styles.notCofirmedYet : styles.card}  onStartShouldSetResponder={() => navigation.navigate("Events",{id})}>
        <View style={styles.cardContent}>
            <Text style={styles.text}>{ name }</Text>
            <Text style={styles.textDate}> { date }</Text>
            <View style={styles.buttons}>
                <Button title={"Add Event"} color={'#208511'} onPress={() => navigation.navigate("CreateEvent",{id})}/> 
                <Button title={"x"} color={'#b3483d'} onPress={() => onDelete(id)}/> 
            </View>
            </View>
    </View>
);

export default connect(
    (state, { id }) => ({
        ...selectors.getPlan(state,id)
        
    }),
    dispatch => ({
        onDelete(id) {
          console.log(id);  
          dispatch(actions.startDeletingPlan(id));
        }
    }),
)(Plan)