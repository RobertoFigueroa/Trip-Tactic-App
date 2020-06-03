import React, {useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, Image, ActivityIndicator, ScrollView } from 'react-native';

import  styles from './styles.js';
import * as selectors from '../../reducers';
import * as actions from '../../actions/plans';
import PlansRow from '../PlansRow';

const img = require('../../assets/goTravel.png');



const PlansList = ({plans, isLoading, onLoad, navigation }) => {
    useEffect(onLoad,[]);
    return(
        <View style={styles.container}>
            <ScrollView>
            
            {
                plans.length === 0 && !isLoading && (
                    <View style={styles.containerEmpty}>
                    <Text style={styles.text}>
                        {'You dont have any scheduled plans'}
                    </Text>
                    <Image style={styles.image} source={img}/>
                    </View>
                )
            }
            {
                isLoading &&(
                    <ActivityIndicator  size="small" color="#0000ff" />
                )
            }
            {
                plans.length > 0 && !isLoading && (
                    plans.map(({ id }) => <PlansRow key={id} id={id} navigation={navigation} />)
                )
            }
            </ScrollView>
        </View>
    );
};

export default connect(
    (state, { tripId }) => ({
        plans: selectors.getPlanOfTrip(state, tripId),
        isLoading: selectors.isFetchingPlans(state),
    }),
    dispatch =>({
        onLoad() {
            dispatch(actions.startFetchingPlans())
        },
    }),
)(PlansList)