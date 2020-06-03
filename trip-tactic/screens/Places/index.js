import React from 'react';

import { View, Text } from 'react-native'


import PlaceContainer from '../../components/PlaceContainer';
import * as selectors from '../../reducers';

import styles from './styles';


const Places = ({route, navigation}) => {
  const {id} = route.params
  return (
    <View style={styles.container}>
      <PlaceContainer navigation ={navigation} cityId = {id}/>
    </View>
  );
}

export default Places;