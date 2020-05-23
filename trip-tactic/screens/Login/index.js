import React from 'react';

import { View, ImageBackground  } from 'react-native';
import LoginForm from '../../components/LoginForm';
import styles from './styles';

const image = require('../../assets/trip.jpg')

const Login = () => {

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <LoginForm />
      </ImageBackground>
    </View>
  );
}


export default Login;