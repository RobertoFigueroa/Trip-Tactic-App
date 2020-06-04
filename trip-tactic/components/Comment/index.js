import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native'

import styles from './styles';
import * as selectors from '../../reducers';


const Comment = ({info}) => (
    <View style = {styles.cardNotSelected} >
            <View style ={styles.cardNotSelected} >
                <Text style ={styles.text}>{info.score}</Text>
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