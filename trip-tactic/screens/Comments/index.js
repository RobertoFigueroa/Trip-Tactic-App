import React from 'react';

import { View, Text } from 'react-native'


import styles from './styles';
import CommentContainer from '../../components/CommentContainer';


const Comments = ({route, navigation}) => {
  const {id} = route.params
  return (
    <View style={styles.container}>
      <CommentContainer navigation ={navigation} placeId = {id}/>
    </View>
  );
}

export default Comments;