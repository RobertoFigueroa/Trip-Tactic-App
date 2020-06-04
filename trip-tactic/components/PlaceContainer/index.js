import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, ActivityIndicator, Button, ScrollView } from 'react-native';

import styles from './styles';
import * as selectors from '../../reducers';
import * as actions from '../../actions/place';
import * as cityActions from '../../actions/city';
import Place from '../Place';

const PlaceContainer = ({navigation,places, isLoading, onLoad, cityId}) =>{
    useEffect(onLoad,[]);
    return(
        <View style = {styles.container}>
            <ScrollView>
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
                    places.map(({id}) => <Place key = {id} id = {id} navigation = {navigation}/>)
                )
            }

            </ScrollView>
            <Button title = 'Add a place' onPress = {() => navigation.navigate('CreatePlace',{cityId})} style ={styles.fixedButton} />
        </View>
    )
};

export default connect(
    (state, {cityId}) =>({
        places: selectors.getWantedPlaces(state, cityId),
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