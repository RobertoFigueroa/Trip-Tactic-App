import React from 'react';


import { View } from 'react-native';
import CreateTripForm from '../../components/CreateTripForm';

import styles from './styles';

const CreateTrip = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <CreateTripForm navigation={ navigation }/>
    </View>
  );
}

export default CreateTrip;