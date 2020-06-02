import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, ActivityIndicator, Button  } from 'react-native';

import styles from './styles';
import * as selectors from '../../reducers';
import * as actions from '../../actions/city';
import * as countryActions from '../../actions/country';
import City from '../City';

const CityContainer = ({cities, isLoading, onLoad, onClick}) =>{
    useEffect(onLoad,[]);
    return(
        <View style = {styles.container}>
            {
                cities.length ===0 && !isLoading &&(
                    <Text>
                        {"There is no cities for your selected contry yet"}
                    </Text>
                )
            }
            {
                isLoading &&(
                    <ActivityIndicator  size="small" color="#0000ff" />
                )
            }
            {
                cities.length > 0 && !isLoading && (
                    cities.map(({id}) => <City key = {id} id = {id}/>)
                )
            }
            <Button title={'<-'} onPress = {onClick}/>
        </View>
    )
};

export default connect(
    state =>({
        cities: selectors.getWantedCities(state, selectors.getSelectedCountry(state)),
        isLoading: selectors.isFetchingCities(state),
    }),
    dispatch =>({
        onLoad(){
            dispatch(actions.startFetchingCities())
        },
        onClick(){
            dispatch(countryActions.deselectCountry())
        }
    }),
)(CityContainer)