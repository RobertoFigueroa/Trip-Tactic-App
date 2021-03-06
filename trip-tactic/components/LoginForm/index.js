import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Button } from 'react-native';
import * as actions from '../../actions/auth';

import styles from './styles';

import { AuthContext } from '../../context';


const LoginForm = ({ onSubmit }) => {
  const { signIn } = useContext(AuthContext);
  const [username, changeName] = useState('');
  const [password, changePassword] = useState('');
  return (
    <View>
      <Text style={styles.text}> Email</Text>
      <TextInput  style={styles.inputText}  placeholder={'Email'} value={username} onChangeText={e => changeName(e)}/>
      <Text style={styles.text}> Password</Text>
      <TextInput style={styles.inputText}  placeholder={'Password'} secureTextEntry={true} value={password} onChangeText={e => changePassword(e)}/>
      <Button title={'Log In'} onPress={() => signIn(username, password)}/>
      </View>
  );
};

export default connect(
  undefined,
  dispatch => ({
    onSubmit(username, password) {
      console.log("Esto le mando", username, password);
      dispatch(actions.startLogin(username, password));
    }
  }),
  )(LoginForm);

