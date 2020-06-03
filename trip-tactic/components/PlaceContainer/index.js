import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, ActivityIndicator, Button  } from 'react-native';

import styles from './styles';
import * as selectors from '../../reducers';
import * as actions from '../../actions/place';
import * as cityActions from '../../actions/city';
import Place from '../Place';

const PlaceContainer = ({places, isLoading, onLoad, onClick}) =>{
    useEffect(onLoad,[]);
    return(
        <View style = {styles.container}>
            {
                places.length ===0 && !isLoading &&(
                    <Text>
                        {"There is no places for your selected city yet"}
                    </Text>
                )
            }
            {
                isLoading &&(
                    <ActivityIndicator  size="small" color="#0000ff" />
                )
            }
            {
                places.length > 0 && !isLoading && (
                    places.map(({id}) => <Place key = {id} id = {id}/>)
                )
            }
        </View>
    )
};

export default connect(
    state =>({
        places: selectors.getWantedPlaces(state, selectors.getSelectedCity(state)),
        isLoading: selectors.isFetchingPlaces(state),
    }),
    dispatch =>({
        onLoad(){
            dispatch(actions.startFetchingPlaces())
        },
        onClick(){
            dispatch(cityActions.deselectCity())
        }
    }),
)(PlaceContainer)