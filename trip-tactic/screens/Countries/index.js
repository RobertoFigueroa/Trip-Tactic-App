import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import CountryContainer from '../../components/CountryContainer';
import CityContainer from '../../components/CityContainer';
import styles from './styles';
import * as selectors from '../../reducers';

const Country = ({selectedCountry}) => {
    return(
        <View style = {styles.container} >
            {
                selectedCountry === null ? <CountryContainer/> :<CityContainer/>
            }
        </View>
    );
}

export default connect(
    state => ({
        selectedCountry: selectors.getSelectedCountry(state),
    }),
    null
)(Country)
