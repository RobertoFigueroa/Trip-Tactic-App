import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import * as actions from '../../actions/registration';



const SigninForm = ({ onSignin }) => {


  const { control, handleSubmit, errors } = useForm();
  //const onSubmit = data => onSignin(data);
  const onSubmit = data => signIn;

  return (
    <View>
    <Text>User name</Text>
    <Controller
      as={<TextInput placeholder={'User name'}/>}
      control={control}
      name="username"
      onChange={args => args[0].nativeEvent.text}
      rules={{ required: true }}
      defaultValue=""
    />
    {errors.username && <Text>This is required.</Text>}

    <Text>First name</Text>
    <Controller
      as={<TextInput placeholder={'First name'}/>}
      control={control}
      name="first_name"
      onChange={args => args[0].nativeEvent.text}
      rules={{ required: true }}
      defaultValue=""
    />
    {errors.first_name && <Text>This is required.</Text>}

    <Text>Last name</Text>
    <Controller
      as={<TextInput placeholder={'Last name'}/>}
      control={control}
      name="last_name"
      onChange={args => args[0].nativeEvent.text}
      rules={{ required: true }}
      defaultValue=""
    />
    {errors.last_name && <Text>This is required.</Text>}


    <Text>Email</Text>
    <Controller
      as={<TextInput placeholder={'Email'}/>}
      control={control}
      name="email"
      onChange={args => args[0].nativeEvent.text}
      rules={{ required: true, pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/ }}
      defaultValue=""
    />
    {errors.email && <Text>This is required.</Text>}

    <Text>Password</Text>
    <Controller
      as={<TextInput placeholder={'password'} secureTextEntry={true}/>}
      control={control}
      name="password"
      onChange={args => args[0].nativeEvent.text}
      rules={{ required: true }}
      defaultValue=""
    />
    {errors.password && <Text>This field is required</Text>}

    <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default connect(
  undefined,
  dispatch => ({
    onSignin(user) {
      console.log("Esto le mando", user);
      dispatch(actions.startSignin(user));
    }
  }),
  )(SigninForm);

