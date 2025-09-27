import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddProductScreen from '../screens/AddProductScreen';
import EditProductScreen from '../screens/EditProductScreen';
import SavedListsScreen from '../screens/SavedListsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
      <Stack.Navigator 
      screenOptions={{ headerShown: false }}
      initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}  />
        <Stack.Screen name="AddProduct" component={AddProductScreen} />
        <Stack.Screen name="EditProduct" component={EditProductScreen} />
        <Stack.Screen name="SavedLists" component={SavedListsScreen} />
      </Stack.Navigator>
  );
};

export default AppNavigator;