import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import CountryContainer from '../../components/CountryContainer';
import CityContainer from '../../components/CityContainer';
import PlaceContainer from '../../components/PlaceContainer';
import styles from './styles';
import * as selectors from '../../reducers';


const Country = ({navigation}) => {
    return(
        <View style = {styles.container} >
            <CountryContainer navigation = {navigation}/>
        </View>
    );
}

export default Country
