import React from 'react';

import { View, Text } from 'react-native'

import CreatePlanForm from '../../components/CreatePlanForm';
import styles from './styles';


const CreateEvent = ({route, navigation}) => {
  const {id} = route.params;
  return (
    <View style={styles.container}>
      <CreatePlanForm id={id} navigation={navigation}/>
    </View>
  );
}

export default CreateEvent;