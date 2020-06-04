import React from 'react';

import { View } from 'react-native'

import CreateCommentForm from '../../components/CreateCommentForm';
import styles from './styles';


const CreateComment = ({route, navigation}) => {
  const {placeId} = route.params;
  return (
    <View style={styles.container}>
      <CreateCommentForm navigation={navigation} placeId={placeId}/> 
    </View>
  );
}

export default CreateComment;