import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';

import styles from './styles';
import * as selectors from '../../reducers';
import * as actions from '../../actions/city';
import * as countryActions from '../../actions/country';
import City from '../City';

const CityContainer = ({cities, isLoading, onLoad, navigation}) =>{
    useEffect(onLoad,[]);
    return(
        <View style = {styles.container}>
            <ScrollView>
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
                        cities.map(({id}) => <City key = {id} id = {id} navigation ={navigation}/>)
                    )
                }
            </ScrollView>
        </View>
    )
};

export default connect(
    (state, {countryId}) =>({
        cities: selectors.getWantedCities(state, countryId),
        isLoading: selectors.isFetchingCities(state),
    }),
    dispatch =>({
        onLoad(){
            dispatch(actions.startFetchingCities())
        },
    }),
)(CityContainer)