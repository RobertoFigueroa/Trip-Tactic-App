import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { View, Text, Alert, Button, TextInput } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import * as actions from '../../actions/trips';

import styles from './styles';

const CreateTripForm = ({ onCreate, navigation }) => {



  const { control, handleSubmit, errors, reset} = useForm();
  const onSubmit = data => {
    const newData = { ...data, id:uuidv4()};
    onCreate(newData);
    navigation.navigate('Home');



  }

  return (

    <View style={styles.container}>
    <Text>Name</Text>
    <Controller
      as={<TextInput placeholder={'Name'} />}
      control={control}
      name="name"
      onChange={args => args[0].nativeEvent.text}
      rules={{ required: true }}
      defaultValue=""
    />
    {errors.name && <Text>This is required.</Text>}
  
    <Text>Description for the trip</Text>
    <Controller
      as={<TextInput placeholder={'Description'} />}
      control={control}
      name="description"
      onChange={args => args[0].nativeEvent.text}
      rules={{ required: true }}
      defaultValue=""
    />
    {errors.description && <Text>This is required.</Text>}
  
    <Button title={"Create"} onPress={handleSubmit(onSubmit)}/>
  </View>

  );
}

export default connect(
  undefined,
  dispatch => ({
    onCreate(trip) {
      console.log("Alli va el dipatch", trip)
      dispatch(actions.startAddingTrip(trip));
    }
  }),
)(CreateTripForm);

//export default CreateTripForm;

