import React from 'react';
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

const getData = (setContactData, navigation) => {
  axios.get('https://simple-contact-crud.herokuapp.com/contact/' + navigation.state.params.id)
    .then(response => {
      setContactData({
        id: response.data.data.id,
        firstName: response.data.data.firstName,
        lastName: response.data.data.lastName,
        age: response.data.data.age,
        photo: response.data.data.photo  
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

const handleDelete = (navigation) => {
  axios.delete('https://simple-contact-crud.herokuapp.com/contact/' + navigation.state.params.id)
    .then(() => {
      navigation.dispatch(CommonActions.reset({
        index: 0,
        actions: { name: 'ListContact' },
      }));
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

const navigateToUpdate= (contactData, navigation) => {
  navigation.navigate('UpdateContact', { ...contactData })
}

export default function DetailContact({ navigation }) {
  const [contactData, setContactData] = useState(defaultContactData);

  useEffect(() => {
    getData(setContactData, navigation);
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
        <Button title='Delete Contact' onPress={()=> handleDelete()}/>
      </View>
  )
}