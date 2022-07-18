import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';

import ListContact from './Screens/ListContact/ListContact.component';
import DetailContact from './Screens/DetailContact/DetailContact.component';
import PostContact from './Screens/PostContact/PostContact.component';
import UpdateContact from './Screens/UpdateContact/UpdateContact.component';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='ListContact'>
          <Stack.Screen
            name="ListContact"
            component={ListContact}
          />
          <Stack.Screen
            name="DetailContact"
            component={DetailContact}
          />
          <Stack.Screen
            name="PostContact"
            component={PostContact}
          />
          <Stack.Screen
            name="UpdateContact"
            component={UpdateContact}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
