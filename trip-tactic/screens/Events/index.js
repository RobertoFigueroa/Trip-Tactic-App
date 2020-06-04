import React from 'react';

import { View, Text } from 'react-native'

import styles from './styles';
import EventContainer from '../../components/EventsContainer';


const Events = ({route, navigation}) => {
  const {id} = route.params;
  console.log("Este es el id del plan", id);
  return (
    <View style={styles.container}>
      <EventContainer navigation={navigation} planId={id}/>
    </View>
  );
}

export default Events;