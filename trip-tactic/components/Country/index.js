import React from 'react';
import { connect } from 'react-redux';
import { View, Text , Image, Button} from 'react-native';



import styles from './styles.js';
import * as selectors from '../../reducers';
import * as actions from '../../actions/country';

const img = require('../../assets/countries.jpg')

const Country = ({info, id, isSelected = false, navigation}) =>(
        <View style = {styles.cardNotSelected} >
            <View style = {styles.cardContent}>
                <Image style ={styles.image} source={img}/>
                <Text style ={styles.text}>{info.name}</Text>
                <Button title={'Visit Cities'} onPress = {()=>(navigation.navigate('Cities', {id}))}/>
            </View> 
        </View>
);

export default connect(
    (state, { id }) =>({
        isSelected : selectors.getSelectedCountry(state) === id,
        info: selectors.getCountry(state,id)
       
    }),
    null
)(Country)