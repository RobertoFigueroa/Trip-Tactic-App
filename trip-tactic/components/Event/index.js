import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, Image, Alert} from 'react-native';

import styles from './styles';
import * as selectors from '../../reducers';
import * as actions from '../../actions/events';

const Event = ({hour, transport, place, name, isConfirmed = false, onDelete, id, navigation}) =>(
    <View style = {!isConfirmed ? styles.notCofirmedYet : styles.card} >
        <View style={styles.cardContent}>
            <Text style={styles.text}>{ name }</Text>
            <Text style={styles.text}>{ hour }</Text>
            <Text style={styles.text}>{ transport }</Text>
            <Text style={styles.text}>{ place }</Text>
            <View style={styles.buttons}>
                <Button title={"Complete"} color={'#b3483d'} onPress={() => onDelete(id)}/> 
            </View>
        </View>
    </View>
);

export default connect(
    (state, { id}) => ({
        ...selectors.getEvent(state,id)
        
    }),
    dispatch => ({
        onDelete(id) {
            dispatch(actions.startDeletingEvent(id));
        }
    }),
)(Event)