import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import styles from './styles';
import * as selectors from '../../reducers';

const Trip = ({name, isConfirmed = false}) =>(
    <View style = {!isConfirmed ? styles.notCofirmedYet : ''}>
        <Text>{ name }</Text>
    </View>
);

export default connect(
    (state, { id }) => ({
        ...selectors.getTrip(state,id)
    }),
)(Trip)