import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ScreenOne} from './screens/one';
import {ScreenTwo} from './screens/two';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="One" component={ScreenOne} />
        <Stack.Screen name="Two" component={ScreenTwo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
