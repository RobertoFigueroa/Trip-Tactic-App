import React from 'react';
import { View } from 'react-native';


import TripContainer from '../../components/TripContainer';
import styles from './styles'

const Home = () => {
    return(
        <View style = {styles.container}>
            <TripContainer/>
        </View>
    );
}

export default Home