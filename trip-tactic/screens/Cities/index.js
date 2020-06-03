import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import CityContainer from '../../components/CityContainer';
import PlaceContainer from '../../components/PlaceContainer';
import styles from './styles';
import * as selectors from '../../reducers';


const City= ({route,navigation}) => {
    const {id} = route.params;
    return(
        <View style = {styles.container} >
            <CityContainer navigation = {navigation} countryId = {id}/>
        </View>
    );
}

export default City