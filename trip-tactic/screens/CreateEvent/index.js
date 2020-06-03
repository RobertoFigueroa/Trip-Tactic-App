import React from 'react';

import { View, Text } from 'react-native'

import CreateFromEvent from '../../components/CreateEventForm';
import styles from './styles';


const CreateEvent = ({route, navigation}) => {
  const {id} = route.params;
  return (
    <View style={styles.container}>
      <CreateFromEvent navigation={navigation} id={id}/> 
    </View>
  );
}

export default CreateEvent;