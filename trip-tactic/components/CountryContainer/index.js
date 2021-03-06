import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView  } from 'react-native';

import styles from './styles.js';
import * as selectors from '../../reducers';
import * as actions from '../../actions/country';
import Country from '../Country';

const CountryContainer = ({countries, isLoading, onLoad, navigation}) => {
    useEffect(onLoad, []);
    return(
        <View style = {styles.container}>
            <ScrollView>
                {
                    countries.length === 0 && !isLoading &&(
                        <Text>
                            {'We are sorry but we dont have any countries for you to visit available'}
                        </Text>
                    )
                }
                {
                    isLoading &&(
                        <Text>
                            {'Loading...'}
                        </Text>
                    )
                }
                {
                    countries.length > 0 && !isLoading && (
                        countries.map(({id}) => <Country key = {id} id = {id} navigation={navigation}/>)
                    )
                }
            </ScrollView>
        </View>
    );
};

export default connect(
    state =>({
        countries: selectors.getAllCountries(state),
        isLoading: selectors.isFetchingCountries(state),
    }),
    dispatch =>({
        onLoad(){
            dispatch(actions.startFetchingCountries())
        }
    })
)(CountryContainer)