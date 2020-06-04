import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, Image } from 'react-native'

import styles from './styles';
import * as selectors from '../../reducers';
import * as actions from '../../actions/place';

const img = require('../../assets/place.png')

const Place = ({info, navigation, id}) => (
    <View style = {styles.cardNotSelected} >
            <View style ={styles.cardContent} >
                <Image style = {styles.image} source = {img}/>
                <Text style ={styles.text}>{info.name}</Text>
                <Button title={'View Comments'} onPress = {()=> navigation.navigate("Comments", {id})}/>
            </View> 
        </View>
)
export default connect(
    (state, { id })=> ({
        info: selectors.getPlace(state,id)
    }),
    null
)(Place)