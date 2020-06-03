import React, { useState } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { View, Text, Alert, Button, TextInput } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import * as actions from '../../actions/plans';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import styles from './styles';

const CreatePlanForm = ({ onCreate, navigation, id}) => {

  const { control, handleSubmit, errors, reset} = useForm();
  const onSubmit = data => {
   const newData = { ...data, id:uuidv4(), date: date1, trip:id};
    onCreate(newData);
    //navigation.navigate('Home');

  }

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date1, setDate] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date.toISOString().split('T')[0]);
    setDate( date.toISOString().split('T')[0]);
    hideDatePicker();
  };

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
  
    <Text
      onPress={() => {showDatePicker()}}
    >Insert Date</Text>
    <DateTimePickerModal
      isVisible={isDatePickerVisible}
      mode="date"
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
    />
    <Text >{date1}</Text>
  
    <Button title={"Create"} onPress={handleSubmit(onSubmit)}/>
  </View>

  );
}

export default connect(
  undefined,
  dispatch => ({
    onCreate(trip) {
      console.log("Alli va el dipatch", trip)
      dispatch(actions.startAddingPlan(trip));
    }
  }),
)(CreatePlanForm);

//export default CreateTripForm;

