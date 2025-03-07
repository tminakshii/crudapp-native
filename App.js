import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductList from './src/screens/ProductList';
import ProductDetail from './src/screens/ProductDetail';
import ProductEdit from './src/screens/ProductEdit';
const Stack=createNativeStackNavigator()

const App = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName='ProductList'>
      <Stack.Screen name='ProductList' component={ProductList}/>
      <Stack.Screen name='ProductDetail' component={ProductDetail}/>
      <Stack.Screen name='ProductEdit' component={ProductEdit}/>
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})