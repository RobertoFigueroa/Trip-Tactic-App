import React, {useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';

import  styles from './styles.js';
import * as selectors from '../../reducers';
import * as actions from '../../actions/trips';
import Trip from '../Trip';

import { AuthContext } from '../../context';


const TripContainer = ({trips, isLoading, onLoad}) => {
    useEffect(onLoad,[]);
    const { signOut } = useContext(AuthContext);
    return(
        <View style={styles.container}>
            {
                trips.length === 0 && !isLoading && (
                    <Text>
                        {'You dont have any scheduled trips'}
                    </Text>
                )
            }
            {
                isLoading &&(
                    <Text>{'Loading...'}</Text>
                )
            }
            {
                trips.length > 0 && !isLoading && (
                    trips.map(({ id }) => <Trip key={id} id={id}/>)
                )
            }
            <Button title={"Sign Out"} onPress={() => {signOut()}}></Button>
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