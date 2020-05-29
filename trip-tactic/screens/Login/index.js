import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ImageBackground, Button, Text } from 'react-native';
import LoginForm from '../../components/LoginForm';
import styles from './styles';

const image = {uri : "https://images.unsplash.com/photo-1500835556837-99ac94a94552?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"}

const Login = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <LoginForm />
        <Text> No register yet? </Text>
        <Button title='Register' onPress={() => navigation.navigate("Register")}/>
      </ImageBackground>
    </View>
  );
}


export default Login;