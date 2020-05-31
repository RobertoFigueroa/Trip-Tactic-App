import React from 'react';
import { connect } from 'react-redux';
import { View, Text , Image} from 'react-native';
const { getCode} = require('country-list');

import styles from './styles.js';
import * as selectors from '../../reducers';




const Country = ({name}) =>{
    const flag = {uri : `https://www.countryflags.io/${getCode(name)}/flat/64.png`}
    console.log(getCode(name))
    return( 
        <View> 
            <Image style = {styles.image} source ={flag}/>
            <Text>{name}</Text>
        </View>
    )
}
export default connect(
    (state, { id }) =>({
        ...selectors.getCountry(state,id)
    }),
)(Country)