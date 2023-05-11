import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  SplashScreen,
  SignIn,
  SignUp,
  Home,
  Profile, 
  AddItems, 
  EditItems,
  ListItems
} from '../pages';

const Stack = createNativeStackNavigator();

const index = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ListItems"
        component={ListItems}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddItems"
        component={AddItems}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditItems"
        component={EditItems}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default index;
