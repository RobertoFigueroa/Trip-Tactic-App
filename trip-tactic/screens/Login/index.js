import React from 'react';

import { View, ImageBackground  } from 'react-native';
import LoginForm from '../../components/LoginForm';
import styles from './styles';

const image = {uri : "https://images.unsplash.com/photo-1500835556837-99ac94a94552?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"}

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