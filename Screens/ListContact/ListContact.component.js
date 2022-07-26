import { useState, useEffect } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { Fab, AddIcon } from 'native-base';
import axios from 'axios';

const getData = (setDataSource) => {
  axios.get('https://simple-contact-crud.herokuapp.com/contact')
  .then(response => {
    setDataSource(response.data.data,);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
}

const addContact = (navigation) => {
  navigation.navigate('PostContact')
}

const navigateToDetail= (contactId, navigation) => {
  navigation.navigate('DetailContact', { id: contactId })
}

const renderViewItem = (item, navigation) => (
  <TouchableOpacity onPress={() => navigateToDetail(item.id, navigation)}>
    <View style={{flex: 1, padding:20, flexDirection: 'row'}}>
      <Image
        style={{width: 50, height: 50, marginRight: 15}}
        source={{uri: item.photo}}
      />
      <View>
        <Text>{item.firstName} {item.lastName}</Text>
        <Text>{item.age} years old</Text>
      </View>
    </View>
  </TouchableOpacity>
);


export default function ListContact({ navigation }) {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    getData(setDataSource);
  }, [])

  return (
    <View style={{flex: 1, paddingTop:20}}>
      <FlatList
        data={dataSource}
        renderItem={({item}) => renderViewItem(item, navigation)}
        keyExtractor={({item}, index) => index.toString()}
      />
       <Fab 
        renderInPortal={false}
        shadow={2}
        size="sm"
        icon={<AddIcon size="5" mt="0.5" color="white" />}
        onPress={()=> addContact(navigation)}
      />
    </View>
  )
}
