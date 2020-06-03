import React from 'react';
import { View } from 'react-native';

import CountryContainer from '../../components/CountryContainer';
import styles from './styles';

const Country = () => {
    return(
        <View style = {styles.container} >
            <CountryContainer/>
        </View>
    );
}

export default Country;
