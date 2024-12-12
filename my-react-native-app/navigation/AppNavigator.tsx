import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import UserScreen from '../screens/UserScreen';
import NoteScreen from '../screens/NoteScreen';

type RootStackParamList = {
  Home: undefined;
  Users: undefined;
  Notes: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Users" component={UserScreen} />
        <Stack.Screen name="Notes" component={NoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );    
}
