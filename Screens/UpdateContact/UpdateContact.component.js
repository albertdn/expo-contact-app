import { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';

const styles = StyleSheet.create({
  inputStyle : {
    height: 40, 
    borderColor: 'lightgrey', 
    borderWidth: 2, 
    marginVertical: 10, 
    paddingLeft: 10
  }
});

const defaultContactData = {
  firstName: '',
  lastName: '',
  age: '0',
  photo: ''
}

const handleSubmit = (contactData, navigation) => {
  axios.put('https://simple-contact-crud.herokuapp.com/contact/' + contactData.id, { 
    firstName: contactData.firstName,
    lastName: contactData.lastName,
    age: contactData.age,
    photo: contactData.photo
   })
    .then(() => {
      navigation.dispatch(CommonActions.reset({
        index: 0,
        routes: [
          { name: 'ListContact' }
        ]
      }));
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

export default function UpdateContact({ navigation, route }) {
  const [contactData, setContactData] = useState(defaultContactData);

  useEffect(() => {
    const { contactDataParams } = route.params;

    setContactData(contactDataParams);
  }, [])

  return (
    <View style={{flex: 1, paddingTop:20, paddingHorizontal: 20}}>
      <TextInput 
        placeholder='First Name'
        value={contactData.firstName}
        onChangeText={(value) => setContactData(prevState => ({...prevState, firstName: value}))}
        style={styles.inputStyle}
      />
      <TextInput 
        placeholder='Last Name'
        value={contactData.lastName}
        onChangeText={(value) => setContactData(prevState => ({...prevState, lastName: value}))}
        style={styles.inputStyle}
      />
      <TextInput 
        placeholder='Age'
        value={contactData.age.toString()}
        onChangeText={(value) => setContactData(prevState => ({...prevState, age: value}))}
        style={styles.inputStyle}
      />
      <TextInput 
        placeholder='Photo URL'
        value={contactData.photo}
        onChangeText={(value) => setContactData(prevState => ({...prevState, photo: value}))}
        style={styles.inputStyle}
      />
      <Button title='Save' onPress={() => handleSubmit(contactData, navigation)}/>
    </View>
  );
}