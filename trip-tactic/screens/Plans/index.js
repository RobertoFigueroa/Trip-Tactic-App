import React from 'react';

import { View, Text } from 'react-native'

import styles from './styles';
import PlansList from '../../components/PlansList';


const Plans = ({route, navigation}) => {
  const {id} = route.params;
  return (
    <View style={styles.container}>
      <PlansList navigation={navigation} tripId={id}/>
    </View>
  );
}

export default Plans;