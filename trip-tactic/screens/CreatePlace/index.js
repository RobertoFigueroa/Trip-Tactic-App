import React from 'react';

import { View } from 'react-native'

import CreatePlaceForm from '../../components/CreatePlaceForm';
import styles from './styles';


const CreatePlace = ({route, navigation}) => {
  const {cityId} = route.params;
  return (
    <View style={styles.container}>
      <CreatePlaceForm navigation={navigation} cityId={cityId}/> 
    </View>
  );
}

export default CreatePlace;