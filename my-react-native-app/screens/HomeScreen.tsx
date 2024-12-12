import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';
import type { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
    Home: undefined;
    Users: undefined;
  };
  
type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;


export default function HomeScreen({ navigation } : HomeScreenProps) : React.ReactElement {

  return (
    <View>
      <Text>Bienvenue</Text>
      <Button
        title="Go to User Screen"
        onPress={() => navigation.navigate('Users')}
      />
    </View>
  );
}
