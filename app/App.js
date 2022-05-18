import React from 'react';
import Search from './screens/Search';
import Profil from './screens/Profil';
import Home from './screens/Home';
import Me from './screens/Me';

import { Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ButtonHeader from './components/ButtonHeader';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Search"
          component={Search}
        />
        <Stack.Screen name="Profil" component={Profil} />
        <Stack.Screen
          name="Me"
          component={Me}
          options={({ navigation }) => ({
            headerRight: () => ( <ButtonHeader navigation={navigation} /> ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}