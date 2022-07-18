import React from 'react';
import { Text, View } from 'react-native';

export default function DetailContact(props) {
  console.log('id', props.route.params.id);

  return (
    <View>
      <Text>Detail Contact</Text>
    </View>
  );
}