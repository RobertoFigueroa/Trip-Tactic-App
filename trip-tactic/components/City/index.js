import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, Image } from 'react-native'

import styles from './styles';
import * as selectors from '../../reducers';
import * as actions from '../../actions/city';

const img = require('../../assets/cities.jpg');

const City = ({info, navigation, id}) => (
    <View style = {styles.cardNotSelected} >
            <View style = {styles.cardContent}>
                <Image style={styles.image} source={img}/>
                <Text style ={styles.text}>{info.name}</Text>
                <Button title={'Visit Places'} onPress = {()=> navigation.navigate('Places', {id})}/>
            </View> 
        </View>
);

export default connect(
    (state, { id })=> ({
        isSelected: selectors.getSelectedCity(state) === id,
        info: selectors.getCity(state,id)
    }),
    null
)(City)