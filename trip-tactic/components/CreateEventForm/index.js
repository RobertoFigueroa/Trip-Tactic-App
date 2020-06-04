import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import filter from 'lodash/filter';

import { View, Text, Alert, Button, TextInput } from 'react-native';
import {Picker} from '@react-native-community/picker';
import { useForm, Controller } from "react-hook-form";
import * as selectors from '../../reducers';
import * as actions from '../../actions/events';
import DateTimePickerModal from "react-native-modal-datetime-picker";


import styles from './styles';

const CreateEventForm = ({ onCreate, navigation, cities, countries, places, id, transports }) => {

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [place, setPlace] = useState("");
  const [transport, setTransport] = useState("");
  const [listCity, setListCity] = useState([]);
  const [listPlaces, setListPlaces] = useState([]);
  const [listTransports,setListTransports] = useState([]);
  const [date1, setDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);



  const { control, handleSubmit, errors, reset} = useForm();
  const onSubmit = data => {
   const newData = { ...data, id:uuidv4(), plan:id, place, transport, hour:date1};
   if(place === null || transport === null) {
    Alert.alert("Fill all the fields please");
  }
  else if(place.length === 0 || transport.length === 0) {
    Alert.alert("Please first go to countries, cities and places for good event");
  }
  else {
    onCreate(newData);
    Alert.alert("Event created succesfully!");
    navigation.navigate('Plans');

  }

  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleChangePickerPlace = (itemValue, itemIndex) => {
    setPlace(itemValue);
    const selectedTransport = filter(transports, {'destination' : itemValue});
    console.log(selectedTransport);
    setListTransports(selectedTransport);
  
  }

  const handleChangePickerCity = (itemValue, itemIndex) => {
    const selectedCity = filter(cities, {'id' : itemValue})[0].id;
    console.log(selectedCity);
    setCity(selectedCity);
    setListPlaces(filter(places, {'city':selectedCity}));

  }

  const handleChangePickerCountry = (itemValue, itemIndex) => {
    setCountry(itemValue);
      const selectedCountry = countries.filter(i => i.id !== country)[0].id;
      setListCity(filter(cities, {'country' : selectedCountry}));
  }

  const handleConfirm = (time) => {
    const realHour = (parseInt(time.toISOString().split('T')[1].split(':')[0]) + 6).toString();
    const realMin =( parseInt(time.toISOString().split('T')[1].split(':')[1])).toString();
    setDate(`${realHour}:${realMin}`);
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
  
    <Text>Description for the event</Text>
    <Controller
      as={<TextInput placeholder={'Description'} />}
      control={control}
      name="description"
      onChange={args => args[0].nativeEvent.text}
      rules={{ required: true }}
      defaultValue=""
    />
    {errors.description && <Text>This is required.</Text>}




    <Text>Country</Text>
      <Picker 
        selectedValue={country}
        style={{ height: 50, width: 300 }}
        onValueChange={(itemValue, itemIndex) =>
          handleChangePickerCountry(itemValue, itemIndex)
        }>
        {
          countries.map(item => (
            <Picker.Item label={item.name} value={item.id} key={item.id}/>
          ))
        }
      </Picker>

      <Text>City</Text>
      <Picker 
        selectedValue={city}
        style={{ height: 50, width: 300 }}
        onValueChange={(itemValue, itemIndex) =>
          {
            handleChangePickerCity(itemValue, itemIndex);
          
          }
        }>
        
        {
          listCity.map(city => (
            <Picker.Item label={city.name} value={city.id} key={city.id}/>
          ))
        }
      </Picker>

    <Text>Place</Text>
      <Picker 
        selectedValue={place}
        style={{ height: 50, width: 300 }}
        onValueChange={(itemValue, itemIndex) =>
          handleChangePickerPlace(itemValue, itemIndex)
        }>
        {
          listPlaces.map(place => (
            <Picker.Item label={place.name} value={place.id} key={place.id}/>
          ))
        }
      </Picker>



    <Text>Transport</Text>
    <Picker 
      selectedValue={transport}
      style={{ height: 50, width: 300 }}
      onValueChange={(itemValue, itemIndex) =>
        setTransport(itemValue)
      }>
      {
        listTransports.map(t => (
          <Picker.Item label={t.transport_type} value={t.id} key={t.id}/>
        ))
      }
    </Picker>

      
    <Text
      onPress={() => {showDatePicker()}}
    >Insert Date</Text>
    <DateTimePickerModal
      isVisible={isDatePickerVisible}
      mode="time"
      locale="en_GB"
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
    />
    <Text >{date1}</Text>
    

  
    <Button title={"Create"} onPress={handleSubmit(onSubmit)}/>
  </View>

  );
}

export default connect(
  state => ({
    countries: selectors.getAllCountries(state),
    cities: selectors.getAllCities(state),
    places: selectors.getAllPlaces(state),
    transports: selectors.getAllTransports(state),
  }),
  dispatch => ({
    onCreate(event) {
      console.log("Create new event", event)
      dispatch(actions.startAddingEvent(event));
    },
  }),
)(CreateEventForm);

//export default CreateTripForm;

