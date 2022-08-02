import { useState } from 'react';
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
  age: 0,
  photo: ''
}

const handleSubmit = (contactData, navigation) => {
  axios.post('https://simple-contact-crud.herokuapp.com/contact', { ...contactData })
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

export default function PostContact({ navigation }) {
  const [contactData, setContactData] = useState(defaultContactData);

  return (
    <View style={{flex: 1, paddingTop:20, paddingHorizontal: 20}}>
      <TextInput 
        placeholder='First Name'
        onChangeText={(value) => setContactData(prevState => ({...prevState, firstName: value}))}
        style={styles.inputStyle}
      />
      <TextInput 
        placeholder='Last Name'
        onChangeText={(value) => setContactData(prevState => ({...prevState, lastName: value}))}
        style={styles.inputStyle}
      />
      <TextInput 
        placeholder='Age'
        keyboardType="number-pad"
        onChangeText={(value) => setContactData(prevState => ({...prevState, age: value}))}
        style={styles.inputStyle}
      />
      <TextInput 
        placeholder='Photo URL'
        onChangeText={(value) => setContactData(prevState => ({...prevState, photo: value}))}
        style={styles.inputStyle}
      />
      <Button title='Save' onPress={() => handleSubmit(contactData, navigation)}/>
    </View>
  );
}