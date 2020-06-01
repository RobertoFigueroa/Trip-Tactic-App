import React from 'react';

import { View, ImageBackground, Button, Text } from 'react-native';
import SigninForm from '../../components/SinginForm';
import styles from './styles';


const Signin = ({ navigation }) => {


  return (
    <View style={styles.container}>
      <SigninForm navigation={navigation} /> 
    </View>
  );
}


export default Signin;