import React, {useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, Image, ActivityIndicator, ScrollView } from 'react-native';

import  styles from './styles.js';
import * as selectors from '../../reducers';
import * as actions from '../../actions/events';
import Event from '../Event';

const img = require('../../assets/goTravel.png');


const EventContainer = ({events, isLoading, onLoad, navigation}) => {
    useEffect(onLoad,[]);
    return(
        <View style={styles.container}>
            <ScrollView>
            
            {
                events.length === 0 && !isLoading && (
                    <View style={styles.containerEmpty}>
                    <Text style={styles.text}>
                        {'You dont have any scheduled events'}
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
                events.length > 0 && !isLoading && (
                    events.map(({ id }) => <Event key={id} id={id} navigation={navigation}/>)
                )
            }
            </ScrollView>
        </View>
    );
};

export default connect(
    (state, { planId }) => ({
        events: selectors.getEventOfTrip(state,planId),
        isLoading: selectors.isFetchingEvents(state),
    }),
    dispatch =>({
        onLoad() {
            dispatch(actions.startFetchingEvents());
        },
    }),
)(EventContainer)