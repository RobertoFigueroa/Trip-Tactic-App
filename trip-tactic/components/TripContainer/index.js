import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import './styles.js';
import * as selectors from '../../reducers';
import * as actions from '../../actions/trips';
import Trip from '../Trip';

const TripContainer = ({trips, isLoading, onLoad}) => {
    useEffect(onLoad,[]);
    return(
        <View>
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