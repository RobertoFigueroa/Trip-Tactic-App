import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native'

import styles from './styles';
import * as selectors from '../../reducers';


const img = require('../../assets/comment.jpg');

const Comment = ({info}) => (
    <View style = {styles.cardNotSelected} >
            <View style ={styles.cardContent} >
            <Image style={styles.image} source={img}/>
                <Text style ={styles.text}>{`Score: ${info.score}`}</Text>
                <Text style ={styles.text}>{'Comment:'}</Text>
                <Text style = {styles.text}>{info.comment}</Text>
            </View> 
        </View>
)
export default connect(
    (state, { id })=> ({
        info: selectors.getComment(state,id)
    }),
    null
)(Comment)