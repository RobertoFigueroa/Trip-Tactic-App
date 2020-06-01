import React, {useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, Image, ActivityIndicator, ScrollView } from 'react-native';

import  styles from './styles.js';
import * as selectors from '../../reducers';
import * as actions from '../../actions/trips';
import Trip from '../Trip';

const img = require('../../assets/goTravel.png');

import { AuthContext } from '../../context';


const TripContainer = ({trips, isLoading, onLoad}) => {
    useEffect(onLoad,[]);
    const { signOut } = useContext(AuthContext);
    return(
        <View style={styles.container}>
            <ScrollView>
            
            {
                trips.length === 0 && !isLoading && (
                    <View style={styles.containerEmpty}>
                    <Text style={styles.text}>
                        {'You dont have any scheduled trips'}
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
                trips.length > 0 && !isLoading && (
                    trips.map(({ id }) => <Trip key={id} id={id}/>)
                )
            }
            <Button title={"Sign Out"} onPress={() => {signOut()}}></Button>
            </ScrollView>
        </View>
    );
};

export default connect(
    state => ({
        trips: selectors.getAllTrips(state),
        isLoading: selectors.isFetchingTrips(state),
    }),
    dispatch =>({
        onLoad() {
            dispatch(actions.startFetchingTrips())
        },
    }),
)(TripContainer)