import InfoScreen from '../modules/infoScreen';
import React, {PureComponent} from 'react';
import ScreenNames from '../utils/ScreenNames';
import SearchScreen from '../modules/searchScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default class Routes extends PureComponent {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name={ScreenNames.searchScreen}
            component={SearchScreen}
          />
          <Stack.Screen name={ScreenNames.infoScreen} component={InfoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
