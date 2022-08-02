import { useState, useEffect } from 'react';
import { Text, View, Image, Button } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';

const defaultContactData = {
  id: '',
  firstName: '',
  lastName: '',
  age: '',
  photo: 'N/A'
};

const getData = (setContactData, navigation, route) => {
  axios.get('https://simple-contact-crud.herokuapp.com/contact/' + route.params.id)
    .then(response => {
      setContactData({
        id: response.data.data.id,
        firstName: response.data.data.firstName,
        lastName: response.data.data.lastName,
        age: response.data.data.age.toString(),
        photo: response.data.data.photo  
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

const handleDelete = (navigation, route) => {
  axios.delete('https://simple-contact-crud.herokuapp.com/contact/' + route.params.id)
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

const navigateToUpdate= (contactData, navigation) => {
  navigation.navigate('UpdateContact', { contactDataParams: contactData })
}

export default function DetailContact({ navigation, route }) {
  const [contactData, setContactData] = useState(defaultContactData);

  useEffect(() => {
    getData(setContactData, navigation, route);
  }, [])

  return (
    <View style={{flex: 1, padding:40}}>
        <Image
          style={{width: 100, height: 100, alignSelf: 'center'}}
          source={{uri: contactData.photo}}
        />
        <Text style={{marginTop:15, alignSelf: 'center'}}>{contactData.firstName} {contactData.lastName}</Text>
        <Text style={{marginBottom:15, alignSelf: 'center'}}>{contactData.age} years old</Text>
        <Button title='Update Contact' onPress={()=> navigateToUpdate(contactData, navigation)}/>
        <View style={{margin: 10}}/>
        <Button title='Delete Contact' onPress={()=> handleDelete(navigation, route)}/>
      </View>
  )
}