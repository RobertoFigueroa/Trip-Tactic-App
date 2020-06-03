import React from 'react';
import { View } from 'react-native';


import TripContainer from '../../components/TripContainer';
import styles from './styles'

const Home = ({ navigation }) => {
    return(
        <View style = {styles.container}>
            <TripContainer navigation={navigation}/>
        </View>
    );
}

export default Home