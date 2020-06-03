import React from 'react';
import { connect } from 'react-redux';
import { View, Text , Image, Button} from 'react-native';



import styles from './styles.js';
import * as selectors from '../../reducers';
import * as actions from '../../actions/country';



const Country = ({info, onClick, isSelected = false}) =>(
        <View style = {styles.card} >
            <View style = {isSelected? styles.cardSelected: styles.cardNotSelected}>
                <Text style ={styles.text}>{info.name}</Text>
                <Button title={'Select'} onPress = {onClick}/>
            </View> 
        </View>
);

export default connect(
    (state, { id }) =>({
        isSelected : selectors.getSelectedCountry(state) === id,
        info: selectors.getCountry(state,id)
       
    }),
    (dispatch, { id } )=>({
        onClick() {
            dispatch(actions.selectCountry(id))
        }
    })
)(Country)