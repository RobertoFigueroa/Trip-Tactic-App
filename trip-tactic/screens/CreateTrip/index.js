import React from 'react';


import { View } from 'react-native';
import CreateTripForm from '../../components/CreateTripForm';

import styles from './styles';

const CreateTrip = () => {
  return (
    <View style={styles.container}>
      <CreateTripForm />
    </View>
  );
}

export default CreateTrip;