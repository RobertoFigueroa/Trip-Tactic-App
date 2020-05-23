import React, { useState } from 'react';

import { View, Text, TextInput, Button } from 'react-native';
import styles from './styles';

const LoginForm = () => {
  return (
    <View>
      <Text style={styles.text}> Email</Text>
      <TextInput  style={styles.inputText}  placeholder={'Email'}/>
      <Text style={styles.text}> Password</Text>
      <TextInput style={styles.inputText}  placeholder={'Password'} secureTextEntry={true} />
      <Button title={'Log In'}/>
      </View>
  );
};

export default LoginForm;

