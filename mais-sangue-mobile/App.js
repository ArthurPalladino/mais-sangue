import { Text, View,Pressable, Modal, TextInput } from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './Paginas/loginPage.js';
import RegisterPage from './Paginas/registerPage.js';
import MenuPage from './Paginas/InsideAppNavigator'
import DlgModal from './Componentes/dialogModal'
const Stack = createNativeStackNavigator();
export default App = () => {

  return(
  <NavigationContainer initialRouteName='login'>
   <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
    <Stack.Screen name="login" component={LoginPage}/>
    <Stack.Screen name="register" component={RegisterPage}/>
    <Stack.Screen name="mainMenu" component={MenuPage}/>

   </Stack.Navigator>
   </NavigationContainer>

    )
}

